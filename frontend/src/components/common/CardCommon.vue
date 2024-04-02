<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';
import { DatePicker as VDatePicker } from 'v-calendar';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RangeDateSelected } from '~/types/rangeDateSelected.type.ts';

const props = defineProps<{
  type: string;
}>();

const selectedRange = ref({
  start: new Date(),
  end: new Date(),
} as RangeDateSelected);
const attributes = ref([{}]);

const connexionStore = useConnexionStore();
const token: string | null = localStorage.getItem('token') ?? null;
const log: string = token ? 'Déconnexion' : 'Connexion';

watch(
  selectedRange,
  (newRange) => {
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
      emit('update:selectedRange', newRange);
    }
  },
  { deep: true },
);

const emit = defineEmits(['update:selectedRange']);
</script>

<template>
  <div
    v-if="props.type === 'connexion'"
    class="flex flex-col border-0.5 border-gray-300 rounded-md p-4 gap-y-0.5"
  >
    <span
      v-if="!token"
      class="hover:text-red-500"
      @click="connexionStore.oAuthLogin()"
    >
      Inscription
    </span>
    <span class="hover:text-red-500" @click="connexionStore.logout()">
      {{ log }}
    </span>
  </div>
  <VDatePicker
    v-if="props.type === 'arrivee' || props.type === 'depart'"
    v-model.range="selectedRange"
    :attributes="attributes"
    :min-date="new Date()"
    model="dateTime"
    expanded
  />
  <div v-if="props.type === 'evenement'" class="flex items-center gap-1">
    <font-awesome-icon :icon="['fas', 'arrow-down']" class="text-gray-500"  />

  </div>
</template>

<style scoped></style>
