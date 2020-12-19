// 请求模块
import axios from 'axios'
import store from '@/store'
// 加载bigint第三方包
import JSONBig from 'json-bigint'
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