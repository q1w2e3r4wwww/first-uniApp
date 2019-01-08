<template>
    <view class="uni-input-view">
        <input :focus="focus_" :type="inputType" :value="value" @input="onInput" class="uni-input-input"
			:placeholder="placeholder" :password="type==='password'&&!showPassword" @focus="onFocus" @blur="onBlur" />
        <!-- 优先显示密码可见按钮 -->
        <uni-icon v-if="clearable_&&!displayable_&&value.length" color="#666666" type="clear" size="20" @click="clear"></uni-icon>
        <uni-icon v-if="displayable_" :color="showPassword?'#666666':'#cccccc'" type="eye" size="20" @click="display"></uni-icon>
    </view>
</template>

<script>
    import uniIcon from './uni-icon/uni-icon.vue'

    export default {
        components: {
            uniIcon
        },
        props: {
            //输入类型
            type: String,
            //值
            value: String,
            //占位符
            placeholder: String, // 这里接收到父组件传过来的值，分别是：请输入账号，请输入密码，请输入邮箱
           //是否显示清除按钮
            clearable: {
                type: [Boolean, String],
                default: false
            },
            //是否显示密码可见按钮
            displayable: { // 父组件传过来是true就是true，如果没传，就是false
                type: [Boolean, String],
                default: false
            },
           //自动获取焦点
            focus: {
                type: [Boolean, String],
                default: false
            }
        },
        model: {
            prop: 'value',
            event: 'input'
        },
        data() {
            return {
                //显示密码明文
                showPassword: false,
                //是否获取焦点
                isFocus: false
            }
        },
		created() {
			console.log('input的类型：' + this.type)
		},
        computed: {
            inputType() {
                const type = this.type
                return type === 'password' ? 'text' : type
            },
            clearable_() {
                return String(this.clearable) !== 'false' // 将this.clearable转换为原始字符串，并返回转换后的值
            },
            displayable_() {
				console.log(String(this.displayable))
                return String(this.displayable) !== 'false'
            },
            focus_() {
                return String(this.focus) !== 'false'
            }
        },
        methods: {
            clear() {
                this.value = ''
            },
            display() {
                this.showPassword = !this.showPassword
            },
            onFocus() {
                this.isFocus = true
            },
            onBlur() {
                this.$nextTick(() => {
                    this.isFocus = false
                })
            },
            onInput(e) {
                this.$emit('input', e.target.value)
            }
        }
    }
</script>

<style>
    .uni-input-view {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        flex: 1;
        padding: 0 10rpx;
    }

    .uni-input-input {
        flex: 1;
        width: 100%;
    }
</style>
