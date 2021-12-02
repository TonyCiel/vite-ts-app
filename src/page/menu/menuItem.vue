<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length > 0"
    :key="menu.fullPath"
    :index="menu.fullPath"
  >
    <template #title>
      <i :class="menu.icon || 'el-icon-location'" />
      <span>{{ menu.name }}</span>
    </template>
    <el-menu-item-group>
      <menuItem
        :parent="parent"
        v-for="item in menu.children"
        :key="item.fullPath"
        :index="item.fullPath"
        :menu="item"
      />
    </el-menu-item-group>
  </el-sub-menu>

  <el-menu-item v-else :key="menu.fullPath" :index="menu.fullPath">
    <i :class="menu.icon || 'el-icon-setting'" />
    <template #title>
      {{ menu.name }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "menuItem",
  props: {
    menu: {
      type: Object,
      default: () => {
        return {};
      },
    },
    parent: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter(); // 路由
    const open = (menu) => {
      let parentPath = props.parent.path;
      let path = menu.path;
      if (parentPath === path) {
        path = `${path}/index`;
      } else {
          path = `${parentPath}${path}`;
      }
      console.log('path',path)
      router.push({
        path: `${path}`,
      });
    };
    return {
      open,
    };
  },
});
</script>