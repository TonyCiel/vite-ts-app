<template>
  <div class="basic-amap" :id="amapId" ref="amapview"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { loadAMap } from './amap';

export default defineComponent({
  name: 'BasicAMap',
  emits: ['ready'],
  setup(props, { emit }) {
    // state
    const amapId: Ref<string> = ref(`${new Date().getTime()}-${Math.ceil(Math.random() * 1000)}`);
    const mapObj: Ref<Object | null> = ref(null);
    // mounted
    onMounted(() => {
      loadAMap().then(() => {
        console.log('AMap', window.AMap)
        let map = new window.AMap.Map(amapId.value);
        mapObj.value = map;
        emit('ready', map, window.AMap)
      })
    })
    return {
      amapId,
      mapObj,
    }
  },
})
</script>

<style lang="scss" scoped>
.basic-amap {
  height: inherit;
}
</style>
