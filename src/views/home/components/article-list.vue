<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="reFreshText"
      success-duration = "1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item 
        v-for="(article,index) in list" 
        :key="index" 
        :article = "article" 
        />
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item'
export default {
  name:'ArticleList',
  components:{
    ArticleItem
  },
  props:{
    channel:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      list: [], //存储列表数据的数组
      loading: false, //控制加载中loading的状态
      finished: false, //控制数据加载结束的状态
      timestamp:'', //时间戳
      error:false, //加载数据错误的状态
      isRefreshLoading:false,//控制刷新状态
      reFreshText:''
    }
  },
  created(){
    
  },
  methods:{
    // 初始化或滚动到底部的时候，会触发onload事件
    async onLoad() {
     try {
        // 异步更新数据
      // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,  //频道ID
          //timestamp简单理解就是数据的页码，请求第一页数据就是当前最新时间戳
          //用于请求之后数据的时间戳会在当前结果返回给你
          timestamp: this.timestamp || Date.now(),  //时间戳,
          with_top: 1  //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // console.log(data)
        // 测试展示err
        // if(Math.random()>0.5){
        //   JSON.parse('djdjfd')
        // }
        const { results } = data.data
        // console.log(results)
      // 2.把请求结果数据放到list中 ,展开运算符是把results结果一个一个取出来
        this.list.push(...results)
      // 3.本次数据加载结束之后把加载状态设置为结束
        this.loading = false
      // loading关闭之后才能触发下一次的加载更多
        //  4.判断数据是否全部加载完成，
        if(results.length){
          // 更新获取下一次的时间戳
          this.timestamp = results.pre_timestamp
        } else{
          // 如果没有数据，就把finished设置为true，之后不再触发加载更多
          this.finished = true
        }
    
     } catch(err){
      //  展示错误状态
       this.error = true;
      //  同时将loading关闭
       this.loading = false
     }
    },
    // 下拉刷新，会触发onRefresh事件
    async onRefresh(){
       try {
        //  1.请求数据
         const { data } = await getArticles({
          channel_id: this.channel.id,  //频道ID
          //timestamp简单理解就是数据的页码，请求第一页数据就是当前最新时间戳
          //用于请求之后数据的时间戳会在当前结果返回给你
          timestamp: Date.now(),  //最新数据时间戳,
          with_top: 1  //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
          // 模拟刷新失败
        // if(Math.random() >0.2){
        //   JSON.parse('sdjfdf')
        // }
        // console.log(data)
        // 2.将数据追加到顶部
        const {results} = data.data
        this.list.unshift(...results)
        this.reFreshText = `刷新成功，更新了${results.length}条数据`
        // console.log(results)
        // 2.关闭下拉刷新
        this.isRefreshLoading = false
       } catch(err){
        this.reFreshText = "刷新失败"
        // 关闭刷新状态
        this.isRefreshLoading = false
       }
      
    }
  }
}
</script>

<style lang="less" scoped>
  .article-list{
    height: 79vh;
    overflow-y: auto;
  }
</style>