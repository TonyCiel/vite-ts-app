<template>
  <div>
    <el-table class="basic-table" @selection-change="handleSelectionChange" :row-key="options.rowKey" maxHeight="400"
      :border="options.border" :data="tableData">
      <el-table-column align="center" v-if="options.selection" type="selection" width="55" />
      <el-table-column v-for="item in options.column" :prop="item.prop" :key="item.prop" :label="item.label"
        :width="item.width" :align="options.align">
        <template #default="scope" v-if="item.slot">
          <slot :name="item.prop" v-bind="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" v-if="!options.operationHide">
        <template #default="scope">
          <slot name="operation" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
export default defineComponent({
  props: {
    tableData: Array,
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const handleSelectionChange = (val) => {
      emit("selectChange", val);
    };
    return {
      handleSelectionChange,
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
</style>