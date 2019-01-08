<template>
	<view>
		<view class="tip">
			地址信息
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="list-left left-first">
					收货人
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请填写收货人姓名" v-model="inputClearName" @input="bindClearName" />
					<view class="clear" v-show="showClearName">
						<image @tap="clearValue(0)" class="clear-img" src="../../../../static/clear.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="list-left">
					联系电话
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" placeholder="请填写联系人电话" v-model="phone_Number" @input="bindClearNum" />
					<view class="clear" v-show="showClearNum">
						<image @tap="clearValue(1)" class="clear-img" src="../../../../static/clear.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 81upx;">
				<view class="list-left uni-navigate-right">
					所在地区
				</view>
				<view class="uni-list-cell-db">
					<view @click="showMulLinkageThreePicker">
						<text v-show="areaIs" style="color: #777777;">地区选择</text><text v-show="pickerText">{{pickerText}}</text>
					</view>
					<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
					 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
				</view>
			</view>
			<view class="uni-list-cell uni-list-cell-last">
				<view class="list-left">
					详细地址
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请补充详细地址信息" v-model="inputClearAddr" @input="bindClearAddr" />
					<view class="clear" v-show="showClearAddr">
						<image @tap="clearValue(2)" class="clear-img" src="../../../../static/clear.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view @tap="goAddr_gl()" class="footer">
			<text class="button">保存收货信息</text>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker,
		},
		data() {
			return {
				inputClearName: "",
				phone_Number: '',
				inputClearAddr: '',
				showClearAddr: false,
				showClearNum: false,
				showClearName: false,
				areaIs: true,
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				newAddr: {},
			}
		},
		methods: {
			goAddr_gl() {
				let reg = new RegExp("-", "g"); //使用正则表达式删除字符串中指定的且有多个的字符
				this.pickerText = this.pickerText.replace(reg, '');
				this.newAddr.name = this.inputClearName;
				this.newAddr.phone = this.phone_Number;
				this.newAddr.addr = this.pickerText + this.inputClearAddr;
				let str = JSON.stringify(this.newAddr); // 因为这里参数不能传递对象，需要先将其转换为json字符串，然后在接收参数的地方再将其转换为json对象，即可达到传对象为参数的目的
				uni.navigateTo({
					url: '../addr_gl/addr_gl?newAddr=' + str + ''
				})
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.pickerText = e.label;
				this.areaIs = false;
			},
			onCancel() {
				uni.showToast({
					title: '点击了取消'
				});
			},
			bindClearName: function() {
				if (this.inputClearName != '') {
					this.showClearName = true;
				} else {
					this.showClearName = false;
				}
			},
			bindClearNum() {
				if (this.phone_Number != '') {
					this.showClearNum = true;
				} else {
					this.showClearNum = false;
				}
			},
			bindClearAddr() {
				if (this.inputClearAddr != '') {
					this.showClearAddr = true;
				} else {
					this.showClearAddr = false;
				}
			},
			clearValue(val) {
				switch (val) {
					case 0:
						this.inputClearName = "";
						this.showClearName = false;
						break;
					case 1:
						this.phone_Number = "";
						this.showClearNum = false;
						break;
					case 2:
						this.inputClearAddr = "";
						this.showClearAddr = false;
						break;
					default:
						console.log("以上参数都不存在");
				}
			}
		},
		onBackPress() { // 三级联动，需要添加这个方法，不然在手机端运行很卡
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	}
</script>

<style scoped>
	.picker-item {
		font-size: 32upx;
		line-height: 70upx;
	}

	.clear {
		position: absolute;
		z-index: 100000;
		right: 40upx;
		width: 36upx;
		height: 36upx;
		top: 20upx;
	}

	.clear-img {
		width: 100%;
		height: 100%;
	}

	.uni-list-cell-db {
		padding: 0 30upx 0 60upx;
	}

	.list-left {
		padding-left: 30upx;
	}

	.left-first {
		padding-right: 32upx;
	}

	.tip {
		height: 50upx;
		line-height: 50upx;
		color: #999999;
		padding-left: 30upx;
		font-size: 28upx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		background: #DD524D;
		text-align: center;
	}

	.footer .button {
		display: inline-block;
		padding: 0;
		font-size: 32upx;
		color: #ffffff;
		border: none;
		background: transparent;
		line-height: 100upx;
	}
</style>
