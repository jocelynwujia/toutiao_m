<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import {addFollow,deleteFollow} from '@/api/user'
export default {
  name:'FollowUser',
  // model: {
  //   prop: 'isFollowed',
  //   event: 'update-follow'
  // },
  props:{
    value:{
      type:Boolean,
      required:true
    },
    user_id:{
      type:[Number,String, Object],
      required:true
    }
  },
  data(){
    return{
      loading:false
    }
  },
  methods: {
    // 关注用户
    async onFollow () {
      this.loading = true
      try {
        // 如果已关注，则取消关注
        const authorId = this.user_id
        if (this.value) {
          await deleteFollow(authorId)
        } else {
          // 否则添加关注
          await addFollow(authorId)
        }

        // 更新视图
        // this.$emit('update-follow', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        console.dir(err)
        if (err.response && err.response.status === 400) {
          return this.$toast.fail('不能关注自己')
        }
        this.$toast.fail('操作失败')
      }

      // 关闭按钮的 loading 状态
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>