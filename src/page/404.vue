<template>
  <div class="error-page">
    <div class="img"></div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <div class="actions">
        <router-link :to="{path: homePage}">
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {homePage} from '../../env'
export default defineComponent({
  setup() {
    return {
      homePage
    }
  }
})
</script>

<style lang="scss" scoped>
.error-page {
  background: #f0f2f5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-right: 80px;
    height: 360px;
    width: 100%;
    max-width: 430px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    background-image: url('../assets/404.svg');
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
