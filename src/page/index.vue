<template>
  <div class="ciel-page" :class="{ 'ciel-page--collapse': isCollapse }">
    <!-- 菜单栏 -->
    <cielMenu></cielMenu>
    <cielTop></cielTop>
    <cielTags></cielTags>
    <div class="ciel-page-content">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, onMounted } from "vue";
import cielMenu from "./menu/index.vue";
import cielTop from "./top/index.vue";
import cielTags from "./tags/index.vue";
import { useStore } from "vuex";
import { getRoutes } from '../router/views'
import route from '../router/index'
export default defineComponent({
  // provide: [isCollapse]
  components: {
    cielMenu,
    cielTop,
    cielTags,
  },
  setup() {
    const store = useStore();
    const isCollapse = computed(() => {
      return store.getters.collapse;
    });
    // 更新动态路由
    const updateRouters = () => {
      let menu = getRoutes(store.getters.menuList);
      // console.log('routes',menu)
      // console.log('更新；',menu)
      for (let i = 0; i < menu.length; i++) {
        let name = menu[i].name || "";
        if (!route.hasRoute(name)) {
          route.addRoute(menu[i]);
        }
      }
      // console.log('routes',route.getRoutes())
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