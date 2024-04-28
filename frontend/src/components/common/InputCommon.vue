<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useInputCommonStore } from '~/stores/general/inputCommon.store.ts';
import router from "~/router";

const props = defineProps<{
  start?: string;
  end?: string;
  reset?: boolean;
  isResponsive: boolean;
}>();

const destination = ref('');
const depart = ref('');
const arrivee = ref('');
const evenement = ref('');
const isSelected = ref('');
const isHidden = ref(false);
const inputCommonStore = useInputCommonStore();

watch(
  () => inputCommonStore.getIsSelectedCity,
  (newVal) => {
    if (newVal === true) {
      destination.value = inputCommonStore.getCity;
    }
  },
  { immediate: true },
);

watch(
  () => destination.value,
  (newVal) => {
    inputCommonStore.updateCity(newVal);
    emit('update:destination', newVal);
  },
);

watch(
  () => props.start,
  (newVal) => {
    if (newVal) {
      arrivee.value = newVal;
    }
  },
  { immediate: true },
);

watch(
  () => props.end,
  (newVal) => {
    if (newVal) {
      depart.value = newVal;
    }
  },
  { immediate: true },
);

watch(
  () => props.reset,
  (newVal) => {
    if (newVal === true) {
      resetAllValues();
    }
  },
  { immediate: true },
);

function resetInput(type: string) {
  switch (type) {
    case 'destination':
      destination.value = '';
      break;
    case 'depart':
      depart.value = '';
      break;
    case 'arrivee':
      arrivee.value = '';
      break;
    case 'prix':
      evenement.value = '';
      break;
    default:
      break;
  }
}

function focusInput(type: string) {
  isSelected.value = type;
  if (
    type === 'arrivee' ||
    type === 'depart' ||
    type === 'evenement' ||
    type === 'destination'
  ) {
    emit('update:input-selected', type);
  }
  isHidden.value = true;
}

function resetAllValues() {
  if (depart.value && arrivee.value) {
    isHidden.value = false;
    isSelected.value = '';
  } else {
    depart.value = '';
    arrivee.value = '';
    isHidden.value = false;
    isSelected.value = '';
  }
  emit('update:reset', false);
}

function sendData() {
  inputCommonStore.loadAllData();
  router.push('/map');
}

const emit = defineEmits([
  'update:input-selected',
  'update:reset',
  'reset:input',
  'update:destination',
]);
</script>

<template>
  <div
    v-if="!props.isResponsive"
    class="inline-flex flex-nowrap rounded-6xl border-0.5 border-gray-300 shadow-custom-bottom text-gray-600"
    :class="[isHidden ? 'bg-airbnb' : 'bg-white']"
  >
    <div
      class="flex justify-between p-4 rounded-6xl cursor-pointer hover:bg-airbnb-hover"
      :class="[
        isSelected === 'destination'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('destination')"
    >
      <div class="flex flex-col cursor-pointer pr-4">
        <label for="depart-input" class="text-sm">Destination</label>
        <input
          id="destination-input"
          v-model="destination"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Rechercher une destination"
        />
      </div>
      <button
        v-if="destination"
        class="hover:text-red-500"
        @click="resetInput('destination')"
      >
        x
      </button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div
      class="flex relative justify-between p-4 rounded-6xl cursor-pointer hover:bg-airbnb-hover"
      :class="[
        isSelected === 'arrivee'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('arrivee')"
    >
      <div class="flex flex-col cursor-pointer pr-4">
        <label for="depart-input" class="text-sm">Arrivée</label>
        <input
          id="depart-input"
          v-model="arrivee"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Quand ?"
          :disabled="true"
        />
      </div>
      <button
        v-if="arrivee"
        class="hover:text-red-500"
        @click="resetInput('arrivee')"
      >
        x
      </button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div
      class="flex justify-between p-4 rounded-6xl cursor-pointer hover:bg-airbnb-hover"
      :class="[
        isSelected === 'depart'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('depart')"
    >
      <div class="flex flex-col cursor-pointer pr-4">
        <label for="arrivee-input" class="text-sm">Départ</label>
        <input
          id="arrivee-input"
          v-model="depart"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Quand ?"
          :disabled="true"
        />
      </div>
      <button
        v-if="depart"
        class="hover:text-red-500"
        @click="resetInput('depart')"
      >
        x
      </button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div
      class="flex justify-between p-4 rounded-6xl cursor-pointer hover:bg-airbnb-hover"
      :class="[
        isSelected === 'evenement'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('evenement')"
    >
      <div class="flex flex-col cursor-pointer pr-4">
        <label for="prix-input" class="text-sm">Evénements</label>
        <input
          id="prix-input"
          v-model="evenement"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Choisissez un événement"
          :disabled="true"
        />
      </div>
      <button
        class="bg-red-500 rounded-full p-2.5 hover:bg-red-400"
        @click="sendData"
      >
        <font-awesome-icon class="text-white" icon="search" />
      </button>
    </div>
  </div>
  <div
    v-else
    class="inline-flex flex-nowrap rounded-6xl border-0.5 border-gray-300 shadow-custom-bottom text-gray-600"
    :class="[isHidden ? 'bg-airbnb' : 'bg-white']"
  >
    <div
      class="flex justify-between p-4 rounded-6xl cursor-pointer hover:bg-airbnb-hover"
      :class="[
        isSelected === 'destination'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('destination')"
    >
      <div class="flex flex-col cursor-pointer pr-4">
        <label for="prix-input" class="text-sm">Destination</label>
        <input
          id="prix-input"
          v-model="destination"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Chercher une ville"
          :disabled="false"
        />
      </div>
      <button
        class="bg-red-500 rounded-full p-2.5 hover:bg-red-400"
        @click="sendData"
      >
        <font-awesome-icon class="text-white" icon="search" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
