<template>
	<!-- 汉化组件 -->
	<a-config-provider :locale="zhCN">
		<router-view></router-view>
	</a-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue'

export default defineComponent({
	name: 'App',
	components: {
		[ConfigProvider.name]: ConfigProvider,
	},
	setup() {
		return {
			zhCN
		}
	}
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100vh;
	background: #F0F2F5 ;
	color: rgba(0, 0, 0, 0.85);
}

* {
	margin: 0;
	padding: 0;
}
</style>

