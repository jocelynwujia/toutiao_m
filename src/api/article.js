// 文章请求模块
import request from '@/utils/request'
// 获取文章列表
export const getArticles = params=> {
  return request({
    methods:'GET',
    url:'/app/v1_1/articles',
    params
  })
}

// 获取新闻文章详情
export const getArticleById =articleId=> {
  return request({
    methods:'GET',
    url:`/app/v1_0/articles/${articleId}`,
  })
}

