<template>
  <div class="article-container">
    文章详情页
  </div>
</template>

<script>
export default {
  name:'ArticleIndex',
  components:{},
  props:{
    articleId:{
      // 从文章列表点击跳转是Number类型，由url直接跳转就是字符串类型
      type:[Number,String],
      required:true
    }
  },
  data(){
    return{}
  },
  created(){},
  methods:{}
}
</script>

<style lang="less" scoped>
  
</style>