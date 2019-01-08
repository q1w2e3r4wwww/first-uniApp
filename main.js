import Vue from 'vue'
import App from './App'

// 在入口文件中引入Vuex的仓库
import store from './store'
Vue.prototype.$store = store // 挂载了VueX  Vuex是状态管理模式，，，然后哪个页面需要用到状态管理就引用

Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
