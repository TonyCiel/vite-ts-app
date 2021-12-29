<template>
    <div class="basic-container">
        <p class="basic-container__title" v-show="title">{{title}}</p>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    props: {
        title: {
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="scss" scoped>
.basic-container {
    padding: 20px;
    box-sizing: border-box;
    margin: 10px;
    border-radius: 2px;
    background-color: #fff;
    height: 100%;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    .basic-container__title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
        border-bottom: 1px solid #E8E8E8;
        margin: 0;
        padding: 10px 0;
        padding-top: 0;
    }
}
</style>