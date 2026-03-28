<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView></RouterView>
</template>

<style>
:root {
    --font-family: PingFangSC, PingFang SC;
    --font-size: 16px;
}

html {
    font-size: var(--font-size);
}

body {
    overflow: hidden;
    scrollbar-width: none;
}

#app {
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    /* background-color: #0A004E; */
}

* {
    margin: 0;
    padding: 0;
}
</style>
