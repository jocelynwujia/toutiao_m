import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant核心组件库
import Vant from 'vant'
// 加载vant全局样式
import 'vant/lib/index.css'
import './styles/index.less'
// 导入动态设置 REM 基准值，html 标签 `font-size` 的变化
import 'amfe-flexible' 

Vue.config.productionTip = false

// 注册使用vant组件库
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
