<template>
  <div class="ciel-nav" :class="{ 'ciel-nav--collapse': isCollapse }">
    <el-tabs
      @tab-click="handleClickTab"
      v-model="tabValue"
      type="card"
      :closable="true"
      @tab-remove="removeTab"
    >
      <el-tab-pane :key="homePage" label="首页" :name="homePage"> </el-tab-pane>
      <el-tab-pane
        v-for="item in tagList"
        :key="item.fullPath"
        :label="item.name"
        :name="item.fullPath"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch,inject } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { homePage } from "../../../env";
export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const tabValue = ref(); // 选中的tab
    tabValue.value = route.fullPath;
    const tagList = computed(() => {
      return store.getters.tagList;
    });
    const isCollapse = inject('isCollapse')
    // 监听路由变化
    watch(
      () => route.fullPath,
      (val) => {
        tabValue.value = val;
      }
    );
    const removeTab = (target) => {
      store.commit("REMOVE_TAG", target);
      if (target === tabValue.value) {
        tabValue.value = homePage;
        router.push({ path: homePage });
      }
      console.log("target", target);
    };
    const handleClickTab = () => {
      let tags = tagList.value.filter((item) => {
        return item.fullPath === tabValue.value;
      });
      router.push({
        path: tags.length ? tags[0].path : homePage,
        query: tags.length ? tags[0].query : {},
      });
    };
    return {
      tagList,
      isCollapse,
      tabValue,
      removeTab,
      homePage,
      handleClickTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.ciel-nav {
  //   padding: 0 10px;
  box-sizing: border-box;
  user-select: none;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 1px solid #f6f6f6;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  white-space: nowrap;
  position: fixed;
  top: 64px;
  left: 240px;
  width: calc(100vw - 240px);
  transition: all 0.4s;
  &.ciel-nav--collapse {
    left: 65px;
    width: calc(100vw - 65px);
  }
  :deep .el-tabs {
    &__header {
      margin-bottom: 0px;
      .el-tabs__item {
        border: none;
        font-weight: normal;
        &:first-child {
          &:hover {
            padding-left: 20px;
          }
          .el-icon-close {
            display: none;
          }
        }
      }
      .el-tabs__nav {
        border: none;
      }
    }
  }
}
</style>