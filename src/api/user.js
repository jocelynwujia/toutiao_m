// 用户相关的请求模块
import request from '@/utils/request.js'
import store from '@/store'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

// 发送验证码,每一分钟只能发送一次
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

// 获取用户自己的信息
export const getUserInfo = () => {
    return request({
      method: 'GET',
      url: '/app/v1_0/user',
      // 携带请求头信息
      headers: {
        //   该接口需要授权才能访问，注意Bearer后面有空格
        Authorization: `Bearer ${store.state.user.token}`
      }
    })
  }