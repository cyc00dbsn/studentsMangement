<template>
  <Loading v-show="loading" />
  <div class="mx-auto w-1/3 mt-30 shadow-2xl shadow-blue-300 rounded-box" v-show="!loading">
    <h1 class="text-4xl text-center pt-4">  {{ studentData.name }}</h1>
    <div class="w-3/4 mx-auto">
      <fieldset class="fieldset my-2">
        <input type="text" id="class" class="input" :value="`Class ${ studentData.class} | Year ${ studentData.year}`"  disabled/>
      </fieldset>
      <fieldset class="fieldset  my-2 ">
        <input type="text" id="name" v-model="score" class="input" placeholder="Score"  min="0" max="100"/>
      </fieldset>
      <select class="select appearance-none mb-2" v-model="subject">
        <option disabled selected>Chose Subject</option>
        <option>Mathematics</option>
        <option>English</option>
        <option>History</option>
        <option>Geography</option>
        <option>Science</option>
        <option>Chemistry</option>
        <option>Physics</option>
        <option>Biology</option>
      </select>
      <div class="grid grid-cols-2 gap-2">
        <select class="select appearance-none" v-model="semesterYear">
          <option disabled>Chose Semester </option>
          <option v-for="year in yearList" :key="year">{{ year }}</option>
        </select>
        <select class="select appearance-none" v-model="semesterSeason">
          <option disabled>Chose Subject </option>
          <option>Spring</option>
          <option>Fall</option>
        </select>
      </div>
      
    </div>
    <div class="text-center">
      <button class="btn btn-primary mx-2 my-2" @click="onClick">Update Score</button>
    </div>
   
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getScoreDetail } from '@/services/apiScore.js';
import { getStudentById } from '@/services/apiStudent.js';
import { updateScore } from '@/services/apiScore.js';
import { useRouter } from 'vue-router';
import Loading from '@/ui/Loading.vue'
import { useToast } from "vue-toastification";
const router = useRouter()
const route = useRoute()
const score = ref(0);
const subject = ref('Mathematices')
const semesterSeason = ref('Spring')
const semesterYear = ref(new Date().getFullYear())
const studentData = ref('')
const loading = ref(true)
const toast = useToast();
//生成从 2000 年到当前年份的年份数组。
const yearList = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => index + 2000
);
onMounted(async ()=>{
  //根据学生id获取学生分数
  const scoreDetail = await getScoreDetail(route.params.id)
  score.value = scoreDetail.score
  subject.value = scoreDetail.subject
  semesterSeason.value = scoreDetail.semesterSeason
  semesterYear.value = scoreDetail.semesterYear
  studentData.value = await getStudentById(scoreDetail.student_id)
  loading.value = false
})
async function onClick() {
  //更新分数成功后，显示成功提示
  toast.info("Updating score...");
  //根据学生id更新学生分数
  await updateScore(route.params.id,{
    score: score.value,
    subject: subject.value,
    semesterSeason: semesterSeason.value,
    semesterYear: semesterYear.value
  })
  toast.clear()
  //更新成功后，跳转到分数列表页面
  toast.success("Score updated successfully!");
  router.push({ name: 'score' })
}
</script>

<style lang="scss" scoped>

</style>