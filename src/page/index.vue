<template>
  <div class="ciel-page">
    <!-- 菜单栏 -->
    <cielMenu></cielMenu>
    <cielTop></cielTop>
    <div class="ciel-page-content">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cielMenu from "./menu/index.vue";
import cielTop from "./top/index.vue";
export default defineComponent({
  components: {
    cielMenu,
    cielTop
  },
  setup() {
    return {
    }
  }
});
</script>

<style lang="scss" scoped>
.ciel-page {
    position: absolute;
    right: 0;
    width: calc(100vw - 240px);
    top: 64px;
}
</style>