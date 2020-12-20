<template>
  <van-button
    :class="value === 1 ? 'active' : ''"
    :icon="value===1 ? 'good-job' :'good-job-o'"
    :loading = "loading"
    @click="onLike"
  ></van-button>
  
</template>

<script>
import {addLike,deleteLike} from '@/api/article'
export default {
  name:'LikeArticle',
  components:{},
  props:{
    value:{
      type:Number,
      required: true
    },
    articleId:{
      type:[Number,String,Object],
      required: true
    }
  },
  data(){
    return{
      loading:false
    }
  },
  created(){
    console.log(this.value)
  },
  methods:{
    async onLike(){
      this.loading = true
      try{
        let status = -1 //定义一个表示未点赞变量
        if(this.value === 1){
          // 如果是点赞状态，则取消点赞
      deleteLike(this.articleId)
        }else{
          // 如果没有点赞，则添加点赞
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input',status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      }catch(err){
        console.log(err)
        this.$toast.fail('操作数据失败，请稍后重试')
      }
       this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .active{
    color: red;
    // font-size: 80px;
  }
</style>