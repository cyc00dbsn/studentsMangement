<template>
  <Loading v-show="loading" />
  <div class="mx-auto w-1/3 mt-30 shadow-2xl shadow-blue-300 rounded-box" v-show="!loading">
    <div class="avatar flex justify-center pt-4">
      <div class="w-24 rounded-full">
        <label for="avatar-input" class="cursor-pointer">
          <img alt="Tailwind-CSS-Avatar-component" :src="currenAvatarUrl" />
        </label>
      </div>
      <input type="file" class="hidden" id="avatar-input" accept="image/*" @change="handeAvatarChange">
    </div>
    <div class="w-3/4 mx-auto">
      <label class="input validator my-2">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          type="text"
          value="Dbsn" 
          disabled
        />
      </label>
      <ul class="menu bg-base-200 rounded-bo w-1/2" v-if="classInChargeArray.length > 0">
        <li>
          <details open>
            <summary>Class In Charge</summary>
            <ul >
              <li><a class="pointer-events-none" v-for="(item,index) in classInChargeArray" :key="index"> Class {{item.split('|')[0]}} | Year {{item.split('|')[1]}}</a></li>
        
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <div class="text-center py-4">
      <button class="btn btn-primary" @click="onClick">Update Avatar</button>
    </div>
  
  </div>

</template>

<script setup>
import {ref,onMounted} from 'vue'
import {uploadAvatar} from '@/services/apiStorage'
import {useUserStore} from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import {getTeacherByTeacherId} from '@/services/apiTeacher.js'
import {getUserId} from '@/utils/userHelper.js'
import {updateUserApi} from '@/services/apiAuth.js'
import {updateStudent} from '@/services/apiStudent.js'
import {useRouter} from 'vue-router'
import Loading from '@/ui/Loading.vue'
const router = useRouter();
import { useToast } from "vue-toastification";
const toast = useToast();
const loading = ref(true)
const avatarFile = ref() 
const {user,isStudent} = storeToRefs(useUserStore())
const {updateUser} = useUserStore()
const currenAvatarUrl = ref(user.value.avatar)
const supabaseURL = import.meta.env.VITE_SUPABASE_URL
function handeAvatarChange(event){
  const file = event.target.files[0];
  avatarFile.value = file;
  currenAvatarUrl.value  = URL.createObjectURL(file);
}
async function onClick (){
  if(!avatarFile.value){
    toast.error("Please select an avatar image.");
    return;
  } 
  toast.info("Uploading avatar...");
  //获取当前用户信息中的id
  const userId = getUserId();
  //上传用户头像到supabase storage 的avatar表中
  const newAvatarFileName = `${userId}-${Date.now()}.png`
  const data =  await uploadAvatar(avatarFile.value,newAvatarFileName)
  const newAvatar = `${supabaseURL}/storage/v1/object/public/avatar/public/${newAvatarFileName}`
  //更新用户信息中的avatar字段
  const updataUserDate = await updateUserApi({
    avatar: newAvatar
  });
  //更新学生信息中的avatar字段
  if(isStudent.value){
    const userId = getUserId();
    const student = await updateStudent(userId,{avatar: newAvatar});
  }
  toast.clear()
  toast.success("Avatar updated successfully!");
  //更新pinia中的用户信息
  updateUser(updataUserDate.user.user_metadata); 
}
const classInChargeArray = ref([])

onMounted(async ()=>{
  currenAvatarUrl.value = user.value?.avatar;
  if(!isStudent.value){
    const userId = getUserId();
    const teacher = await getTeacherByTeacherId(userId);
    classInChargeArray.value = JSON.parse(teacher[0].classuser_in_charge);

  }
  loading.value = false
})
</script>

<style lang="scss" scoped>

</style>