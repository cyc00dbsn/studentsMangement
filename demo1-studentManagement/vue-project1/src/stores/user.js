import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  const user = ref({
    avatar:'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'
  });
  function updateUser(newUserMetadata = {}) {
    user.value = { ...user.value, ...newUserMetadata }
  }
  // 计算属性，判断用户是否已登录
  const isStudent = computed(() => user.value.is_student)
  return { user, updateUser, isStudent};
})