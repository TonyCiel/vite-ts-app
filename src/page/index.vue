<template>
  <div class="ciel-page" :class="{ 'ciel-page--collapse': isCollapse }">
    <!-- 菜单栏 -->
    <cielMenu></cielMenu>
    <cielTop></cielTop>
    <cielTags></cielTags>
    <div class="ciel-page-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, onMounted } from "vue";
import cielMenu from "./menu/index.vue";
import cielTop from "./top/index.vue";
import cielTags from "./tags/index.vue";
import useBasicHook from '../hooks/basic';
import { getRoutes } from '../router/views'
import routeObj from '../router/index'
export default defineComponent({
  // provide: [isCollapse]
  components: {
    cielMenu,
    cielTop,
    cielTags,
  },
  setup() {
    const { store } = useBasicHook();
    const isCollapse = computed(() => {
      return store.getters.collapse;
    });
    // 更新动态路由
    const updateRouters = () => {
      let menu = getRoutes(store.getters.menuList);
      for (let i = 0; i < menu.length; i++) {
        let name = menu[i].name || "";
        if (!routeObj.hasRoute(name)) {
          routeObj.addRoute(menu[i]);
        }
      }
    };
    onMounted(() => {
      store.dispatch("GetMenuList").then(() => {
        updateRouters();
      });
    })
    const privide = provide("isCollapse", isCollapse);
    return {
      isCollapse,
      privide,
      updateRouters,
    };
  },
});
</script>

<style lang="scss" scoped>
.ciel-page {
  position: absolute;
  left: 240px;
  width: calc(100vw - 240px);
  top: 64px;
  transition: all 0.4s;
  &.ciel-page--collapse {
    width: calc(100vw - 65px);
    left: 65px;
  }
  .ciel-page-content {
    height: calc(100vh - 42px - 64px);
    padding-top: 42px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #f0f2f5;
  }
}
</style>