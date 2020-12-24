// 用户相关的请求模块
import request from '@/utils/request.js'
// import store from '@/store'

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
    //   headers: {
    //     //   该接口需要授权才能访问，注意Bearer后面有空格
    //     Authorization: `Bearer ${store.state.user.token}`
    //   }
    })
  }

//   获取用户频道列表数据
export const getUserChannels = () => {
    return request({
      method: 'GET',
      url: '/app/v1_0/user/channels',
    })
  }

  // 添加关注
  export const addFollow = userId => {
    return request({
      method: 'POST',
      url: '/app/v1_0/user/followings',
      data:{
        target: userId
      }
    })
  }

   // 取消关注
   export const deleteFollow = userId => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/user/followings/${userId}`,
    })
  }

  // 获取用户个人资料
  export const getUserProfile = target => {
    return request({
      method: 'GET',
      url:'/app/v1_0/user/profile',
      target
    })
  }

   // 编辑用户个人资料
   export const updateUserProfile = data => {
    return request({
      method: 'PATCH',
      url:'/app/v1_0/user/profile',
      data 
    })
  }

  // 编辑用户照片资料
  export const updateUserPhoto = data => {
    return request({
      method: 'PATCH',
      url:'/app/v1_0/user/photo',
      data 
    })
  }