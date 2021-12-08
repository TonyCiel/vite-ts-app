<template>
  <header class="ciel-logo" :class="{'ciel-logo--collapse' : isCollapse}">
    <span class="ciel-logo--title" v-show="!isCollapse">{{ title }}</span>
  </header>
</template>

<script lang="ts">
import { defineComponent,inject } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "CielAdmin管理平台",
    },
  },
  setup() {
    const isCollapse = inject('isCollapse')
    return {
      isCollapse
    }
  }
});
</script>

<style lang="scss" scoped>
@import "/@/styles/common.scss";
.ciel-logo {
  @include bgCss(6%, 30px);
  width: 240px;
  height: 64px;
  line-height: 64px;
  padding-left: 8%;
  background-image: url(/@/assets/logo.svg);
  font-size: 20px;
  color: white;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  user-select: none; 
  transition: all .4s;
  &.ciel-logo--collapse {
    width: 56px;
    background-position: center;
  }
  .ciel-logo--title {
      padding-left: 30px;
  }
}
</style>