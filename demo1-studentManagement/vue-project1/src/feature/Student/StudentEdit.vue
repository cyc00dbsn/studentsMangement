<template>
  <Loading v-show="loading" />
  <div class="mx-auto w-1/3 mt-30 shadow-2xl shadow-blue-300 rounded-box" v-show="!loading">
    <div class="avatar flex justify-center pt-4">
      <div class="w-24 rounded-full">
        <label for="avatar-input" class="cursor-pointer">
          <img alt="Tailwind-CSS-Avatar-component" :src="currenAvatarUrl" />
        </label>
      </div>
    <input type="file" class="hidden" id="avatar-input" accept="image/*" @change="handeAvatarChange"/>
    </div>

    <div class="w-3/4 mx-auto">
      <fieldset class="fieldset  my-2 ">
        <input type="text" id="name"  class="input" placeholder="Name"  min="0" max="100" v-model="name"/>
      </fieldset>
      <div class=" gap-2">
        <select class="select appearance-none" v-model="gender" >
          <option disabled>Chose Gender </option>
          <option>male</option>
          <option>female</option>
        </select>
      </div>
      
    </div>
    <div class="text-center">
      <button class="btn btn-primary mx-2 my-2" @click="onClick">Update Profile</button>
    </div>
  
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getStudentById } from '@/services/apiStudent.js';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { updateStudent } from '@/services/apiStudent.js';
import { useToast } from "vue-toastification";
import { uploadAvatar } from '@/services/apiStorage.js'
import "vue-toastification/dist/index.css";
import Loading from '@/ui/Loading.vue'
const router = useRouter()
const route = useRoute()
const avatarFile = ref(null)
const name = ref('')
const gender = ref('')
const currenAvatarUrl = ref()
const loading = ref(true)
const toast = useToast();
onMounted(async ()=>{
  const student = await getStudentById(route.params.id)
  name.value = student.name
  gender.value = student.gender
  currenAvatarUrl.value = student.avatar
  loading.value = false
})
function handeAvatarChange(event){
  const file = event.target.files[0];
  avatarFile.value = file;
  //预览本地图片
  currenAvatarUrl.value  = URL.createObjectURL(file);
}

async function onClick (){
  //更新学生成功后，显示成功提示
  const newStudentData = {
    name: name.value,
    gender: gender.value,
  }
  if(avatarFile.value){
    //获取当前用户信息中的id 上传更新的学生头像 到supabase student表中的avatar字段
    //获取当前用户信息中的id
    const token = import.meta.env.VITE_SUPABASE_TOKEN
    const supabaseURL = import.meta.env.VITE_SUPABASE_URL
    const userToken = JSON.parse(localStorage.getItem(token))
    const userId = userToken.user.id
    //上传更新的学生头像 到supabase student表中的avatar字段
    //拼接图片访问链接  并赋值给newStudentData.avatar
    const newAvatarFileName = `${userId}-${Date.now()}.png`
    //上传图片到supabase
    await uploadAvatar(avatarFile.value,newAvatarFileName)
    newStudentData.avatar  = `${supabaseURL}/storage/v1/object/public/avatar/public/${newAvatarFileName}`
    toast.clear()
    //更新成功后，跳转到学生列表页面
    toast.success("Student profile updated successfully!");
    router.push({name:'student'})
  }else{
    toast.error("Please upload a new avatar!");
    return
  }
  //更新学生信息
  await updateStudent(route.params.id,newStudentData)
}








</script>

<style lang="scss" scoped>

</style>