<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  start: string;
  end: string;
}>();

const destination = ref('');
const depart = ref('');
const arrivee = ref('');
const prix = ref('');
const isSelected = ref('');
const isHidden = ref(false);

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

function reset(type: string) {
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
      prix.value = '';
      break;
    default:
      break;
  }
}

function focusInput(type: string) {
  isSelected.value = type;
  if (type === 'arrivee' || type === 'depart') {
    emit('update:input-selected', type);
  }
  isHidden.value = true;
}

function resetAllValues() {
  destination.value = '';
  depart.value = '';
  arrivee.value = '';
  prix.value = '';
  isHidden.value = false;
  isSelected.value = '';
  emit('reset:input', '');
}

const emit = defineEmits(['update:input-selected', 'reset:input']);
</script>

<template>
  <div
    v-click-outside="resetAllValues"
    class="inline-flex flex-wrap rounded-6xl border-0.5 border-gray-300 shadow-custom-bottom"
    :class="{ 'bg-airbnb': isHidden }"
  >
    <div
      class="flex justify-between p-4 rounded-6xl hover:bg-airbnb-hover"
      :class="[
        isSelected === 'destination'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('destination')"
    >
      <div class="flex flex-col pr-4">
        <label for="depart-input" class="text-sm">Destination</label>
        <input
          id="depart-input"
          ref="inputRef"
          v-model="destination"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Rechercher une destination"
        />
      </div>
      <button
        v-if="destination"
        class="hover:bg-white hover:rounded-full p-1"
        @click="reset('destination')"
      >
        x
      </button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div
      class="flex relative justify-between p-4 rounded-6xl hover:bg-airbnb-hover"
      :class="[
        isSelected === 'arrivee'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('arrivee')"
    >
      <div class="flex flex-col pr-4">
        <label for="depart-input" class="text-sm">Arrivée</label>
        <input
          id="depart-input"
          v-model="arrivee"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Quand ?"
        />
      </div>
      <button
        v-if="arrivee"
        class="hover:bg-white hover:rounded-full p-1"
        @click="reset('arrivee')"
      >
        x
      </button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div
      class="flex justify-between p-4 rounded-6xl hover:bg-gray-100"
      :class="[
        isSelected === 'depart'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('depart')"
    >
      <div class="flex flex-col pr-4">
        <label for="arrivee-input" class="text-sm">Départ</label>
        <input
          id="arrivee-input"
          v-model="depart"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Quand ?"
        />
      </div>
      <button
        v-if="depart"
        class="hover:bg-white hover:rounded-full hover:p-2"
        @click="reset('depart')"
      >
        x
      </button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div
      class="flex justify-between p-4 rounded-6xl hover:bg-gray-100"
      :class="[
        isSelected === 'prix'
          ? 'bg-white hover:bg-white'
          : 'hover:bg-airbnb-hover',
      ]"
      @click="focusInput('prix')"
    >
      <div class="flex flex-col pr-4">
        <label for="prix-input" class="text-sm">Prix</label>
        <input
          id="prix-input"
          v-model="prix"
          type="text"
          class="focus:border-transparent focus:outline-none bg-transparent"
          placeholder="Indiquez votre prix"
        />
      </div>
      <button class="bg-red-500 rounded-full p-2.5">
        <font-awesome-icon class="text-white" icon="search" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
