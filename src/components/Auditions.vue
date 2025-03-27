<template>
  <div>
    <h1>Auditions</h1>
    <button @click="submitAudition">Add Audition</button>
    <button @click="deleteAudition">Remove Audition</button>

    <ul>
      <li v-for="a in auditionStore.auditions" :key="a.id">
        {{ a.show }} — {{ a.role }}
      </li>
    </ul>
  </div>
</template>
  
  <script setup lang="ts">
    import { useAuditionStore } from '../stores/auditionStore'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const auditionStore = useAuditionStore()

    onMounted(() => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        } else {
          //auditionStore.fetchAuditions()
        }
    })

    function submitAudition() {
      auditionStore.addAudition('Hairspray', 'Seaweed J. Stubbs')
    }

    function deleteAudition() {
      auditionStore.deleteAudition()
    }
  </script>
  