<template>
<div class="navbar bg-base-300 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabindex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
        <li><a :class=" route.path === 'score' ? 'menu-active' :'' ">Score</a></li>
        <li><a :class=" route.path === 'studen' ? 'menu-active' :'' ">Student</a></li>
      </ul>
    </div>
    <a class="btn btn-ghost text-xl" @click="router.push({name:'home'})">Sunshine</a>
  </div>
  <div class="navbar-center hidden lg:flex" v-if="!isStudent">
    <ul class="menu menu-horizontal px-1">
        <li><a :class=" route.path === 'score' ? 'menu-active' :'' "  @click="router.push({name:'score'})">Score</a></li>
        <li><a :class=" route.path === 'student' ? 'menu-active' :'' "  @click="router.push({name:'student'})">Student</a></li>
    </ul>
  </div>
  <!-- ========== navbar-end 这里，删掉原来Button，换成头像下拉 ========== -->
  <div class="navbar-end">
    <ToggeTheme />
    <div class="dropdown dropdown-end">
      <!-- 圆形头像按钮 -->
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="头像" :src="user?.avatar " />
        </div>
      </div>
      <!-- 头像弹出下拉菜单 -->
      <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a class="justify-between" @click="router.push({name:'info'})">
            Profile
          </a>
        </li>
        <li><a @click="onClick">Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute ,useRouter } from 'vue-router'
import ToggeTheme from '@/ui/ToggeTheme.vue'
import {getsigOut} from '@/services/apiAuth.js'
import {useUserStore} from '@/stores/user.js'
import { storeToRefs } from 'pinia'
const route = useRoute()
const router = useRouter()
const {updateUser} = useUserStore()
const { user,isStudent } = storeToRefs(useUserStore())

//点击跳转login
async function onClick(){
  await getsigOut()
  router.push({name:'login'})
}

onMounted(()=>{
  const token = import.meta.env.VITE_SUPABASE_TOKEN
  const userToken = JSON.parse(localStorage.getItem(token))
  const userMetada = userToken?.user?.user_metadata
  updateUser(userMetada)
})

</script>

<style lang="scss" scoped>

</style>