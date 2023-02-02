<template>
  <basic-container class="flexlayout">
    <!-- 左侧拖拽列表 -->
    <div class="component-list">
      <span>以下组件拖拽到右侧</span>
      <Vuedraggable
        v-model="componentList"
        @start="isDrag = true"
        @end="isDrag = false"
        :group="leftGroupOptions"
        :clone="cloneData"
        item-key="_vid_left"
      >
        <template #item="{ element }">
          <div class="component-item">
            {{ element.name }}
          </div>
        </template>
      </Vuedraggable>
    </div>
    <!-- 右侧拖拽区域 -->
    <div class="component-editor">
      <Vuedraggable
        v-model="cloneComponents"
        :group="rightGroupOptions"
        class="component-editor-drag"
        item-key="_vid_right"
      >
        <template #item="{ element, index }">
          <div
            @click.stop="checkElement(element)"
            @contextmenu.stop.prevent="onContextmenuBlock($event, element)"
            class="component-item"
            :class="{ isActive: element.isActive }"
          >
            <component
              v-bind="element"
              :is="element.componentName"
              v-model="element.value"
            ></component>
            <div class="component-item-action-bar" v-show="element.isActive">
              <span
                class="el-icon-delete"
                @click.stop="deleteElement(index)"
              ></span>
            </div>
          </div>
        </template>
      </Vuedraggable>
    </div>
  </basic-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import BasicContainer from "@/components/basic-container/index.vue";
import Vuedraggable from "vuedraggable";
import { deepClone } from "@/utils/index";
import { Component, DraggableGroupOption } from "@/type/component";

export default defineComponent({
  components: {
    BasicContainer,
    Vuedraggable,
  },
  setup() {
    // state
    const componentList: Ref<Component[]> = ref([
      {
        name: "Input输入框",
        componentName: "ElInput",
        value: "",
        placeholder: "请输入",
        isActive: false, // 是否选中
      },
      {
        name: "进度条",
        componentName: "ElProgress",
        value: "",
        strokeWidth: 20,
        percentage: 70,
        isActive: false,
      },
      {
        name: "Rate评分",
        componentName: "ElRate",
        value: 2,
        isActive: false,
      },
    ]);
    const isDrag = ref(false);
    const cloneComponents: Ref<Component[]> = ref([]);
    // 左侧拖拽区域group配置
    const leftGroupOptions: Ref<DraggableGroupOption> = ref({
      name: "component",
      pull: "clone",
      put: false,
    });
    const rightGroupOptions: Ref<DraggableGroupOption> = ref({
      name: "component",
      pull: false,
      put: true,
    });
    // methods
    /**
     * 防止数据污染，克隆拉取的数据
     * @param origin
     */
    const cloneData = (origin: Component) => {
      let data = deepClone(origin);
      // 随机生成一个id
      data.vid = `_vid_right_${new Date().getTime()}`;
      console.log('复制出来', data)
      return data;
    };
    /**
     * 选择组件
     * @param element
     */
    const checkElement = (element: Component) => {
      cloneComponents.value = cloneComponents.value.map((item: Component) => {
        item.isActive = item.vid === element.vid;
        return item;
      });
    };
    /**
     * 删除组件
     */
    const deleteElement = (index: number) => {
      cloneComponents.value.splice(index, 1);
    };
    /**
     * 监听组件右击事件
     */
    const onContextmenuBlock = (e: MouseEvent, element: Component) => {
      console.log(e, element)
    };
    return {
      componentList,
      isDrag,
      cloneComponents,
      leftGroupOptions,
      rightGroupOptions,
      cloneData,
      checkElement,
      deleteElement,
      onContextmenuBlock
    };
  },
});
</script>

<style lang="scss" scoped>
.component-list {
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  & span {
    margin-bottom: 10px;
    display: inline-block;
    color: #409eff;
  }
  .component-item {
    padding: 6px 12px;
    margin: 0px 10px 0px 10px;
    border: solid 1px #eee;
    background-color: #f1f1f1;
    margin-bottom: 10px;
    &:hover {
      //   background-color: #fdfdfd;
      cursor: move;
    }
  }
}
.component-editor {
  width: 375px;
  height: 667px;
  overflow: hidden auto;
  background: #f1f1f1;
  border-radius: 5px;
  box-sizing: border-box;
  background-clip: content-box;
  contain: layout;
  margin-left: 20px;
  &-drag {
    height: 100%;
    & .component-item {
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      &.isActive {
        outline: 2px solid #006eff;
        outline-offset: -2px;
      }
      &-action-bar {
        background-color: white;
        border: 1px solid #dedede;
        position: absolute;
        top: 0;
        right: 0;
        & span {
          cursor: pointer;
        }
      }
    }
  }
  // zoom: 0.8;
}
</style>
