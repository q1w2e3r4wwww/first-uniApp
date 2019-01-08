
<style scoped="scoped">
	.content{
		padding: 20upx 30upx;
	}
	.input-group{
		background: #FFFFFF;
		padding: 15upx 20upx;
	}
	.input-row{
		display: flex;
		flex-direction: row;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1px solid #999999;
	}
	.primary{
		background: rgb(15,174,255);
	}
</style>
<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
				<!-- :focus="true"传到子组件，表示自动获取焦点 -->
				<!-- clearable 等同于 :clearable='true' -->
                <uni-input type="text" focus clearable v-model="account" placeholder="请输入账号"></uni-input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
				<!--displayable传递给子组件是true,表示显示密码按钮 ,这里没有传clearable参数，就表示该input不需要显示删除按钮  -->
                <uni-input type="password" :displayable='true' v-model="password" placeholder="请输入密码"></uni-input>
            </view>
            <view class="input-row">
                <text class="title">邮箱：</text>
                <uni-input type="text" clearable v-model="email" placeholder="请输入邮箱"></uni-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import uniInput from '../../components/uni-input.vue';

    export default {
        components: {
            uniInput
        },
        data() {
            return {
                account: '',
                password: '',
                email: ''
            }
        },
        methods: {
            register() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }

                const data = {
                    account: this.account,
                    password: this.password,
                    email: this.email
                }
                service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},500)
            }
        }
    }
</script>

