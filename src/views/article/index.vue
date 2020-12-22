<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <!-- 模板中的$event是事件参数 -->
          <!-- 当我们传递给子组件的数据既要使用，还要修改 -->
          <!-- 传递：props -->
          <!-- :is-followed ="article.is_followed" -->
          <!-- 修改：自定义事件 -->
          <!-- @update-follow="article.is_followed=$event" -->
          <!-- 简写方式：在组件上使用v-model 
          value="article.is_followed" 
          @input = "article.is_followed=$event"
          -->
          <!-- 如果需要修改v-model的规则名称，可以通过子组件的model属性来配置修改 -->
          <!-- 注意：一个组件只能用一次v-model
          如果有多个属性即想用，又想改，那么可以使用属性.sync修饰符

           -->
          <follow-user 
          class="follow-btn"
          :user_id="article.aut_id"
          v-model="article.is_followed"
          />
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow(article.art_id)"
            :loading="followLoading"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow(article.art_id)"
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div 
        class="article-content markdown-body" 
        v-html="article.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <comment-list 
          :source = "article.art_id"
          :list = "commentList"
          @onload-success="totalCommentCount = $event.total_count"
          @replay-click ="onRelyClick"
       />
        <!-- /评论列表 -->

          <!-- 底部区域 -->
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPostShow = true"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          :info="totalCommentCount"
          color="#777"
        />
        <!-- 收藏文章 -->
        <collect-article 
          v-model="article.is_collected"
          :article-id = "article.art_id"
        />
        <!-- /收藏文章 -->
        <!-- 文章点赞 -->
        <like-article 
          v-model="article.attitude"
          :article-id = "article.art_id"
        />
        <!--/ 文章点赞 -->
        <van-icon name="share" color="#777777"></van-icon>
      </div>
      <!-- /底部区域 -->

      <!-- 发布评论的弹出层 -->
      <van-popup 
        v-model="isPostShow" 
        position="bottom" 
      >
      <comment-post
        :target = "article.art_id"
        @close="isPostShow=false"
        @post-success="onPostSuccess"
       />
      </van-popup>
      <!-- /发布评论的弹出层 -->
        
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复弹出层 -->
    <!-- 弹出层是懒渲染的，只有在第一次展示的时候才会渲染里面的内容，之后它的关闭和显示都是在切换内容的显示和隐藏 -->
    
    <van-popup 
     v-model="isReplyShow" 
     position="bottom" 
     style="height: 100%"
    >
      <!-- v-if 渲染元素 true  -->
      <comment-reply 
      v-if="isReplyShow"
      :comment="currentComment" 
      @close = "isReplyShow=false"
      />
    </van-popup>
    <!-- /评论回复弹出层 -->
  </div>
</template>

<script>
import {getArticleById} from '@/api/article'
// 加载图片预览
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import ArticleList from '../home/components/article-list'
import CommentList from './components/comment-list'
import CommentItem from './components/comment-item.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
// ImagePreview({
//   images: [
//     'https://img.yzcdn.cn/vant/apple-1.jpg',
//     'https://img.yzcdn.cn/vant/apple-2.jpg',
//   ],
//   onClose() {
//     this.$toast('关闭')
//   },
// })

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    collectArticle,
    LikeArticle,
    ArticleList,
    CommentList,
    CommentItem,
    CommentPost,
    CommentReply
  },
  // 依赖注入
  // 给所有的后代组件提供数据
  // 不要滥用
  provide: function () {
  return {
    articleId:this.articleId
  }
},
  props: {
    articleId: {
      type: [Number, String,Object],
      required: true
    }
  },
  data () {
    return {
      // 文章详情
      article:{},
      // 文章的加载状态
      loading:true,
      errStatus:0, //失败的状态码
      // loading的显示状态
      isFollowLoading: false,
      totalCommentCount:0, //文章评论总数
      isPostShow:false,  //控制评论框的显示与隐藏
      commentList:[], //评论列表
      isReplyShow:false, //控制评论回复的显示与隐藏
      currentComment:{} //当前点击的回复项
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
    // this.onFollow()
  },
  mounted () {},
  methods: {
    // 获取文章详情
    async loadArticle(){
      this.loading = true
      try{
        const {data} = await getArticleById(this.articleId)

        // 模拟失败情况
        // if(Math.random()>0.5){
        //   JSON.parse('adkjakf')
        // }
        // console.log(data)
        // 数据驱动视图这件事不是立即的
        this.article = data.data
        // console.log(this.article)
        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImg()
        })


        // 请求成功，关闭loading
        // this.loading = false
      }catch(err){
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取数据失败！')
      }
      // 无论成功还是失败都要关闭loading
      this.loading = false
    },
    // 图片预览
    previewImg(){
      // 获取所有img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 所有图片的存储地址
      const images = []
      imgs.forEach((img,index)=>{
        images.push(img.src)
        // 给img注册点击事件
        img.onclick=()=>{
          // 展示图片预览
          ImagePreview({
            images,
            startPosition: index,
          });
        }
      })
    },
    onPostSuccess(data){
    // 关闭弹出层
      this.isPostShow = false
    // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    onRelyClick(comment){
      // console.log(comment)
      // 当前回复对象就是点击回复对象时传过来的值
      this.currentComment = comment
      // 开启弹出层
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
