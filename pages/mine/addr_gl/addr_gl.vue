<template>
	<view>
		<view class="main-content">
			<view class="main" v-for="(list,index) in addList" :key="index">
				<view class="myaddr">
					<view class="text-name">
						<image src="../../../static/user.png" mode=""></image>
						<text class="name">{{list.name}}</text>
					</view>
					<view class="text-phone">
						<image src="../../../static/phone.png" mode=""></image>
						<text class="phone">{{list.phone}}</text>
					</view>
				</view>
				<view class="addr">
					<text class="data">{{list.addr}}</text>
				</view> 
				<view class="sette">
					<view class="title">
						<image class="check" :src="active_img" mode=""></image>
						<text class="text">设为默认地址</text>
					</view>
					<view class="setting">
						<image class="update" src="../../../static/update.png" mode=""></image>
						<image @tap="Delete(index)" class="delete" src="../../../static/delete.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<text @tap="go_addr" class="button">新增收货地址</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				addList:[
					{
						name:'王涛',
						phone:18786026794,
						addr:'广东省深圳市龙岗区横岗街道7栋1楼'
					}
				],
				active_img:'../../../static/rideo_active.png'
			}
		},
		mounted:function(){
			
		},
		onLoad(e) {
			uni.showLoading({
				title:'加载中...'
			});
			setTimeout(function(){
				uni.hideLoading()
			},1000)
			if(e.newAddr == undefined){ // 以下的逻辑还没有完善成功
				this.addList = uni.getStorageSync('newAdd'); //获取到本地存储的地址数据
			}else if(e.newAddr != undefined){
				let addr = JSON.parse(e.newAddr);
				this.addList.push(addr);
				uni.setStorageSync('newAdd',this.addList);
				uni.showToast({
					title:'数据保存成功'
				});
			}
		},
		onBackPress(){ //监听手机的物理返回键
			uni.switchTab({ // 关闭所有非tabbar页面跳转到指定tabbar页
				url:'../mine'
			})
			return true;
		},
		methods:{
			Delete(index){
				this.addList.splice(index,1); //数组中删除元素
				uni.showToast({
					title:'删除成功'
				});
				uni.setStorageSync('newAdd',this.addList)
			},
			go_addr(){
				uni.navigateTo({
					url:'../addr/addr'
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.main{
		background-color: #FFFFFF;
		margin-bottom: 20uupx;
	}
	.main-content{
		margin-bottom: 100upx;;
	}
	.myaddr {
		display: flex;
		justify-content: space-between;
		padding: 15upx 30upx;
	}
	.myaddr .text-phone {
		margin-left: 200upx;
	}
	.myaddr image {
		width: 44upx;
		height: 44upx;
		vertical-align: top;
	}
	.myaddr .text-name .name, .myaddr .text-phone .phone {
		display: inline-block;
		font-size: 32upx;
		color: #313133;
		margin-left: 6upx;
		margin-top: 4upx;
	}
	.addr {
		padding: 0 30upx 15upx;
	}
	.addr .data {
		color: #919199;
		font-size: 28upx;
	}
	.sette {
		display: flex;
		justify-content: space-between;
		height: 60upx;
		line-height: 60upx;
		margin: 0 30upx;
		border-top: 1upx solid rgba(7,17,27,0.1);
	}
	.sette .check {
		margin-right: 11upx;
	}
	.sette .update {
		margin-right: 27upx;
	}
	.sette image {
		width: 32upx;
		height: 32upx;
		vertical-align: middle;
	}
	.sette .text {
		color: #313133;
		font-size: 24upx;
	}
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		background: #41BFFF;
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
