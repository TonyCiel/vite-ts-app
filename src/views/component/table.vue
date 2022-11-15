<template>
  <basic-container>
    <basic-table
      :loading="isLoading"
      :options="tableOptions"
      :table-data="tableData"
      v-model:page="pageOptions"
      @on-load="initTableData"
    >
      <!-- <template v-slot:payMethod>
11111
    </template> -->
    </basic-table>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { getTableData } from "@/api/component/index";
import BasicTable from "@/components/basic-table/index.vue";
import BasicContainer from "@/components/basic-container/index.vue";
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
      layout: 'sizes, prev, pager, next'
    });
    const tableOptions: Ref<BasicTableOption> = ref({
      border: true,
      selection: false,
      searchFormSize: SearchFormSizeEnum.SMALL,
      operationHide: true,
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
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          format: 'yyyy/MM/dd HH:mm:ss'
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
    const initTableData = () => {
      isLoading.value = true;
      console.log('aaaaa',pageOptions.value)
      setTimeout(async () => {
        const {
          data: { data },
        } = await getTableData();
        tableData.value = data;
        isLoading.value = false;
        pageOptions.value.total = 900
        console.log("res", data);
      }, 2000);
    };
    return {
      initTableData,
      tableOptions,
      tableData,
      isLoading,
      pageOptions,
    };
  },
});
</script>
