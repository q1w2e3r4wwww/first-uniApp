<template>
	<view class="myLogin">
		<view class="content" :style="{'min-height':(height - 20)+'px'}">
			<view class="main">
				<image style="width: 300upx;height: 300upx;" src="../../static/timg.gif" mode=""></image>
			</view>
			<view class="action-row">
				<view class="list">
					<view class="name">
						<image src="../../static/mine.png" mode=""></image>
						<input type="text" value="" v-model.trim="account" placeholder="请输入用户名" />
					</view>
					<view class="password">
						<image src="../../static/password.png" mode=""></image>
						<input type="text" value="" v-model.trim="password" placeholder="请输入密码" />
					</view>
					<view class="wjPass">
						<text @tap="goRegister()">注册账号</text> | <text>忘记密码</text>
					</view>
					<button type="primary" @tap="bindLogin" class="login">登录</button>
				</view>
			</view>
		</view>
		<view class="register">
			<view class="cont">
				<image @tap="wxLogin()" src="../../static/wxLogin.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapMutations
	} from 'vuex' // 把状态和方法都引进来
	export default {
		data() {
			return {
				account: '', // 用户名
				password: '',
				height: '',
				avatar: '', // 头像
				info: {}
			}
		},
		mounted() {
			this.getHeight();
		},
		methods: {
			...mapMutations(['login']), // 这里提交index.js中store仓库的mutations的Login方法
			wxLogin() { // 微信登录
				let _this = this;
				uni.showLoading({
					title:'正在努力登录...'
				});
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								uni.hideLoading();
								_this.info.name = infoRes.userInfo.nickName;
								_this.info.avatar = infoRes.userInfo.avatarUrl;
								_this.toMain(_this.info); // 把用户名传给方法toMain
							}
						});
					},
					fail(err) {
						uni.hideLoading(); 
					}
					
				});
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				let nameLen = this.account.length;
				let passwordLen = this.password.length;
				if(nameLen == 0){
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					});
					return;
				}else if (nameLen < 5) {
					uni.showToast({
						icon: 'none',
						title: '用户名最短为 5 个字符'
					});
					return;
				}
				if(passwordLen == 0){
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}else if (passwordLen < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					account: this.account,
					password: this.password
				};
				// some方法是用来方法内的内容，返回结果是否为true
				const validUser = service.getUsers().some(function(user) {
					return data.account === user.account && data.password === user.password;
				});
				if (validUser) {
					this.toMain(this.account); // 把用户名传给方法toMain
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户名或密码不正确',
					});
				}
			},
			toMain(userName) {
				if (userName) {
					this.login(userName); // 触发 mutations的login方法
					uni.showToast({
						title:'登录成功！',
						duration:1000
					})
					uni.navigateBack(); // 登录成功，返回首页
				}
			},
			goRegister() {
				uni.navigateTo({
					url: '../reg/reg'
				})
			},
			getHeight() {
				uni.getSystemInfo({
					success: (res) => {
						this.height = res.screenHeight; // 屏幕高度,当页面需要到状态栏顶部时，高度需要使用屏幕高度，如果需要导航栏存在，高度获取手机可用高度ScreenHeight
					}
				})
			}
		}
	}
</script>

<style>
	.myLogin {
		background: #FFFFFF;
	}

	.content {
		width: 100%;
	}

	.main {
		box-sizing: border-box;
		height: 600upx;
		text-align: center;
		padding-top: 150upx;
		background: radial-gradient(rgb(248, 248, 248), rgb(137, 162, 254), rgb(129, 155, 252), rgb(120, 147, 250));
	}

	.action-row {
		position: absolute;
		top: 500upx;
		left: 0;
		right: 0;
		width: 88%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 50upx 60upx;
		background: #FFFFFF;
		border-radius: 10upx;
		box-shadow: 10upx 10upx 5upx rgba(0, 0, 0, 0.1);
	}

	.list {
		box-sizing: border-box;
	}

	.list image {
		width: 40upx;
		height: 40upx;
		margin-right: 40upx;
		transform: translateY(4upx);
	}

	.list .name,
	.list .password {
		display: flex;
		flex-direction: row;
		margin-top: 40upx;
		border-bottom: 1upx solid #EEEEEE;
	}

	.wjPass {
		float: right;
		color: #999999;
		margin: 15upx 0;
	}

	.login {
		margin-top: 80upx;
		width: 100%;
		border-radius: 50upx;
		background: linear-gradient(rgb(129, 155, 252), rgb(137, 162, 254), rgb(129, 155, 252));
	}

	.register {
		transform: translateY(-80upx);
		width: 100%;
		height: 40upx;
		box-sizing: border-box;
		text-align: center;
		padding: 0 20upx;
		color: #999999;
	}

	.register .cont {
		position: relative;
	}

	.register .cont image {
		width: 100upx;
		height: 100upx;
	}

	.register .cont:before,
	.register .cont:after {
		content: '';
		position: absolute;
		/*定位背景横线的位置*/
		top: 50%;
		background: #999999;
		/*背景横线颜色*/
		width: 35%;
		/*单侧横线的长度*/
		height: 1px;
	}

	.register .cont:before {
		left: 2%;
	}

	.register .cont:after {
		right: 2%;
	}
</style>
