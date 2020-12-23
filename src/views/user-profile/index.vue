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
     <van-cell 
     title="昵称" 
     :value="user.name" 
     is-link 
     @click="isUpdateNameshow = true"
     />    
     <van-cell 
      title="性别" 
      :value="user.gender === 0 ? '男':'女'" 
      is-link 
      @click="isUpdateGenderShow=true"
      />
     <van-cell 
     title="生日" 
     :value="user.birthday" 
     is-link 
     @click="isUpdateBirthdayShow =true"
     />
     <!-- / 个人信息 -->

     <!-- 编辑昵称弹出层 -->
     <van-popup 
     v-model="isUpdateNameshow" 
     position="bottom" 
     :style="{ height: '100%' }">
        <updateName 
        v-if="isUpdateNameshow"
        v-model="user.name"
        @close = "isUpdateNameshow=false"
        />
     </van-popup>
     <!-- /编辑昵称弹出层 -->

     <!-- 编辑性别弹出层 -->
     <van-popup 
     v-model="isUpdateGenderShow" 
     position="bottom" 
      >
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow=false"
      />
     </van-popup>
     <!-- /编辑性别弹出层 -->

       <!-- 编辑生日弹出层 -->
     <van-popup 
      v-if="isUpdateBirthdayShow"
      v-model="isUpdateBirthdayShow"
      position="bottom" 
      >
      <update-birthday
        v-model="user.birthday"
        @close = "isUpdateBirthdayShow=false"
      />
     </van-popup>
     <!-- /辑生日弹出层 -->
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import updateName from './components/updateName'
import UpdateGender from './components/updateGender'
import UpdateBirthday from './components/updateBirthday'
export default {
  name:'UserProfile',
  components:{
    updateName,
    UpdateGender,
    UpdateBirthday
  },
  props:{
    
  },
  data(){
    return{
      user:{}, //用户基本信息
      isUpdateNameshow:false,
      isUpdateGenderShow:false,
      isUpdateBirthdayShow:false
    }
  },
  created(){
    this.loadUserProfile()
  },
  methods:{
    async loadUserProfile(){
      try{
        const {data} = await getUserProfile()
        // console.log(data)
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
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>