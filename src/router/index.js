import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
  path:'/login',
  name:'login',
  component: () => import('@/views/login')
},{
  path:'/home',
  // 如果父路由有默认子路由，name没有意义
  // name:'layout',
  component: () => import('@/views/layout'),
  children:[{
    path:'/', //默认子路由，只能有一个
    name:'home',
    component: () => import('@/views/home')
  },{
    path:'/my',
    name:'my',
    component: () => import('@/views/my')
  },
  {
    path:'/qa',
    name:'qa',
    component: () => import('@/views/qa')
  },
  {
    path:'/video',
    name:'video',
    component: () => import('@/views/video')
  }]
}]

const router = new VueRouter({
  routes
})

export default router
