<template>
  <div class="line-chart">
    <basic-container>
      <el-radio-group v-model="checkLineType" size="small" style="margin-bottom: 30px">
        <el-radio-button v-for="item in chartTypes" :key="item.key" :label="item.key">{{item.label}}</el-radio-button>
      </el-radio-group>
      <div id="mLineChart"></div>
    </basic-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs, watch } from "vue";
import BasicContainer from "../../../components/basic-container/index.vue";
import {reqIndexData} from "../../../api/system/index"
import * as G2 from "@antv/g2";
export default defineComponent({
  components: {
    BasicContainer,
  },
  setup() {
    const state = reactive({
      chartObj: null,
      checkLineType: 'allUser', // 默认选中全部用户
      chartTypes: [
        {
          key: "allUser",
          label: "用户总数",
        },
        {
          key: "createUser",
          label: "新增用户数",
        },
        {
          key: "loseUser",
          label: "流失用户数",
        },
        {
          key: "pureUser",
          label: "净增用户数",
        },
      ],
      chartData: [],// 所有的图表格数据
    });
    // 监听redio变化
    watch(
      () => state.checkLineType,
      (val) => {
        filerChartData();
        console.log('111',val)
      }
    );
    const filerChartData = () => {
        let list = state.chartData.filter((item:any) => {
            return item.key === state.checkLineType;
        });
        initChartData(list);
    }
    onMounted(() => {
      reqIndexData().then(res => {
          let data = res.data.data || res.data || [];
          state.chartData = data;
          filerChartData();
          let mLineChart = document.getElementById('mLineChart');
          if(mLineChart) { // 因为@antv/g2打包存在问题，会默认创建两个canvas，暂时处理（将第一个canvas隐藏）
            let divBoxs = mLineChart.getElementsByTagName('div');
            if(divBoxs.length > 1) { divBoxs[0].style.display = "none"; }
          }
          
      })
      
    });
    const initChartData = (data:any) => {
      let chart:any = state.chartObj;
      if (chart) {
        chart.data(data); // 更新数据源
        chart.render(); // 更新图表
        return;
      }
      chart = new G2.Chart({
        container: "mLineChart",
        autoFit: true,
        height: 400,
        padding: [40, 40, 40, 40], // 上，右，下，左
      });
      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      });

      chart.data(data);
      chart.line().position("day*value").label("value").shape("smooth");
      chart.point().position("day*value").shape("circle");

      chart.render();
      state.chartObj = chart;
    };
    return {
        ...toRefs(state)
    }
  },
});
</script>

<style lang="scss" scoped>
.line-chart {
  margin-top: 28px;
  #mLineChart {
      & canvas {
        width: 100%!important;
     }
  }
  
}
</style>