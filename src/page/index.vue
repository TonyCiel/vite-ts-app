<template>
  <div class="ciel-page">
    <!-- 菜单栏 -->
    <cielMenu></cielMenu>
    <div class="ciel-page-content">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent } from "vue";
import cielMenu from "./menu/index.vue";
export default defineComponent({
  components: {
    cielMenu,
  },
  setup() {
    const store = useStore();
    const reqRouteMenu = () => {
      store.dispatch('GetMenuList');
    }
    reqRouteMenu();
    return {
      reqRouteMenu
    }
  }
});
</script>

<style lang="scss" scoped>
.ciel-page {
    position: absolute;
    right: 0;
    width: calc(100vw - 300px);
    top: 0;
}
</style>