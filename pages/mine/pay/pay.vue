<template>
	<view>
		<view class="main-content">
			<view class="content">
				<view class="top">
					<text class="title">赚积分的车载盒子 驾驶智能器  包含激活码  一键定位</text>
					<view class="sum"><text class="money">1395元 x </text><text class="count">1</text></view>
				</view>
				<view class="sum-count">
					<view class="text">共<text class="data">{{count}}</text>件</view>
					<view class="heji">合计：<text class="mon">{{count * price}}</text>元</view>
				</view>
			</view>
			<view class="pay-fs">
				<text class="title">选择支付方式</text>
				<view class="fs">
					<image class="chat" src="../../../static/photo.png" mode=""></image>
					<text class="text">微信支付</text>
					<image class="check" @tap="check" v-show="checkShow" src="../../../static/check.png" mode=""></image>
					<image class="check" @tap="check" v-show="!checkShow" src="../../../static/check_active.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="title">支付：<text class="pay-money">￥{{count * price}}.00</text></view>
			<text @tap="go_payEnd" class="button">去支付</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				checkShow:true,
				count:1,
				price:1395
			}
		},
		mounted:function(){
			
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
			check(){
				this.checkShow = !this.checkShow;
			},
			go_payEnd(){
				uni.navigateTo({
					url:'../pay_end/pay_end?count=' + this.count + '&price='+this.price+''
				})
			}
		}
	}
</script>

<style scoped="scoped">
.main-content{
	margin-bottom: 50upx;
}
.content{
	background-color: #FFFFFF;
	padding: 10upx 15upx 15upx;
}
.content .top{
	padding-bottom: 48upx;
	border-bottom: 1upx solid rgba(7,17,27,0.1);
}
.content .top .title{
	font-size: 34upx;
	font-weight: 500;
	line-height: 46upx;
	color: #313133;
}
.content .top .sum{
	float: right;
	font-size: 28upx;
	color: #313133;
}
.content .sum-count{
	display: flex;
	justify-content: space-between;
	margin-top: 15upx;
}
.content .sum-count .text{
	font-size: 24upx;
	color: #919199;
}
.content .sum-count .heji{
	font-size: 28upx;
	color: #313133;
}
.content .sum-count .heji .mon{
	color: #FF5555;
}
/*支付方式*/
.pay-fs{
	background-color: #FFFFFF;
	margin-top: 13upx;
	padding: 25upx 30upx;
}
.pay-fs .title{
	display: inline-block;
	width: 100%;
	font-size: 34upx;
	color: #313133;
	padding-bottom: 10upx;
	border-bottom: 6upx solid #313133;
}
.pay-fs .fs{
	position: relative;
	width: 100%;
	border-top: 1upx solid rgba(7,17,27,0.1);
	margin-top: 8upx;
	padding-top: 20upx;
}
.pay-fs .fs .chat{
	width: 92upx;
	height: 92upx;
	vertical-align: middle;
}
.pay-fs .fs .text{
	display: inline-block;
	font-size: 30upx;
	color: #313133;
	margin-left: 25upx;
}
.pay-fs .fs .check{
	position: absolute;
	right: 0;
	bottom: 15upx;
	width: 32upx;
	height: 32upx;
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
	color: #41BFFF;
	line-height: 100upx;
}
.footer .pay-money{
	font-size: 38upx;
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
