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
    <search-results 
    :searchHistories = "searchHistories"
    v-if="isResultShow"
    :searchText = "searchText"
    
    />
    <!-- /搜索结果 -->

     <!-- 联想建议 -->
    <search-suggestion 
      :searchText = "searchText"
      v-else-if="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history 
      :searchHistories="searchHistories"
      @clear-search-histories ="searchHistories = []"
      @search="onSearch"
      v-else
    />
    <!-- /搜索历史记录 -->

   
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResults from './components/search-results'
import {getItem,setItem} from '@/utils/storage'
export default {
  name:'searchIndex',
  components:{
    searchHistory,
    searchSuggestion,
    searchResults
  },
  data(){
    return {
      // 搜索框的内容
      searchText: '',
      // 控制搜索的展示结果
      isResultShow:false,
      // 搜索历史记录数据
      searchHistories:getItem('TOUTIAO_SEARCH_HISTORIES') || []}
  },
  watch:{
      searchHistories(value){
        // console.log('haha')
        setItem('TOUTIAO_SEARCHa_HISTORIES',value)
      }
      // 完整写法，可以配置更多自定义配置
    // searchHistories:{
    //   handler(){
    //     console.log('haha')
    //   }
    // }
  },
  methods:{
    onSearch(val) {
      // console.log(val)
      this.searchText = val
      // 存储搜索历史记录
      const index = this.searchHistories.indexOf(val)
      if(index != -1){
        // 先删除原纪录的值
        this.searchHistories.splice(index,1)
      }
      // 再将新搜索添加到历史记录最前面
      this.searchHistories.unshift(val)
      // 渲染搜索结果
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