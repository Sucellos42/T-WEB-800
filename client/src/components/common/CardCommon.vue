<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  type: String
})
</script>

<template>
  <div v-if="type === 'connexion'" class="flex flex-col border-0.5 border-gray-300 rounded-md p-4 gap-y-0.5">
    <span class="hover:text-red-500">Inscription</span>
    <span class="hover:text-red-500">Connexion</span>
  </div>

</template>

<style scoped>

</style>