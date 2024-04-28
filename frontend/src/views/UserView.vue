<script setup lang="ts">
import { ref, watch } from 'vue';
import HomeFooter from '~/components/HomeFooter.vue';
import router from '~/router';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';

const token: string | null = localStorage.getItem('token') ?? null;
const log = ref('connexion');

watch(() => token, (newVal) => {
  if (newVal) {
    log.value = 'déconnexion';
  } else {
    log.value = 'connexion';
  }
}, { immediate: true });


async function redirection(url: string) {
  if(log.value === 'déconnexion') {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    router.push({ path: url, params: { token: null }});
  } else if (log.value === 'connexion') {
    await useConnexionStore().oAuthLogin();
    router.push({ path: url, params: { token: token }});

  }

}
</script>

<template>
  <div class="h-screen w-screen flex flex-col justify-between">
    <div class="flex flex-col items-center justify-center h-full w-full text-xl text-gray-500">
        <span class="border-2 shadow-custom-bottom mb-8 p-4 rounded-6xl" @click="redirection('/favoris')">Favoris</span>
        <span class="border-2 shadow-custom-bottom p-4 rounded-6xl" @click="redirection('/')">{{log}}</span>
    </div>
   <HomeFooter />
  </div>

</template>

<style scoped></style>