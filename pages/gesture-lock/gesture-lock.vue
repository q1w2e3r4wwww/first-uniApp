<template>
	<view class="yz_login">
		<!-- #ifdef APP-PLUS -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar fixed="true" left-icon="back" @click-left="back" @click-right="showMenu" left-text="返回" right-text="注册"
		 title="手势登录"></uni-nav-bar>
		<!-- 占位用的导航栏 -->
		<uni-nav-bar background-color="rgba(0,0,0,0)" status-bar="true"></uni-nav-bar>
		<!-- #endif -->

		<view class="perinfo">
			<image src="../../static/photo.png" mode=""></image>
			<view class="phone">{{password}}</view>
		</view>

		<mpvue-gesture-lock :containerWidth="600" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
		<view class="tipinfo">
			<text class="text">忘记手势密码</text><text>|</text><text class="text">切换登录方式</text>
		</view>
	</view>
</template>

<script>
	import mpvueGestureLock from '../../components/mpvueGestureLock';
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import service_pw from '../../service_pw.js' // 保存手势密码的方法
	import {mapState,mapMutations} from 'vuex'
	
	export default {
		components: {
			mpvueGestureLock,
			uniNavBar
		},
		data() {
			return {
				password: [],
			}
		},
		onShow() {
			this.getPword();
		},
		computed:mapState(['username']),
		methods: {
			...mapMutations(['']),
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			showMenu() {
				uni.showToast({
					title: '点击了注册'
				})
			},
			getPword(){
				let pword = uni.getStorageSync('lsPassword'); // 获取缓存的手势密码
				if(pword){
					this.password = pword;
				}
			},
			goMine(){
				uni.navigateBack({
					delta:1
				})
			},
			showTip(val){
				uni.showToast({
					icon:'none',
					title:`${val}`,
					duration:500
				});
			},
			onEnd(data) {
				if(this.password.length){
					if (this.password.join('') === data.join('')) {
						this.showTip('手势设定完成');
						uni.setStorageSync('lsPassword',this.password);
						this.goMine();
					}else{
						this.showTip('两次手势不匹配');
						this.password = []; // 清空手势记录，重来
					}
				}else {
					this.showTip('请确认手势设定');
					this.password = data;
				}
			}
		}
	}
</script>

<style>
	body {
		background: #FFFFFF;
	}

	.yz_login {
		box-sizing: border-box;
		height: 100upx;
		width: 100%;
	}

	.perinfo {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 180upx;
		text-align: center;
		margin: 40upx 0;
	}

	.perinfo image {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		border: 2upx solid #FFFFFF;
	}

	.perinfo .phone {
		margin-top: 140upx;
	}

	.index-page .result {
		text-align: center;
		margin-top: 30px;
	}
	.tipinfo{
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 30upx;
		line-height: 30upx;
	}
	.tipinfo text{
		display: inline-block;
		margin-top: 20upx;
		color: #007AFF;
	}
	.tipinfo .text{
		width: 40%;
		text-align: center;
	}
</style>
