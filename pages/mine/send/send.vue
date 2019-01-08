<template>
	<view class="send-main">
		<view class="myTitle">
			<view class="detail">
				<image class="myPhoto" :src="myPhoto" mode=""></image>
				<view class="myInfo">
					<text class="text name">王涛</text>
					<view class="text phone"><image src="../../../static/phone.png" mode=""></image>18786026794</view>
				</view>
			</view>
		</view>
		<view class="sendList">
			<view  v-for="(v,index) in conts" :key="index">
				<read-list :item="v"></read-list>
			</view>
		</view>
	</view>
</template>

<script>
	import readList from '../../../components/readList.vue'
	export default {
		data() {
			return {
				myPhoto:'../../../static/photo.png',
				conts:[
					{
						hp_makettime:'11月30日',
						hp_title:'到达贵阳白云分部',
						guide_word:'快件证件配送中',
						author:[
							{user_name:'王涛'},
							{user_phone:'13158044656'}
						]
					},
					{
						hp_makettime:'10月29日',
						hp_title:'达到湖南韵达1分部',
						guide_word:'主要内容1',
						author:[
							{user_name:'王涛'},
							{user_phone:'13158044656'}
						]
					},
					{
						hp_makettime:'11月30日',
						hp_title:'到达贵阳白云分部',
						guide_word:'快件证件配送中',
						author:[
							{user_name:'王涛'},
							{user_phone:'13158044656'}
						]
					},
					{
						hp_makettime:'10月29日',
						hp_title:'达到湖南韵达1分部',
						guide_word:'主要内容1',
						author:[
							{user_name:'王涛'},
							{user_phone:'13158044656'}
						]
					}
				]
			}
		},
		onLoad(e){
			this.myPhoto = e.myPhoto;
		},
		components:{
			readList
		}
	}
</script>

<style scoped>
	.myTitle{
		position: relative;
		height: 220upx;
		width: 100%;
		background: #19BE6B;
	}
	.detail{
		position: absolute;
		bottom: 0upx;
		left: 15upx;
		display: flex;
		flex-direction: row;
		padding: 10upx 30upx;
		height: 150upx;
	}
	.myPhoto{
		height: 120upx;
		width: 120upx;
		border-radius: 50%;
		border: 2upx solid #ffffff;
	}
	.myInfo{
		display: flex;
		flex-direction: column;
		margin-left: 30upx;
	}
	.myInfo .text{
		color: #ffffff;
		margin-top: 10upx;
	}
	.myInfo .name{
		font-size: 32upx;
		font-weight: 700;
	}
	.myInfo .phone{
		font-size: 28upx;
	}
	.myInfo .phone image{
		width: 30upx;
		height: 30upx;
		margin-right:6upx;
		transform: translateY(6upx);
	}
	.sendList{
		padding: 15upx 0 10upx 0;
	}
</style>
