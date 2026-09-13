<template>
  <Loading v-show="studentLsit.length === 0" />
  <div class="overflow-x-auto" v-show="studentLsit.length > 0">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Cass</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <StudentItem  v-for="studentItem in currentPageStudentList" key="studentItem.id"
        :studentItem
        />
      </tbody>
    
    </table>
  </div>
  <Pagination
  :currentPage="currentPage"
  :totalPageCount="totalPageCount"
  @changePage="handleStudentClick"
  />

</template>

<script setup>
import StudentItem from './StudentItem.vue';
import { onMounted,ref,computed,watch} from 'vue';
import {useRoute,useRouter} from 'vue-router'
import {getStudentList} from'@/services/apiStudent.js'
import {useSearchStore} from '@/stores/search.js'
import Pagination from '@/ui/Pagination.vue'
import {storeToRefs} from 'pinia'
import Loading from '@/ui/Loading.vue'
const studentLsit = ref([])
const searchStore = useSearchStore()
const {studentSearchCondaition} = storeToRefs(searchStore)
const route = useRoute()
const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(2)
 onMounted(async ()=>{
  router.push({
    query: {
      page: currentPage.value,
    }
  })
  //获取学生列表
  const token = import.meta.env.VITE_SUPABASE_TOKEN
  const userData = JSON.parse(localStorage.getItem(token) || '{}')
  const userId = userData.user.id
  studentLsit.value = await getStudentList(userId)
})
const filteredStudentList = computed(()=>{
  return studentLsit.value.filter((student)=>{
    //4 个字段放到数组一段完整长字符串 这样可以虽然只打了一个例如name的一个字 但在字符串中includes中还是可以匹配到。
    //如果为数组的必须与数组中的元素完全匹配才能被includes匹配到，例如['name','class','gender','grade']输入include（n）返回的是ture因此要为字符串
    const studentInfo=[
      student.name,
      student.class,
      student.gender,
      student.grade
    ].join('')
    for(const condition of studentSearchCondaition.value){
      if(!studentInfo.includes(condition)){
        return false
      }
    }
    return true
  })
})

//分页
//计算总页数
const totalPageCount = computed(()=>{
  return Math.ceil(filteredStudentList.value.length / pageSize.value)
})

//改`currentPage`（前端分页点击页码）→ 更新 URL 的`?page=xx`
watch(()=>currentPage.value, (newPage)=>{
  router.push({
    query: {
      page: newPage,
    }
  })
//改 URL 的`query.page`（浏览器前进后退、直接改地址）→ 更新`currentPage`
  watch(()=>route.query.page, (newPage)=>{
    currentPage.value = newPage
  })
  
})
function handleStudentClick(page){
  currentPage.value = page
}
const currentPageStudentList = computed(()=>{
  return filteredStudentList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})

</script>

<style lang="scss" scoped>

</style>