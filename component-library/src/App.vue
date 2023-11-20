<template>
	<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

declare const process: {
	// eslint-disable-next-line
	env: any
}

export default defineComponent({
	setup() {
		console.log(process.env);
	}
})
</script>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: rgba(0, 0, 0, 0.85);
}

* {
	margin: 0;
	padding: 0;
}
</style>
