<template>
  <Loading v-show="scoreList.length === 0" />
  <div class="overflow-x-auto" v-show="scoreList.length > 0">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Subject</th>
          <th>Semester</th>
          <th>Score</th>
        </tr>
      </thead>
      <!-- currentStudentData 是根据学生id去student表在找当前学生的信息name class等信息 -->
    <ScoreListItem
    v-for="scoreList in currentPageScoreList"  :key="scoreList.id"
    :scoreList="scoreList"
    :currentStudentData="studentsData.find(s => s.student_id === scoreList.student_id)" 
    />   
    </table>
  </div>
  <Pagination :currentPage :totalPageCount
   @changePage="handleScoreClick"
   />
</template>

<script setup>
import { onMounted, ref,computed,watch} from 'vue';
import {useRouter,useRoute} from 'vue-router'
import {getScoreList} from '@/services/apiScore.js'
import ScoreListItem from './ScoreListItem.vue';
import { getStudentList } from '@/services/apiStudent.js';
import {getUserId} from '@/utils/userHelper.js'
import {useUserStore} from '@/stores/user.js'
import {getScoreDetail} from '@/services/apiScore.js'
import {useSearchStore} from '@/stores/search.js'
import {storeToRefs} from 'pinia'
import Loading from '@/ui/Loading.vue'
import Pagination from '@/ui/Pagination.vue'
const studentsData = ref([])
const scoreList = ref([])
const userStore = useUserStore()
const {isStudent} = storeToRefs(userStore)
const searchStore = useSearchStore()
const {scoreSearchCondaition} = storeToRefs(searchStore)
const scoreData = ref([])
const pageSize = ref(import.meta.env.VITE_SUPABASE_PAGE_SIZE)
const route = useRoute()
const router = useRouter()
const currentPage = ref(route.query.page || 1)


onMounted(async ()=>{
 
  router.push({
    query: {
      page: currentPage.value,
    }
  })
  //获取所有学生分数列表
  scoreList.value = await getScoreList();
  //获取当前用户id
  const userId = getUserId();
  if(!isStudent.value){
    //用户是老师通过老师id获取所有学生分数列表
    //获取当前老师用户的所有学生列表
    studentsData.value = await getStudentList(userId)
  }else{
    //通过学生id获取当前学生的分数列表   获取当前学生的分数列表
    const userId = getUserId();
    console.log(userId)
    //不用过滤直接根据学生id获取当前学生用户的分数列表赋值给scoreData
    scoreData.value = await getScoreDetail(userId)
  }
})

 //进行权限判断如果用户为老师根据老师id获取这个老师管理的学生列表 studentsData，通过拿到不同学生列表中的student_id再通过 不同student_id 在score表中进行匹配找到对应的学生 获取学生分数列表
 //把这个数据 赋值给计算属性 filteredScoreList 
 //如果用户为学生直接scoreData赋值给filteredScoreList 
 //实现通过一个计算属性 filteredStudentScoreList 来渲染模板
const filteredStudentScoreList = computed(() => {
  if(!isStudent.value){
    return scoreList.value.filter(item => 
    studentsData.value.some(s => s.student_id === item.student_id)
    )
  }else{
    return scoreData.value
  }
  
})
//通过计算属性 filteredScoreList得到的分数列表 来实现根据搜索条件过滤分数列表
const filteredScoreList = computed(()=>{
  return filteredStudentScoreList.value.filter((score)=>{
    //4 个字段放到数组一段完整长字符串 这样可以虽然只打了一个例如name的一个字 但在字符串中includes中还是可以匹配到。
    //如果为数组的必须与数组中的元素完全匹配才能被includes匹配到，例如['name','class','gender','grade']输入include（n）返回的是ture因此要为字符串

    //根据学生id去student表中找当前学生的name和class信息用于搜索学生信息字段name class也能过滤
    // 如果只能搜索score表中的字段subject semesterYear semesterSeason score太局限
    //一般按照习惯是找名字和班级
    const student = studentsData.value.find(s => s.student_id === score.student_id)
    const studentInfo=[
      student.name ,
      student.class ,
      score.subject ,
      score.semesterYear ,
      score.semesterSeason ,
      score.score
    ].join('')
    for(const condition of scoreSearchCondaition.value){
      if(!studentInfo.includes(condition)){
        return false
      }
    }
    return true
  })
})
//计算总页数
const totalPageCount = computed(()=>{
  return Math.ceil(filteredStudentScoreList.value.length / pageSize.value)
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
function handleScoreClick(page){
  currentPage.value = page
}
const currentPageScoreList = computed(()=>{
  return filteredScoreList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})



</script>

<style lang="scss" scoped>

</style>