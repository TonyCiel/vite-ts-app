<template>
  <header
    class="ciel-header flexlayout flexlayout_middle"
    :class="{ 'ciel-header--collapse': isCollapse }"
  >
    <div class="ciel-header__collapse flexlayout flexlayout_middle">
      <i
        :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="setCollapse"
      ></i>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: homePage }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in nowPageRouteName" :key="item">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <p>主页</p> -->
    </div>
    <div class="ciel-header__search">
      <el-autocomplete
        v-model="searchKeyword"
        :fetch-suggestions="querySearch"
        @select="onSelectPath"
        placeholder="请输入您想搜索的内容"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
        <template #default="{ item }">
          <div class="value">{{ item.name }}</div>
          <span class="link">{{ item.path }}</span>
        </template>
      </el-autocomplete>
    </div>
    <div class="ciel-header__quanping">
      <el-tooltip
        class="item"
        effect="dark"
        :content="!isFullscreen ? '全屏' : '退出全屏'"
        placement="bottom-start"
      >
        <i class="iconfont" @click="handleScreen" v-if="!isFullscreen"
          >&#xe8fa;</i
        >
        <i class="iconfont" v-else @click="handleScreen">&#xe8fb;</i>
      </el-tooltip>
    </div>
    <div class="ciel-header__user">
      <img class="top-bar__img" src="../../assets/user.png" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.userName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  onUnmounted,
  inject,
} from "vue";
import { Search } from "@element-plus/icons";
import { ElMessageBox, ElNotification } from "element-plus";
import screenfull from "screenfull";
import { clearStore } from "../../utils/store";
import { homePage } from "../../../env.js";
import { deepClone } from "../../utils/index";
import useBasicHook from '../../hooks/basic';
export default defineComponent({
  components: { Search },
  setup() {
    const state = reactive({
      searchKeyword: "",
      isFullscreen: false, // 是否全屏
    });
    const {store,route,router} = useBasicHook();
    // 用户信息
    const userInfo = computed(() => {
      return store.getters.userInfo;
    });
    // 获取所有菜单
    const menus = computed(() => {
      return store.getters.allMenu;
    });
    // 搜索栏菜单选择
    const searchMenuList = computed(() => {
      let list = deepClone(store.getters.allMenu);
      list = list.filter((item) => {
        return item.parentId != String(-1);
      });
      return list;
    });
    // 顶部导航搜索
    const querySearch = (keyword: string, cb) => {
      const results = keyword
        ? searchMenuList.value.filter(filterRoutePath(keyword))
        : searchMenuList.value;
      cb(results);
    };
    // 过滤菜单
    const filterRoutePath = (queryString) => {
      return (menu) => {
        return menu.name.indexOf(queryString) > -1;
      };
    };
    // 跳转路由
    const onSelectPath = (item) => {
      router.push({ path: item.path });
    };
    // 退出登录
    const logout = () => {
      ElMessageBox.confirm("退出系统, 是否继续?").then(() => {
        clearStore("token", "session");
        clearStore("menu");
        clearStore("tagList");
        clearStore("userInfo");
        store.commit("SET_MENULIST", []);
        store.commit("SET_MENUALL", []);
        store.commit("SET_TAGS_NULL", []);
        router.push({ path: "/login" });
      });
    };
    const handleScreen = () => {
      if (!screenfull.isEnabled) {
        ElNotification({
          message: "浏览器不支持全屏",
          type: "warning",
        });
      } else {
        screenfull.toggle();
        state.isFullscreen = !state.isFullscreen;
      }
    };
    const change = () => {
      if (screenfull.isEnabled) {
        console.log("screenfull.isFullscreen", screenfull.isFullscreen);
        state.isFullscreen = screenfull.isFullscreen;
      }
    };
    // 面包屑内容
    const nowPageRouteName = computed(() => {
      let parent = menus.value.filter((item) => {
        return item.path === route.path || `${item.path}/index` === route.path;
      });
      console.log("面包屑", parent);
      return parent.length ? parent[0].parentNames : [];
    });
    // 设置菜单的collapse
    const setCollapse = () => {
      let collapse: boolean = store.getters.collapse;
      store.commit("SET_COLLAPSE", !collapse);
    };
    const isCollapse = inject("isCollapse");
    onMounted(() => screenfull.isEnabled && screenfull.on("change", change));
    onUnmounted(() => screenfull.isEnabled && screenfull.off("change", change));
    return {
      ...toRefs(state),
      filterRoutePath,
      querySearch,
      onSelectPath,
      logout,
      handleScreen,
      nowPageRouteName,
      setCollapse,
      isCollapse,
      homePage,
      userInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.ciel-header {
  padding: 0 20px;
  position: fixed;
  left: 240px;
  top: 0;
  box-sizing: content-box;
  width: calc(100vw - 240px);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%);
  background-color: white;
  transition: all 0.4s;
  z-index: 99;
  background-color: #409eff;
  color: white;
  &.ciel-header--collapse {
    left: 65px;
    width: calc(100vw - 65px);
  }
  .ciel-header__search {
    flex: 1;
    :deep .el-input__inner {
      border: none;
      width: 400px !important;
      background: transparent;
      &::placeholder {
        color: white!important;
      }
      :deep .el-input__prefix {
        color: white;
      }
    }
  }
  .ciel-header__collapse {
    height: 64px;
    line-height: 64px;
    flex: 1;
    .el-breadcrumb {
      margin-left: 20px;
      :deep .el-breadcrumb__inner {
        color: white !important;
      }
    }
    i {
      font-size: 30px;
      cursor: pointer;
    }
    p {
      margin-left: 20px;
      color: #606266;
    }
  }
  .ciel-header__user {
    padding-right: 50px;
    .el-dropdown {
      .el-dropdown-link {
        color: white;
      }
    }
    .top-bar__img {
      margin: 0 8px 0 5px;
      padding: 2px;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      box-sizing: border-box;
      border: 1px solid #eee;
      vertical-align: middle;
      background-color: white;
    }
  }
  .ciel-header__quanping {
    cursor: pointer;
    margin-right: 24px;
  }
}
</style>