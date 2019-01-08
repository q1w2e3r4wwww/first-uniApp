<template>
	<view class="main">
		<view class="main-content" :style="{height: (windowHeight - 48) + 'px'}">
			<view class="tip">
				基本信息 
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="list-left">
						我的昵称
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="我的昵称" v-model="myNc"  />
					</view>
				</view> 
				<view class="uni-list-cell">
					<view class="list-left"> 
						我的备注
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="我的备注" v-model="myBz" />
					</view>
				</view>
			</view>
			<view class="tip">
				头像上传
			</view>
			<view class="uni-list">
				<view class="uni-list-cell-last">
					<view class="upload">
						<image @tap="uploadImg()" class="upload-img" :src="uploadUrl" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view @tap="goMine()" class="footer">
			<text class="button">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myNc:'',
				myBz:'',
				uploadUrl:'../../../static/upload.png',
				windowHeight:''
			}
		},
		onShow() {
			this.getHeight();
			let val = uni.getStorageSync('content');
			if(val){
				this.myNc = val.myNc;
				this.myBz = val.myBz;
			}
		},
		onLoad(e) {
			this.myNc = e.nickName;
		},
		methods: {
			getHeight(){
				uni.getSystemInfo({
					success: (res) => {
						this.windowHeight = res.windowHeight;
					}
				})
			},
			goMine(){
				let arrs = {
					'myNc':this.myNc,
					'myBz':this.myBz
				}
				uni.setStorageSync('content',arrs); //参数同步保存到本地
				uni.navigateBack({
					delta:1
				})
			},
			uploadImg(){
				uni.chooseImage({
					count:1,
					sourceType:['album'],// 从相册选
					success: (res) => {
						if(res.tempFilePaths){
							this.uploadUrl = res.tempFilePaths;
						}
					}
				})
			}
		},
	}
</script>

<style scoped>
	.upload{
		width:100%;
		padding: 15upx 0;
		text-align: center;
	}
	.upload-img{
		width: 300upx;
		height: 300upx;
	}
	.uni-list-cell-db{
		padding:0 30upx 0 60upx;
	}
	.list-left{
		padding-left:30upx;
	}
	.tip{
		height: 50upx;
		line-height: 50upx;
		color: #999999;
		padding-left: 30upx;
		font-size: 28upx;
	}
	.footer {
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
