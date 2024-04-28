<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';

const connexionStore = useConnexionStore();

const initialName: ComputedRef<string> = computed(() => {
  if (!connexionStore.getFirstName) return '';
  return connexionStore.getFirstName.charAt(0).toUpperCase() || '';
});
</script>

<template>
  <div class="flex justify-around p-2 mb-4">
    <font-awesome-icon :icon="['fas', 'home']" class="text-gray-500 text-2xl" />
    <font-awesome-icon :icon="['fas', 'star']" class="text-gray-500 text-2xl" />
    <font-awesome-icon
        v-if="!token"
        :icon="['fas', 'user']"
        class="text-gray-500 text-2xl"
    />
    <span
        v-else
        class="flex p-2 text-white bg-gray-500 rounded-full w-8 h-8 items-center justify-center"
    >
        {{ initialName }}
      </span>
  </div>
</template>

<style scoped></style>
