<template>
  <span id="mCountNum"></span>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import CountUp from "countup.js";
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
    callback: {
      type: Function,
      default: () => {},
    },
    options: {
      type: Object,
      required: false,
      default () {
        return {};
      }
    },
  },
  setup(props) {
    const state = reactive({
      count: null,
    });
    onMounted(() => {
      //  state.count = new CountUp(
      //     'mCountNum',
      //     props.start,
      //     props.end,
      //     0,
      //     props.duration,
      //     props.options
      //   );
    })
    console.log("end", props);
    return {
      
    }
  },
});
</script>