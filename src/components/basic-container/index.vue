<template>
    <div class="basic-container">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    
})
</script>

<style lang="scss" scoped>
.basic-container {
    padding: 20px;
    box-sizing: border-box;
    margin: 10px;
    border-radius: 4px;
    background-color: #fff;
    height: 100%;
}
</style>