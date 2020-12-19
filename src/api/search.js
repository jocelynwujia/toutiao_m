// 搜索请求模块
import request from '@/utils/request'

// 请求搜索联想数据
export const getSearchSuggestion = q =>{
  return request({
    method:'GET',
    url:'/app/v1_0/suggestion',
    params:{
      q
    }
  })
}
// 请求搜索结果数据
export const getSearchResult = params=>{
  return request({
    method:'GET',
    url:'/app/v1_0/search',
    params
  })
}