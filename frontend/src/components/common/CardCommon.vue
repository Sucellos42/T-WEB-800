<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';
import { DatePicker as VDatePicker } from 'v-calendar';
import { DatePickerRange } from '~/types/datePickerRange.type';

const props = defineProps<{
  type: string;
}>();

const selectedRange = ref<DatePickerRange>({
  start: new Date(),
  end: new Date()
});

const attributes = ref([{}]);

const connexionStore = useConnexionStore();
const token: string | null = localStorage.getItem('token') ?? null;
const log: string = token ? 'Déconnexion' : 'Connexion';


watch(
  selectedRange,
  (newRange) => {
    if (newRange === null) return;
    // Vérifie si newRange est de type DateModelPicker
    if (
      typeof newRange === 'object' &&
      'start' in newRange &&
      'end' in newRange
    ) {
      const range: DatePickerRange = newRange;
      if (range.start && range.end) {
        attributes.value = [
          {
            highlight: {
              start: { fillMode: 'outline' },
              base: { fillMode: 'light' },
              end: { fillMode: 'outline' },
            },
            dates: { start: range.start, end: range.end },
          },
        ];
        emit('update:selectedRange', newRange);
      }
    }
  },
  {
    deep: true,
    immediate: true,
  },
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
    v-model.range="selectedRange as unknown as DatePickerRange"
    :attributes="attributes"
    :min-date="new Date()"
    mode="dateTime"
    expanded
  />
  <div v-if="props.type === 'prix'"></div>
</template>

<style scoped></style>
