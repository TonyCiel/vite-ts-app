<template>
  <basic-container>
    <div class="cart-warp">
      <div
        class="cart-item"
        v-for="(propertie, key) in allProperties"
        :key="key"
      >
        <div class="cart-item-title">可选 {{ propertie.propertyTypeName }}</div>
        <ul class="cart-item-content" v-if="propertie.types">
          <li
            class="cart-item-content-term"
            v-for="item in propertie.types"
            :key="item.name"
            @click.stop="checkSkuProp(item, propertie)"
            :class="{
              isActive: item.name === propertie.active,
            }"
          >
            <span v-if="item.isOutOfStock == -1 || !item.isOutOfStock">{{
              item.name
            }}</span>
            <el-badge
              v-else
              type="warning"
              value="缺货"
              class="cart-item-content-term-badge"
            >
              {{ item.name }}</el-badge
            >
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
import { SkuGood, SkuProperties, SkuType, SkuProp } from "@/type/sku";
import { deepClone } from "@/utils/index";

export default defineComponent({
  components: {
    BasicContainer,
  },
  setup() {
    onMounted(() => {
      loadData();
    });
    // state
    // const allProperties: Ref<SkuProperties> = ref({}); // 商品类别
    const allProperties: Ref<SkuProp[]> = ref([]); // 商品类别
    const skuList: Ref<SkuGood[]> = ref([]); // 商品列表
    const skuPropertyList: Ref<Array<any>> = ref([]);
    // computed
    const selectedSkuList = computed(() => {
      let list: string[] = allProperties.value.map((property: SkuProp) => {
        return property.active;
      });
      return list;
    });
    const selectedSkyPropertyList = computed(() => {
      let list: string[] = allProperties.value.map((property: SkuProp) => {
        return property.active ? property.propertyTypeName : '';
      });
      list = list.filter((propertyTypeName) => {
        return propertyTypeName
      })
      return list;
    })
    const currentSku = computed(() => {
      let selectedSkuListNames = selectedSkuList.value.join();
      return unref(skuList).filter((item: SkuGood) => {
        return item.skuPropertieNames == selectedSkuListNames;
      })[0];
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
            skuPropertyList.value.push(skuPropertieNames);
          }
        });
        allProperties.value = Object.values(props);
        skuList.value = skus;
        // console.log("规格", Object.values(props));
        // console.log("商品", skus);
        console.log("规格", skuPropertyList.value);
      });
    };
    /**
     * 判断是否包含
     */
    const isContained = (a: string[], b: string[]) => {
      if (!(a instanceof Array) || !(b instanceof Array)) return false;
      if (a.length < b.length) return false;
      var aStr = a.toString();
      for (var i = 0, len = b.length; i < len; i++) {
        if (aStr.indexOf(b[i]) == -1) return false;
      }
      return true;
    };
    /**
     * 选中商品类型
     */
    const checkSkuProp = (item: SkuType, propertie: any) => {
      const { name, isOutOfStock } = item;
      if (isOutOfStock === true) {
        // 没库存不能点击
        return;
      }
      propertie.active = propertie.active == name ? "" : name;
      // propertie.active = name
      let selected:any = selectedSkuList.value.filter((item) => {
        return item;
      });
      if(selected.length === allProperties.value.length) { // 如果每个规格都选了，说明能确定是哪一个商品了，不继续查询了
        return;
      }
      let propertyTypeName = propertie.propertyTypeName;
      if(propertie.active) {
        selected = [propertie.active];
      } else {
        selected = selected.length ? [selected.pop()] : [];
        propertyTypeName = selectedSkyPropertyList.value.pop();
      }
      console.log('已经选中的selectedSkyPropertyList',selectedSkyPropertyList.value);
      console.log('propertie', propertie.propertyTypeName)
      allProperties.value.forEach((property: SkuProp) => {
        if (!selected.length) {
          // 没有选中任何一个，那所有规格选项都是可以点击的
          property.types = property.types.map((type: SkuType) => {
            type.isOutOfStock = false;
            return type;
          });
        } else {
          // propertie.propertyTypeName != property.propertyTypeName
          // !property.active
          if (propertyTypeName != property.propertyTypeName) {
            // 没有选中的规格拿出来组合
            property.types = property.types.map((type: SkuType) => {
              let virtuallySelected: any[] = deepClone(selected); // 模拟选中组合
              virtuallySelected.push(type.name);
              console.log("组合起来的A", virtuallySelected.join());
              let results: boolean[] = [];
              skuPropertyList.value.forEach((sku: string[]) => {
                // 判断该模拟选中的组合在真实的规格里，是不是有，有就说明是有库存的
                results.push(isContained(sku, virtuallySelected));
              });
              type.isOutOfStock = !results.includes(true);

              // console.log("组合起来的A", virtuallySelected.join());
              return type;
            });
          } else {
            // property.types = property.types.map((type: SkuType) => {
            //   type.isOutOfStock = false;
            //   return type;
            // });
          }
        }
      });
      console.log("选中的规格", selected);
    };
    return {
      loadData,
      checkSkuProp,
      allProperties,
      skuList,
      currentSku,
      isContained,
      selectedSkuList,
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
