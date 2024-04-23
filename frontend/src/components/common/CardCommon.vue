<script setup lang="ts">
import { defineProps, Ref, ref, computed, watch, defineEmits } from 'vue';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';
import { useInputCommonStore } from '~/stores/general/inputCommon.store.ts';

import { DatePicker as VDatePicker } from 'v-calendar';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Events from '~/assets/data/event.json';

import { RangeDateSelected } from '~/types/date/rangeDateSelected.type.ts';
import { ListEventsJSON } from '~/types/events/events.type.ts';

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
const eventsTranslated = ref(useInputCommonStore().getEventsTranslated);
const allCities = ref(useInputCommonStore().getAllCities);
const allEvents: Ref<ListEventsJSON> = ref(Events);

const city = computed(() => inputCommonStore.getCity);

watch(
  () => city.value,
  (newVal) => {
    allCities.value = sort(newVal);
  },
  { immediate: true },
);

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

function allEventsSelected(
  event: Event,
  child: string,
  index: number,
  nameParent: string,
) {
  const childTranslated = translate(nameParent, index);
  const isChecked = (event.target as HTMLInputElement).checked;
  if (isChecked) {
    if (
      !events?.value.includes(child) &&
      !eventsTranslated.value.includes(childTranslated)
    ) {
      events.value.push(child);
      eventsTranslated.value.push(childTranslated);
    }
  } else {
    events.value = events.value.filter((e: string) => e !== child);
    eventsTranslated.value = eventsTranslated.value.filter(
      (e: string) => e !== childTranslated,
    );
  }
  const eventsTranslatedArray = eventsTranslated.value.map((e) => e);
  inputCommonStore.updateEvents(events.value, eventsTranslatedArray);
}

function translate(name: string, index: number) {
  const allEventsUK = allEvents.value[name].childrenUK;
  return allEventsUK[index];
}

function sort(text: string) {
  const allCities = inputCommonStore.getAllCities;

  return allCities
    .filter((city) => city.toLowerCase().includes(text.toLowerCase()))
    .sort((a, b) => {
      const lowerA = a.toLowerCase();
      const lowerB = b.toLowerCase();
      const lowerSearchText = text.toLowerCase();

      const startsWithA = lowerA.startsWith(lowerSearchText);
      const startsWithB = lowerB.startsWith(lowerSearchText);

      if (startsWithA && !startsWithB) {
        return -1;
      } else if (!startsWithA && startsWithB) {
        return 1;
      } else {
        return lowerA.localeCompare(lowerB);
      }
    });
}

function selectCity(city: string) {
  inputCommonStore.updateCity(city);
  inputCommonStore.updateIsSelectedCity(!inputCommonStore.getIsSelectedCity);
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
  <div
    v-if="props.type === 'destination' && city"
    class="flex flex-col rounded-md p-4"
  >
    <div
      v-for="(city, indexCity) of allCities.slice(0, 5)"
      :key="indexCity"
      class="flex items-center text-gray-500 cursor-pointer hover:bg-gray-100 rounded-md"
      @click="selectCity(city)"
    >
      <font-awesome-icon :icon="['fas', 'location-dot']" class="pr-2" />
      <span>{{ city }}</span>
    </div>
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
    <div v-for="(event, name) of allEvents" :key="name" class="pr-2">
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
            @change="
              allEventsSelected($event, child, indexChild, name as string)
            "
          />
          <span class="text-gray-500 text-xs">{{ child }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
