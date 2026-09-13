<template>
 <tbody>
      <tr>
        <th>{{ currentStudentData.name }}</th>
        <td>Class {{ currentStudentData.class }} | Year {{ currentStudentData.grade }}</td>
        <td>{{ scoreList.subject }}</td>
        <td>{{ scoreList.semesterSeason }} {{scoreList.semesterYear  }}</td>
        <td>{{ scoreList.score }}</td>
        <td v-if="!isStudent"> 
          <button class="btn btn-ghost btn-xs " @click="router.push({name:'score-edit',params:{ id: scoreList.student_id }})">details</button>
          <button class="btn btn-active btn-xs btn-error">delete</button>
        </td>
      </tr>
  </tbody>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {useUserStore} from '@/stores/user.js'
import { storeToRefs } from 'pinia'
defineProps(['scoreList','currentStudentData'])
const userStore = useUserStore()
const {isStudent} = storeToRefs(userStore)

const router =  useRouter()
</script>

<style lang="scss" scoped>


</style>