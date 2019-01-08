<template>
	<view>
		<view class="calendar-box">
			<!-- <view class="header">
				<text class="iconfont" @tap='dataBefor("0")'>
					<text class='left color'>左</text>
				</text>
				<view class="content">
					<view class="text">{{selectDay}}</view>
					<text class=""></text>
				</view>
				<text class="iconfont" @tap='dataBefor("1")'>
					<text class='right color'>右</text>
				</text>
			</view> -->
			<view class="calendar-wrapper ">
				<view class="content">
					<view class="calendar-panel">
						<view class="date-befor" @tap="dataBefor('0','month')">
							<uni-icon size="20" :type="back" :color="fontColor"></uni-icon>
						</view>
						<view class="calendar-panel-box">
							<view>{{canlender.year}}年</view>
							<view>{{canlender.month}}月</view>
						</view>
						<view class="date-after rollback" @tap="dataBefor('1','month')">
							<uni-icon size="20" :type="back" :color="fontColor"></uni-icon> <!-- :type="back"直接传back不行，该属性主要在data(){}里面注册有，才行得通-->
						</view>
						<view class='backtoday' @tap='backtoday'>
							回到今天
						</view>
					</view>
					<view class="calendar-header">
						<view class="week">日</view>
						<view class="week">一</view>
						<view class="week">二</view>
						<view class="week">三</view>
						<view class="week">四</view>
						<view class="week">五</view>
						<view class="week">六</view>
					</view>
					<view class="calendar-body">
						<block v-for="(weeks , week) in canlender.weeks" :key="week">
							<view class="calender-body-date-week">
								<block v-for="(day , index) in weeks" :key="index">
									<view class="date" :class="{'disable':canlender.month !== day.month ,'date-current':(day.date==canlender.date||day.checked) && canlender.month == day.month}"
									 data-week="{{}}" data-index="{{}}" data-ischeck="{{}}" @tap='selectDays(week,index,canlender.month === day.month)'>
										{{day.date}}
										<view v-if="day.have" class="data-circle"></view>
									</view>
								</block>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../uni-icon.vue'
	export default {
		props: {
			date: {
				type: null,
				default: () => {
					return new Date()
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				},
			}
		},
		components: {
		    uniIcon
		},
		data() {
			return {
				dateShow: false, // 日期是否选择
				selectDay: '', // 当前选择日期
				canlender: {
					"weeks": []
				},
				back:'back',
				fontColor:'#8f8f94'
			};
		},
		created() {
			this.getWeek(this.date)
		},
		methods: {
			/**
			 * 返回今天
			 */
			backtoday() {
				this.getWeek(new Date());
			},

			/**
			 * 前一天|| 后一天
			 */
			dataBefor(id, types) {
				let num = 0;

				if (id === "0") {
					num = -1;
				} else {
					num = 1
				}
				let year = this.canlender.year + "-" + this.canlender.month + "-" + this.canlender.date
				let _date = this.getDate(year, num, types === 'month' ? "month" : "day");
				this.getWeek(_date);
			},
			/**
			 * 选择当前的日期
			 * week 当前的周
			 * index 点击的下标索引
			 * ischeck 是否选中
			 */
			selectDays(week, index, ischeck) {

				let canlender = this.canlender;
				if (!ischeck) return false;
				let month = canlender.weeks[week][index].month < 10 ? "0" + canlender.weeks[week][index].month : canlender.weeks[
					week][index].month
				let date = canlender.weeks[week][index].date < 10 ? "0" + canlender.weeks[week][index].date : canlender.weeks[week]
					[index].date
				this.getWeek(canlender.year + "-" + month + "-" + date);

			},
			// 获取日历内容
			getWeek(dateData) {
				let selected = this.selected
				let a = new Date()
				// console.log("im date ", a, typeof a === 'object')
				// 判断当前是 安卓还是ios ，传入不容的日期格式
				if (typeof dateData !== 'object') {
					dateData = dateData.replace(/-/g, "/")
				}
				let _date = new Date(dateData);
				let year = _date.getFullYear(); //年
				let month = _date.getMonth() + 1; //月
				let date = _date.getDate(); //日
				let day = _date.getDay(); // 天
				let canlender = [];
				// console.log(selected)
				let dates = {
					firstDay: new Date(year, month - 1, 1).getDay(),
					lastMonthDays: [], // 上个月末尾几天
					currentMonthDys: [], // 本月天数
					nextMonthDays: [], // 下个月开始几天
					endDay: new Date(year, month, 0).getDay(),
					weeks: []
				}

				// 循环上个月末尾几天添加到数组
				for (let i = dates.firstDay; i > 0; i--) {
					dates.lastMonthDays.push({
						'date': new Date(year, month, -i).getDate() + '',
						'month': month - 1
					})
				}
				// 循环本月天数添加到数组
				for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
					let have = false;
					for (let j = 0; j < selected.length; j++) {
						let selDate = selected[j].date.split('-');

						if (Number(year) === Number(selDate[0]) && Number(month) === Number(selDate[1]) && Number(i) === Number(selDate[2])) {
							have = true;
						}
					}
					dates.currentMonthDys.push({
						'date': i + "",
						'month': month,
						have
					})
				}
				// 循环下个月开始几天 添加到数组
				for (let i = 1; i < 7 - dates.endDay; i++) {
					dates.nextMonthDays.push({
						'date': i + '',
						'month': month + 1
					})
				}

				canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays)
				// 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
				for (let i = 0; i < canlender.length; i++) {
					if (i % 7 == 0) {
						dates.weeks[parseInt(i / 7)] = new Array(7);
					}
					dates.weeks[parseInt(i / 7)][i % 7] = canlender[i]
				}


				// 渲染数据
				this.selectDay = month + "月" + date + "日"
				this.canlender.weeks = dates.weeks
				this.canlender.month = month
				this.canlender.date = date
				this.canlender.day = day
				this.canlender.year = year

// 				month = month < 10 ? "0" + month : month
// 				date = date < 10 ? "0" + date : date
				this.$emit('getdate', {
					year,
					month,
					date
				})
			},
			/**
			 * 时间计算
			 */
			getDate(date, AddDayCount, str = 'day') {
				if (typeof date !== 'object') {
					date = date.replace(/-/g, "/")
				}
				let dd = new Date(date)
				switch (str) {
					case 'day':
						dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
						break;
					case 'month':
						dd.setMonth(dd.getMonth() + AddDayCount) // 获取AddDayCount天后的日期
						break;
					case 'year':
						dd.setFullYear(dd.getFullYear() + AddDayCount) // 获取AddDayCount天后的日期
						break;
				}
				let y = dd.getFullYear()
				let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) // 获取当前月份的日期，不足10补0
				let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
				return y + '-' + m + '-' + d
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100upx;
		background: #fff;
		z-index: 10000;
		// background: $uni-bg-color-grey;
		font-size: $uni-font-size-lg;
	}

	.calendar-box {
		width: 100%;
		box-sizing: border-box;
		transition: all 0.3s;

	}

	.calendar-wrapper {
		width: 100%;
		box-sizing: border-box;
		font-size: 26upx;
		background: #fff;
		transition: all 0.3s;
		.content {
			.calendar-panel {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				height: 80upx;

				.date-befor,
				.date-after {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 80upx;
					width: 80upx;
					text-align: center;
					line-height: 80upx;
					&.rollback {
						transform: rotate(180deg);
					}
				}

				.calendar-panel-box {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 200upx;
				}

				.backtoday {
					position: absolute;
					right: 0;
					top: 15upx;
					padding: 0 10upx;
					padding-left: 20upx;
					height: 50upx;
					line-height: 50upx;
					border: 1px #52b8f5 solid;
					border-right: none;
					font-size: 28upx;
					border-top-left-radius: 50upx;
					border-bottom-left-radius: 50upx;
					color: #52b8f5;
					background: rgba(82, 184, 245, 0.1);
				}

			}

			.calendar-header {
				display: flex;
				font-size: $uni-font-size-base;
				border-top: 1px #f5f5f5 solid;
				.week {
					width: 100%;
					text-align: center;
					line-height: 80upx;
					color: #52b8f5;
				}
			}

			.calendar-body {
				display: flex;
				flex-wrap: wrap;
				font-size: $uni-font-size-base;

				.calender-body-date-week {
					display: flex;
					width: 100%;
					border-bottom: 1px #f5f5f5 solid;
					&:last-child{
						border: none;
					}
					// 日期的样式
					.date {
						position: relative;
						width: 100%;
						text-align: center;
						color: $uni-text-color;
						background: #fff;
						line-height: 100upx;
						transition: all 0.2s;

						// 本月可选的样式
						&.active {
							background: red;
						}

						// 本月禁止的样式
						&.disable {
							color: $uni-text-color-disable;
						}

						// 当前选中
						&.date-current {
							background: #52b8f5;
							color: #fff;
						}

						.data-circle {
							position: absolute;
							bottom: 10upx;
							left: 0;
							right: 0;
							margin: auto;
							width: 10upx;
							height: 10upx;
							border-radius: 50%;
							background: #ff5a5f;
							z-index: 2;
						}
					}
				}
			}
		}
	}
</style>
