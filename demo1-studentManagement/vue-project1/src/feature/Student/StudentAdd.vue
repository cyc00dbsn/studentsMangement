<template>
 <div class="mx-auto w-1/3 mt-30 shadow-2xl shadow-blue-300 rounded-box" >
    <div class="w-3/4 mx-auto">
      <fieldset class="fieldset my-2 pt-5">
        <input type="text" id="email" class="input" placeholder="Email" v-model="email""/>
      </fieldset>
      <fieldset class="fieldset my-2 ">
        <input type="text" id="name" class="input" placeholder="Name" v-model="name""/>
      </fieldset>
      <select class="select appearance-none mb-2" v-model="classInfo">
        <option disabled selected value=" ">Chose Class</option>
        <option v-for="(item,index) in classChargeInfo" :key="index" :value="item">Class {{item.split('|')[0]}} | Year {{item.split('|')[1]}}</option>
      </select>
      <select class="select appearance-none mb-2" v-model="gender">
        <option disabled selected >Chose Gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
    </div>
    <div class="text-center">
      <button class="btn btn-primary mx-2 my-2" @click="onClickAddStudent">Add Student</button>
    </div>
   
  </div>
</template>
<script setup>
import { ref ,onMounted } from 'vue';
import { useToast } from "vue-toastification";
import {getTeacherByTeacherId} from '../../services/apiTeacher.js'
import {createStudent} from '../../services/apiStudent.js'
import {getSignup} from '../../services/apiAuth.js'
import {useRouter} from 'vue-router'
const router = useRouter();
const email = ref('')
const name = ref('')
const classChargeInfo = ref()
const teacherId = ref('')
const classInfo = ref('')
const gender = ref('male')
const password = ref('123456')
const toast = useToast();

//Create student user and insert student to database
async function onClickAddStudent(){
  toast.info("Creating student user...");
  const signupData = await getSignup(email.value,password.value,{is_student: true})
  const studentData = await createStudent( {
    name: name.value,
    class: classInfo.value.split('|')[0],
    grade: classInfo.value.split('|')[1],
    teacher_id: teacherId.value,
    gender: gender.value,
    avatar: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
    student_id: signupData.user.id,
  });
    toast.clear()
    toast.success("Student user created successfully!");
    router.push({name:'student'})
}
onMounted(async ()=>{ 
  const token = import.meta.env.VITE_SUPABASE_TOKEN
  const userTokne = JSON.parse(localStorage.getItem(token) || '{}');
  teacherId.value = userTokne.user.id;
  const teacher = await getTeacherByTeacherId(teacherId.value);
  classChargeInfo.value = JSON.parse(teacher[0].class_in_charge || '[]');
  classInfo.value = classChargeInfo.value[0]
})

</script>

<style lang="scss" scoped>

</style>