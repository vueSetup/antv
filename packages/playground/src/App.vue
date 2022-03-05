<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import { TestMenu, TestDropdown, TestToolbar, TestContextMenu, TestMenubar } from './views'

const count = ref(0)
const prefixCls = ref('x6')

const onClick = () => {
    count.value += 1
    prefixCls.value = prefixCls.value === 'x6' ? 'antdv' : 'x6'
}
</script>

<template>
    <button @click="onClick">{{ count }}</button>
    <test-menu />
    <test-dropdown />
    <test-toolbar />
    <test-context-menu />
    <test-menubar />
</template>

<style>
#app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
