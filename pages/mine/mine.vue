<template>
	<view class="main">
		<view class="top">
			<image class="bg_top" src="../../static/bg_wave.png" mode=""></image>
			<view class="myPhoto">
				<image @tap="uploadFile()" class="title_photo" :src="myPhoto" mode=""></image>
			</view>
			<view class="name">
				<view class="detail" @tap="goLogin()">
					<text class="title">{{nickName}}</text>
					<text class="text">{{loginInfo}}{{username}}</text>
				</view>
				<view @tap="goUpdateinfo()" class="handle">
					<image src="../../static/updatemine.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="my_item">
			<text class="title">我的订单</text>
			<view class="tz-order text">
				<text>订单详情都在这呢</text>
				<view @tap="navigateTo" class="look">
					查看所有订单<image src="../../static/right.png"></image>
				</view>
			</view>
			<view class="myui">
				<view class="li" style="position: relative;" v-for="(items,index) in cdList" :key='index' 
							hover-class="ui-share-hover" @tap="itemTap(index,items.count)">
					<image :src="items.img"></image>
					<text class="title">{{items.title}}</text>
					<uni-badge v-show="count > 0" :text="items.count" type="danger"></uni-badge> <!-- 信息提示组件-->
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view v-if="index < (list.length - 1) ? show : hide" class="uni-list-cell" @tap="go_page(item.id)" 
			v-for="(item,index) in list" :key="index">
				<view class="uni-list-cell-navigate" :class="{'uni-navigate-right':index < list.length - 2}">
					<image :src="item.img" mode=""></image>
					<text class="title">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex' // 想获取Vuex全局的值，就得在对应页面引入vuex的mapState状态集合
	import uniBadge from "../../components/uni-badge.vue";
	export default {
		data() {
			return {
				list: [
					{
						'name': '我的收藏',
						'id': 'collect',
						'img': '../../static/xing.png'
					},
					{
						'name': '收货地址管理',
						'id': 'shaddr',
						'img': '../../static/addr.png',
					},
					{
						'name': '使用帮助',
						'id': 'help',
						'img': '../../static/help.png'
					},
					{
						'name': '辅助设置',
						'id': 'sette',
						'img': '../../static/settings.png'
					},
					{
						'name': '清理缓存',
						'id': 'data',
						'img': '../../static/ava_clear.png'
					},
					{
						'name': '退出登录',
						'id': 'exit',
						'img': '../../static/exit.png'
					}
				],
				cdList: [
					{ 
						'title': '待付款',
						'img': '../../static/moneypack.png',
						'count':2
					},
					{
						'title': '待收货',
						'img': '../../static/dtake.png',
						'count':0
					},
					{
						'title': '配送中',
						'img': '../../static/sending.png',
						'count':1
					},
					{
						'title': '待评价',
						'img': '../../static/dseccsion.png',
						'count':1
					},
					{
						'title': '退货/售后',
						'img': '../../static/glmine.png',
						'count':0
					}
				],
				myPhoto: '',
				tempFilePath: '',
				savedFilePath: '',
				showMask: false,
				item: '',
				loginInfo: '请登录',
				nickName: 'mir王',
				show: true,
				hide: false,
				count:0
			}
		},
		computed: mapState(['hasLogin', 'username', 'avatar','tipCount']), // 获取Vuex中state的状态值
		onLoad(e) { // 监听页面加载
			this.tempFilePath = '';
			this.savedFilePath = uni.getStorageSync('savedFilePath'); //缓存的图片根据key值savedFilePath来取对应的value
			this.getPhoto();
			this.wxPhoto();
		},
		onShow() {
			this.wxPhoto();
			this.item = uni.getStorageSync('concent');
			this.loginState();
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
		methods: {
			...mapMutations(['logout','changeTipCount']), // ...mapMutations是扩展运算符
			wxPhoto() {
				if (this.avatar) {
					this.myPhoto = this.avatar; // 微信登录的头像
				}
			},
			goLogin() {
				if (this.hasLogin) { // 如果登录信息存在
					return;
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			itemTap(index,count){
				switch(index){
					case 0:
						break;
					case 1:
						break;
					case 2:
						this.goPeisong(count);
						break;
					case 3:
						break;
					case 4:
						break;
				}
			},
			goPeisong(count) {
				console.log(count);
				let photo = '',
					_this = this;
				if (this.tempFilePath != '') {
					photo = this.tempFilePath;
				} else if (this.tempFilePath == '' && this.savedFilePath != '') {
					photo = this.savedFilePath;
				}
				uni.navigateTo({
					url: '../mine/send/send?myPhoto=' + photo + '',
					success() {
						_this.changeTipCount(count); // 调用vuex的仓库Index.js中的mutations下的changeTipCount方法
					}
				})
			},
			// 判断登录状态
			loginState() {
				if (this.hasLogin) { // 如果登录信息存在
					this.loginInfo = '';
					this.hide = true;
				} else if (!this.hasLogin) {
					this.loginInfo = '请登录';
					this.hide = false;
				}
			},
			goUpdateinfo() {
				uni.navigateTo({
					url: '../mine/updateInfo/updateInfo?nickName=' + this.nickName + ''
				})
			},
			getPhoto() {
				if (this.tempFilePath != '') {
					this.myPhoto = this.tempFilePath;
				} else if (this.tempFilePath === '' && this.savedFilePath != '') {
					this.myPhoto = this.savedFilePath;
				} else {
					this.myPhoto = '../../static/photo.png';
				}
			},
			clear() {
				uni.setStorage('savedFilePath', '');
				uni.clearStorage(); // 清理所有缓存
				this.tempFilePath = '';
				this.savedFilePath = '';
				this.myPhoto = '';
				this.getPhoto();
				uni.showToast({
					title: '清理完成',
					duration: 300
				})
			},
			uploadFile() {
				var _this = this;
				uni.chooseImage({
					count: 1, //默认是9
					sizeType: ['compressed'], //压缩图
					sourceType: ['album'], //相册
					success: (res) => {
						_this.tempFilePath = res.tempFilePaths[0]; // 获取上传的相片路径
						_this.saveFile();
						_this.getPhoto();
					}
				})
			},
			saveFile() {
				var _this = this;
				uni.setStorageSync('savedFilePath', _this.tempFilePath); // 缓存图片,key:savedFilePath,value:_this.tempFilePath
				uni.showToast({
					title: '保存成功',
					duration: 1000
				})
			},
			navigateTo() {
				uni.navigateTo({
					url: 'items/items'
				})
			},
			go_page(id) {
				switch (id) {
					case 'collect':
						uni.navigateTo({
							url: '../../platforms/app-plus/tabbar/tabbar'
						})
						break;
					case 'shaddr':
						uni.navigateTo({
							url: 'addr_gl/addr_gl'
						})
						break;
					case 'help':
						break;
					case 'sette':
						uni.navigateTo({
							url: 'sette/sette'
						})
						break;
					case "data":
						this.clear();
						break;
					case "exit":
						let _this = this;
						uni.showModal({
							title: '测试APP提示：',
							content: '确定退出吗？',
							success: (res) => {
								if (res.confirm) {
									// 上面通过...mapMutations(['logout']),这个方法将Mutations的logout方法加载进来，然后这里通过this.logout()就可以请求到对应的vuex仓库里的方法
									_this.logout();
									_this.username = '';
									uni.navigateTo({
										url: '../login/login'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
						break;
				}
			},
		},
		components: {
			uniBadge
		}
	}
</script>

<style>
	.ui-share-hover {
		opacity: 0.9;
		transform: scale(1.2, 1.2);
	}

	.main {
		position: relative;
		/* 状态栏的高度 */
		/* top: var(--status-bar-height); */
	}

	.top {
		position: relative;
	}

	.bg_top {
		width: 100%;
		height: 300upx;
	}

	.title_photo {
		height: 120upx;
		width: 120upx;
		border-radius: 50%;
		border: 2upx solid #ffffff;
	}

	.myPhoto {
		position: absolute;
		top: 138upx;
		left: 56upx;
		height: 120upx;
		text-align: center;
	}

	.name {
		position: relative;
		transform: translateY(-14upx);
		width: 100%;
		height: 70upx;
		background: #ffffff;
	}

	.myPhoto,
	.name .detail {
		width: 200upx;
	}

	.name .detail {
		position: absolute;
		left: 56upx;
	}

	.name .detail .title {
		font-size: 28upx;
	}

	.name .detail text {
		display: block;
		transform: translateY(-30upx);
		text-align: center;
	}

	.name .detail .text {
		font-size: 22upx;
		color: #96A4B7;
	}

	.name .handle {
		position: absolute;
		z-index: 100000;
		right: 30upx;
		bottom: 16upx;
	}

	.name .handle image {
		width: 48upx;
		height: 48upx;
	}

	.my_item {
		background-color: #FFFFFF;
		padding: 10upx 15upx;
	}

	.my_item .title {
		display: block;
		margin-bottom: 6upx;
	}

	.my_item .tz-order {
		display: flex;
		justify-content: space-between;
		font-size: 22upx;
		color: #96A4B7;
	}

	.my_item .tz-order .look {}

	.my_item .tz-order image {
		transform: translateY(6upx);
		width: 22upx;
		height: 22upx;
	}

	.myui {
		margin-top: 15upx;
		display: flex;
		justify-content: space-between;
	}

	.myui .li {
		position: relative;
		text-align: center;
	}

	.uni-badge{ /* 引用的组件,要对该组件进行css操作,使用子组件的class名,不需要在引用的组件上添加class*/
		position: absolute;
		top: 0;
		right: 0;
		padding: 4upx;
	} 
	
	.myui .li image {
		width: 48upx;
		height: 48upx;
	}

	.myui .li .title {
		font-size: 22upx;
		color: #384150;
		line-height: 20upx;
	}

	.uni-list {
		margin-top: 13upx;
	}

	.uni-list-cell-navigate {
		border-top: 1upx solid transparent !important;
		border-bottom: none !important;
	}

	.uni-list-cell-navigate image {
		width: 40upx;
		height: 40upx;
	}

	.uni-list-cell-navigate .title {
		position: absolute;
		left: 120upx;
	}
</style>
