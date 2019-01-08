<template>
	<scroll-view scroll-y :style='{height: scrHeight}'>
		<pro-gress :pageShow='pageShow' :percent="percent"></pro-gress>
		<view class="container">
			<view class="page-section-title" style="display: block;">
				<view class="uni-hello-text uni-common-pb">
					uni里面的echarts.simple.min.js的组件不全，我使用的是npm install echarts --save 引入的echarts,组件用法参照
					mpvue-charts
				</view>
			</view>
			<view class="canvasView">
				<!-- 注意：在有多个图形时，canvasId是必须需要的 -->
				<view class="canvas-bar">
					<view class="title">饼图示例</view>
					<button class="update-btn" type="primary" size="mini" @click="updatePie">修改饼状图数据</button>
				</view>
				<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" ref="pieChart" />
			</view>
			<view class="canvasView">
				<view class="title">折线图示例</view>
				<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
			</view>
			<view class="canvasView" >
				<view class="title">网状关系图</view>
				<mpvue-echarts :echarts="echarts" :onInit="radInit" canvasId="radar"/>
			</view>
			<view class="canvasView">
				<view class="title">关系图</view>
				<mpvue-echarts :echarts="echarts" :onInit="fayInit" canvasId="tree"/>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	/*  以下是按需加载，相比import echarts from 'echarts';这个来说，运行速率要快一点
		因为没有用到的模块不需要花费时间去加载*/
	//引入 ECharts 主模块
	var echarts = require('echarts/lib/echarts');
	//引入柱状图
	require('echarts/lib/chart/line');
	// 引入饼状图
	require('echarts/lib/chart/pie');
	// 引入关系图
	require('echarts/lib/chart/tree');
	// 引入网状关系图
	require('echarts/lib/chart/radar');
	

	//import echarts from 'echarts';// echarts可以放在全局main.js里面引入
	import mpvueEcharts from '../../../components/mpvue-echarts/src/echarts.vue';
	let pieOption = {
		animation: false,
		backgroundColor: '#ffffff',
		color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
		series: [{
			label: {
				normal: {
					fontSize: 14
				}
			},
			type: 'pie',
			center: ['50%', '50%'],
			radius: [0, '60%'],
			data: [{
				value: 55,
				name: '北京'
			}, {
				value: 38,
				name: '上海'
			}, {
				value: 20,
				name: '广州'
			}],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 2, 2, 0.3)'
				}
			}
		}]
	};

	let lineOption = {
		animation: false,
		color: ['#37A2DA', '#9FE6B8'],
		grid: {
			x: 35,
			x2: 10,
			y: 30,
			y2: 25
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		}],
		yAxis: [{
			type: 'value',
			splitArea: {
				show: true
			}
		}],
		series: [{
			name: '蒸发量',
			type: 'line',
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		}, {
			name: '降水量',
			type: 'line',
			data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
		}]
	};

	var data1 = {
		'name': '王涛',
		'children': [{
			'name': '学习',
			'children': [{
				'name': 'js'
			}, {
				'name': 'css'
			}, {
				'name': 'vue'
			}, {
				'name': 'uni'
			}]
		}, {
			'name': '不懂',
			'children': [{
				'name': 'java'
			}, {
				'name': 'c++'
			}, {
				'name': 'php'
			}, {
				'name': 'node'
			}]
		}, {
			'name': '继续学',
			'children': [{
				'name': 'node'
			}]
		}, {
			'name': '了解',
			'children': [{
				'name': 'java'
			}]
		}]
	}
	let fayOption = { // 这里替换每一个echarts图形的option内容
		series: [{
			type: 'tree',
			initialTreeDepth: -1,
			name: 'tree1',
			data: [data1],
			top: '5%',
			left: '20%',
			bottom: '2%',
			right: '15%',
			symbolSize: 10,
			symbol: 'circle',
			label: {
				normal: {
					position: 'left',
					verticalAlign: 'middle',
					align: 'right',
					color: 'black'
				}
			}

		}]
	}

	let radOption = {
	   backgroundColor: '#ffffff',
	   color: ['#37A2DA', '#FF9F7F'],
	   tooltip: {},
	   xAxis: { // 坐标轴
	   	show: false
	   },
	   yAxis: {
	   	show: false
	   },
	   radar: {
	   	// shape: 'circle',
	   	indicator: [{
	   		name: '食品',
	   		max: 500
	   	},
	   	{
	   		name: '玩具',
	   		max: 500
	   	},
	   	{
	   		name: '服饰',
	   		max: 500
	   	},
	   	{
	   		name: '绘本',
	   		max: 500
	   	},
	   	{
	   		name: '医疗',
	   		max: 500
	   	},
	   	{
	   		name: '门票',
	   		max: 500
	   	}
	   	]
	   },
	   series: [{
	   	name: '预算 vs 开销',
	   	type: 'radar',
	   	data: [{
	   		value: [430, 340, 500, 300, 490, 400],
	   		name: '预算'
	   	},
	   	{
	   		value: [300, 430, 150, 300, 420, 250],
	   		name: '开销'
	   	}
	   	]
	   }]
	  }

	import proGress from '../../../components/progress/progress.vue'

	export default {
		components: {
			mpvueEcharts,
			proGress
		},
		data() {
			return {
				echarts: echarts,
				updateStatus: false,
				scrHeight: 0,
				pageShow: false,
				percent: 0, // 页面加载进度条
			}
		},
		onShareAppMessage() {},
		mounted() {
			this.getPhoneInfo();
		},
		methods: {
			// 获取手机可使用的屏幕高度
			getPhoneInfo() {
				let _this = this;
				_this.pageShow = true;
				let timer = setInterval(function() {
					_this.percent += 5;
					if (_this.percent >= 80) {
						clearInterval(timer);
						_this.percent = 80;
						let times = setInterval(function() {
							_this.percent += 5;
							if (_this.percent == 100) {
								_this.percent = 100;
								clearInterval(times);
								_this.pageShow = false;
								return;
							}
						}, 800)
					}
				}, 20)
				uni.getSystemInfo({
					success(res) {
						//H5端windowHeight不包含NavigationBar和TabBar的高度，
						//windowTop等于NavigationBar高度，windowBottom等于TabBar高度
						_this.scrHeight = res.windowHeight + 'upx';
					}
				})
			},
			goBrowser() {
				// #ifdef APP-PLUS
				plus.runtime.openURL('https://github.com/F-loat/mpvue-echarts');
				// #endif
				// #ifdef MP-WEIXIN
				uni.showModal({
					content: '请复制链接在浏览器里打开',
					showCancel: false
				})
				// #endif
			},
			updatePie() {
				if (this.updateStatus) {
					return;
				}
				pieOption.series[0].data.push({
					value: 20,
					name: '武汉'
				});
				pieOption.series[0].data.push({
					value: 10,
					name: '杭州'
				});
				this.$refs.pieChart.init(); // 再次初始化
				this.updateStatus = true;
			},
			pieInit(canvas, width, height) { // 这里对应执行上述的option内容
				let pieChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(pieChart)
				pieChart.setOption(pieOption)
				return pieChart
			},
			fayInit(canvas, width, height) { // 这里对应执行上述的option内容
				let onChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(onChart)
				onChart.setOption(fayOption)
				return onChart
			},
			lineInit(canvas, width, height) { // 这里对应执行上述的option内容
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)
				lineChart.setOption(lineOption)
				return lineChart
			},
			radInit(canvas, width, height) { 
				let radchart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(radchart)
				radchart.setOption(radOption)
				return radchart
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	page {
		min-height: 100%;
	}

	.page-section-title {
		padding: 0 30upx;
	}

	.title {
		margin-left: 30upx;
		color: #8f8f94;
	}

	.container {
		padding-bottom: 30upx;
		box-sizing: border-box;
	}

	.container,
	.canvasView {
		flex: 1;
		flex-direction: column;
	}
	.canvasView{
		min-height: 500upx;
	}
	.navigate {
		color: #007AFF;
	}

	.canvas-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.update-btn {
		margin-right: 30upx;
	}

	.wrap {
		width: 100%;
		height: 300upx;
	}
</style>
