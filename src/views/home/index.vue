<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button slot="title" size="small" type="info" round icon="search" class="search-btn">搜索</van-button>
    </van-nav-bar>      

    <!-- 频道列表    -->
    <!-- v-model 绑定当前激活标签对应的索引号 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key = "channel.id">{{channel.name}}的内容</van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburge-btn">
        <i class="iconfont toutiao_gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import {getUserChannels} from '@/api/user'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active:0,
      // 用户频道数据
      channels:[]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels(){
      try{
          const {data} = await getUserChannels()
          // console.log(data)
          this.channels = data.data.channels
      }catch(err){
        console.log('获取用户频道列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container{
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