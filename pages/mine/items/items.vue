<template>
	<view class="main">
		<view class="top">
			<view class="ul">
				<!-- v-for的遍历需要添加一个唯一key -->
				<text class="li" v-for="(title,index) in titles" :class="{active : arrent===index}" :key="index" @click="getIndex(index)">{{title}}</text>
			</view>
		</view>
		<view class="items">
			<view class="title">
				<view>订单编号：<text class="data">201712128888</text></view>
				<text v-show="puy_seccuss === 1" class="detail handle">待支付</text>
				<text v-show="puy_seccuss === 2" class="detail delivery">待收货</text>
				<text v-show="puy_seccuss === 3" class="detail assess">待评价</text>
				<text v-show="puy_seccuss === 4" class="detail complete">已完成</text>
			</view>
			<view class="item-info">
				<item-public></item-public> 
				<view class="num">
					<view class="count">共<text>1</text>件商品</view>
					<view class="pay-num">合计：<text class="money">¥1395.00</text>（含运费：<text class="yun">0.00</text>）</view>
				</view>
				<view class="control">
					<text @tap="navigateTo" class="refund">退款</text>
					<text @tap="toDetail" class="lookitem">查看订单</text>
					<text @tap="goPay" class="gopay">去付款</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import itemPublic from '../../../components/item_public/item_public.vue'
	export default {
		data(){
			return{
				titles:['全部','待支付','待收货','待评价','已完成'],
				arrent:0,
				puy_seccuss:1
			}
		},
		mounted:function(){
			
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...'
			});
			setTimeout(function(){
				uni.hideLoading()
			},1000)
		},
		methods:{
			getIndex(i){
				this.arrent = i;
				if(i == 0){
					this.puy_seccuss = 1;
				}else{
					this.puy_seccuss = i;
				}
				 
			},
			navigateTo(){
				uni.navigateTo({
					url:'../tui_item/tui_item'
				})
			},
			toDetail(){
				uni.navigateTo({
					url:'../item_detail/item_detail'
				})
			},
			goPay(){
				uni.navigateTo({
					url:'../pay/pay'
				})
			}
		},
		components:{
			itemPublic
		}
	}
</script>

<style>
	@import "../../../common/uni.css";
	.main{
		position: relative;
	}
	.main .top .ul {
		display: flex;
		justify-content: space-around;
		height: 80upx;
		line-height: 80upx;
	}
	.main .top,.main .items{
		background-color: #FFFFFF;
	}
	.main .top .ul .li {
		font-size: 28upx;
		color: #919199;
	}
	.main .top .ul .li.active {
		color: #41BFFF;
		border-bottom: 4upx solid #41BFFF;
	}
	.main .items {
		margin-top: 10upx;
		padding: 15upx 0 0;
	}
	.main .items > .title {
		display: flex;
		justify-content: space-between;
		padding: 0 15upx;
	}
	.main .items .title .detail{
		font-size: 28upx;
	}
	.main .items .title .handle{
		color: #FF557F;
	}
	.main .items .title .delivery{
		color: #41BFFF;
	}
	.main .items .title .assess{
		color: #FFB41D;
	}
	.main .items .title .complete{
		color: #919199;
	}
	/*订单信息*/
	.item-info{
		margin-top: 10upx;
		padding: 10upx 15upx;
		border-top: 1upx solid rgba(7,17,27,0.1);
	}
	.item-info .num{
		display: flex;
		justify-content: flex-start;
		border-top: 1upx solid rgba(7,17,27,0.1);
		padding: 10upx 0;
		margin-top: 10upx;
		font-size: 20upx;
		color: #616166;
	}
	.item-info .num .count{
		margin-right: 15upx;
	}
	.item-info .control{
		display: flex;
		justify-content: flex-end;
	}
	.item-info .control text{
		font-size: 24upx;
		padding: 4upx 16upx;
		border: 1upx solid #DDDDDD;
		margin-left: 16upx;
	}
	.item-info .control .refund,.item-info .control .lookitem{
		color: #616166;
	}
	.item-info .control .gopay{
		color: #ffffff;
		background: #41BFFF;
	}
</style>
