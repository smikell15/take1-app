<template>
    <nav class="bg-gray-100 p-4 flex flex-wrap gap-4 items-center">
      <RouterLink to="/" class="text-blue-600 hover:underline">Home</RouterLink>
      <RouterLink to="/auditions" class="text-blue-600 hover:underline">Auditions</RouterLink>
      <RouterLink to="/pieces" class="text-blue-600 hover:underline">Pieces</RouterLink>

      <button @click="logout" class="nav-link ml-auto text-red-600 bg-gray-100">
      Log Out
    </button>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router'

  const router = useRouter()

  const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
  </script>

<style scoped>
@reference "../style.css";

.bg-gray-100 {
  @apply bg-gray-100;
}

</style>