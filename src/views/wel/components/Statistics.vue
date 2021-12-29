<template>
  <el-row type="flex">
    <el-col :span="12">
      <basic-container class="statics-user" title="用户统计">
        <section class="static-wrap flexlayout flexlayout_middle">
          <div
            class="static-wrap-item flexitem_auto"
            v-for="item in userList"
            :key="item.label"
          >
            <p class="static-wrap-item__title">{{ item.label }}</p>
            <p class="static-wrap-item__subtitle">{{ item.value }}</p>
          </div>
        </section>
        <!-- <basic-count-up :end="10"></basic-count-up> -->
      </basic-container>
    </el-col>
    <el-col :span="12">
      <basic-container class="statics-group" title="群统计">
        <section class="static-wrap flexlayout flexlayout_middle">
          <div
            class="static-wrap-item flexitem_auto"
            v-for="item in userList"
            :key="item.label"
          >
            <p class="static-wrap-item__title">{{ item.label }}</p>
            <p class="static-wrap-item__subtitle">{{ item.value }}</p>
          </div>
        </section>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import BasicContainer from "../../../components/basic-container/index.vue";
// import BasicCountUp from "../../../components/basic-count-up/index.vue";
export default defineComponent({
  components: {
    BasicContainer,
    // BasicCountUp
  },
  setup() {
    const state = reactive({
      userList: [
        {
          label: "今日新增",
          value: 223,
        },
        {
          label: "用户总数",
          value: 289,
        },
        {
          label: "今日流失",
          value: 10,
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "/@/styles/common.scss";
.statics-user,.statics-group {
    @include bgCss(right, 140px);
    background-position-y: 52px;
    background-position-x: 104%;
}
.statics-user {
    background-image: url(../../../assets/userlist.png);
}
.statics-group {
    background-image: url(../../../assets/group.png);
}
.static-wrap {
    margin-top: 10px;
    width: 80%;
  .static-wrap-item {
      position: relative;
      & p {
          margin: 0;
      }
      & ::before {
        position: absolute;
        content: '';
        width: 1px;
        height: 28px;
        background-color: #E9E9E9;
        right: 40px;
        top: 14px;
      }
    .static-wrap-item__title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
    .static-wrap-item__subtitle {
      font-size: 26px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>