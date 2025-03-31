<template>
  <div class="flex justify-center mt-6">
    <button
      @click="toggleForm"
      class="bg-blue-600 text-white px-4 py-2 rounded transition"
    >
      {{ showForm ? 'Cancel' : 'Add New Audition' }}
    </button>
  </div>

  <div v-if="showForm" class="max-w-xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-2">Add a New Audition</h2>
    <p class="text-gray-600 mb-6">
      Keep track of your auditions and callbacks. Use this form to log key info about your experiences!
    </p>

    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input v-model="form.title" class="input" id="title" required />
      </div>

      <!-- Company -->
      <div>
        <label for="company" class="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <input v-model="form.company" class="input" id="company" />
      </div>

      <!-- Date -->
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input type="date" v-model="form.date" class="input" id="date" />
      </div>

      <!-- Callback -->
      <div>
        <label for="callback" class="block text-sm font-medium text-gray-700 mb-1">Callback?</label>
        <select v-model="form.callback" class="input" id="callback">
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="">Unknown</option>
        </select>
      </div>

      <!-- Notes -->
      <div class="md:col-span-2">
        <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea v-model="form.notes" class="input" rows="3" id="notes"></textarea>
      </div>

      <div class="md:col-span-2">
        <button type="submit" class="btn-blue btn">
          Add
        </button>
      </div>
    </form>
  </div>

  <hr class="my-10" />

  <h2 class="text-2xl font-bold mb-2">Your Auditions</h2>
  <p class="text-gray-600 mb-6">Expand each audition to view or remove it.</p>

  <!-- List Display -->
  <ul v-if="auditionStore.auditions.length" class="space-y-4">
    <li
      v-for="audition in auditionStore.auditions"
      :key="audition.id"
      class="border rounded shadow-sm"
    >
      <div
        class="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
        @click="toggleAudition(audition.id)"
      >
        <div>
          <h3 class="font-semibold text-lg text-gray-800">{{ audition.title }}</h3>
          <p class="text-sm text-gray-600">{{ audition.company }} | {{ audition.date }}</p>
        </div>
        <span class="text-gray-400 text-sm">
          {{ activeAuditionId === audition.id ? '▲' : '▼' }}
        </span>
      </div>

      <div v-if="activeAuditionId === audition.id" class="px-4 pb-4">
        <p v-if="audition.notes" class="text-sm text-gray-500 italic mb-2">“{{ audition.notes }}”</p>
        <p v-if="audition.callback" class="text-xs text-gray-400 mb-3">
          Callback: {{ audition.callback === 'yes' ? '✅' : audition.callback === 'no' ? '❌' : '❓' }}
        </p>
        <div class="flex gap-4 justify-center">
          <button class="text-red-600 hover:underline text-sm">Remove</button>
        </div>
      </div>
    </li>
  </ul>

  <p v-else class="text-gray-500 italic">You haven’t added any auditions yet.</p>
</template>

<style scoped>

@reference "../style.css";

.input {
  @apply w-full border px-3 py-2 rounded;
}
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.bg-blue-600 {
  @apply bg-blue-600 text-white;
}
.bg-blue-600:hover {
  @apply bg-blue-700 transition;
}

</style>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuditionStore } from '../stores/auditionStore'

const auditionStore = useAuditionStore()
const router = useRouter()

const showForm = ref(false)
const activeAuditionId = ref<number | null>(null)

const form = ref({
  title: '',
  company: '',
  date: '',
  callback: '',
  notes: '',
})

const toggleForm = () => {
  showForm.value = !showForm.value
}

const toggleAudition = (id: number) => {
  activeAuditionId.value = activeAuditionId.value === id ? null : id
}

const submit = () => {
  if (!form.value.title) return

  auditionStore.addAudition(form.value)
  form.value = {
    title: '',
    company: '',
    date: '',
    callback: '',
    notes: '',
  }
  showForm.value = false
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  } else {
    auditionStore.fetchAuditions()
  }
})
</script>
  