<template>
	<div class="home">
		<a-card class="my-ant-card" :bordered="false">
			<template #title>
				<div class="title"><span>概况</span>（近30天数据显示）</div>
			</template>
			<a-card-grid style="width: 50%; text-align: center">
				<div class="box-wrap">
					<div class="box">
						<div class="box-title">总存量：</div>
						<div class="box-number"><span class="number">999999</span> 元</div>
					</div>
				</div>
			</a-card-grid>
			<a-card-grid style="width: 50%; text-align: center">
				<div class="box-wrap">
					<div class="box">
						<div class="box-title">发放情况：</div>
						<div class="box-number"><span class="number">888888</span> 元</div>
					</div>
				</div>
			</a-card-grid>
			<a-card-grid style="width: 50%; text-align: center">
				<div class="box-wrap">
					<div class="box">
						<div class="box-title">使用情况：</div>
						<div class="box-number"><span class="number">888888</span> 元</div>
					</div>
				</div>
			</a-card-grid>
			<a-card-grid style="width: 50%; text-align: center">
				<div class="box-wrap">
					<div class="box">
						<div class="box-title">日均使用人数：</div>
						<div class="box-number"><span class="number">888888</span> 人</div>
					</div>
				</div>
			</a-card-grid>
		</a-card>
		<a-card :bordered="false">
			<a-table
				:columns="columns"
				:data-source="data"
				:pagination="{ pageSize: 5, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['5', '10', '30', '50'] }"
			>
			</a-table>
		</a-card>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { Card, Table } from 'ant-design-vue'
const { Grid } = Card

const columns = [
  {
	align: 'center',
    title: '日期',
    dataIndex: 'name',
    width: 150,
  },
  {
	align: 'center',
    title: '使用(元)',
    dataIndex: 'age',
    width: 150,
  },
  {
	align: 'center',
    title: '使用人次',
    dataIndex: 'address',
  },
  {
	align: 'center',
    title: '使用人数',
    dataIndex: 'address',
  },
];

const data = [...Array(100)].map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
export default defineComponent({
	name: 'Home',
	components: {
		[Card.name]: Card,
		[Grid.name]: Grid,
		[Table.name]: Table,
	},
	setup() {
		
		return {
			columns,
			data
		}
	}
});
</script>

<style lang='less' scoped>
@import "../../style/default.less";
.home {
	width: 100%;
	min-height: 100%;
	background-color: #fff;
	.my-ant-card {
		border-bottom: 1px solid #f0f0f0;
	}
	.box-wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		text-align: left;

		.box-title {
			color: @text-color;
		}
		.box-number {
			.number{
				color: @primary-color;
				font-size: 36px;
				line-height: 48px;
			}
		}
	}
}
</style>
