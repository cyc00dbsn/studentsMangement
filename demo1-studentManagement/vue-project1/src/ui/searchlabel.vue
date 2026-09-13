<template>
 
  <div class="badge badge-info badge-sm mx-1">
    <svg class="size-[1em] cursor-pointer transition-transform transform hover:scale-150" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      @click="emit('onDelete')">
        <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle>
          <path d="M8 8l8 8M16 8l-8 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></path>
        </g>
    </svg>
  <slot></slot>
  </div>
  

</template>
<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['onDelete'])
</script>