<template>
  <Navbar/>
  <Toolbar v-show="route.name ==='score' || route.name ==='student'"/>
  <router-view></router-view>
</template>
<script setup>
import Navbar from '@/ui/Navbar.vue';
import { RouterView,useRoute } from 'vue-router';
import Toolbar from '@/ui/Toolbar.vue'

const route = useRoute()

</script>

<style lang="scss" scoped>

</style>