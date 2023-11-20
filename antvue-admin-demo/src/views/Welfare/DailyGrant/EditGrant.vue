<template>
	<div class="grantinfo">
		<PageHeader :routes="routes"></PageHeader>
		<a-card :bordered="false">
			<div class="card-content">
				<div class="card-left">
					<div class="card-item">
						<div class="item-title">
							<div class="title-head"></div>
							<div class="title">选择人员</div>
						</div>
						<div class="item-content">
							<div class="icontent-left">员工类型</div>
							<div class="icontent-right">
								<a-select
									v-model:value="staffType"
									placeholder="请选择"
									style="minWidth: 120px"
									:options="staffTypeOptions"
								></a-select>
							</div>
						</div>
						<div class="item-content">
							<div class="icontent-left">人数</div>
							<div class="icontent-right">共30人</div>
						</div>
					</div>
				</div>
				<div class="divider"></div>
				<div class="card-right">
					<div class="card-item">
						<div class="item-title">
							<div class="title-head"></div>
							<div class="title">发放规则</div>
						</div>
						<div class="item-content">
							<div class="icontent-left">发放方式</div>
							<div class="icontent-right">按月发放</div>
						</div>
						<div class="item-content">
							<div class="icontent-left">按月发放</div>
							<div class="icontent-right">
								<a-select
									v-model:value="staffType"
									placeholder="请选择"
									style="minWidth: 120px"
									:options="staffTypeOptions"
								></a-select>
							</div>
						</div>
					</div>
					<div class="card-item">
						<div class="item-title">
							<div class="title-head"></div>
							<div class="title">发放类型</div>
						</div>
						<div class="item-content">
							<div class="icontent-left">穗通票</div>
							<div class="icontent-right">
								<a-input v-model:value="name" />
							</div>
						</div>
						<div class="item-content">
							<div class="icontent-left"></div>
							<div class="icontent-right">当前票池内还剩 <span class="price">888888</span> 元</div>
						</div>
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
import { Card, Select, Input, Space, Button } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'

const routes = [
	{
		path: 'welfare',
		breadcrumbName: '日常补贴发放',
	},
	{
		path: 'welfare/grantinfo',
		breadcrumbName: '编辑发放',
	},
];
export default defineComponent({
	name: 'EditGrant',
	components: {
		[Card.name]: Card,
		[Select.name]: Select,
		[Input.name]: Input,
		[Space.name]: Space,
		[Button.name]: Button,
		PageHeader,
	},
	setup() {
		const staffType = ref([])     // 员工类型
		// 员工类型选项
		const staffTypeOptions = ref([
			{
				value: '1',
				label: '员工类型1',
			},
			{
				value: '2',
				label: '员工类型2',
			},
			{
				value: '3',
				label: '员工类型3',
			},
		])

		return {
			routes,
			staffType,
			staffTypeOptions,

		}
	}
});
</script>

<style lang='less' scoped>
.grantinfo {
	width: 100%;
	min-height: 100%;
	background-color: #fff;

	.card-content {
		display: flex;
		width: 100%;

		.card-left, .card-right {
			.card-item {
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
					align-items: center;
					width: 100%;
					min-height: 32px;
					margin-top: 30px;
					color: rgba(0, 0, 0, 0.85);
					font-size: 16px;
					line-height: 24px;
					
					.icontent-left {
						width: 100px;
						margin-right: 20px;
					}
					.icontent-right {
						.price {
							color: #1890ff;
						}
					}
				}
			}
		}

		.divider {
			flex: none;
			width: 1px;
			height: auto;
			margin: 0 50px;
			background-color: rgba(0, 0, 0, 0.06);
		}
	}

	.button-list{
		padding: 0 24px;
		box-sizing: border-box;
		margin-top: 70px;
	}
}
</style>
