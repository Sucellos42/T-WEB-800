<script setup lang="ts">
import HomeFooter from '~/components/HomeFooter.vue';
import { useGeneralStore } from '~/stores/general/general.store.ts';


</script>

<template>
  <div class="h-screen w-screen flex flex-col justify-between">
    <table class="w-full text-xl text-gray-500 border-collapse">
      <thead>
      <tr>
        <th class="border-2">Ville</th>
        <th class="border-2">Événements</th>
      </tr>
      </thead>
      <tbody v-if="useGeneralStore().getFavoris.length > 0">
      <tr v-for="(favorites, index) in useGeneralStore().getFavoris" :key="index" class="text-xs">
        <td class="border-2 pl-2">{{ favorites.city }}</td>
        <td class="border-2 pl-2">
          <div v-if="favorites.events == Array && favorites.length === 1"> {{ favorites.events }}</div>
          <div v-else v-for="(event, indexEvent) in favorites.events" :key="indexEvent">{{ event }}</div>
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <HomeFooter />
    </div>
  </div>
</template>

<style scoped></style>