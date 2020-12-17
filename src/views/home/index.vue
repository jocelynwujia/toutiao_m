<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button 
      slot="title" 
      size="small" 
      type="info" 
      round icon="search" 
      class="search-btn"
      >搜索</van-button>
    </van-nav-bar>      

    <!-- 频道列表    -->
    <!-- v-model 绑定当前激活标签对应的索引号 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs 
    class="channel-tabs" 
    v-model="active" 
    animated 
    swipeable
    >
      <van-tab 
      :title="channel.name" 
      v-for="channel in channels" 
      :key = "channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"/>
          <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburge-btn" @click="isChannelEditShow = true">
        <i class="iconfont toutiao_gengduo"></i>
      </div>
    </van-tabs>

     <!-- 频道编辑弹出层 -->
    <van-popup 
    v-model="isChannelEditShow" 
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
    >
     <channel-edit 
     :myChannels="channels"
     :active="active"
     @update-active = "onUpdateActive"
     ></channel-edit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import {getItem} from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    channelEdit
  },
  props: {},
  data () {
    return {
      active:0,//频道高亮
      // 用户频道数据
      channels:[],
      isChannelEditShow:false //控制频道编辑弹出层的显示与隐藏
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // 获取用户频道列表
    async loadChannels(){
      try{
          // const {data} = await getUserChannels()
          // // console.log(data)
          // this.channels = data.data.channels
          // // console.log(this.channels)
          // 已登录，请求获取用户频道列表
          let channels = []
          if(this.user){
            const {data} = await getUserChannels()
            channels = data.data.channels
          }else{
            // 未登录，判断是否有本地的频道列表数据
            const localChannels = getItem('TOUTIAO_CHANNELS',)
          // 有，拿来使用
          if(localChannels){
            channels = localChannels
          }else{
           // 没有，请求获取默认频道列表
            const {data} = await getUserChannels()
            channels = data.data.channels
          }
          
          }
        this.channels = channels 
      }catch(err){
        this.$toast('获取用户频道数据失败')
      }
    },
    // 修改active的值
    onUpdateActive(index,isChannelEditShow=true){
      // console.log(index)
      // 更新激活的频道项
      this.active = index
      // 关闭弹出层
      // this.isChannelEditShow = false
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container{
    padding-top: 174px;
    padding-bottom: 100px;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .vant-icon{
        font-size: 32px;
      }
    }
    /deep/ .channel-tabs{
      .van-tabs__wrap{
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        z-index: 1;
        height: 82px;
      }
      .van-tab {
        min-width: 200px;
        height: 82px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color: #777;
      }
      .van-tab--active{
        color: #333;
      }
      .van-tabs__line{
        width: 31px;
        height: 6px;
        background-color: #3296fc;     
    }
    .van-tabs__nav{
        padding-bottom: 16px;
      }
      .placeholder{
        width: 66px;
        height: 82px;
        flex-shrink: 0;
      }
      .hamburge-btn{
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 82px;
        background-color: #fff;
        opacity: 0.902;
        i.iconfont {
          font-size: 33px;
        }
        &:before {
          content: "";
          width: 1px;
          height: 100%;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
    }   
  }
</style>