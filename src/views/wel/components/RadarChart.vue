<template>
  <div class="pie-chart flexitem_auto">
    <basic-container>
      <basic-chart :option="mapOption" :height="300"></basic-chart>
    </basic-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import BasicContainer from "../../../components/basic-container/index.vue";
import BasicChart from "../../../components/basic-echart/index.vue";
export default defineComponent({
  name: "RadarChart",
  components: {
    BasicContainer,
    BasicChart,
  },
  setup() {
    const mapOption = ref({
      title: {
        padding: 0,
        y: "bottom",
        x: "center",
      },
      legend: {
        data: ["预算分配", "实际开销"],
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: "销售", max: 6500 },
          { name: "管理", max: 16000 },
          { name: "信息技术", max: 30000 },
          { name: "客服", max: 38000 },
          { name: "研发", max: 52000 },
          { name: "市场", max: 25000 },
        ],
      },
      series: [
        {
          name: "分配 vs 开销",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "预算分配",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "实际开销",
            },
          ],
        },
      ],
    });
    return {
      mapOption,
    };
  },
});
</script>

<style lang="scss" scoped>
.pie-chart {
  margin-top: 20px;
}
</style>