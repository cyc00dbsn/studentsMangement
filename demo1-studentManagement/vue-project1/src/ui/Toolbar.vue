<template>
 <div class="my-4 grid grid-cols-4">
   <div class="col-span-1">
      <searchlabel v-for="(item,index) in studentSearchCondaition" :key="index" 
      @onDelete="()=>onDelete(index)"
      >{{ item }} </searchlabel>
      <searchlabel v-for="(item,index) in scoreSearchCondaition" :key="index" 
      @onDelete="()=>onDelete(index)"
      >{{ item }} </searchlabel>
   </div>
   <div class="col-span-2">
     <label class="input flex w-1/2 mx-auto">
       <input type="search" class="grow" placeholder="Search" v-model="searchString" />
      <svg class="h-[1em] opacity-50 cursor-pointer" @click="onSearch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
     </label>
   </div>
   <div class="col-span-1 text-center">
    <button class="btn btn-primary" @click="onClick"  v-if="!isStudent">{{ route.name === 'score' ?'Upload Score' : 'Add Student' }}</button>
   </div>
 </div>
</template>

<script setup>
import { useRoute,useRouter} from 'vue-router';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search.js'
import { useToast } from "vue-toastification";
import { ref,computed } from 'vue'
import searchlabel from './searchlabel.vue'
const toast = useToast()
const userStore = useUserStore()
const {isStudent} = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()
const searchString = ref('')
const searchStore = useSearchStore()
const {studentSearchCondaition,scoreSearchCondaition} = storeToRefs(searchStore)

const isStudentSearch = computed(()=>{
  return route.name === 'student'
})
function onClick(){
  if(route.name === 'score' )
    router.push({name:'scoreupload'})
  else router.push({name:'studentadd'})
}
function onSearch(){
  if(!searchString.value){
    toast.warning('Please input search string')
    return;
  }
  if(isStudentSearch.value){
    studentSearchCondaition.value =[...studentSearchCondaition.value,searchString.value.toLowerCase()];
  }else{
    scoreSearchCondaition.value =[...scoreSearchCondaition.value,searchString.value.toLowerCase()];
  }
  searchString.value = ''
}
function onDelete(index){
  if(isStudentSearch.value){
    studentSearchCondaition.value.splice(index,1)
  }else{
    scoreSearchCondaition.value.splice(index,1)
  }
}
</script>

<style lang="scss" scoped>

</style>