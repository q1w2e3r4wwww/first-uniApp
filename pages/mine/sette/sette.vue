<template>
	<view class="main">
		<view class="uni-list" v-for="(item,index) in list" :key="index">
			<view class="uni-list-cell uni-list-cell-pd">
				<view @tap="change_gesture()" class="uni-list-cell-db">{{item.value}}</view>
				<switch v-if="index == 0" @change="checkChange" :checked="isChecked" /> <!-- 这个组件的方法，不能添加(),不然不能获取值-->
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" @tap="mClick(index)" v-for="(item,index) in flist" :key="index">
				<view class="uni-list-cell-navigate uni-navigate-right">
					{{item.value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				list:[
					{'value':'手势密码'},
					{'value':'更新检测'},
					],
				flist:[
					{'value':'分享推送'},
					{'value':'关于我们'},
				],
				isChecked:false
			};
		},
		onLoad() {
			this.changeGesPw(this.isChecked);
		},
		onShow() {
			uni.setStorageSync('ischeck',this.isChecked); // 缓存手势密码状态
			let val = uni.getStorageSync('ischeck');
			if(val != undefined){
				console.log(val)
				this.isChecked = val;
			}
		},
		methods: {
			...mapMutations(['changeGesPw']),
			mClick(index){
				switch(index){
					case 0:
						uni.share({ // 分享到微信聊天界面 
							provider: "weixin",
							scene: "WXSceneSession",
							type: 0,
							href: "http://uniapp.dcloud.io/",
							title: "uni-app分享",
							summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
							imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function (err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
					break;
					case 1:
					break;
				}
			},
			change_gesture() {
				console.log('点击了手势密码');
			},
			checkChange(e){
				let isTrue =  e.target.value;
				let _this = this;
				if(isTrue){
					_this.isChecked = true;
					uni.navigateTo({
						url:'../../gesture-lock/gesture-lock'
					})
				}else{
					_this.isChecked = false;
					uni.showModal({
						title:'APP提示：',
						content:'确认关闭手机密码吗？',
						success: (res) => {
							if(res.confirm){
								_this.isChecked = false;
								_this.changeGesPw(false);
								uni.navigateTo({
									url:'../../gesture-lock/gesture-lock'
								})
							}else{
								_this.isChecked = true;
							}
						}
					})
				}
			}
		},
	}
</script>

<style>
	@import "../../../common/uni.css";
	.main{
		height: 100%;
		box-sizing: border-box;
		padding-top: 15upx;
	}
	.uni-list{
		margin-top: 15upx;
	}
</style>
