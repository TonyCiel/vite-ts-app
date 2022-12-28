<template>
  <el-form :inline="true" :size="tableOptions.searchFormSize">
    <el-form-item
      v-for="(column, index) in searchColumns"
      :key="index"
      :label="`${column.label}: `"
    >
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
      <template v-else>
        <component
          v-bind="column"
          :is="getComponetName(column)"
          v-model="column.value"
          v-on:keyup.enter="enterChange"
        ></component>
      </template>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="search"
        :loading="!isFristInit && loading"
        >查询</el-button
      >
      <el-button
        icon="el-icon-delete"
        @click="reset"
        :loading="!isFristInit && loading"
        >清空</el-button
      >
    </el-form-item>
    
    <!-- 自定义按钮 -->
    <el-form-item>
      <slot name="menuRight"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, unref, ref } from "vue";
import {
  BasicTableOption,
  BasicTableColmn,
  TableInputTypeEnum,
} from "../index";
const KEY_COMPONENT_NAME = "el";
export default defineComponent({
  name: "HeaderSearch",
  props: {
    // 加载loading
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    // state
    const tableOptions = inject("options") as Ref<BasicTableOption>;
    const optionColumns: Array<BasicTableColmn> = (
      unref(tableOptions) ? unref(tableOptions).column : []
    ).map((item) => {
      return item;
    });
    // 表格字段配置
    const searchColumns: Ref<BasicTableColmn[]> = ref(
      optionColumns.filter((item) => {
        item.value = "";
        return item.search;
      })
    );
    const isFristInit: Ref<Boolean> = ref(true);
    // methods
    /**
     * 查询按钮
     */
    const search = () => {
      isFristInit.value = false;
      let query = {};
      searchColumns.value.forEach((item) => {
        query[item.prop] = item.value;
      });
      emit("search-change", query);
    };
    /**
     * 重置搜索按钮
     */
    const reset = () => {
      let query = {};
      searchColumns.value.forEach((item) => {
        item.value = "";
      });
      emit("search-change", {});
    };
    /**
     * 动态获取组件名称
     * @param column
     */
    const getComponetName = (column: BasicTableColmn) => {
      if (!column.type || column.type === TableInputTypeEnum.TEXT) {
        return "ElInput";
      }
      if (
        column.type === TableInputTypeEnum.DATETIME ||
        column.type === TableInputTypeEnum.DATETIMERANGE
      ) {
        return "ElDatePicker";
      }
      return `${KEY_COMPONENT_NAME}-${column.type}`;
    };
    /**
     * 回车操作
     */
    const enterChange = () => {
      search();
    };
    return {
      searchColumns,
      tableOptions,
      TableInputTypeEnum,
      search,
      reset,
      getComponetName,
      enterChange,
      isFristInit,
    };
  },
});
</script>
