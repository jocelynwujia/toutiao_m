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
     <input 
     type="file" 
     hidden 
     ref="file"
     @change="onFileChange"
     > 
     <!-- 个人信息 -->
     <van-cell 
     title="头像"
     is-link
     @click="$refs.file.click()"
     >
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

      <!-- 编辑头像弹出层 -->
     <van-popup 
      v-model="isUpdatePhotoShow"
      position="bottom" 
      style="height:100%"
      >
      <update-photo
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
      
     </van-popup>
     <!-- /编辑头像弹出层 -->
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import updateName from './components/updateName'
import UpdateGender from './components/updateGender'
import UpdateBirthday from './components/updateBirthday'
import updatePhoto from './components/updatePhoto'
export default {
  name:'UserProfile',
  components:{
    updateName,
    UpdateGender,
    UpdateBirthday,
    updatePhoto
  },
  props:{

  },
  data(){
    return{
      user:{}, //用户基本信息
      isUpdateNameshow:false,
      isUpdateGenderShow:false,
      isUpdateBirthdayShow:false,
      isUpdatePhotoShow:false,
      img:null //预览的图片
    }
  },
  created(){
    this.loadUserProfile()
  },
  methods:{
    // 获取用户个人信息
    async loadUserProfile(){
      try{
        const {data} = await getUserProfile()
        // console.log(data)
        this.user = data.data
      }catch(err){
        this.$toast.fail('获取失败')
      }
      
    },
    onFileChange(){
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      // const data = window.URL.createObjectURL(file)
      // console.log(data)
      // this.img = data
        this.img=window.URL.createObjectURL(file)
      // console.log(this.img)
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true
      // file-input如果选了同一个文件不会触发changge
      // 解决方案就是每次使用完毕，把它的value清空
      this.$refs.file.value=''
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