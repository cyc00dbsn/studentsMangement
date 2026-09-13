<template>
  <div class="join flex items-center justify-center">
    <button class="join-item btn" 
    v-for="i in totalPageCount"
    :class="{'btn-active': i === currentPage}"
    @click="handleClick(i)"
    >{{i}}</button>

  </div>
</template>       
<script setup>
 defineProps(['currentPage','totalPageCount'])
const emit = defineEmits(['changePage'])
function handleClick(page){
  emit('changePage',page)
}




</script>





