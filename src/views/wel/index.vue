<template>
  <div class="wel">
    <basic-container class="flexlayout wel-header flexlayout_middle">
      <div class="wel-avatar">
        <img class="wel-avatar__img" src="../../assets/user.png" />
      </div>
      <div class="wel-tip flexitem_auto">
        <p class="wel-tip__title">
          Hello {{ userInfo.userName || "xxx" }}，祝你开心每一天！
        </p>
        <p class="wel-tip__subtitle">
          这是使用Node、Vue3.0、ElementPlus、Typescript 完成的管理平台
        </p>
      </div>
      <div class="wel-github">
        <p class="wel-github__title">
          <el-tooltip
            class="item"
            effect="dark"
            content="Fork me on Github"
            placement="left"
          >
            <img @click="goGithub" width="100" src="../../assets/github.png" />
          </el-tooltip>
        </p>
      </div>
    </basic-container>
    <!-- 统计 -->
    <statistics></statistics>
    <line-chart></line-chart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import BasicContainer from "../../components/basic-container/index.vue";
import Statistics from "./components/Statistics.vue";
import LineChart from "./components/LineChart.vue";
import useBasicHook from '../../hooks/basic';
export default defineComponent({
  components: {
    BasicContainer,
    Statistics,
    LineChart,
  },
  setup() {
    const {store} = useBasicHook();
    // 用户信息
    const userInfo = computed(() => {
      return store.getters.userInfo;
    });
    const goGithub = () => {
        window.open('https://github.com/TonyCiel/vite-ts-app');
    }
    return {
      userInfo,
      goGithub
    };
  },
});
</script>

<style lang="scss" scoped>
.wel-avatar__img {
  margin: 0 8px 0 5px;
  padding: 2px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 1px solid #eee;
  vertical-align: middle;
  background-color: white;
}
.wel-tip,
.wel-github {
  margin-left: 20px;
  & p {
    margin: 0;
  }
  .wel-tip__title {
    font-size: 22px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 30px;
    margin-bottom: 10px;
  }
  .wel-tip__subtitle {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}
.wel-github {
  margin-right: 20px;
  .wel-github__title {
    cursor: pointer;
    &a {
      display: block;
    }
  }
}
</style>