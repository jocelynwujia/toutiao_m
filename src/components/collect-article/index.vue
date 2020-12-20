<template>
 <van-icon
  :color="is_collected ? '#ffa500' :''"
  :name="is_collected ? 'star' :'star-o'"
  :loading = "loading"
  @click="onCollect"
/>
</template>

<script>
import {addCollect,deleteCollect} from '@/api/article'
export default {
  name:"collectArticle",
  model:{
    prop:'is_collected',
    event:'update-article-collected'
  },
  props:{
    is_collected:{
      type:Boolean,
      required:true
    },
    // 文章id
    articleId:{
      type:[Number,String,Object],
      required:true
    }
  },
  components:{},
  data(){
    return{
      loading:false
    }
  },
  created(){},
  methods:{
    async onCollect(){
      this.loading = true
      try{
        if(this.is_collected){
        // 如果已收藏，则取消收藏
        await deleteCollect(this.articleId)
      }else{
        // 否则，添加收藏
        await addCollect(this.articleId)
      }

      // 更新视图
      this.$emit('update-article-collected',!this.is_collected)
      this.$toast.success(this.is_collected ? '取消收藏' :'收藏成功')
      }catch(err){
        this.$toast.fail('数据加载失败，请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>