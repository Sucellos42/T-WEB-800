<script setup lang="ts">
import HomeFooter from '~/components/HomeFooter.vue';
import MenuConnexion from '~/components/MenuConnexion.vue';
import { useGeneralStore } from '~/stores/general/general.store.ts';
import { useInputCommonStore } from '~/stores/general/inputCommon.store.ts';
import router from '~/router';

import { FavorisType } from '~/types/storeType/general.type';

const generalStore = useGeneralStore();


async function sendData(data: FavorisType) {
  await useInputCommonStore().loadAllData(true, data);
  router.push('/map');
}


</script>

<template>
  <div v-if="!generalStore.getIsResponsive">
    <MenuConnexion />
  </div>
  <div :class="[generalStore.getIsResponsive ? 'h-screen': 'mt-40']" class="m-4 flex flex-col justify-between">
    <table class="w-full text-xl text-gray-500 border-collapse">
      <thead>
      <tr>
        <th class="border-2 p-2">Ville</th>
        <th class="border-2 p-2">Événements</th>
      </tr>
      </thead>
      <tbody v-if="useGeneralStore().getFavoris.length > 0">
      <tr v-for="(favorites, index) in generalStore.getFavoris" :key="index" class="text-xs p-2" :class="{'hover:bg-gray-100 cursor-pointer': !generalStore.getIsResponsive}"
          @click="sendData(favorites)"
      >
        <td class="border-2 p-2">{{ favorites.city }}</td>
        <td class="border-2 p-2">
          <div v-if="favorites.events == Array && favorites.length === 1"> {{ favorites.events }}</div>
          <div v-else v-for="(event, indexEvent) in favorites.events" :key="indexEvent">{{ event }}</div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="generalStore.getIsResponsive === true">
      <HomeFooter />
    </div>
  </div>
</template>

<style scoped></style>