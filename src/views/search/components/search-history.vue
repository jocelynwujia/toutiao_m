<template>
  <div class="search-history">
    <van-cell title="搜索历史记录" value="内容">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"/>
    </van-cell>
    <van-cell 
    :title="item"
    v-for="(item,index) in searchHistories"
    :key="index"
    @click="onSearchItemClick(item,index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name:'searchHistory',
  //prop数据：如果是普通数据（数字、字符串、布尔值）觉得不能修改，即使改了，也也不能传导给父组件
  // 如果是引用数据（数组、对象），可以修改，例如[].push(xxx),对象.xxx=xxx,不能赋值xxx=[]
  props:{
    searchHistories:{
      type:Array,
      required:true
    }
  },
  data(){
    return {
      // 控制删除的显示状态
      isDeleteShow:false
    }
  },

  methods:{
    onSearchItemClick(item,index){
      if(this.isDeleteShow){
        // 删除状态，删除历史记录数据
        this.searchHistories.splice(index,1)
        console.log(this.searchHistories)
      }else{
        // 非删除状态，直接进入搜索
        this.$emit('search',item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>