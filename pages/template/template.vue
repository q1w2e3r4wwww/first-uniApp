<style scoped="scoped">
	.show{
		display: none;
	}
	.view{
		width: 100%;
		color: #FFFFFF;
	}
	.upload{
		background: #2782D7;
	}
	.download {
		background: #4CD964;
	}
	.chooseIMg{
		background: #6D6D72;
	}
</style>

<template>
	<view class='slide'>
		<view class="show" @tap="tz_page()">微信小程序的滑动菜单</view>
		<view class='view upload' @tap="uploadFile()">上传文件接口:上传的进度为----{{progress}}%</view>
		<view class='view download' @tap="downloadFile()">下载文件接口:下载的进度为----{{downloadpro}}%</view>
		<button type="primary" @tap="getWebinfo()">获取手机网格信息号源</button>
		<button type="primary" @tap="goEcarts()">echarts</button>
		<button type="primary" @tap="goCalendar()">日历组件</button>
		<view v-show="showME">
			我正在切换手机网络
		</view>
		<button type="primary" @tap="tz_phoneInfo()">获取手机相关信息</button>
		<view class='view chooseIMg' @tap="chooseIMg()">调用相册或者相机的接口</view>
		<image :src="imgUrl" mode=""></image>
		<button @tap="tz_data()">数据缓存</button>
		<button @tap="chooseVideo()">上传视频</button>
		<video :src="videoSrc"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				progress:'',
				downloadpro:'',
				imgUrl:'',
				videoSrc:'',
				showME:false
			}
		},
		mounted() {
		},
		onLoad() {
			uni.onNetworkStatusChange(res => { // 页面打开后就开始监听网络切换状态
				if(res.isConnected){ 
					this.showME = true;
					uni.showToast({
						title:'我已切换至'+res.networkType+'',
						duration:3000
					});
				}
			});
		},
		methods: {
			tz_phoneInfo(){
				uni.navigateTo({
					url:'../template/getPhonginfo/getPhonginfo'
				})
			},
			goCalendar(){
				uni.navigateTo({
					url:'../template/calendar/calendar'
				})
			},
			goEcarts(){
				uni.navigateTo({
					url:'../template/echarts/echarts'
				})
			},
			getWebinfo(){
				uni.getNetworkType({
					success: (res) => {
						uni.showModal({
							title:'提示', //提示的标题---必填
							content:'正在使用的信号源是：'+res.networkType+'', //提示的内容---必填
							showCancel:false // 是否显示取消按钮
						})
					}
				});
			},
			tz_data(){
				uni.navigateTo({
					url:'../template/dataStorage/dataStorage'
				})
			},
			chooseVideo(){
				uni.chooseVideo({
					sourceType:['album', 'camera'],
					success: (res) => {
						this.videoSrc = res.tempFilePath;
					}
				})
			},
			chooseIMg(){
				uni.chooseImage({
					count:6,//默认是9
					sizeType:['original','compressed'],//原图或者压缩图
					sourceType:['album','camera'],//相册或者相机
					success: (res) => {
						this.imgUrl=res.tempFilePaths[0];//页面上显示上传的第一张图片
						console.log(JSON.stringify(res.tempFilePaths));//图片的本地文件路径列表
						console.log(res.tempFiles);//具有每一张图片的临时路径与长度大小
						//预览上传的图片
						uni.previewImage({
							urls:res.tempFilePaths //预览上传的图片列表
						});
						//获取图片相关信息
						uni.getImageInfo({
							src:res.tempFilePaths[0],//先指定获取哪张图片的信息
							success: (res) => {
								console.log("图片的高度：" + res.width);
								console.log("图片的高度：" + res.height);
							}
						})
					}
				})
			},
			downloadFile(){
				const downloadTast = uni.downloadFile({
					url:'http://www.example.com/file/test',
					success: (res) => {
						if(res.statusCode === 200){
							console.log("下载成功")
						}
					}
				});
				downloadTast.onProgressUpdate( (res) => { // 监听文件下载进度
					this.downloadpro = res.progress;
				})
			},
			uploadFile(){
				uni.chooseImage({ //在本地获取临时文件 ---调用手机相机服务或者选择相片服务
					success: (chooseImageRes) => {
						console.log(JSON.stringify(chooseImageRes) )
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const uploadTast = uni.uploadFile({
							url:'http://www.baidu.com',
							filePath:tempFilePaths[0],//需要上传的文件资源路径
							name:'file',// 对应文件的Key,后台通过这个key来获取文件的二进制内容
							success: (res) => {
								console.log("上传成功")
							}
						});
						uploadTast.onProgressUpdate( (res) => { // 监听文件上传的进度
							this.progress = res.progress;
						})
						//  uploadTask.abort(); 这个是取消当前上传任务的方法
					}
				})
			},
			tz_page() {
				uni.navigateTo({
					url:'../slide-view/slide-view'
				});
			}
		},
	}
</script>


