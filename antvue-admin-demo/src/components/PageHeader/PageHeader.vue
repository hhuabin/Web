<template>
	<a-page-header :breadcrumb="{ routes }"/>
</template>

<script>
import { defineComponent } from 'vue'
import { PageHeader } from 'ant-design-vue'
export default defineComponent({
	name: 'PageHeader',
	components: {
		[PageHeader.name]: PageHeader,
	},
	props: {
		routes: {
			type: Array,
			required: true
		},
	},
	setup() {
	}
});
</script>

<style lang='less' scoped>
</style>
