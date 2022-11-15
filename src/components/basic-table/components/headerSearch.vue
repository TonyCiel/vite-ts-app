<template>
  <el-form :inline="true" :size="tableOptions.searchFormSize">
    <el-form-item
      v-for="(column, index) in searchColumns"
      :key="index"
      :label="`${column.label}: `"
    >
      <template v-if="column.type === TableInputTypeEnum.TEXT || !column.type">
        <el-input v-bind="column" v-model="column.value" />
      </template>
      <template v-if="column.type === TableInputTypeEnum.SELECT">
        <el-select v-bind="column" v-model="column.value">
          <el-option
            v-for="item in column.dicData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="column.disabled"
          />
        </el-select>
      </template>
      <template
        v-if="
          column.type === TableInputTypeEnum.DATETIME ||
          column.type === TableInputTypeEnum.DATETIMERANGE
        "
      >
        <el-date-picker
          :value-format="column.valueFormat"
          format="yyyy/MM/dd HH:mm:ss"
          v-model="column.value"
          :type="column.type"
        />
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >查询</el-button
      >
      <el-button icon="el-icon-delete" @click="reset">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, unref } from "vue";
import {
  BasicTableOption,
  BasicTableColmn,
  TableInputTypeEnum,
} from "../index";

export default defineComponent({
  name: "HeaderSearch",
  setup() {
    // state
    const tableOptions = inject("options") as Ref<BasicTableOption>;
    const searchColumns = computed((): BasicTableColmn[] => {
      const optionColumns: Array<BasicTableColmn> = (
        unref(tableOptions) ? unref(tableOptions).column : []
      ).map((item) => {
        item.value = "";
        return item;
      });
      const list: Array<BasicTableColmn> = optionColumns.filter((item) => {
        return item.search;
      });
      return list;
    });

    // methods
    /**
     * 查询按钮
     */
    const search = () => {
      let query = {};
      searchColumns.value.forEach((item) => {
        query[item.prop] = item.value;
      });
      console.log("query", query);
    };
    /**
     * 重置搜索按钮
     */
    const reset = () => {};

    return {
      searchColumns,
      tableOptions,
      TableInputTypeEnum,
      search,
      reset,
    };
  },
});
</script>
