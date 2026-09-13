<template>
 <div class="mx-auto w-1/3 mt-30 shadow-2xl shadow-blue-300 rounded-box" >
    <div class="w-3/4 mx-auto">
      <select class="select appearance-none mb-2 my-4" v-model="currentStudent">
        <option disabled selected value="Chose Student">Chose Student</option>
        <option v-for="student in studentsData" :key="student.student_id" :value="student">{{ student.name }}</option>
      </select>
      <fieldset class="fieldset my-2 ">
        <input type="text" id="name" class="input" placeholder="StudentId" :value="currentStudent.student_id" disabled/>
      </fieldset>
      <fieldset class="fieldset my-2">
        <input type="text" id="class" class="input" placeholder="Class | Year" :value="`Class ${currentStudent.class} | Year ${currentStudent.grade}`" disabled/>
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
import { ref,onMounted } from 'vue';
import { getStudentList } from '@/services/apiStudent.js';
import { useToast } from "vue-toastification";
import { createScore } from '@/services/apiScore.js';
import {useRouter} from 'vue-router'
const router = useRouter();
const toast = useToast();
const score = ref();
const subject = ref('Mathematics')
const semesterSeason = ref('Spring')
const studentsData = ref([])
const semesterYear = ref(new Date().getFullYear())
const currentStudent = ref({})

//生成从 2000 年到当前年份的年份数组。
const yearList = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => index + 2000
);
onMounted(async ()=>{
  //获取当前老师用户的所有学生
  const token = import.meta.env.VITE_SUPABASE_TOKEN
  const userData = JSON.parse(localStorage.getItem(token) || '{}')
  const userId = userData.user.id
  studentsData.value = await getStudentList(userId)
})

async function onClick() {
  toast.info("Updating score...");
  const newScore = {
    student_id: currentStudent.value.student_id,
    subject: subject.value,
    semesterSeason: semesterSeason.value,
    semesterYear: semesterYear.value,
    score: score.value,
  }
  await createScore(newScore)
  toast.clear()
  toast.success("Score updated successfully!");
  router.push({name:'score'})
}
</script>

<style lang="scss" scoped>

</style>