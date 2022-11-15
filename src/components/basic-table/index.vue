<template>
  <div v-loading="loading">
    <HeaderSearch>
      <template v-slot:searchSlot v-if="options.searchMenuSlot">
        <slot name="searchMenu"></slot>
      </template>
    </HeaderSearch>
    <el-table
      class="basic-table"
      @selection-change="handleSelectionChange"
      :row-key="options.rowKey"
      :maxHeight="400"
      :border="options.border"
      :data="tableData"
    >
      <el-table-column
        align="center"
        v-if="options.selection"
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="item in options.column"
        :key="item.prop"
        :width="item.width"
        :align="options.align"
        v-bind="item"
      >
        <template #default="scope">
          <slot :name="item.prop" v-bind="scope" v-if="item.slot"></slot>
          <span v-if="!item.slot && item.type !== TableInputTypeEnum.SELECT">{{
            scope.row[item.prop]
          }}</span>
          <span v-if="!item.slot && item.type === TableInputTypeEnum.SELECT">
            {{ filterSelectValue(scope.row[item.prop], item.dicData) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        v-if="!options.operationHide"
      >
        <template #default="scope">
          <slot name="operation" v-bind="scope"></slot>
        </template>
      </el-table-column>
      <template v-slot:empty>
        <slot name="empty">
          <div>暂无数据～</div>
        </slot>
      </template>
    </el-table>
    <div class="basic-table__pagination">
      <el-pagination
        v-model.currentPage="defaultPage.currentPage"
        v-model:page-size="defaultPage.pageSize"
        :total="defaultPage.total"
        :page-sizes="defaultPage.pageSizes"
        background
        :layout="defaultPage.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  PropType,
  Ref,
  ref,
  watch,
  unref,
} from "vue";
import HeaderSearch from "./components/headerSearch.vue";
import {
  BasicTableOption,
  TableInputTypeEnum,
  ColmnSelectOptions,
  BasicTablePageSize,
} from "./index";
export default defineComponent({
  components: {
    HeaderSearch,
  },
  props: {
    tableData: Array,
    options: {
      type: Object as PropType<BasicTableOption>,
      default: () => {
        return {};
      },
    },
    // 加载loading
    loading: {
      type: Boolean,
      default: () => false,
    },
    page: {
      type: Object as PropType<BasicTablePageSize>,
      default: () => {
        return {
          pagerCount: 7, //超过多少条隐藏
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [10, 20, 30, 40, 50],
          layout: "sizes, prev, pager, next",
        };
      },
    },
  },
  setup(props, { emit }) {
    const privide = provide("options", props.options);
    const defaultPage: Ref<BasicTablePageSize> = ref({
      pagerCount: 7, //超过多少条隐藏
      pageSize: 10, // 每页显示多少条
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSizes: [10, 20, 30, 40, 50],
      layout: "sizes, prev, pager, next",
    });
    // watch
    watch(
      () => [props.page],
      (val) => {
        console.log("val-pageSize", val);
        initPage();
      },
      {
        deep: true,
      }
    );
    //methods
    /**
     * 加载page数据
     */
    const initPage = () => {
      const page = unref(defaultPage);
      defaultPage.value = Object.assign(page, props.page, {
        total: Number(props.page.total || page.total),
        pagerCount: Number(props.page.pagerCount || page.pagerCount),
        currentPage: Number(props.page.currentPage || page.currentPage),
        pageSize: Number(props.page.pageSize || page.pageSize),
      });
      console.log("合并后的defaultPage", defaultPage);
    };
    /**
     * table 多选框
     */
    const handleSelectionChange = (val: any) => {
      emit("selectChange", val);
    };
    /**
     * 分页size变化
     */
    const handleSizeChange = (val: number) => {
      defaultPage.value.pageSize = val;
      updatePageValue();
      emit("sizeChange", val);
    };
    /**
     * 分页current变化
     */
    const handleCurrentChange = (val: number) => {
      defaultPage.value.currentPage = val;
      updatePageValue();
      emit("currentChange", val);
    };
    /**
     * 更新page的值和重新加载数据
     */
    const updatePageValue = () => {
      emit("update:page", unref(defaultPage));
      emit("on-load");
    };
    /**
     * 过滤值
     */
    const filterSelectValue = (
      val: any,
      dicData: ColmnSelectOptions[] | undefined
    ): string => {
      let label: string = "";
      dicData &&
        dicData.forEach((item) => {
          if (item.value == val) {
            label = item.label || "";
          }
        });
      return label;
    };
    return {
      privide,
      handleSelectionChange,
      TableInputTypeEnum,
      filterSelectValue,
      handleSizeChange,
      handleCurrentChange,
      defaultPage,
      updatePageValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.basic-table {
  :deep .el-table__header,
  :deep .el-table__body {
    font-size: 10px !important;

    .el-table__cell {
      padding: 8px 0;
    }

    .cell {
      line-height: 20px;
      font-size: 12px;

      .el-button {
        font-size: 10px;
      }
    }

    th {
      word-break: break-word;
      color: rgba(0, 0, 0, 0.85);
      background-color: #fafafa;
    }
  }
}
.basic-table__pagination {
  position: relative;
  padding: 25px 0 20px 20px;
  text-align: right;
  :deep .el-pagination {
    display: inline-block;
  }
}
</style>
