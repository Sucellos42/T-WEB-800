<script setup lang="ts">
import {computed, ref, ComputedRef} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import CardCommon from "~/components/common/CardCommon.vue";
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts'

const isSelected = ref(false)
const token: string | null = localStorage.getItem('token') ?? null
const connexionStore = useConnexionStore()

const initialName: ComputedRef<string> = computed(() => {
  if(!connexionStore.getFirstName) return ''
  return connexionStore.getFirstName.charAt(0).toUpperCase() || '';
});

function reset (): void {
  isSelected.value = false
}

</script>

<template>
  <div class="flex relative justify-end w-screen">
    <div v-click-outside="reset" @click="isSelected = !isSelected" class="inline-flex mt-4 mr-4 ml-4 p-3 items-center rounded-full border-1.5 border-gray-200 hover:shadow-custom-bottom" :class="{'shadow-custom-bottom': isSelected}">
      <font-awesome-icon :icon="['fas', 'bars']" class="text-gray-500  mr-4"/>
      <font-awesome-icon v-if="!token" :icon="['fas', 'user']" class="p-2 text-white bg-gray-500 rounded-full"/>
      <span v-else class="flex p-2 text-white bg-gray-500 rounded-full w-8 h-8 items-center justify-center">{{ initialName }}</span>
    </div>
    <div v-if="isSelected" class="flex absolute top-20 mr-4 shadow-custom-all">
      <CardCommon :type="'connexion'" />
    </div>
  </div>

</template>

<style scoped>

</style>