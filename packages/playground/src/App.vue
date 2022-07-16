<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import { F2Vue } from './views'

const count = ref(0)
const prefixCls = ref('x6')

const onClick = () => {
    count.value += 1
    prefixCls.value = prefixCls.value === 'x6' ? 'antdv' : 'x6'
}
</script>

<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <button @click="onClick">{{ count }}</button>

    <f2-vue class="container" />
    <!-- <f2-line-compare /> -->
    <!-- <f2-line-anchor /> -->
    <!-- <f2-line-connect-null /> -->
    <!-- <f2-gauge /> -->
    <!-- <f2-axis-grid /> -->
    <!-- <f2-pie-select /> -->
    <!-- <f2-guide-text /> -->
    <!-- <x6-menu />
    <x6-dropdown />
    <x6-toolbar />
    <x6-context-menu />
    <x6-menubar /> -->
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
