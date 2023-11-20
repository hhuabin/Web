<template>
	<div class="staffman">
		<a-card :bordered="false" :loading="loading">
			<template #title>
				<a-space size="large">
					<div class="input-block">
						<div>姓名：</div>
						<a-input v-model:value="name" />
					</div>
					<div class="input-block">
						<div>手机号：</div>
						<a-input :maxlength="11" v-model:value="phone" />
					</div>
					<div class="input-block">
						<div>部门：</div>
						<a-select
							v-model:value="staffType"
							placeholder="请选择"
							style="minWidth: 120px"
							:options="staffTypeOptions"
						></a-select>
					</div>
					<div class="input-block">
						<div>岗位：</div>
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
			</template>
			<div class="card-content">
				<div class="button-group">
					<a-space size="large">
						<a-button>批量导出</a-button>
						<a-button>批量导入</a-button>
					</a-space>
					<a-button type="primary" style="width: 88px" @click="newStaff">新增</a-button>
				</div>
				<a-table
				 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				 :columns="columns"
				 :data-source="data"
				 :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['10', '20', '30', '40'] }"
				>
					<template #operation="{ record }">
						<a-space class="operate">
							<a @click="editStaff(record.key)">编辑</a>
							<span class="grant-status" @click="suspend(record.key)">离职</span>
						</a-space>
					</template>
				</a-table>
			</div>
		</a-card>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, Input, Select, Button, Table, Space } from 'ant-design-vue'

const columns = [
	{
		align: 'center',
		title: '序号',
		dataIndex: 'name',
	},
	{
		align: 'center',
		title: '姓名',
		dataIndex: 'age',
	},
	{
		align: 'center',
		title: '手机号码',
		dataIndex: 'address',
	},
	{
		align: 'center',
		title: '部门',
		dataIndex: 'address',
	},
	{
		align: 'center',
		title: '岗位',
		dataIndex: 'name',
	},
	{
		align: 'center',
		title: '职务',
		dataIndex: 'age',
	},
	{
		align: 'center',
		title: '类型',
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
	name: 'Staffman',
	components: {
		[Card.name]: Card,
		[Input.name]: Input,
		[Select.name]: Select,
		[Button.name]: Button,
		[Table.name]: Table,
		[Space.name]: Space,
	},
	setup() {
		const router = useRouter()

		const loading = ref(false)
		const name = ref("")          // 姓名
		const phone = ref("")         // 手机号
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
		const newStaff = () => { 
			router.push("/manage/staffman/newstaff")
		}
		/**
		 * 编辑发放
		 * @param {number} key 
		 */
		const editStaff = key => { 
			console.log('key', key);
			router.push("/manage/staffman/editstaff")
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
			name,
			phone,
			dateRange,
			staffType,
			provideType,
			staffTypeOptions,
			provideTypeOptions,
			columns,
			data,
			selectedRowKeys,

			onSelectChange,
			newStaff,
			editStaff,
			suspend,
		}
	}
});
</script>

<style lang='less' scoped>
.staffman {
	width: 100%;
	min-height: 100%;
	background-color: #fff;
	.input-block {
		display: flex;
		align-items: center;
	}
	.card-content {
		width: 100%;
		.button-group {
			display: flex;
			justify-content: space-between;
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
