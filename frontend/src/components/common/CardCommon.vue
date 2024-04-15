<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';
import { useInputCommonStore } from '~/stores/general/inputCommon.store.ts';

import { DatePicker as VDatePicker } from 'v-calendar';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Events from '~/assets/data/event.json';

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
const inputCommonStore = useInputCommonStore();
const token: string | null = localStorage.getItem('token') ?? null;
const log: string = token ? 'Déconnexion' : 'Connexion';
const events = ref(useInputCommonStore().getEvents);

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
      inputCommonStore.updateDate(newRange);
    }
  },
  { deep: true },
);

function allEventsSelected(event: Event, child: string) {
  const isChecked = (event.target as HTMLInputElement).checked;
  if (isChecked) {
    if (!events?.value.includes(child)) {
      events.value.push(child);
    }
  } else {
    events.value = events.value.filter((e: string) => e !== child);
  }
  inputCommonStore.updateEvents(events.value);
}

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
  <div v-if="props.type === 'evenement'" class="grid grid-cols-4 m-2">
    <div v-for="(event, name) of Events" :key="name" class="pr-2">
      <div class="flex justify-between items-center">
        <div class="text-gray-600 flex items-center">
          <font-awesome-icon :icon="['fas', event.icon]" class="pr-2" />
          <span class="text-lg">{{ name }}</span>
        </div>
      </div>
      <div class="max-w-48">
        <div
          v-for="(child, indexChild) of event.children"
          :key="indexChild"
          class="flex items-center"
        >
          <input
            type="checkbox"
            class="mr-2"
            :checked="events.includes(child)"
            @change="allEventsSelected($event, child)"
          />
          <span class="text-gray-500 text-xs">{{ child }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
