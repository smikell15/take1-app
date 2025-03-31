<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const register = async () => {
  error.value = ''
  try {
    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed')
    }

    router.push('/login')
  } catch (err: any) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

    <form @submit.prevent="register" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" v-model="email" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input type="password" v-model="password" class="input" required />
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Register
      </button>

      <p v-if="error" class="text-sm text-red-500 mt-2 text-center">{{ error }}</p>

      <p class="text-sm text-center text-gray-600 mt-4">
            Already have an account?
            <RouterLink to="/login" class="text-blue-600 hover:underline">Log in here</RouterLink>
            </p>
    </form>
  </div>
</template>

<style scoped>
@reference "../style.css";

.input {
  @apply w-full border border-gray-300 px-3 py-2 rounded text-sm shadow-sm focus:outline-none focus:ring focus:ring-green-200;
}

.bg-green-600 {
  @apply bg-green-600;
}

.bg-green-600:hover {
    @apply bg-green-700;
}
</style>
