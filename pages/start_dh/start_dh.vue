<template>
	<view>
		<!-- <view class="animate_img" style="background: url(../../static/qidong.png);" :style="{height:height}">
			<image class="am_img" src="../../static/qidong.png" mode=""></image>
			<text class="tiaoz" @tap="go_index_new">{{time}}跳过</text> 
		</view> -->
		<swiper class="animate_img" :style="{height:height}"
				indicator-active-color="rgba(0, 128, 128,0.8)"
				indicator-color="rgba(255,255,255,0.6)" 
				:indicator-dots="indicatorDots" 
				:duration="duration"
				@change="currentChange">
			<!-- 添加这个属性circular="true"   轮播图更流畅，到最后一张图时，继续滑动会顺向滑动到第一张 -->
			<swiper-item v-for="item in lunbo_img" :key="item">
				<image class="my_lunbo" :src="item" lazy-load="true" mode=""></image>
			</swiper-item>
		</swiper>
		<button  v-if="current === 2" @tap="go_index_new" class="button" size="mini" type="primary">立即体验</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				height:0,
				lunbo_img:['../../static/1.png','../../static/2.jpg','../../static/3.jpg'],
				indicatorDots: true,//显示指示点
				duration: 600,
				current:0,
				animationData: {}, // 动画
			}
		},
		onLoad:function(){
			this.$nextTick(function(){
				this.getbodyHeight();
			})
		},
		methods:{
			currentChange: function (e) {
				this.current = e.mp.detail.current;
			}, 
			getbodyHeight(){
				let _this = this;
				uni.getSystemInfo({
					success:function(res){
						// 手机屏幕高度 - 状态栏高度
						_this.height = (res.screenHeight - res.statusBarHeight) + 'px';
					}
				})
			},
			go_index_new(){
				uni.reLaunch({ //关闭页面，跳转到指定页面 
					url:'../component/component'
				});
			}
		}
	}
</script>

<style scoped> /* 添加scoped表示该CSS为此页面私有的样式*/
	.animate_img{
		position: relative;
		top: var(--status-bar-height);
	} 
	.my_lunbo{
		width: 750upx;
		height: 100%;
	}
	.tiaoz{
		position: absolute;
		top: 40upx;
		right: 40upx;
		color: #FFFFFF;
	}
	.button{
		position: absolute;
		left: 0;
		right: 0;
		width: 280upx;
		margin: 0 auto;
		bottom: 100upx;
	}
</style>
