<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue'
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts'
import { DatePicker as VDatePicker } from "v-calendar";

const props = defineProps<{
  type: String;
}>();

const selectedRange = ref({ start: null, end: null });
const attributes = ref([{}]);

const connexionStore = useConnexionStore()
const token: string | null = localStorage.getItem('token') ?? null
const log: string = token ? 'Déconnexion' : 'Connexion'


watch(selectedRange, (newRange) => {
  if (newRange.start && newRange.end) {
    attributes.value = [
      {
        highlight: {
          start: { fillMode: 'outline' },
          base: { fillMode: 'light' },
          end: { fillMode: 'outline' },
        },
        dates: { start: newRange.start, end: newRange.end },
      },
    ];
    emit('update:selectedRange', newRange)
  }
}, { deep: true });

const emit = defineEmits(['update:selectedRange'])
</script>

<template>
  <div v-if="props.type === 'connexion'" class="flex flex-col border-0.5 border-gray-300 rounded-md p-4 gap-y-0.5">
    <span v-if="!token" @click="connexionStore.oAuthLogin()" class="hover:text-red-500">Inscription</span>
    <span @click="connexionStore.logout()" class="hover:text-red-500">{{ log }}</span>
  </div>
  <VDatePicker v-if="props.type === 'arrivee'" v-model.range="selectedRange" :attributes="attributes" :min-date="new Date()" expanded />
  <div v-if="props.type === 'prix'"></div>

</template>

<style scoped>

</style>