<template>
	<div class="editinfo">
		<PageHeader :routes="routes"></PageHeader>
		<a-card :bordered="false">
			<div class="card-content">
				<div class="item-title">
					<div class="title-head"></div>
					<div class="title">岗位信息</div>
				</div>
				<div class="item-content">
					<div class="icontent-left">部门名称<span class="required">*</span></div>
					<div class="icontent-right">
						<a-input
						 style="width: 350px;"
						 v-model:value="value"
						 placeholder="请输入"
						/>
					</div>
				</div>
				<div class="item-content">
					<div class="icontent-left">部门描述</div>
					<div class="icontent-right">
						<a-textarea
						 style="width: 350px;"
						 v-model:value="value"
						 placeholder="请输入相关描述"
						 :rows="4"
						 :maxlength="100"
						 showCount
						/>
					</div>
				</div>
			</div>
			<div class="button-list">
				<a-space :size="100">
					<a-button type="primary" style="width: 88px">确定</a-button>
					<a-button style="width: 88px">取消</a-button>
				</a-space>
			</div>
		</a-card>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Card, Input, Space, Button } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
const { TextArea } = Input

const routes = [
	{
		path: 'manage',
		breadcrumbName: '企业管理',
	},
	{
		path: 'frameman',
		breadcrumbName: '组织架构管理',
	},
	{
		path: 'manage/frameman/newframe',
		breadcrumbName: '新增部门',
	},
];
export default defineComponent({
	name: 'NewFrame',
	components: {
		[Card.name]: Card,
		[Input.name]: Input,
		[TextArea.name]: TextArea,
		[Space.name]: Space,
		[Button.name]: Button,
		PageHeader,
	},
	setup() {
		const value = ref('');

		return {
			routes,
			value
		}
	}
});
</script>

<style lang='less' scoped>
.editinfo {
	width: 100%;
	min-height: 100%;
	background-color: #fff;

	.card-content {
		width: 100%;
		padding: 16px 24px;
		box-sizing: border-box;

		.item-title {
			display: flex;
			align-items: center;
			
			.title-head {
				width: 5px;
				height: 20px;
				border-radius: 2px;
				margin-right: 10px;
				background-color: #1890ff;
			}
			.title {
				color: #333;
				font-size: 18px;
				line-height: 28px;
				font-weight: 600;
			}
		}
		.item-content {
			display: flex;
			width: 100%;
			min-height: 32px;
			margin-top: 30px;
			color: rgba(0, 0, 0, 0.85);
			font-size: 16px;
			line-height: 32px;
			
			.icontent-left {
				width: 100px;
				margin-right: 20px;
				.required {
					color: red;
				}
			}
		}
	}

	.button-list{
		padding: 0 24px;
		box-sizing: border-box;
		margin-top: 70px;
	}
}
</style>
