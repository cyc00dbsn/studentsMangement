<template>
  <tr>
    <th>
      <label>
        <input type="checkbox" class="checkbox" />
      </label>
    </th>
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle h-12 w-12">
            <img
              :src="studentItem.avatar"
              alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div class="font-bold">{{ studentItem.name }} </div>
          <div class="text-sm opacity-50">{{ studentItem.gender }}</div>
        </div>
      </div>
    </td>
    <td>
      class {{ studentItem.class }} | year {{studentItem.grade}}
      <br />
      <span class="badge badge-ghost badge-sm">{{ studentItem.teacher }}</span>
    </td>
    <td>Purple</td>
    <th>
      <button class="btn btn-ghost btn-xs" @click="router.push({name:'student-edit',params:{ id: studentItem.student_id }})">details</button>
      <button class="btn btn-active btn-xs btn-error">delete</button>
    </th>
  </tr>
</template>

<script setup>
import router from '@/router';
import { useRouter } from 'vue-router';
const roter = useRouter()
defineProps(['studentItem'])



</script>

<style lang="scss" scoped>

</style>