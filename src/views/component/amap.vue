<template>
  <div class="amap-wrap">
    <BasicAMap @ready="loadAMap" class="my-amap"></BasicAMap>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import BasicAMap from '../../components/basic-amap/index.vue';
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    BasicAMap
  },
  setup() {
    //state
    const myAMap: Ref<any> = ref(null);
    // methods
    const initLocation = (AMap: any) => {
      AMap.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          offset: [10, 20],
          zoomToAccuracy: true,
          position: 'RB'
        });
        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            // 设置maker标记，将地图设置到中央
            const { position } = result;
            let myLoacation = new AMap.LngLat(position.lng, position.lat);
            myAMap.value.setZoomAndCenter(14, [position.lng, position.lat]);
            console.log('result', result);
            let marker = new AMap.Marker({
              position: myLoacation,
              offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
            });
            console.log('marker', marker)
            myAMap.value.add(marker);
          } else {
            ElMessage.error(result.message);
            console.error('获取定位失败', result);
          }
        });
      })
    }
    const loadAMap = (map: any, AMap: any) => {
      myAMap.value = map;
      AMap.value = AMap;
      initLocation(AMap);
      console.log('AMap', AMap)
      // myAMap.value &&  myAMap.value.setZoom(13);
    }
    return {
      myAMap,
      loadAMap,
      initLocation
    }
  },
})
</script>

<style lang="scss" scoped>
.amap-wrap {
  width: 100%;
  height: calc(100vh - 64px - 40px - 5px);
}

.my-amap {
  width: 100%;
  height: 100%;

}
</style>
