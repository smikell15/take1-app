<template>
    <nav class="bg-gray-100 p-4 flex gap-4">
      <RouterLink to="/" class="text-blue-600 hover:underline">Home</RouterLink>
      <RouterLink to="/auditions" class="text-blue-600 hover:underline">Auditions</RouterLink>
      <RouterLink to="/pieces" class="text-blue-600 hover:underline">Pieces</RouterLink>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  </script>