import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储用户登录状态下的信息
    // user:null
    user:getItem(TOKEN_KEY)
    
  },
  mutations: {
    setUser(state,user){
      state.user = user
      // 为了防止页面刷新数据丢失，将数据存储到本地存储
      setItem(TOKEN_KEY,state.user)
    }
    
  },
  actions: {
  },
  modules: {
  }
})
