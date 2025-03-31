<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Login failed')
    }

    localStorage.setItem('token', data.token)
    router.push('/')
  } catch (err: any) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          v-model="email"
          class="input"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          v-model="password"
          class="input"
          required
        />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Log In
      </button>

      <p class="text-sm text-center text-gray-600 mt-4">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-600 hover:underline">Register here</RouterLink>
      </p>

      <p v-if="error" class="text-sm text-red-500 mt-2 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
@reference "../style.css";

.input {
  @apply w-full border border-gray-300 px-3 py-2 rounded text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-200;
}

.bg-blue-600 {
  @apply bg-blue-600;
}

.bg-blue-600:hover {
  @apply bg-blue-700;
}

</style>
