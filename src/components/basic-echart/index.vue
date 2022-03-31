<template>
    <div ref="mEchart" :style="{ width: '100%', height: `${height}px` }"></div>
</template>

<script lang="ts">
import { defineComponent, watch,ref, onMounted,unref, onBeforeMount,shallowRef,inject,computed } from "vue";
import * as echarts from "echarts";
import { throttle } from '../../utils/index';
export default defineComponent({
  name: "basicEchart",
  props: {
    option: {
      type: Object,
      default: () => {
        return null;
      },
    },
    height: {
      type: Number,
      default: () => 500
    }
  },
  setup(props) {
    const mEchart = ref(); 
    // Vue3使用了proxy，Echarts无法从中获取内部变量 ！坑！
    let echart = shallowRef();
    const { option } = props;
    watch(
      () => [props.option],
      (val) => {
        console.log('echart',val);
        updateChart();
      },
      {
        deep: true
      }
    );
    // 初始化图标
    onMounted(() => {
        echart.value = echarts.init(unref(mEchart));
        echart.value.setOption(props.option);
        window.addEventListener('resize',throttle('RESIZE_ECHART',resizeChart,1000));
    });
    onBeforeMount(() => {
        window.removeEventListener('resize',resizeChart);
        if(echart.value) {
            echart.value.dispose(); // 销毁
        }
    });
    // 根据屏幕变化自适应图标大小
    const resizeChart = () => {
      echart.value.resize();
    }
    // 更新图表数据
    const updateChart = ():void  => {
        if(option.value && echart.value) {
            echart.value.setOption(props.option)
        }
    }
    return {
        updateChart,
        mEchart,
        resizeChart,
    }
  },
});
</script>