<template>
	<view class="content">
		<view class="left-content">
			<ul>  
				<li v-for="(item,i) in left_item" :key="item" :class="{isActive:i==arrentIndex}" @tap="changeActive(i)">{{item}}</li>
			</ul>
		</view>
		<view class="right-content"> <!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同 -->
			<scroll-view scroll-y style="height: 100%;">
				<view class="items" v-for="(item,index) in items_data" :key="index">
					<view class="theme">
						<image class="left" src="../../static/group_left.png" mode=""></image>
						<text class="title">{{item.title}}</text>
						<image class="right" src="../../static/group_left.png" mode=""></image>
					</view>
					<view class="main">
						<view class="img_title" v-for="(imgs,itemIndex) in item.detail" :key="itemIndex">
							<image :src="imgs.img_url" mode=""></image>
							<text class="title">{{imgs.text}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return{
				left_item:['分销商城','引用weexui'],
				arrentIndex:0,
				items_data:[
					{	"title":"全部分类",
						"detail":[
							{"img_url":"../../static/yxitem.png","text":"赚钱盒子"},
							{"img_url":"../../static/yxitem.png","text":"赚钱盒子1"},
							{"img_url":"../../static/yxitem.png","text":"赚钱盒子2"},
							{"img_url":"../../static/yxitem.png","text":"赚钱盒子3"},
							{"img_url":"../../static/yxitem.png","text":"赚钱盒子4"}
						]
					},
					{	"title":"精品分类",
						"detail":[
							{"img_url":"../../static/yxitem.png","text":"赚钱盒子5"},
							{"img_url":"../../static/yxitem.png","text":"赚钱盒子6"}
						]
					}
				]
			}
		},
		mounted:function(){
		},
		methods: {
			changeActive(index){
				this.arrentIndex = index;
				switch(index){
					case 1:
					uni.navigateTo({
						url:'./textWeex/textWeex'
					})
				}
			},
			getData(){ // 获取分类数据
			}
		}
	}
</script>

<style>
	@import "../../../common/uni.css";
	*{
		margin: 0;
		padding: 0;
	}
	.content{
		display: flex;
		height: 100%;
	}
	.left-content,
	.right-content{
		height: 100%;
	}
	.left-content{
		flex: 0 0 200upx;
		width: 200upx;
		border-right: 1upx solid #DDDDDD;
	}
	ul li{
		height: 80upx;
		line-height: 80upx;
		margin: 10upx 0;
		font-size: 28upx;
		text-align: center;
	}
	.isActive{
		color: #ffffff;
		font-size: 34upx;
		font-weight: 500;
		background-color: #41BFFF;
	}
	.right-content{
		flex: 1;
	}
	.items .theme{
		display: flex;
		width: 80%;
		margin-left: 10%;
		padding: 10upx;
		padding-bottom: 20upx;
		height: 40upx;
		line-height: 40upx;
	}
	.items .theme .title{
		margin: 0 10upx;
	}
	.items .theme image{
		margin-top: 12upx;
		width: 33%;
		height: 16upx;
	}
	.items .theme .right{
		transform: rotate(180deg);
	}
	.items .main{
		display: flex;
		justify-content: flex-start;
		flex-direction: row; 
		flex-wrap: wrap;  
	}
	.items .main .img_title{
		width: 33.3%;
		text-align: center;
	}
	.items .main .img_title image{
		width: 100%;
		height: 160upx;
	}
	.items .main .img_title .title{
		display: block;
		font-size: 28upx;
		color: #2B313B;
		transform:translateY(-10upx);
	}
	
</style>
