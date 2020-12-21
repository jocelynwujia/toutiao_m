<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="onClickLeft = $router.back()"
    />
     <!-- /导航栏 -->

     <!-- 个人信息 -->
     <van-cell title="头像">
       <!-- 头像 -->
       <van-image
        class="avatar"
        round
        fit="cover"
        :src="user.photo"
      />
     </van-cell>
     <van-cell title="昵称" :value="user.name" is-link />
     <van-cell 
      title="性别" 
      :value="user.gender === 0 ? '男':'女'" 
      is-link />
     <van-cell title="生日" :value="user.birthday" is-link />
     <!-- / 个人信息 -->
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
export default {
  name:'UserProfile',
  components:{},
  props:{
    
  },
  data(){
    return{
      user:{} //用户基本信息
    }
  },
  created(){
    this.loadUserProfile()
  },
  methods:{
    async loadUserProfile(){
      try{
        const {data} = await getUserProfile()
        console.log(data)
        this.user = data.data
      }catch(err){
        this.$toast.fail('获取失败')
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>