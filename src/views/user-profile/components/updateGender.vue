<template>
  <div class="update-gender">
    <van-picker
    title="标题"
    :default-index="value"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="onPickerChange"
  />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
  name:'UpdateGender',
  props:{
    value:{
      type:Number,
      required:true
    }
  },
  components:{},
  data(){
    return{
      columns: ['男', '女'],
      localGender:this.value
    }
  },
  methods:{
    
     async onConfirm() {
      // console.log(value,index)
      this.$toast.loading({
        message:'保存中...',
        forbidClick:true, // 禁止背景点击
        duration:0 //持续展示
      })
      try{
        // const localGender = this.localGender
        await updateUserProfile({
          gender:this.localGender
        })
       // console.log(data)

        // 更新视图
        this.$emit('input',this.localGender)
       // 更新成功
        this.$toast.success('成功')
        // 关闭弹出层       
        this.$emit('close')
 
      }catch(err){
        this.$toast.fail('更新失败')
      }
    },
      onPickerChange(picker, value, index) {
    //  console.log(picker,value,index)
    this.localGender = index     
    },
    },
   
  }
</script>

<style lang="less" scoped>
  
</style>