<template>
	<view>
		<view class="main">
			<!-- @sendiptVal='showChildMsg' 父组件接收子组件传过来的值 -->
			<item-public @sendiptVal='showChildMsg'></item-public>
			<view class="main_content uni-input-row">
				<view class="count">
					<text class="action title">数量:</text><uni-number-box v-on:change='onNumberChange' class="numBox" :min='0'></uni-number-box>
				</view>
				<view class="count content">
					<text class="title">总价格:</text>
					<view class="allPrice">
						<text>￥{{count * price}}</text>
						<text class="yuan">元</text>
					</view>
				</view>
			</view>
		</view>
		<view @tap="goPay()" class="footer">
			<text class="button">确定</text>
		</view>
	</view>
</template>

<script>
	import itemPublic from '../../../components/item_public/item_public.vue'
	import uniNumberBox from '../../../components/uni-number-box.vue'
	export default {
		components:{
			itemPublic,
			uniNumberBox
		},
		data() {
			return {
				count:0,
				price:0
			};
		},
		methods:{
			onNumberChange(value){
				this.count = value;
			},
			showChildMsg(value){ // 子组件向父组件传的值
				this.price = value;
			},
			goPay() {
				uni.navigateTo({
					url: '../../mine/pay/pay?count=' + this.count + '&price='+this.price+''
				})
			},
		}
	}
</script>

<style scoped>
	.main{padding: 10upx 15upx;}
	.count{display: flex;flex-direction: row;line-height: 70upx;}
	.count .action{margin-right: 15upx;}
	.main_content{border-top: 2upx solid #CCCCCC;}
	.yuan{font-size: 12upx;margin-left: 4upx;}
	.allPrice{color: #FF5555;line-height: 70upx;}
	.title{color: #2B313B;}
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		background: #DD524D;
		text-align: center;
	}

	.footer .button {
		display: inline-block;
		padding: 0;
		font-size: 32upx;
		color: #ffffff;
		border: none;
		background: transparent;
		line-height: 100upx;
	}
</style>
