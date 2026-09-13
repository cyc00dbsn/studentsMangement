<template>
  <div>
    <h1 class="text-3xl font-bold text-center text-red-500">404 Not Found</h1>
  </div>
  <div class="flex justify-center">
    <button class="btn btn-soft" @click="goBack">Back to Home</button>
  </div>


</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.push({name:'score'})
}
</script>
