<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length > 0"
    :key="menu.path"
    :index="menu.path"
  >
    <template #title>
      <i :class="menu.icon || 'el-icon-location'" />
      <span>{{ menu.name }}</span>
    </template>
    <el-menu-item-group>
      <menuItem
        :parent="parent"
        v-for="item in menu.children"
        :key="item.path"
        :index="item.path"
        :menu="item"
      />
    </el-menu-item-group>
  </el-sub-menu>

  <el-menu-item v-else :key="menu.path" :index="menu.path">
    <i :class="menu.icon || 'el-icon-setting'" />
    <template #title>
      {{ menu.name }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    return {
    };
  },
});
</script>