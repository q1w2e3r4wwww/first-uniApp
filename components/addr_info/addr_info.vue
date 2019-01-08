<template>
	<view>
		<view class="info">
			<view class="top-info">
				<text class="name">王涛</text>
				<text class="phone">187****6794</text>
				<text class="active-addr">默认地址</text>
			</view>
			<view class="addr-detail">
				<image class="img" src="../../../static/addr.png" mode=""></image>
				<text class="text" style="color: #919199;">广东省深圳市龙岗区龙城街道草根创业园</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	/*地址信息*/
	.info{
		padding: 10upx 15upx;
		background-color: #FFFFFF;
	}
	.top-info{
		height: 48upx;
		line-height: 48upx;
	}
	.top-info .name,.top-info .phone{
		font-size: 32upx;
		color: #030303;
		line-height: 32upx;
		padding-right: 8upx;
	}
	.info .top-info .active-addr{
		font-size: 20upx;
		padding: 4upx 7upx;
		border-radius: 4upx;
		color: white;
		background-color: #41BFFF;
		vertical-align: middle;
		margin-left: 10upx;
	}
	.info .addr-detail{
		margin: 6upx 0;
		height: 28upx;
		font-size:0 ;
	}
	.info .addr-detail .img{
		width: 24upx;
		height: 24upx;
		margin-right: 8upx;
	}
	.info .addr-detail .text{
		font-size: 28upx;
		vertical-align: bottom;
	}
</style>
