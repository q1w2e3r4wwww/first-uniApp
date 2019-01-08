<template>
	<view class="main">
		<!-- #ifdef APP-PLUS -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar fixed="true" left-icon="location" @click-left="chooseLocation" @click-right="scanCode" :left-text="locationAddress"
		 right-icon="scan" title="驾图预想"></uni-nav-bar>
		<!-- 占位用的导航栏 -->
		<uni-nav-bar background-color="rgba(0,0,0,0)" status-bar="true"></uni-nav-bar>
		<!-- #endif -->
		<view class="wrapper">
			<swiper class="my_swiper" indicator-active-color="rgba(0, 128, 128,0.8)" indicator-color="rgba(255,255,255,0.6)"
			 :indicator-dots="indicatorDots" :autoplay="autoplay" circular="true" :duration="duration">
				<!-- 添加这个属性circular="true"   轮播图更流畅，到最后一张图时，继续滑动会顺向滑动到第一张 -->
				<swiper-item v-for="item in lunbo_img" :key="item">
					<image class="my_lunbo" :src="item" lazy-load="true" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="info">
			<view class="my_img">
				<image src="../../static/yxlogo.png" mode=""></image>
			</view>
			<view class="info_gb">
				<image src="../../static/img/gunagb.png" mode=""></image>
				<swiper class="neir" vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item><navigator>赶紧行动，成为车联网车主！！！</navigator></swiper-item>
					<swiper-item><navigator>活动最新消息！！！</navigator></swiper-item>
					<swiper-item><navigator>你敢买，我敢送！！！</navigator></swiper-item>
				</swiper>
			</view>
		</view>
		<view class="content-body">
			<view class="content-body-info" @tap="goSlideview">
				<image src="../../static/car.png" mode=""></image>
			</view>
			<view class="page-section">
				<view class="list-view content-section">
					<view class="item list-item" @tap="clickItem(index)" v-for="(item,index) in items" :key="index">
						<image :src="item.img" mode=""></image>
						<text class="title">{{item.name}}</text>
						<view class="sum_buy">
							<view class="money">
								<text class="money_je">¥1395</text><text class="yuan">元</text>
							</view>
							<text class="cont">购买</text>
						</view>
					</view>
				</view>
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
		</view>
	</view>
