<template>
  <header class="ciel-header flexlayout flexlayout_middle" :class="{'ciel-header--collapse': isCollapse}">
    <div class="ciel-header__collapse flexlayout flexlayout_middle">
      <i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="setCollapse"></i>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: homePage }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item) in nowPageRouteName" :key="item" >{{item}}</el-breadcrumb-item>
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
          <span class="link">{{ item.fullPath }}</span>
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
      <img class="top-bar__img" src="../../assets/logo.svg" />
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
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
} from "vue";
import { Search } from "@element-plus/icons";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";
import { ElMessageBox, ElNotification } from "element-plus";
import screenfull from "screenfull";
import {clearStore} from "../../utils/store";
import {homePage} from '../../../env.js'
export default defineComponent({
  components: { Search },
  setup() {
    const state = reactive({
      searchKeyword: "",
      isFullscreen: false, // 是否全屏
    });
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // 获取所有菜单
    const menus = computed(() => {
      return store.getters.allMenu;
    });
    // 顶部导航搜索
    const querySearch = (keyword: string, cb) => {
      const results = keyword
        ? menus.value.filter(filterRoutePath(keyword))
        : menus.value;
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
      router.push({ path: item.fullPath });
    };
    // 退出登录
    const logout = () => {
      ElMessageBox.confirm("退出系统, 是否继续?").then(() => {
        clearStore("token","session")
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
      let parent = menus.value.filter(item => {
        return item.fullPath === route.path
      });
      let name:Array<string> = [];
      if(parent.length)  {
        name.push(parent[0].parentName || parent[0].name);
        parent[0].parentName ? name.push(parent[0].name) : '';
      }
      return name
    });
    // 设置菜单的collapse
    const setCollapse = () => {
      let collapse:boolean = store.getters.collapse;
      store.commit("SET_COLLAPSE", !collapse);
    }
    const isCollapse = computed(() => {
      return store.getters.collapse
    })
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
      homePage
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
  transition: all .4s;
  z-index: 99;
  &.ciel-header--collapse {
    left: 65px;
    width: calc(100vw - 65px);
  }
  .ciel-header__search {
    flex: 1;
    :deep .el-input__inner {
      border: none;
      width: 400px !important;
    }
  }
  .ciel-header__collapse {
    height: 64px;
    line-height: 64px;
    flex: 1;
    .el-breadcrumb {
      margin-left: 20px ;
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
    .top-bar__img {
      margin: 0 8px 0 5px;
      padding: 2px;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      box-sizing: border-box;
      border: 1px solid #eee;
      vertical-align: middle;
    }
  }
  .ciel-header__quanping {
    cursor: pointer;
    margin-right: 24px;
  }
}
</style>