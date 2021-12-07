<template>
  <div class="ciel-page" :class="{'ciel-page--collapse': isCollapse}">
    <!-- 菜单栏 -->
    <cielMenu></cielMenu>
    <cielTop></cielTop>
    <cielTags></cielTags>
    <div class="ciel-page-content">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from "vue";
import cielMenu from "./menu/index.vue";
import cielTop from "./top/index.vue";
import cielTags from "./tags/index.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    cielMenu,
    cielTop,
    cielTags
  },
  setup() {
    const store = useStore();
    const isCollapse = computed(() => {
      return store.getters.collapse;
    })
    return {
      isCollapse
    }
  }
});
</script>

<style lang="scss" scoped>
.ciel-page {
    position: absolute;
    left: 240px;
    width: calc(100vw - 240px);
    top: 64px;
    transition: all .4s;
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