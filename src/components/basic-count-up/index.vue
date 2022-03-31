<template>
  <p class="basic-countup">
    <span
      :id="`mCountNum${idName}`"
      :data-time="duration"
      class="basic-countup__content"
      :data-value="end"
      >0</span
    >
  </p>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, Ref, ref } from "vue";
export default defineComponent({
  props: {
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 2,
    },
    idName: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    // const mCountNum: Ref = ref();
    const state = reactive({
      countTimer: 0,
    });
    onMounted(() => {
      increaseNumber();
    });
    onBeforeUnmount(() => {
      clearTimer();
    });
    // 清除定时器
    const clearTimer = () => {
      if(state.countTimer) {
        clearInterval(state.countTimer);
        state.countTimer = 0;
      }
      
    }
    // 增加数字
    const increaseNumber = () => {
      const { end, duration,idName } = props;
      let step = Math.floor((end * 100) / (duration * 1000));
      let start = props.start; // 开始的数字
      let current = 0; // 当前的值
      state.countTimer = window.setInterval(() => {
        start += step;
        if (start > end) {
          // 把穿过的值赋给start，结束
          start = end;
          // 清掉计时器
          clearTimer();
        }
        if (start == 0) {
          start = end;
          clearTimer();
        }
        // 当前值等于开始值，那就结束
        if (end === 0) {
          return;
        }
        current = start;
        // 正则
        // console.log('mCountNum',mCountNum)
        let mCountNum:any = document.getElementById(`mCountNum${idName}`)
        if(mCountNum) {
          mCountNum.innerHTML = current
          .toString()
          .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,");
        }
        
      }, duration * 50);
    };
    
    return {
    };
  },
});
</script>

<style lang="scss" scoped>
.basic-countup {
  transform: translateZ(0);
  display: inline-block;
}
</style>