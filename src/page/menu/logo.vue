<template>
  <header class="ciel-logo">
    <span class="ciel-logo--title">{{ title }}</span>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "管理平台",
    },
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
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%);
  user-select: none; 
  .ciel-logo--title {
      padding-left: 30px;
  }
}
</style>