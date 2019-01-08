<template>
	<view>
		<view class="myItems">
			<view class="img">
				<image src="../../../static/item_1.png" mode=""></image>
			</view>
			<view class="text">
				<text class="title">会赚积分的车载盒子 驾驶智能器  包含激活码  一键定位</text>
				<text class="leix">规格：个</text>
				<text class="money">￥{{itemPrice}}</text>
			</view>
			<view class="count">x{{count}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				itemPrice:1395,
				count:1
			}
		},
		onShow() {
			//子组件发射自定义事件sendiptVal 并携带要传递给父组件的值，
			this.$emit('sendiptVal',this.itemPrice)
		}
	}
</script>

<style scoped="scoped">/* 添加scoped 表示该样式为私有的*/
	@import "../../common/uni.css";
	 .myItems{
		display: flex;
		justify-content: flex-start;
		position: relative;
	}
	 .myItems .count{
		position: absolute;
		right: 15upx;
		bottom: 10upx;
		font-size: 20upx;
		color: #616166;
	}
	 .myItems .text{
		font-size: 0;
	}
	 .myItems .text .title{
		color: #2B313B;
		font-size: 28upx;
		line-height: 40upx;
	}
	 .myItems .text .leix{
		display: block;
		margin-top: 6upx;
		color: #919199;
		font-size: 28upx;
		line-height: 40upx;
	}
	 .myItems .text .money{
		display: block;
		margin-top: 6upx;
		color: #FF5555;
		font-size: 20upx;
	}
	 .myItems .img{
		margin-right: 15upx;
	}
	 .myItems .img image{
		width: 160upx;
		height: 160upx;
	}
</style>
