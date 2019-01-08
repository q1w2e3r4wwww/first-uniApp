<template>
	<view>
		<view class="items">
			<view class="li">订单编号： <text class="text">GZCLTX2018010800008</text></view>
			<view class="li">下单时间： <text class="text">2018-03-31  16:20</text></view>
		</view>
		<view class="chargeback">
			<view class="title">
				<view class="text myout">退款商品：<text class="data">退货商品需未拆分封、且包装完整</text></view>
			</view>
			<view class="module">
				<checkbox class="box" value="checked" checked="true" />
				<item-public></item-public>
			</view>
		</view>
		<view class="tui_yy">
			<view class="beac title">
				<view @tap="base_show()" class="myout">
					选择退款原因<text class="data">（选择后自动更改为选择的类型）</text>
				</view> 
				<image src="../../../static/t_left.png" class="left"></image>
				<textarea name="" rows="5" cols="" placeholder="请补充详细信息"></textarea>
			</view>
			<view ref="chargeback" class="chargeback-beac" :class="showAcitve" :style="{top:topDistance,left:leftDistance}">
				<view class="ul">
					<text class="li title">选择退款类型</text>
					<text class="li" @tap="itemList(list)" v-for="(list,index) in xz_list" :key="index">{{list}}</text>
				</view>
			</view>
			<!--遮罩层-->
			<view @tap="base_show()" class="base" :class="showAcitve"></view>
		</view>
	</view>
</template>

<script>
	import itemPublic from '../../../components/item_public/item_public.vue'
	export default {
		data(){
			return{
				item_number:235465132156,
				item_time:'2019-9-21 17:40',
				showView:true,
				body_width:0,
				body_height:0,
				item_width:0,
				item_height:0,
				xz_list:['颜色/尺寸/参数不符','商品瑕疵','质量问题','少件/漏发','收到商品时有划痕或破损']
			}
		},
		computed:{
			showAcitve () {
                return this.showView ? 'baseHide' : 'baseShow'
            },
			topDistance () { // 动态给组件绑定像素值，需要通过uni.upx2px()将值先转换为px
				return uni.upx2px((this.body_height - this.item_height) / 2) + 'px';
			},
			leftDistance (){
				return uni.upx2px((this.body_width - this.item_width) / 2 ) + 'px';
			}
		},
		mounted:function(){
			this.getWH();
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
			getWH(){
				// 获取弹出框的宽高---小程序获取控件宽高的方式
				let chargeback = uni.createSelectorQuery();
				let _this = this;
				chargeback.select('.chargeback-beac').boundingClientRect(function(rect){
					_this.item_width = rect.width;
					_this.item_height = rect.height;
				}).exec();
				
				// uni-app获取body的宽高的方式，相似与小程序的写法
				uni.getSystemInfo({
					success:function(res){
						_this.body_width = res.screenWidth;
						_this.body_height = res.screenHeight;
					}
				})
			},
			base_show(){
				this.showView = !this.showView;
			},
			itemList(list){
				this.showView = !this.showView;
				plus.nativeUI.alert("选择了:" + list)
			}
		},
		components:{
			itemPublic
		}
	}
</script>

<style scoped="scoped">
	/*订单编号和时间*/
	.items {
		padding: 0 15upx;
		background-color: #FFFFFF;
	}
	.items .li{
		height: 80upx;
		line-height: 80upx;	
		font-size: 28upx;
		color: #384150;
	}
	.items .li:first-child{
		border-bottom: 1upx solid rgba(7,17,27,0.1);
	}
	.items .li .text{
		font-size: 28upx;
		color: #030303;
	}
	
	/*退单  商品信息*/
	.chargeback,.tui_yy{
		background-color: #FFFFFF;
		margin-top: 13upx;
		padding: 0 15upx;
	}
	.chargeback > .title{
		width: 100%;
		border-bottom: 1upx solid rgba(7,17,27,0.1);
	}
	.myout{
		display: inline-block;
		height: 24upx;
		line-height: 24upx;
		font-size: 28upx;
		color: #616166;
		padding-left: 15upx;
		border-left: 6upx solid #41BFFF;
	}
	.data{
		font-size: 24upx;
		color: #919199;
	}
	.module{
		display: flex;
		margin-top: 10upx;
		padding: 10upx 0;
	}
	.module .box{
		width: 28upx;
		height: 28upx;
		margin-top:108upx;
		margin-right: 40upx;
	}
	/*退单  原因*/
	.tui_yy .beac{
		position: relative;
		margin-top: 13upx;
	}
	.tui_yy .beac .left{
		position: absolute;
		right: 15upx;
		top: 16upx;
		width: 24upx;
		height: 24upx;
	}
	.tui_yy .beac textarea{
		width: 98%;
		border: none;
		border-top: 1upx solid rgba(7,17,27,0.1);
		font-size: 28upx;
		color: #919199;
		padding: 6upx 0;
		text-indent: 28upx;
	}
	/*退款原因 选择*/
	.baseShow{
		display: block;
	}
	.baseHide{
		display: none;
	}
	.base{
		position: absolute;
		z-index: 119;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.2);
	}
	.chargeback-beac{
		position: absolute;
		z-index: 120;
		background: white;
	}
	.chargeback-beac .ul .li{
		display: block;
		text-align: center;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #030303;
		padding: 0 60upx;
	}
	.chargeback-beac .ul .li:nth-child(n+2){
		border-bottom: 1upx solid rgba(7,17,27,0.1);
	}
	.chargeback-beac .ul .li:last-child{
		border-bottom:none;
	}
	.chargeback-beac .ul .title{
		background: #F7F7F7;
		font-size: 14upx;
		color: #919199 ;
		height: 40upx;
		line-height: 40upx;
	}
</style>
