<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import { TestMenu, TestDropdown, TestToolbar, TestContextMenu, TestMenubar } from './views'

const count = ref(0)

const onClick = () => {
    count.value += 1
}
</script>

<template>
    <button @click="onClick">{{ count }}</button>
    <test-menubar />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
