<template>
  <div class="pie-chart flexitem_auto">
    <basic-container>
      <basic-chart :option="pieOption" :height="300"></basic-chart>
    </basic-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BasicContainer from "../../../components/basic-container/index.vue";
import BasicChart from "../../../components/basic-echart/index.vue";
export default defineComponent({
  name: "PieChart",
  components: {
    BasicContainer,
    BasicChart,
  },
  setup() {
    const pieOption = ref({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "0%",
        left: "center",
      },
      
      series: [
        {
          name: "用户爱好统计",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              //   fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "足球" },
            { value: 735, name: "篮球" },
            { value: 580, name: "羽毛球" },
            { value: 484, name: "乒乓球" },
            { value: 300, name: "跑步" },
          ],
        },
      ],
    });
    return {
      pieOption,
    };
  },
});
</script>

<style lang="scss" scoped>
.pie-chart {
  margin-top: 20px;
}
</style>