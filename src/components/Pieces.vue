<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { usePieceStore } from '../stores/pieceStore'
import { useRouter } from 'vue-router'
const pieceStore = usePieceStore()
const form = ref({
  title: '',
  type: '',
  style: '',
  character: '',
  show: '',
  voicePart: '',
  notes: '',
})

const router = useRouter();

const activePieceId = ref<number | null>(null)

const togglePiece = (id: number) => {
  activePieceId.value = activePieceId.value === id ? null : id
}

const showForm = ref(false)
const toggleForm = () => {
  showForm.value = !showForm.value
}

watch(() => form.value.type, (newType) => {
  if (newType !== 'song') {
    form.value.voicePart = ''
  }
})

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  } else {
    pieceStore.fetchPieces()
  }
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const submit = () => {
  if (!form.value.title || !form.value.type) return
  pieceStore.addPiece(form.value)
  form.value = { title: '', type: '', style: '', voicePart: '', character: '', show:'', notes: '' }
}
</script>

<template>


  <div class="flex justify-center mt-6">
    <button
      @click="toggleForm"
      class="bg-blue-600 text-white px-4 py-2 rounded transition"
    >
      {{ showForm ? 'Cancel' : 'Add New Piece' }}
    </button>
  </div>

<div>

<div v-if="showForm" class="max-w-xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-2">Add a New Piece to Your Library</h2>
    <p class="text-gray-600 mb-6">
      Add a song or monologue that you use for auditions. You’ll be able to track when you last used it, categorize it by style and voice part, and reference notes later.
    </p>
  
  <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
  <!-- Title -->
  <div>
    <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
    <input id="title" v-model="form.title" class="input" required />
  </div>

  <!-- Type -->
  <div>
    <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Type</label>
    <select id="type" v-model="form.type" class="input" required>
      <option disabled value="">Select type</option>
      <option value="song">Song</option>
      <option value="monologue">Monologue</option>
    </select>
  </div>

  <!-- Character -->
<div>
  <label for="character" class="block text-sm font-medium text-gray-700 mb-1">Character</label>
  <input id="character" v-model="form.character" class="input" />
</div>

<!-- Show -->
<div>
  <label for="show" class="block text-sm font-medium text-gray-700 mb-1">Show</label>
  <input id="show" v-model="form.show" class="input" />
</div>

  <!-- Style -->
  <div>
    <label for="style" class="block text-sm font-medium text-gray-700 mb-1">Style</label>
    <input id="style" v-model="form.style" class="input" />
  </div>

  <!-- Voice Part -->
  <div>
    <label for="voicePart" class="block text-sm font-medium mb-1" :class="{ 'text-gray-400': form.type !== 'song', 'text-gray-700': form.type === 'song' }">Voice Part</label>
    <select id="voicePart" v-model="form.voicePart" class="input select" :disabled="form.type !== 'song'" :required="form.type === 'song'">
      <option disabled value="">Select voice part</option>
      <option value="soprano">Soprano</option>
      <option value="mezzo">Mezzo-Soprano</option>
      <option value="contralto">Contralto</option>
      <option value="tenor">Tenor</option>
      <option value="baritone">Baritone</option>
      <option value="bassbaritone">Bass-Baritone</option>
      <option value="bass">Bass</option>
    </select>
  </div>

  <!-- Notes (span full width) -->
  <div class="md:col-span-2">
    <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
    <textarea id="notes" v-model="form.notes" class="input" rows="3"></textarea>
  </div>

  <!-- Submit Button -->
  <div class="md:col-span-2">
    <button type="submit" class="btn-blue btn">
      Add
    </button>
  </div>
</form>
</div>

<hr class="my-10" />

<h2 class="text-2xl font-bold mb-2">Your Pieces</h2>
<p class="text-gray-600 mb-6">
  Here’s your current audition library. You can remove a piece anytime if it’s no longer in use.
</p>

<div v-if="pieceStore.loading" class="text-gray-500">Loading your pieces...</div>

<div v-else-if="pieceStore.pieces.length === 0" class="text-gray-500 italic">
  You haven’t added any pieces yet.
</div>

<ul v-else class="space-y-4">
  <li
    v-for="piece in pieceStore.pieces"
    :key="piece.id"
    class="border rounded shadow-sm"
  >
    <!-- Header (always visible) -->
    <div
      class="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
      @click="togglePiece(piece.id)"
    >
    <div>
      <span>
        {{ piece.type === 'song' ? '🎵 ' : ' 🎭 ' }}
      </span>
    </div>
      <div>
        <h3 class="font-semibold text-lg text-gray-800">{{ piece.title }}</h3>
        <p class="text-sm text-gray-600">
          {{ piece.type === 'song' ? 'Song' : 'Monologue' }}
          <span v-if="piece.voicePart" class="ml-2">| Voice: {{ piece.voicePart }}</span>
          <span v-if="piece.style" class="ml-2">| Style: {{ piece.style }}</span>
        </p>
        <p v-if="piece.character || piece.show" class="text-sm text-gray-700 mt-1">
          <span v-if="piece.character"><strong>Character:</strong> {{ piece.character }}</span>
          <span v-if="piece.show" class="ml-2"><strong>Show:</strong> {{ piece.show }}</span>
        </p>
      </div>
      <span class="text-gray-400 text-sm">
        {{ activePieceId === piece.id ? '▲' : '▼' }}
      </span>
    </div>

    <!-- Details (conditionally shown) -->
    <div v-if="activePieceId === piece.id" class="px-4 pb-4">
      <p v-if="piece.notes" class="text-sm text-gray-500 italic mb-2">“{{ piece.notes }}”</p>
      <p v-if="piece.lastUsed" class="text-xs text-gray-400 mb-3">
        Last used: {{ formatDate(piece.lastUsed) }}
      </p>

      <div class="flex flex-col sm:flex-row gap-2 justify-center">
        <button
          @click="pieceStore.markAsUsed(piece.id)"
          class="text-blue-600 hover:underline text-sm"
        >
          Mark as Used
        </button>
        <button
          @click="pieceStore.deletePiece(piece.id)"
          class="text-red-500 hover:underline text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  </li>
</ul>

</div>
</template>

<style scoped>
@reference "../style.css";

.input {
  @apply w-full border px-3 py-2 rounded;
}

.btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-600 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700 transition;
  }

  .select:disabled {
    @apply opacity-50;
  }

  .bg-blue-600 {
    @apply bg-blue-600;
  }

  .bg-blue-600:hover {
    @apply bg-blue-700;
  }

</style>