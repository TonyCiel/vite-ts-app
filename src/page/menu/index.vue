<template>
  <div class="ciel-menu">
    <el-scrollbar style="height: 100%; width: 240px">
      <logo></logo>
      <el-menu
        background-color="#409eff"
        text-color="#e5e5e5"
        active-text-color="white"
        :collapse="false"
      >
        <menu-item
          v-for="item in menuList"
          :key="item.path"
          :index="item.path"
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
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import logo from "./logo.vue";
import MenuItem from "./menuItem.vue";
export default defineComponent({
  components: {
    logo,
    MenuItem,
  },
  setup() {
    const store = useStore();
    const menuList = computed(() => {
      return store.state.menu.menuList;
    });
    const state = reactive({
      menuProp: {
        label: "name",
        path: "path",
        icon: "icon",
        children: "children",
      },
    });
    // console.log
    return {
      ...toRefs(state),
      menuList,
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
  background-color: #409eff;
  left: 0;
  top: 0;
  transition: width 0.2s;
  box-sizing: border-box;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  .el-menu {
    border-right: 0;
    :deep .el-menu-item,
    :deep .el-sub-menu {
      i {
        color: #e5e5e5;
      }
      .el-menu-item {
        &.is-active {
          background-color: white !important;
          color: #409eff !important;
          i {
            color: #409eff;
          }
        }
      }
    }
    :deep .el-menu-item {
      &.is-active {
          background-color: white !important;
          color: #409eff !important;
          i {
            color: #409eff;
          }
        }
    }
  }
}
</style>
