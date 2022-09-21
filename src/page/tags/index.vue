<template>
  <div class="ciel-nav" :class="{ 'ciel-nav--collapse': isCollapse }">
    <ContextMenu :show="isShowContextMenu" :contentmenuX="contentmenuX" :contentmenuY="contentmenuY"></ContextMenu>
    <el-tabs @tab-click="handleClickTab" v-model="tabValue" type="card" :closable="true" @tab-remove="removeTab"
      @contextmenu="handleContextmenu">
      <el-tab-pane :key="homePage" label="首页" :name="homePage"> </el-tab-pane>
      <el-tab-pane v-for="item in tagList" :key="item.fullPath" :label="item.name" :name="item.fullPath">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, inject, Ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import useBasicHook from '../../hooks/basic';
import { homePage } from "../../../env";
import ContextMenu from './contextMenu.vue'
export default defineComponent({
  components: {
    ContextMenu
  },
  setup() {
    const { ctx } = getCurrentInstance() as any;
    // state
    const { store, route, router } = useBasicHook();
    const tabValue = ref(); // 选中的tab
    tabValue.value = route.fullPath;
    const tagList = computed(() => {
      return store.getters.tagList;
    });
    const isCollapse = inject('isCollapse');
    const isShowContextMenu: Ref<boolean> = ref(false);
    const contentmenuX: Ref<number | string> = ref("");
    const contentmenuY: Ref<number | string> = ref("");
    // watch
    // 监听路由变化
    watch(
      () => route.fullPath,
      (val) => {
        tabValue.value = val;
      }
    );
    watch(
      () => isShowContextMenu,
      () => {
        window.addEventListener("mousedown", watchContextmenu);
      }
    );
    // mounted
    onMounted(() => {
      window.addEventListener("mousedown", watchContextmenu);
    });
    // 销毁前
    onBeforeUnmount(() => {
      window.removeEventListener("mousedown", watchContextmenu);
    })
    // methods
    /**
     * 移除tag
     * @params target
     */
    const removeTab = (target) => {
      store.commit("REMOVE_TAG", target);
      if (target === tabValue.value) {
        tabValue.value = homePage;
        router.push({ path: homePage });
      }
      console.log("target", target);
    };
    /**
     * 点击tab
     */
    const handleClickTab = () => {
      let tags = tagList.value.filter((item) => {
        return item.fullPath === tabValue.value;
      });
      router.push({
        path: tags.length ? tags[0].path : homePage,
        query: tags.length ? tags[0].query : {},
      });
    };
    /**
     * 右击菜单
     */
    const handleContextmenu = (event: MouseEvent) => {
      let target = event.target as any;
      let flag = false;
      if (target.className.indexOf("el-tabs__item") > -1) flag = true;
      else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
        target = target.parentNode;
        flag = true;
      }
      if (flag) {
        event.preventDefault();
        event.stopPropagation();
        contentmenuX.value = event.clientX;
        contentmenuY.value = event.clientY;
        isShowContextMenu.value = true;
      }
    };
    /**
     * 监听
     */
    const watchContextmenu = (event: MouseEvent) => {
      if ((!ctx.$el.contains(event.target) || event.button !== 0)) {
        isShowContextMenu.value = false;
      }
      // window.removeEventListener("mousedown", watchContextmenu);
    };
    return {
      tagList,
      isCollapse,
      tabValue,
      removeTab,
      homePage,
      handleClickTab,
      handleContextmenu,
      isShowContextMenu,
      contentmenuX,
      contentmenuY,
      watchContextmenu
    };
  },
});
</script>

<style lang="scss" scoped>
.ciel-nav {
  //   padding: 0 10px;
  box-sizing: border-box;
  user-select: none;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 1px solid #f6f6f6;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  white-space: nowrap;
  position: fixed;
  top: 64px;
  left: 240px;
  width: calc(100vw - 240px);
  transition: all 0.4s;
  z-index: 99;

  &.ciel-nav--collapse {
    left: 65px;
    width: calc(100vw - 65px);
  }

  :deep .el-tabs {
    &__header {
      margin-bottom: 0px;

      .el-tabs__item {
        border: none;
        font-weight: normal;

        &:first-child {
          &:hover {
            padding-left: 20px;
          }

          .el-icon-close {
            display: none;
          }
        }
      }

      .el-tabs__nav {
        border: none;
      }
    }
  }
}
</style>