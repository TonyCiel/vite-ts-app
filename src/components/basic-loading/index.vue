<template>
  <div class="basic-loading" @click="hideLoading">
    <div class="basic-loading-warp">
      <i class="el-icon-loading"></i>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useBasicLoading from "@/hooks/useBasicLoading";

export default defineComponent({
  props: {
    text: {
      type: String,
      default: "加载中...",
    },
  },
  setup() {
    const basicLoading = useBasicLoading();
    const hideLoading = () => {
      basicLoading.hideLoading();
    };
    return {
      hideLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.basic-loading {
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  &-warp {
    text-align: center;
    & i {
      color: white;
      font-size: 30px;
    }
    & p {
      color: white;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
