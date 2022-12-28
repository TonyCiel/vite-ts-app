<template>
  <basic-container>
    <div class="cart-warp">
      <div
        class="cart-item"
        v-for="(propertie, key) in allProperties"
        :key="propertie.propertyTypeName"
      >
        <div class="cart-item-title">可选 {{ propertie.propertyTypeName }}</div>
        <ul class="cart-item-content" v-if="propertie.typeNames">
          <li
            class="cart-item-content-term"
            v-for="item in propertie.typeNames"
            :key="item"
            @click.stop="checkSkuProp(item, key)"
            :class="{
              isActive: selectedSkuList.includes(item),
            }"
          >
            <el-badge
              v-if="!optionSkuList.includes(item)"
              type="warning"
              value="缺货"
              class="cart-item-content-term-badge"
            >
              {{ item }}</el-badge
            >
            <span v-if="optionSkuList.includes(item)">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
    <p v-if="currentSku">您选中了{{ currentSku }}</p>
  </basic-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, unref } from "vue";
import { getShoppingCartData } from "@/api/case/index";
import BasicContainer from "@/components/basic-container/index.vue";
import { SkuGood, SkuProp, SkuPropertyGood } from "@/type/sku";
import MultipleAdjoinMatrix from "./MultipleAdjoinMatrix";

export default defineComponent({
  components: {
    BasicContainer,
  },
  setup() {
    onMounted(() => {
      loadData();
    });
    // state
    const allProperties: Ref<SkuProp[]> = ref([]); // 商品类别
    const skuList: Ref<SkuGood[]> = ref([]); // 商品列表
    const skuPropertyList: Ref<Array<SkuPropertyGood>> = ref([]);
    const selectedSkuList: Ref<string[]> = ref([]);
    const skuAdjoinMatrix: Ref<MultipleAdjoinMatrix | null> = ref(null);
    const currentSku: Ref<SkuGood | null> = ref(null);
    // computed
    /**
     * 可选规格
     */
    const optionSkuList = computed(() => {
      return skuAdjoinMatrix.value
        ? skuAdjoinMatrix.value.getSpecscOptions(selectedSkuList.value)
        : [];
    });
    // methods
    /**
     * 加载数据
     */
    const loadData = () => {
      getShoppingCartData().then((res) => {
        let records = res.data instanceof Array ? res.data : res.data.data;
        let props = {};
        let skus: Array<SkuGood> = []; // 商品
        records.forEach((element: any) => {
          let properties = element.skuPropertyVO.properties;
          let skuPropertieNames: Array<string> = [];
          properties.forEach((skuProper: any) => {
            const { propertyTypeName, propertyName } = skuProper;
            skuPropertieNames.push(propertyName);
            if (!props[propertyTypeName]) {
              props[propertyTypeName] = {
                typeNames: [],
                types: [],
                active: "",
                propertyTypeName: propertyTypeName,
              };
            }
            if (!props[propertyTypeName].typeNames.includes(propertyName)) {
              props[propertyTypeName].typeNames.push(propertyName);
              props[propertyTypeName].types.push({
                name: propertyName,
                isOutOfStock: -1,
                propertyTypeName: propertyTypeName,
              });
            }
          });
          let { cash, skuId, stocks } = element.skuInfoVO;
          if (stocks) {
            let skuGood = {
              skuPropertieNames: skuPropertieNames.join(),
              cash,
              skuId,
              stocks,
              disabled: false,
            };
            skus.push(skuGood);
            skuPropertyList.value.push({
              list: skuPropertieNames,
              id: skuId,
            });
          }
        });
        allProperties.value = Object.values(props);
        skuList.value = skus;
        skuAdjoinMatrix.value = new MultipleAdjoinMatrix(
          allProperties.value,
          skuPropertyList.value
        );
        selectedSkuList.value = new Array(allProperties.value.length).fill("");
        // console.log("selectedSkuList.value", selectedSkuList.value);
        // console.log("规格", skuPropertyList.value);
        console.log('矩阵', skuAdjoinMatrix.value);
      });
    };
    /**
     * 选中商品类型
     */
    const checkSkuProp = (typeName: string, index: number) => {
      const isOption = optionSkuList.value.includes(typeName); // 当前规格是否可选
      // 排除可选规格里面没有的规格
      if (selectedSkuList.value[index] !== typeName && !isOption) return;
      // 根据typeName判断是否已经被选中了
      selectedSkuList.value[index] =
        selectedSkuList.value[index] === typeName ? "" : typeName;
      console.log("selectedSkuList", selectedSkuList.value);
      if (!selectedSkuList.value.includes('')) {
        currentSku.value = skuList.value.filter((item: SkuGood) => {
          return item.skuPropertieNames == selectedSkuList.value.join(",");
        })[0];
      } else {
        currentSku.value = null;
      }
    };
    return {
      loadData,
      checkSkuProp,
      allProperties,
      skuList,
      selectedSkuList,
      skuAdjoinMatrix,
      optionSkuList,
      currentSku,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart-item-content {
  list-style: none;
  display: flex;
  padding: 20px;
  &-term {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 70px;
    height: 46px;
    margin-right: 10px;
    padding: 0 9px;
    color: #333;
    background-color: #e5e5e5;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 44px;
    position: relative;
    &-badge {
      position: absolute;
      top: 0;
    }
    &.isActive {
      background-color: #f6fffe;
      color: #409eff;
      border: 1px solid #409eff;
    }
  }
}
</style>
