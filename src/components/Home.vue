<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-2">Welcome to Take 1 🎭</h1>
      <p class="text-gray-700">Your all-in-one tracker for auditions, songs, and monologues. Let’s get you prepped for your next big role!</p>
    
      <hr class="my-10" />
      <button
      v-if="!isLoggedIn"
      @click="router.push('/login')"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Log In
    </button>

    <button
      v-else
      @click="router.push('/pieces')"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Go to My Library
    </button>
    </div>
  </template>
  
  <script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})

</script>

<style scoped>
  @reference "../style.css";

  .bg-blue-600 {
    @apply bg-blue-600;
  }

  .bg-blue-600:hover {
    @apply bg-blue-700;
  }
</style>
  