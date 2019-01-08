<template>
    <view class="uni-tab-bar">
        <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
            <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
                :id="tab.id" :data-current="index" @tap="tapTab">{{tab.name}}</view>
        </scroll-view>
        <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
            <swiper-item v-for="(tab,index1) in newsitems" :key="index1">
                <scroll-view @scroll="scrollView" class="list" scroll-y @scrolltolower="loadMore(index1)">
                    <block v-for="(newsitem,index2) in tab.data" :key="index2">
                        <media-list :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list>
                    </block>
					<view class="uni-tab-bar-loading" v-show="loadTrue">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
    import mediaList from '../../../components/tab-nvue/mediaList.vue';
	import uniLoadMore from '../../../components/uni-load-more.vue';
    export default {
        components: {
            mediaList,
			uniLoadMore
        },
        data() {
            return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadTrue:false,
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 0,
                newsitems: [],
                data0: {
                    "datetime": "40分钟前",
                    "article_type": 0,
                    "title": "uni-app学习,vuejs,weex",
                    "source": "wangtao",
                    "comment_count": 639
                },
                data1: {
                    "datetime": "一天前",
                    "article_type": 2,
                    "title": "了解到的$refs的写法是：this.$refs.XXX ,但是当对象是一个变量时：使用[]来拼接，如<form  ref='formName'></form>,可以写成this.$refs.formName 或者 this.$refs['formName'],   为变量时：var a = 'wt'   ----  写成只能写成this.$refs[a]",
                    "image_url": "../../../static/qidong.png",
                    "source": "wangtao",
                    "comment_count": 11395
                },
                tabBars: [{
                    name: '喜欢',
                    id: 'guanzhu'
                }, {
                    name: '待发货',
                    id: 'tuijian'
                }, {
                    name: '已完成',
                    id: 'tiyu'
                }]
            }
        },
        onLoad: function() {
            this.newsitems = this.randomfn()
        },
        methods: {
			scrollView() {
				this.loadTrue = true;
			},
            goDetail(e) {
                uni.navigateTo({
                    url: '../../../pages/mine/collect/detail/detail?data=' + e.title
                })
            },
            close(index1, index2) {
                uni.showModal({
                    content: '是否删除本条信息？',
                    success: (res) => {
                        if (res.confirm) {
                            this.newsitems[index1].data.splice(index2, 1);
                        }
                    }
                })
            },
            loadMore(e) {
				this.newsitems[e].loadingType = 1;
            	setTimeout(() => {
            		this.addData(e);
            	}, 1200);
            },
            addData(e) {
            	if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingType = 2;
            		return;
            	}
            	for (let i = 1; i <= 10; i++) {
            		this.newsitems[e].data.push(this['data' + Math.floor(Math.random() * 5)]);
            	}
				this.newsitems[e].loadingType = 1;
            },
            async changeTab(e) { // 监听菜单导航的变化
				this.loadTrue = false; // 先将上拉加载隐藏，页面滚动时，才显示
                let index = e.target.current;
                if (this.isClickChange) {
                    this.tabIndex = index;
                    this.isClickChange = false;
                    return;
                }
                let tabBar = await this.getElSize("tab-bar"),
                    tabBarScrollLeft = tabBar.scrollLeft;
                let width = 0;

                for (let i = 0; i < index; i++) {
                    let result = await this.getElSize(this.tabBars[i].id);
                    width += result.width;
                }
                let winWidth = uni.getSystemInfoSync().windowWidth,
                    nowElement = await this.getElSize(this.tabBars[index].id),
                    nowWidth = nowElement.width;
                if (width + nowWidth - tabBarScrollLeft > winWidth) {
                    this.scrollLeft = width + nowWidth - winWidth;
                }
                if (width < tabBarScrollLeft) {
                    this.scrollLeft = width;
                }
                this.isClickChange = false;
                this.tabIndex = index; //一旦访问data就会出问题
            },
            getElSize(id) { //得到元素的size
                return new Promise((res, rej) => {
					// uni.createSelectorQuery().select("#" + id)相当于jq 的$(''#' + id')
                    uni.createSelectorQuery().select("#" + id).fields({ 
                        size: true,
                        scrollOffset: true
                    }, (data) => {
                        res(data);// 查找到指定节点的信息
                    }).exec(); // 执行所有的请求，请求结果按请求次序构成数组，通过callback的第一个参数返回
                })
            },
            async tapTab(e) { //点击tab-bar
                if (this.tabIndex === e.target.dataset.current) {
                    return false;
                } else {
                    let tabBar = await this.getElSize("tab-bar"),
                        tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
                    this.scrollLeft = tabBarScrollLeft;
                    this.isClickChange = true;
                    this.tabIndex = e.target.dataset.current
                }
            },
            randomfn() { // 随机获取数据
                let ary = [];
                for (let i = 0, length = this.tabBars.length; i < length; i++) {
                    let aryItem = {
						loadingType : 0,
                        data: []
                    };
                    for (let j = 1; j <= 10; j++) {
                        aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
                    }
                    ary.push(aryItem);
                }
                return ary;
            }
        }
    }
</script>

<style>

</style>