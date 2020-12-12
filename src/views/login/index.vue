<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录">
            <van-icon slot="left" name="cross" @click="$router.back()"/>
        </van-nav-bar>
        <!--登录表单 -->
        <van-form @submit="onSubmit" ref="loginForm">
        <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            type="number"
            maxlength="11"
            :rules="userInfoRules.mobile"
        >
        <i slot="left-icon" class="iconfont toutiao_shouji"></i>
        </van-field>
        <van-field
            v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            type="number"
            maxlength="6"
            :rules="userInfoRules.code"
        >
        <!-- 头部插槽 第一种写法 -->
        <i slot="left-icon" class="iconfont toutiao_yanzhengma"></i>
        <!-- 尾部插槽 第二种写法 -->
         <template #button>
             <!-- 倒计时 -->
             <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="请ss秒后重新获取" @finish = "isCountDownShow = false" />
            <van-button v-else size="small" round type="default" native-type="button" class="send-sms-btn" @click ="onSendSms">发送验证码</van-button>
        </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button block type="info" native-type="submit" class="login-btn">
            登录
            </van-button>
        </div>
        </van-form>
    </div>
</template>
<script>
    // 导入login的请求方式
    import { login,sendSms } from '@/api/user.js'
    export default {
        name: 'LoginIndex',
        data () {
            return {
                user:{
                    mobile: '',
                    code: ''
                },
                // 用户表单的校验规则
                // 表单校验通过，自动触发submit事件
                userInfoRules:{
                    mobile:[{
                        required:true,
                        message:'手机号不能为空',
                        trigger:'blur'
                    },{
                        pattern:/^1[3|5|7|8]\d{9}$/,
                        message:'手机格式不对'
                    }],
                    code:[{
                        required:true,
                        message:'验证码不能为空',
                        trigger:'blur'
                    },{
                        pattern:/^\d{6}$/,
                        message:'验证码格式不对'
                    }]
                },
                // 控制倒计时的显示与隐藏
                isCountDownShow:false
            }
        },
        methods: {
            // 登录表单
            async onSubmit() {
                // console.log('ok')
                this.$toast.loading({
                    message: '登录中...',
                    // 禁止背景点击
                    forbidClick: true,
                    // 表示持续时间，默认为2000,0表示持续不关闭
                    duration:0
                    })
            //   console.log('submit', values)
            // 1.获取表单数据
            const user = this.user
            // console.log(user)
            // 2.表单校验

            // 3.提交表单数据，请求登录
            try {
                const { data } = await login(user)
                this.$store.commit('setUser',data.data)
                this.$toast.success('登录成功')
                
            }catch(err){
                // console.log(err);
                if(err.response.status === 400){
                    this.$toast.fail('手机号或验证码错误')
                } else {
                    this.$toast.fail('登录失败，请稍后再试')
                }
            }
            // 4.根据响应结果，处理后续操作

    
        },
        // 发送验证码
            async onSendSms(){
                // 1.校验表单
                try {
                    await this.$refs.loginForm.validate('mobile')
                }catch(err){
                    return console.log('验证失败',err)   
                    }
                // 2.验证通过，倒计时开启
                this.isCountDownShow = true
                // 3.请求发送验证码
                try {
                    await sendSms(this.user.mobile)
                    console.log('发送成功')
                } catch(err){
                    // // 先关闭倒计时
                    this.isCountDownShow = false
                    console.log(err)
                    if(err.response.status === 429){
                        this.$toast('发送次数太频率，请稍后再试')
                    } else {
                        this.$toast('验证码发送失败！')
                    }
                }
                
            }
    }
    }
</script>

<style lang="less" scoped>
    .login-container{
        .toutiao{
            font-size: 37px;
        }
        .send-sms-btn{
            width: 152px;
            height: 46px;
            line-height: 46px;
            background-color: #ededed;
            font-size: 22px;
            color: #666
        }
        .login-btn-wrap {
            padding: 53px 33px;
            .login-btn {
            background-color: #6db4fb;
            border: none;
            }
        }
    }
</style>