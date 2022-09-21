<template>
  <div class="context-menu" v-if="show" :style="{left:contentmenuX+'px',top:contentmenuY+'px'}">
    <div class="item" @click="clearCacheTags">清除缓存
    </div>
    <div class="item" @click="closeOthersTags">关闭其他
    </div>
    <div class="item" @click="closeAllTags">关闭所有
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import useBasicHook from '../../hooks/basic';
import { homePage } from "../../../env";
export default defineComponent({
  name: 'ContextMenu',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    contentmenuX: {
      type: [Number, String],
      default: ''
    },
    contentmenuY: {
      type: [Number, String],
      default: ''
    }
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    const { store, router, route } = useBasicHook();
    // methods
    /**
     * 清除缓存
     */
    const clearCacheTags = () => {
      ElMessageBox.confirm("是否需要清除缓存?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.clear();
        emit("update:show", false);
        ElMessage.success('清除完毕');
      });
    };
    /**
     * 关闭其他标签
     */
    const closeOthersTags = () => {
      store.commit("DEL_OTHER_TAG", route.fullPath);
      emit("update:show", false);
    };
    /**
     * 关闭所有标签
     */
    const closeAllTags = () => {
      store.commit("DEL_ALL_TAG");
      router.push({ path: homePage });
      emit("update:show", false);
    };
    return {
      clearCacheTags,
      closeOthersTags,
      closeAllTags,
    }
  },
})
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  width: 120px;
  background-color: #fff;
  z-index: 1024;
  border-radius: 5px;
  box-shadow: 1px 2px 10px #ccc;

  .item {
    cursor: pointer;
    font-size: 14px;
    padding: 8px 20px 8px 15px;
    color: #606266;

    &:first-child {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &:hover {
      background-color: #409EFF;
      color: #fff;
    }
  }
}
</style>