</template>
<script>
	import loadMore from '../../components/load-more.vue'
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
	export default {
		data() {
			return {
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				items: [{
						'name': '【驾图】产品服务即可加入车联网',
						'img': '../../static/item_1.png'
					},
					{
						'name': '蜜糖卡密激活码',
						'img': '../../static/item_2.png'
					},
					{
						'name': '【驾图】产品服务即可加入车联网',
						'img': '../../static/item_1.png'
					},
					{
						'name': '蜜糖卡密激活码',
						'img': '../../static/item_2.png'
					}
				],
				screenHeight: '',
				lunbo_img: ['../../static/1.png', '../../static/2.jpg', '../../static/3.jpg'],
				indicatorDots: true, //显示指示点
				autoplay: true,
				interval: 3000,
				duration: 1000,
				locationAddress: '位置'
			}
		},
		computed: mapState(['hasLogin', 'isLogin', 'username', 'isGesturePW','tipCount']), // 获取Vuex仓库里面的状态值
		onLoad() {
			// 首次加载的时候判断用户名是否存在，如果存在，将该用户名存于vuex中
			let name = uni.getStorageSync('username');
			if (name) {
				this.setUsername(name);
			};
			this.$nextTick(function() {
				this.getNetstate();
				this.netState();
			});
		},
		onShow() {
			if (this.username) {
				uni.setStorageSync('username', this.username); // 将用户名缓存，下次登录的时候用
			};
			if(this.hasLogin){ // 如果登录成功，则获取返回的提示信息数量
				if(this.tipCount === 0){
					uni.removeTabBarBadge({
						index:3
					})
				}else{
					uni.setTabBarBadge({
						index: 3, // index是3表示给tabbar我的  右上角添加提示信息
						text: ''+this.tipCount+'', // 这里的text内容不需是字符串
						success(res) {
							console.log(JSON.stringify(res)) 
						}
					})
				}
			}
		},
		onReachBottom() { //上拉加载方法
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			setTimeout(() => {
				if (this.items.length > 26) {
					this.loadingType = 2;
					return;
				}
				this.items.push({
					'name': '【驾图】产品服务即可加入车联网',
					'img': '../../static/item_1.png'
				}, {
					'name': '【驾图】产品服务即可加入车联网1',
					'img': '../../static/item_1.png'
				})
				this.loadingType = 0;
			}, 800);
		},
		onPullDownRefresh() { //监听下拉刷新
			let _this = this;
			setTimeout(function() {
				uni.stopPullDownRefresh(); // 关闭下拉刷新
				if (_this.items.length > 26) {
					uni.showToast({
						title: "没有新内容了",
						icon: "none",
					});
					return;
				} else {
					_this.items.push({
						'name': '【驾图】产品服务即可加入车联网',
						'img': '../../static/item_1.png'
					})
				}
			}, 2000)
		},
		mounted: function() {
			this.$nextTick(function() {
				this.getHeight();
			})
		},
		methods: {
			...mapMutations(['setUsername']), // 触发vuex中mutation下的setUsername方法，把获取到的缓存的用户名存于vue中
			clickItem(index) { // 点击功能菜单
				if (!this.hasLogin && this.isGesturePW == false) { // 判断登录状态及手势密码是否开启
					uni.navigateTo({
						url: '../login/login'
					});
				} else if (this.hasLogin) { // 如果登录了
					uni.navigateTo({
						url: 'buyitem/buyitem'
					});
				}
			},
			getNetstate() {
				let _this = this;
				uni.getNetworkType({
					success: (res) => {
						_this.stateText(res);
					}
				});
			},
			stateText(res) {
				let _this = this;
				if (res.networkType == '4g' || res.networkType == 'wifi') {
					return;
				} else {
					_this.tipText();
				}
			},
			tipText() {
				let _this = this;
				uni.showModal({
					title: '温馨提示', //提示的标题---必填
					content: '连接超时，或本级已与网络断开！', //提示的内容---必填
					showCancel: true, // 是否显示取消按钮
					cancelText: '返回登录',
					confirmText: '重连',
					success(res) {
						if (res.confirm) {
							_this.getNetstate();
						} else if (res.cancel) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			},
			netState: function() {
				let _this = this;
				uni.onNetworkStatusChange(res => { // 页面打开后就开始监听网络切换状态
					if (res.isConnected) {
						uni.showToast({
							title: '网络已切换至' + res.networkType + '',
							duration: 3000
						});
					} else {
						_this.tipText();
					}
				});
			},
			goSlideview() {
				uni.navigateTo({
					url: '../API/textWeex/textWeex'
				})
			},
			scanCode() {
				uni.scanCode({
					onlyFromCamera: false, //是否只能从相机扫码
					success(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				})
			},
			chooseLocation() { // 接收子组件的点击事件状态
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			getHeight() {
				let _this = this;
				uni.getSystemInfo({
					success: function(res) {
						_this.screenHeight = res.screenHeight; // 获取手机屏幕高度
					}
				})
			},
		},
		components: {
			loadMore,
			uniNavBar
		}
	}
</script>

<style>
	.main {
		position: relative;
		box-sizing: border-box;
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.input-view {
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
		align-items: center;
		display: flex;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30upx;
		border-radius: 15upx;
		padding: 0 10upx;
	}

	.input {
		flex: 1;
		padding: 0 5upx;
	}

	.wrapper,
	.my_swiper,
	.my_lunbo {
		width: 100%;
		height: 360upx;
	}

	.uni-list-cell {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 80%;
		margin: 10upx auto;
		border-radius: 20upx;
		padding-left: 15upx;
		background-color: #000000;
		opacity: 0.2;
	}

	.uni-list-cell .uni-input {
		width: 100%;
		text-align: center;
	}

	.info {
		display: flex;
		width: 100%;
		height: 60upx;
		box-sizing: border-box;
		padding: 10upx 15upx 0;
		background-color: #FFFFFF;
		margin-top: 10upx;
		border-bottom: 1upx solid #999999;
	}

	.info .my_img {
		width: 110upx;
		height: 40upx;
		border-right: 1upx solid #333333;
	}

	.info .my_img image {
		width: 80%;
		height: 100%;
	}

	.info .info_gb {
		display: flex;
		flex: 1;
		flex-wrap: nowrap;
		box-sizing: border-box;
		padding-left: 15upx;
	}

	.info_gb image {
		width: 40upx;
		height: 40upx;
	}

	.info_gb .neir {
		margin-left: 15upx;
		color: #999999;
	}

	swiper {
		transform: translateY(-6upx);
		width: 100%;
		height: 100%;
	}

	/* 主内容 */
	.content-body-info {
		padding: 0 10upx;
	}

	.content-body-info image {
		width: 100%;
		height: 200upx;
	}

	.content-section {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin-bottom: 15upx;
	}

	.content-section .item {
		width: 50%;
		margin-top: 15upx;
		padding-bottom: 10upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6upx;
	}

	.content-section .item:nth-child(odd) {
		padding: 0 10upx 0 15upx;
	}

	.content-section .item:nth-child(even) {
		padding: 0 15upx 0 10upx;
	}

	.content-section .item .title {
		display: inline-block;
		width: 100%;
		height: 100upx;
	}

	.content-section .item .sum_buy {
		display: flex;
		justify-content: space-between;
	}

	.content-section .item image {
		width: 100%;
		height: 336upx;
	}

	.money {
		color: red;
	}

	.money .yuan {
		font-size: 20upx;
		/* 10像素 */
		margin-left: 6upx;
	}

	.cont {
		height: 36upx;
		line-height: 36upx;
		width: 80upx;
		text-align: center;
		font-size: 24upx;
		background-color: transparent;
		color: #F55C23;
		border: 1upx solid #F55C23;
		border-radius: 6upx;
	}
</style>
