<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" class="title-text" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        class="edit-btn"
      >编辑</van-button>
    </van-cell>
    <!-- 宫格 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="clear"
        v-for="(channel,index) in myChannels"
        :key="index"
      >
      <!-- v-bind:clas语法：一个对象，对象中的key表示要作用的CSS类名，对象中的value要计算出布尔值 -->
        <span 
        slot="text" 
        class="text"
        :class="{active:active===index}"
        >{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
  <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="title-text" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="(channel,index) in recommandChannels"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels }  from '@/api/channel'
export default {
  name:'channelEdit',
  props:{
    myChannels:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required:true
    }
  },
  data(){
    return{
      allChannels:[] //所有频道列表
    }
  },
  created(){
    this.loadAllChannels()
  },
  computed:{
    // 方法二
    recommandChannels(){
      // filter遍历数组，找到符合条件的元素存到新数组
      return this.allChannels.filter(channel =>{
        // find遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(mychannel =>{
          return mychannel.id === channel.id
        })
      })
      // 把计算属性返回
      // return channels
    }
    // 方法一：
    // recommandChannels(){
    //   const channels = []
    //   this.allChannels.forEach(channel =>{
    //     // find遍历数组，找到符合条件的元素
    //     const ret = this.myChannels.find(mychannel =>{
    //       return mychannel.id === channel.id
    //     })
    //     if(!ret){
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算属性返回
    //   return channels
    // }
  },
  methods:{
   async loadAllChannels(){
     try{
       const {data} = await getAllChannels()
      //  console.log(data)
       this.allChannels = data.data.channels
     }catch(err){
       this.$toast('数据获取失败')
     }
    }
  }
}
</script>

<style lang="less" scoped>
  .channel-edit{
    padding: 85px 0;
    .title-text{
      font-size: 32px;
      color: #333;
    }
    .edit-btn{
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }
    /deep/.grid-item{
      width: 160px;
      height: 86px;
      .van-grid-item__content{
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text,.text{
          font-size: 28px;
          color: #222;
           margin-top: 0;
        }
        .active{
          color: red;
        }
      }
    }
    /deep/ .my-grid {
      .grid-item {
        .van-icon-clear{
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 2;
        }
      }
    }
    /deep/.recommend-grid{
      .grid-item{
        .van-grid-item__content {
          flex-direction: row;
          .van-icon-plus{
            font-size: 28px;
            margin-right: 6px;
          }
          
        }
      }
    }
  }
</style>