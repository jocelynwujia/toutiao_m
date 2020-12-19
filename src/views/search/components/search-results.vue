<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
       v-for="(article,index) in list" 
       :key="index" 
       :title="article.title" 
       :error.sync = "error"
       error-text="加载失败，请点击重试"
       />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  name:'searchResults',
  props:{
    searchText:{
      type: String,
      required: true
    }
  },
  data(){
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      perpage:20,
      error:false
    }
  },
  methods:{
    async onLoad() {
      try{
         // 1.请求数据
        const { data } = await getSearchResult({
         page:this.page,//页码
         per_page:this.perpage,//每页大小
         q:	this.searchText //搜索关键词  
        })
        // console.log(data)
        const {results} = data.data
        // 2.将数据添加到列表当中
        this.list.push(...results)
      // 3.将本次加载中的loading关闭
        this.loading = false
      // 4.判断是否有数据
      if(results.length){
        // 如果有，则更新获取下一次数据的页码
        this.page++
      }else{
        // 没有数据了，将加载状态设置结束，不再 onLoad 
        this.finished= false
      }

      }catch(err){
        this.error = true
        // 加载失败，关闭loading
        this.loading = false
        this.$toast('数据获取失败，请稍后重试')
      }
      
     }
  }
}
</script>

<style lang="less" scoped>
  
</style>