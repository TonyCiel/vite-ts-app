<template>
  <basic-container>
    <basic-table
      :loading="isLoading"
      :options="tableOptions"
      :table-data="tableData"
      v-model:page="pageOptions"
      @on-load="initTableData"
      @search-change="initTableData"
    >
      <template v-slot:operation>
        <el-button type="text">删除</el-button>
      </template>
      <template v-slot:menuRight>
        <el-button
          type="primary"
          size="small"
          @click="showLoading('加载哈哈哈...')"
          >自定义按钮</el-button
        >
      </template>
    </basic-table>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref , watch} from "vue";
import { getTableData } from "@/api/component/index";
import BasicTable from "@/components/basic-table/index.vue";
import BasicContainer from "@/components/basic-container/index.vue";
import useBasicLoading from "@/hooks/useBasicLoading";
import {
  SearchFormSizeEnum,
  TableInputTypeEnum,
  BasicTableOption,
  BasicTablePageSize,
} from "@/components/basic-table/index";
export default defineComponent({
  components: {
    BasicTable,
    BasicContainer,
  },
  setup() {
    const { showLoading } = useBasicLoading();
    onMounted(() => {
      initTableData();
    });
    // state
    const isLoading = ref(false);
    const tableData = ref([]);
    const pageOptions: Ref<BasicTablePageSize> = ref({
      pageSize: 10,
      total: 0,
      currentPage: 1,
      pageSizes: [10, 20, 30, 40, 50],
      layout: "sizes, prev, pager, next",
    });
    const tableOptions: Ref<BasicTableOption> = ref({
      border: true,
      selection: false,
      searchFormSize: SearchFormSizeEnum.SMALL,
      column: [
        {
          label: "ID",
          prop: "spuId",
          search: true,
          type: TableInputTypeEnum.TEXT,
          placeholder: "请输入ID",
          width: 200,
          sortable: true,
        },
        {
          label: "商品名称",
          prop: "spuTitle",
          search: true,
          placeholder: "请输入商品名称",
          width: 200,
        },
        {
          label: "划线价",
          prop: "linePrice",
        },
        {
          label: "最低价",
          prop: "minPrice",
        },
        {
          label: "最高价",
          prop: "maxPrice",
        },
        {
          label: "搜索时间",
          prop: "date",
          type: TableInputTypeEnum.DATETIME,
          placeholder: "请选择时间",
          search: true,
          valueFormat: "YYYY-MM-DD hh:mm:ss",
          format: "YYYY/MM/DD hh:mm:ss",
          width: 200,
        },
        {
          // slot: true,
          label: "支付方式",
          prop: "payMethod",
          search: true,
          type: TableInputTypeEnum.SELECT,
          placeholder: "请选择支付方式",
          filterable: true,
          dicData: [
            {
              label: "微信支付",
              value: 1,
            },
            {
              label: "支付宝支付",
              value: 2,
            },
            {
              label: "现金支付",
              value: 3,
            },
          ],
        },
      ],
    });
    // methods
    const initTableData = async (query?: any) => {
      console.log("查询参数", query);
      isLoading.value = true;
      const { data } = await getTableData();
      console.log("data", data);
      let records = data instanceof Array ? data : data.data;
      tableData.value = records;
      isLoading.value = false;
      pageOptions.value.total = records.length;
    };
    return {
      initTableData,
      tableOptions,
      tableData,
      isLoading,
      pageOptions,
      showLoading,
    };
  },
});
</script>
