<template>
	<div class="daily-grant">
		<a-card :bordered="false" :loading="loading">
			<template #title>
				<a-space size="large">
					<div class="input-block">
						<div>发放时间：</div>
						<a-range-picker style="width: 300px" v-model:value="dateRange"
						></a-range-picker>
					</div>
					<div class="input-block">
						<div>员工类型：</div>
						<a-select
							v-model:value="staffType"
							placeholder="请选择"
							style="minWidth: 120px"
							:options="staffTypeOptions"
						></a-select>
					</div>
					<div class="input-block">
						<div>发放状态：</div>
						<a-select
							v-model:value="provideType"
							placeholder="请选择"
							style="minWidth: 120px"
							:options="provideTypeOptions"
						></a-select>
					</div>
					<a-button type="primary">查询</a-button>
					<a-button>重置</a-button>
				</a-space>
				<div class="select-block">
					
				</div>
			</template>
			<div class="card-content">
				<div class="button">
					<a-button type="primary" @click="newGrant">新增发放</a-button>
				</div>
				<a-table
				 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				 :columns="columns"
				 :data-source="data"
				 :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['10', '20', '30', '40'] }"
				>
					<template #operation="{ record }">
						<a-space class="operate">
							<a @click="editGrant(record.key)">编辑</a>
							<span class="grant-status" @click="suspend(record.key)">暂停</span>
						</a-space>
					</template>
				</a-table>
			</div>
		</a-card>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Card, DatePicker, Select, Button, Table, Space } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const { RangePicker } = DatePicker;

const columns = [
	{
		align: 'center',
		title: '员工类型',
		dataIndex: 'name',
	},
	{
		align: 'center',
		title: '人数',
		dataIndex: 'age',
	},
	{
		align: 'center',
		title: '（发放金额）',
		dataIndex: 'address',
	},
	{
		align: 'center',
		title: '发放机制',
		dataIndex: 'address',
	},
	{
		align: 'center',
		title: '发放状态',
		dataIndex: 'name',
	},
	{
		align: 'center',
		title: '发放时间',
		dataIndex: 'age',
	},
	{
		align: 'center',
		title: '操作',
		dataIndex: 'operation',
		slots: {
			customRender: 'operation',
		},
	},
];
const data = [];

for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		age: 18,
		address: `London, Park Lane no. ${i}`,
	});
}

export default defineComponent({
	name: 'DailyGrant',
	components: {
		[Card.name]: Card,
		[DatePicker.name]: DatePicker,
		[RangePicker.name]: RangePicker,
		[Select.name]: Select,
		[Button.name]: Button,
		[Table.name]: Table,
		[Space.name]: Space,
	},
	setup() {
		const router = useRouter()

		const loading = ref(false)
		const dateRange = ref([])     // 发放时间
		const staffType = ref([])     // 员工类型
		const provideType = ref([])   // 发放状态
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
		// 发放状态选项
		const provideTypeOptions = ref([
			{
				value: '1',
				label: '发放中',
			},
			{
				value: '2',
				label: '暂停发放',
			},
		])

		const selectedRowKeys = ref([])

		const onSelectChange = selectedRowKey => {
			console.log('selectedRowKeys changed: ', selectedRowKey);
			selectedRowKeys.value = selectedRowKey;
		}
		/**
		 * 新增发放
		 */
		const newGrant = () => { 
			router.push("/welfare/newgrant")
		}
		/**
		 * 编辑发放
		 * @param {number} key 
		 */
		const editGrant = key => { 
			console.log('key', key);
			router.push("/welfare/editgrant")
		}
		/**
		 * 暂停操作
		 * @param {number} key 
		 */
		const suspend = key => {
			console.log(key);
		}

		

		return {
			loading,
			dateRange,
			staffType,
			provideType,
			staffTypeOptions,
			provideTypeOptions,
			columns,
			data,
			selectedRowKeys,

			onSelectChange,
			newGrant,
			editGrant,
			suspend,
		}
	}
});
</script>

<style lang='less' scoped>
.daily-grant {
	width: 100%;
	min-height: 100%;
	background-color: #fff;
	.input-block {
		display: flex;
		align-items: center;
	}
	.card-content {
		width: 100%;
		.button {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-bottom: 10px;
		}
		.operate {
			.grant-status {
				cursor: pointer;
			}
		}
	}
}
</style>
