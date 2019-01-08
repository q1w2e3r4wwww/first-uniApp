<template>
	<view>
		<view class="page-body">
			<view class="page-section">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">key</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" type="text" placeholder="请输入key" name="key" v-model="key" ></input>
						</view>
					</view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left"> 
							<view class="uni-label">value</view>
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" type="text" placeholder="请输入value" name="data" v-model="data"></input>
						</view>
					</view>
				</view>
				<view class="btn-area">
					<button type="primary" class="btn-setstorage" @tap="setStorage()">存储数据(缓存)</button>
					<button @tap="getStorage()">读取数据</button>
					<button @tap="getStorageInfo()">获取当前已存储的所有key</button>
					<button @tap="clearStorage()">清理缓存数据</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				key: '',
				data: ''
			}
		},
		methods: {
			clearStorage(){
				uni.clearStorage();
				uni.getStorageInfo({
					success: (res) =>{
						if(res.keys == ''){
							uni.showToast({
								title:"清理成功",
								duration:600
							})
						}
					}
				})
			},
			getStorageInfo(){
				uni.getStorageInfo({
					success: (res) => {
						uni.showModal({
							title:'本地存储的所有key',
							content:'key:'+res.keys+''
						})
					}
				})
			},
			setStorage(){
				if(this.key == ''){
					uni.showModal({
						title:"数据保存失败",
						content:"key不能为空",
						showCancel:false
					})
				}else{
					uni.setStorage({
						key:this.key, //本地缓存内容对应的key
						data:this.data, // 需要存储的内容
						success: (res) => {
							uni.showModal({
								title:"数据保存成功",
								content:"",
								showCancel:false
							})
						}
					})
				}
			},
			getStorage(){
				if(this.key == ''){
					uni.showModal({
						title:"数据获取失败",
						content:"key不能为空",
						showCancel:false
					})
				}else{
					uni.getStorage({
						key:this.key, //根据本地缓存对应key来获取对应的内容
						success: (res) => {
							uni.showModal({
								title:"数据获取成功",
								content:'内容为：'+res.data+'',
								showCancel:false
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	@import "../../../common/uni.css";
	.btn-setstorage {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
