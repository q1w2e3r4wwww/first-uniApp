<template>
	<view>
		<view class="top">
			<addr></addr>
			<image src="../../../static/t_left.png" mode=""></image>
		</view>
		<view class="public_item">
			<item-public></item-public>
			<view class="items">
				<ul>
					<li>发票抬头: <text class="text">如需发票，请写抬头及（功能使用不了）</text> </li>
					<li>买家留言: <text class="text">有什么能帮到您的？</text> </li>
				</ul>
			</view>
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
					<text class="shif">实付：</text><text class="pay">¥{{count * price}}.00</text>
				</view>
			</view>
		</view>
		<view class="item-number">
			<view class="pref">
				<text class="text">订单编号：</text>
				<text class="data">{{item_number}}</text>
			</view>
			<view class="fare">
				<text class="text">订单日期：</text>
				<text class="data">{{item_time}}</text>
			</view>
		</view>
		<view class="footer">
			<view class="title">合计：<text class="pay-money">￥{{count * price}}.00</text></view>
			<text @tap="go_payEnd" class="button">支付订单</text>
		</view>
	</view>
</template>

<script>
	import addr from '../../../components/addr_info/addr_info.vue'
	import itemPublic from '../../../components/item_public/item_public.vue'
	export default {
		data(){
			return {
				item_number:235465132156,
				item_time:'2019-9-21 17:40',
				count:1,
				price:1395
			}
		},
		onLoad(e) {
			this.count = e.count; // 从购买商品页传过来的参数
			this.price = e.price;
			uni.showLoading({
				title:'加载中...'
			});
			setTimeout(function(){
				uni.hideLoading()
			},1000)
		},
		methods:{
			go_payEnd(){ // 支付宝支付
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: 'orderInfo', //订单数据
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			}
		},
		components:{
			addr,
			itemPublic
		}
	}
</script>

<style scoped>
	.top{
		position: relative;
	}
	.top image{
		position: absolute;
		top: 40%;
		right: 40upx;
		width: 32upx;
		height: 32upx;
	}
	.public_item{
		margin-top: 13upx;
		padding: 15upx 15upx 5upx;
		background-color: #FFFFFF;
	}
	.items {
		border-top: 1upx solid rgba(7,17,27,0.1);
		background-color: #FFFFFF;
		padding: 0 15upx;
	}
	.items ul li:first-child {
		border-bottom: 1upx solid rgba(7,17,27,0.1);
	}

	.items ul li {
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		color: #384150;
	}
	.items ul li .text {
		font-size: 24upx;
		color: rgb(147,153,159);
	}
	/*优惠信息*/
	.prefer,.item-number{
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
	.item-number .pref {
		margin: 8upx 0;
	}
	.item-number .pref .text, .item-number .fare .text {
		font-size: 28upx;
		color: #919199;
	}
	.item-number .pref .data, .item-number .fare .data {
		font-size: 28upx;
		color: #384150;
	}
	/*底部 支付*/
	.footer{
		position: fixed;
		display: flex;
		justify-content: flex-end;
		bottom: 0;
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		line-height: 100upx;
		padding-left: 15upx;
	}
	.footer .title{
		flex: 1;
		text-align: center;
		margin-right: 30upx;
		font-size: 28upx;
		line-height: 100upx;
	}
	.footer .pay-money{
		font-size: 38upx;
		color: #ff0000;
	}
	.footer .button{
		height: 100upx;
		line-height: 100upx;
		background: #41BFFF;
		font-size: 32upx;
		color: white;
		border-radius: 0;
		padding: 6upx 36upx;
	}
</style>
