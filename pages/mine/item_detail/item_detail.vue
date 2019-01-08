<template>
	<view>
		<view><addr></addr></view>
		<view class="public_item">
			<item-public></item-public>
			<view class="prefer">
				<view class="pref">
					<text class="text">满减优惠：</text>
					<text class="data">- ¥0.00</text>
				</view>
				<view class="fare">
					<text class="text">运费：</text>
					<text class="data">+ ¥0.00</text>
				</view>
				<view class="fact right">
					<text class="shif">实付：</text><text class="pay">¥11.00</text>
				</view>
			</view>
			<view class="items-info">
				<view class="ul">
					<view class="li">订单信息</view>
					<view class="bot li"><text class="title">订单编号：</text><text class="text">{{item_number}}</text></view>
					<view class="bot li"><text class="title">订单日期：</text><text class="text">{{item_time}}</text></view>
					<view class="bot li"><text class="title">支付方式：</text><text class="text">微信支付</text></view>
					<view class="bot li"><text class="title">订单留言：</text><text class="text">这里是订单留言的内容超出部分……</text></view>
					<view class="bot li last"><text class="title">发票信息：</text><text class="text">这里是发票信息这里是发票信息这里是发票信息</text></view>
				</view>
			</view>
		</view>
		<view class="control">
			<text class="refund">评价</text>
			<text @tap="go_tui" class="refund">退款</text>
			<text @tap="go_wuliu" class="lookitem">查看物流</text>
			<text @tap="goPay" class="gopay">去付款</text>
		</view>
	</view>
</template>

<script>
	import itemPublic from '../../../components/item_public/item_public.vue'
	import addr from '../../../components/addr_info/addr_info.vue'
	export default {
		data(){
			return {
				item_number:235465132156,
				item_time:'2019-9-21 17:40',
			}
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
			go_tui(){
				uni.navigateTo({
					url:'../tui_item/tui_item'
				})
			},
			goPay(){
				uni.navigateTo({
					url:'../pay/pay'
				})
			},
			go_wuliu(){
				uni.navigateTo({
					url:'../wuliu/wuliu'
				})
			}
		},
		components:{
			itemPublic,
			addr
		}
	}
</script>

<style scoped="scoped"> /* 添加scoped 表示该样式为私有的*/
.public_item{
	margin-top: 13upx;
	padding: 15upx 15upx 5upx;
	background-color: #FFFFFF;
}
/*优惠信息*/
.prefer{
	font-size: 0;
	margin-top: 10upx;
	padding:7upx 15upx 10upx;
	background-color: #FFFFFF;
	border-top: 2upx solid rgba(7,17,27,0.1);
}
.pref,.fare{
	display: flex;
	justify-content: space-between;
	margin: 8upx 0;
}
.prefer .fact{
	display: flex;
	justify-content: space-between;
	margin: 12upx 0 0;
}
.prefer .fact .shif{
	font-size: 24upx;
	color: #030303;
}
.prefer .fact .pay{
	font-size: 24upx;
	color: #ff0000;
}
.prefer .text{
	font-size: 24upx;
	color: #919199;
}
.prefer .data{
	font-size: 24upx;
	color: #2B313B;
}
.prefer .right{
	display: flex;
	justify-content: flex-end;
	line-height: 50upx;
	border-top: 1upx dashed rgba(7,17,27,0.1);
	margin: 0 !important;
}
/*订单详情的订单信息*/
.items-info{
	background-color: #FFFFFF;
}
.items-info .ul .li:first-child{
	background-color: #F7F7F7;
	color: #030303;
}
.items-info .ul .li:first-child{
	padding: 6upx 15upx;
}
.items-info .ul .li{
	display: flex;
	justify-content: space-between;
	font-size: 28upx;
	color: #919199;
}
.items-info .ul .bot{
	margin: 0 15upx;
	border-bottom: 1upx dashed rgba(7,17,27,0.1);
}
.items-info .ul .li:not(.last){
	line-height: 40upx;
}
.items-info .ul .li:last-child{
	padding: 10upx 0;
	line-height: 40upx;
	border-bottom:none;
}
.items-info .ul .li .title{
	flex: 0 0 160upx;
	width: 160upx;
}
.items-info .ul .li .text{
	text-align: right;
	margin-left: 25upx;
	flex: 1;
	color: #616166;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/*按钮*/
.control{
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 10upx;
	padding: 10upx 0;
	background: white;
}
.control text{
	font-size: 24upx;
	padding: 4upx 16upx;
	border: 1upx solid #DDDDDD;
	margin-right: 16upx;
	border-radius: 10upx;
}
.control .refund,.item-info .control .lookitem{
	color: #616166;
}
.control .gopay{
	color: #ffffff;
	background: #41BFFF;
}
</style>
