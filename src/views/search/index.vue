<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

     <!-- 搜索结果 -->
    <search-results v-if="isResultShow"/>
    <!-- /搜索结果 -->

     <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText"/>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else/>
    <!-- /搜索历史记录 -->

   
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResults from './components/search-results'
export default {
  name:'searchIndex',
  components:{
    searchHistory,
    searchSuggestion,
    searchResults
  },
  data(){
    return {
      searchText: '',
      // 控制搜索的展示结果
      isResultShow:false
    }
  },
  methods:{
    onSearch(val) {
      console.log(val)
      this.isResultShow = true
    },
    onCancel() {
      console.log('取消')
    },
  }
}
</script>

<style lang="less" scoped>
  .search-container {
    .van-search__action{
      color: #fff;
    }
  }
</style>