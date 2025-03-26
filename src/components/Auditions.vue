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
    import { useAuditionStore } from '@/stores/auditionStore'

    const auditionStore = useAuditionStore()

    function submitAudition() {
      auditionStore.addAudition('Hairspray', 'Seaweed J. Stubbs')
    }

    function deleteAudition() {
      auditionStore.deleteAudition()
    }
  </script>
  