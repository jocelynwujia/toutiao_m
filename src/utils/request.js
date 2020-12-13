// 请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    // 接口的基准路径
    baseURL:"http://ttapi.research.itcast.cn/"
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    //请求发起，会经过这里
    // config是本次请求的配置对象
    // console.log(config)
    const {user} = store.state
    // 判断用户是否登录，并且是否携带token
    if(user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 务必要返回config配置对象，否则请求出不去
    return config
  }, function (error) {
    // 请求出错了（本身请求没有发出去），会经入这里
    return Promise.reject(error)
  })

// 响应拦截器
export default request