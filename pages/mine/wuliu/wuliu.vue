<template>
	<view>
		<view class="public_item">
			<item-public></item-public>
		</view>
		<view class="items">
			<view class="ul">
				<view class='li'>订单编号： <text class="text">GZCLTX2018010800008</text></view> 
				<view class='li'>物流公司： <text class="text">顺丰快递</text></view> 
				<view class='li'>运单号： <text class="text">128888888888</text></view>
			</view>
		</view>
		<view class="timeLine">
			<view class="detail">
				<image class="new" src="../../../static/s_addr.png" mode=""></image>
				<view class="info">
					<view class="h1">【<text class="addr">广州市</text>】<text class="sure">提交订单，请等待系统确认</text></view> 
					<text class="time">2018.01.10  16:23:09</text>
				</view> 
			</view>
			<view class="detail">
				<image class="new" src="../../../static/s_addr.png" mode=""></image>
				<view class="info">
					<view class="h1">【<text class="addr">广州市</text>】<text class="sure">提交订单，请等待系统确认</text></view> 
					<text class="time">2018.01.10  16:23:09</text>
				</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import itemPublic from '../../../components/item_public/item_public.vue'
	export default {
		components:{
			itemPublic
		},
		data(){
			return{
				
			}
		},
		mounted(){
			
		},
		methods:{
			
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...'
			});
			setTimeout(function(){
				uni.hideLoading()
			},1000)
		}
	}
</script>

<style scoped> 
	.public_item{
		padding: 15upx 15upx 5upx;
		background-color: #FFFFFF;
	}
	.items {
		background-color: #FFFFFF;
		margin-top: 13upx;
		padding: 0 15upx;
	}
	.items .ul .li {
		border-bottom: 1upx solid rgba(7,17,27,0.1);
	}
	.items .ul .li:last-child{
		border: none;
	}
	.items .ul .li {
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		color: #616166;
	}
	.items .ul .li .text {
		color: #030303;
	}
	.timeLine {
		background: white;
		margin-top: 13upx;
		padding: 15upx;
	}
	.detail {
		position: relative;
		border-left: 1upx solid #DDDDDD;
		margin-left: 20upx;
		padding-bottom: 10upx;
	}
	.timeLine .new {
		position: absolute;
		top: 0upx;
		transform: translateX(-16upx);
		width: 32upx;
		height: 32upx;
	}
	.timeLine .detail .info .h1 {
		font-size: 28upx;
		color: #919199;
		line-height: 40upx;
	}
	.timeLine .detail .info {
		width: 70%;
		font-size: 0;
		margin-left: 15upx;
	}
	.timeLine .detail .info .time {
		display: inline-block;
		margin-top: 4upx;
		margin-left: 15upx;
		font-size: 24upx;
		color: #919199;
	}
	
</style>
