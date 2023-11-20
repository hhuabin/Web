<template>
	<div class="analysis">
		<a-card class="my-ant-card" :bordered="false">
			<div class="trade-data">
				<div class="menu">
					<div class="menu-title">交易分析</div>
					<div class="menu-list">
						<a-card-grid style="width: 100%; text-align: center">
							<div class="menu-item">
								<div class="item-box">
									<div class="box-title">票池剩余</div>
									<div class="box-number"><span class="number">999999</span> 元</div>
								</div>
							</div>
						</a-card-grid>
						<a-card-grid style="width: 100%; text-align: center">
							<div class="menu-item">
								<div class="item-box">
									<div class="box-title">发放情况</div>
									<div class="box-number"><span class="number">999999</span> 元</div>
								</div>
							</div>
						</a-card-grid>
						<a-card-grid style="width: 100%; text-align: center">
							<div class="menu-item">
								<div class="item-box">
									<div class="box-title">使用情况</div>
									<div class="box-number"><span class="number">999999</span> 元</div>
								</div>
							</div>
						</a-card-grid>
					</div>
				</div>
				<div class="bar-chart-wrap">
					<div class="bar-title">
						<div class="date-range current">最近7天</div>
						<div class="date-range">最近30天</div>
						<div class="date-range">最近1年</div>
					</div>
					<div class="chart-title">各部门使用情况</div>
					<div ref="barchart" class="bar-chart"></div>
				</div>
			</div>
		</a-card>
		<a-card :bordered="false">
			<div class="line-chart-wrap">
				<div class="chart-title">最近7天使用情况</div>
				<div ref="linechart" class="line-chart"></div>
			</div>
		</a-card>
	</div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { Card } from 'ant-design-vue'
const { Grid } = Card
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	BarChart,
	LineChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer
]);

export default defineComponent({
	name: 'TradeAnalysis',
	components: {
		[Card.name]: Card,
		[Grid.name]: Grid,
	},
	setup() {
		const barchart = ref(null)
		const linechart = ref(null)
		let timer = null
		const loading = ref(false)
		onMounted(() => {
			const mybarChart = echarts.init(barchart.value);
			const mylineChart = echarts.init(linechart.value);
			_initchart(mybarChart, mylineChart)
			resize(mybarChart, mylineChart)
			window.onresize = () => {
				resize(mybarChart, mylineChart)
			}
		})

		const resize = async (mybarChart, mylineChart) => {
			clearTimeout(timer)
			timer = setTimeout(() => {
				const barWidth = barchart.value.clientWidth
				const barHeight = barchart.value.clientHeight
				const lineWidth = linechart.value.clientWidth
				const lineHeight = linechart.value.clientHeight
				console.log(barWidth, barHeight, lineWidth, lineHeight);
				mybarChart.resize({
					width: barWidth,
  					height: barHeight
				})
				mylineChart.resize({
					width: lineWidth,
  					height: lineHeight
				})
			}, 100)
		}

		// 初始化图表
		const _initchart = (mybarChart, mylineChart) => {
			mybarChart.setOption({
				tooltip: {
					
				},
				dataset: {
					source: [
						['product', ''],
						['部门1', 10,],
						['部门2', 20],
						['部门3', 100],
						['部门4', 100],
						['部门5', 100],
						['部门6', 100],
					]
				},
				xAxis: {},
				yAxis: { 
					type: 'category',
				},
				series: [
					{
						type: 'bar',
						itemStyle: {
							color: '#1890ff',
							shadowColor: '#1890ff',
							borderType: 'dashed',
						}
					},
				]
			});
			mylineChart.setOption({
				tooltip: {},
				dataset: {
					source: [
						['product', ''],
						['1-1', 10],
						['1-2', 20],
						['1-3', 30],
						['1-4', 100],
						['1-5', 45],
						['1-6', 70],
						['1-7', 50],
					]
				},
				xAxis: {
					type: 'category'
				},
				yAxis: {
					
				},
				series: [
					{
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#1890ff',
							shadowColor: '#1890ff',
							borderType: 'dashed',
						}
					}
				]
			});
		}

		return {
			barchart,
			linechart,
			loading,
		}
	}
});
</script>

<style lang='less' scoped>
@import "../../../style/default.less";
.analysis {
	width: 100%;
	min-height: 100%;
	background-color: #fff;

	.my-ant-card {
		border-bottom: 1px solid #f0f0f0;
	}
	.trade-data {
		display: flex;
		width: 100%;

		.menu {
			width: 25%;

			.menu-title {
				color: #333;
				font-size: 24px;
				font-weight: 600;
				line-height: 36px;
			}
			.menu-list {
				margin-top: 12px;
				.ant-card-grid {
					padding: 12px;

					.menu-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 16px;
						text-align: left;

						.box-title {
							color: @text-color;
							line-height: 24px;
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
			}
		}

		.bar-chart-wrap {
			display: flex;
			flex-direction: column;
			width: 70%;
			margin-left: 5%;
			.bar-title {
				display: flex;
				width: 100%;
				height: 36px;
				color: @text-color;
				font-size: 14px;
				.date-range {
					display: flex;
					align-items: flex-end;
					margin-right: 30px;
					cursor: pointer;
				}
				.current {
					color: @primary-color;
				}
			}
			.chart-title {
				width: 100%;
				margin-top: 12px;
				color: #333;
				font-size: 18px;
			}
			.bar-chart {
				width: 100%;
				height: 100%;
			}
		}
	}

	.line-chart-wrap {
		width: 100%;
		
		.chart-title {
			width: 100%;
			color: #333;
			font-size: 18px;
			line-height: 24px;
		}
		.line-chart {
			width: 100%;
			height: 360px;
		}
	}
}
</style>
