// 请求模块
import axios from 'axios'
import store from '@/store'
// 加载bigint第三方包
import JSONBig from 'json-bigint'
import {Toast}  from 'vant'
import router from '@/router'
// 提供两种方法
// JSONBig可以处理数据中超出JavaScript安全整数范围的问题
// JSONBig.parse() 把JSON格式的字符串转为JavaScript对象
// JSONBig.stringify()
// 使用的时候需要把 BigNumber 类型的数据转为字符串来使用
// console.log(JSONBig.parse(jsonStr).art_id.toString()) // 1245953273786007552

const request = axios.create({
    // 接口的基准路径
    // baseURL:"http://ttapi.research.itcast.cn/"
    // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    // axios默认会在内部这样来处理后端返回的数据
    try {
      // data：后端返回的原始数据，就是JSON格式的字符串
      // 如果转换成功则返回转换的数据结果
      return JSONBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

const refreshTokenReq = axios.create()
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
request.interceptors.response.use(function(response){
  return response
},async function(err){
  const status = err.response.status
  if(status=== 400){
    Toast.fail('客户端请求参数错误')
  }else if(status===401){
    const {user} = store.state
    if(!user || !user.refresh_token){
      // 直接去登录吧，没有办法了，跳转到登录页面
      // this.$router.push 组件用法
      // router.push('/login')
      // 登录路由其实没有必要，不期望保留历史记录
      // return router.replace('/login')
      return redirectLogin()
    }
    // 用refresh_token获取新的token
    // 直接用现有的request去请求，假如请求的结果还是401，会形成死循环
    try{
      const {data} = await requestToken({
        method:'PUT',
        url:'/app/v1_0/authorizations',
        headers:{
          Authorization:`Bearer ${user.refresh_token}`
        }
      })
      user.token=data.data.token
      //用新的token更新store里面的无效token
      store.commit('setUser',user)
      // 把之前的错误请求重新完整的再发一次
      // 这里发送请求，带过去 token确实是无效的token，但是没关系，因为这个请求会经过自己的请求拦截器
      // 自己请求拦截器里面会有重新获取token的操作
      return request(err.config)

    }catch(err){
      // 用refresh_token换取token的时候也出错了
      // return router.replace('/login')
      return redirectLogin()
    }
    //Toast.fail('无效的TOKEN')
  }else if(status===403){
    Toast.fail('客户端没有权限')
  }else if(status===404){
    Toast.fail('请求资源不存在')
  }else if(status>=500){
    Toast.fail('服务端错误')
  }
  // 错误信息
  return Promise.reject(err)
})

function redirectLogin(){
  return router.replace({
    name:'login',
    query:{
      redirect:router.currentRoute.fullPath
    }

  })
}
export default request