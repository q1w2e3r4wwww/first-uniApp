
// 这里是vuex的仓库

import Vue from 'vue'
import Vuex from 'vuex'

// 在模块化系统中，一定要先注册vuex
Vue.use(Vuex) // ，然后在入口文件main.js里面挂载Vuex

const store = new Vuex.Store({ // 创建store仓库，并暴露出去
	state: { // 定义全局要使用的状态值，
		hasLogin: false,
		username: "",
		isLogin:false,
		gesturePassword:"", // 手势登录密码
		isGesturePW:false, // 手势密码是否开启
		avatar:"" ,// 头像,
		tipCount:4 // 信息提示的数量
	},
	mutations: { // 用来操作state状态的，也是唯一能更改state状态的唯一方法途径
		// 以下是保存相关数据
		login(state,provider) { // provider是登录页面登录的信息,如果页面上传过来的是一个参数，那么provider就等于这个参数就，如果传过来的是一个对象，那么provider就是一个对象
			state.hasLogin = true;
			state.isLogin  = true;
			if(provider.name){
				state.username = provider.name; // 用户名
				state.avatar = provider.avatar; // 微信头像
			}else{
				state.username = provider;
			}
			
		},
		logout(state) {
			state.hasLogin = false
			state.username = ''; // 用户名
		},
		setUsername(state,provider){ 
			state.username = provider; // 缓存用户名
		},
		changeGesPw(state,provider){ // 是否开启手势密码
			state.isGesturePW = provider;
		},
		changeTipCount(state,provider){ // 改变提示信息的数量
			console.log(state.tipCount - provider)
			let newTipCount = state.tipCount - provider;
			state.tipCount = newTipCount;
		}
	},
	/* actions: { // 触发mutations来改变state的状态
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	} */
})

export default store // 暴露出去，让其他页面可以调用
