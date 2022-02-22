<template>
  <div  class="ciel-menu" >
    <el-scrollbar  style="height: 100%;">
      <logo></logo>
      <el-menu
        background-color="#FFFFFF"
        text-color="#333"
        active-text-color="#409eff"
        @select="onRouteChange"
        :default-active="activeRoute"
        mode="vertical"
        unique-opened
        :collapse="isCollapse"
      >
        <menu-item
          v-for="item in menuList"
          :parent="item"
          :key="`${item.path}/index`"
          :index="`${item.path}/index`"
          :menu="item"
          first
          :props="menuProp"
          :collapse="false"
        ></menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed ,inject} from "vue";
import logo from "./logo.vue";
import MenuItem from "./menuItem.vue";
import useBasicHook from '../../hooks/basic';
export default defineComponent({
  components: {
    logo,
    MenuItem,
  },
  setup() {
    const {store,route,router} = useBasicHook();
    const menuList = computed(() => {
      console.log('菜单更新value',store.getters.menuList)
      return store.getters.menuList;
    });
    const isCollapse = inject('isCollapse')
    const state = reactive({
      menuProp: {
        label: "name",
        path: "path",
        icon: "icon",
        children: "children",
      },
    });
    // 选中的路由
    const activeRoute = computed(() => {
      return route.path;
    });

    const onRouteChange = (e:any) => {
      if(activeRoute.value !== e) {
        router.push({
          path: e
        })
      }
    }
    return {
      ...toRefs(state),
      menuList,
      activeRoute,
      onRouteChange,
      isCollapse
    };
  },
});
</script>

<style lang="scss" scoped>
@import "/@/styles/common.scss";
.ciel-menu {
  user-select: none;
  position: fixed;
  height: 100vh;
  // background-color: #409eff;
  left: 0;
  top: 0;
  transition: width 0.2s;
  box-sizing: border-box;
  box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.06);
  .ciel-menu--collapse {
    width: 56px;
  }
  .el-menu {
    border-right: 0;
    :deep .el-menu-item,
    :deep .el-sub-menu {
      i {
        color: #333;
      }
      .el-menu-item {
        &.is-active {
          background-color: rgba(246, 255, 254) !important;
          color: #409eff !important;
          border-right: 3px solid #409eff;
          i {
            color: #409eff;
          }
        }
      }
    }
    :deep .el-menu-item {
      &.is-active {
          background-color: rgba(246, 255, 254) !important;
          color: #409eff !important;
          border-right: 3px solid #409eff;
          i {
            color: #409eff;
          }
        }
    }
  }
}
</style>
