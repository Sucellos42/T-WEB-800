<script setup lang="ts">
import { ref } from "vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import CardCommon from "~/components/common/CardCommon.vue";

import type { RangeDateSelected } from "~/types/rangeDateSelected.type.ts";

const destination = ref("")
const depart = ref("")
const arrivee = ref("")
const prix = ref("")
const isSelected = ref("")
const isHidden = ref(false)

function reset (type : string) {
  switch (type) {
    case 'destination':
      destination.value = ''
      break
    case 'depart':
      depart.value = ''
      break
    case 'arrivee':
      arrivee.value = ''
      break
    case 'prix':
      prix.value = ''
      break
    default:
      break
  }
}

function focusInput (type : string) {
  isSelected.value = type
  isHidden.value = true
}

function resetAllValues () {
  destination.value = ''
  depart.value = ''
  arrivee.value = ''
  prix.value = ''
  isHidden.value = false
  isSelected.value = ''
}

function updateDateSelected (value: RangeDateSelected) {
  const newArrivee: string = formatDate(value.start)
  const newDepart: string = formatDate(value.end)

  arrivee.value = newArrivee
  depart.value = newDepart
}

function formatDate (date: Date) {
  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}
</script>

<template>
  <div v-click-outside="resetAllValues" class="inline-flex flex-wrap rounded-6xl border-0.5 border-gray-300 shadow-custom-bottom" :class="{'bg-gray-200': isHidden}">
    <div class="flex justify-between p-4 rounded-6xl hover:bg-gray-100" :class="{'bg-white hover:bg-white': isSelected === 'destination'}" @click="focusInput('destination')">
      <div class="flex flex-col pr-4">
        <label for="depart-input" class="text-sm">Destination</label>
        <input
            ref="inputRef"
            id="depart-input"
            type="text"
            class="focus:border-transparent focus:outline-none bg-transparent"
            placeholder="Rechercher une destination"
            v-model="destination"
        />
      </div>
      <button v-if="destination" class="hover:bg-white" @click="reset('destination')">x</button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div class="flex relative justify-between p-4 rounded-6xl hover:bg-gray-100" :class="{'bg-white hover:bg-white': isSelected === 'arrivee'}" @click="focusInput('arrivee')">
      <div class="flex flex-col pr-4">
        <label for="depart-input" class="text-sm">Arrivée</label>
        <input
            id="depart-input"
            type="text"
            class="focus:border-transparent focus:outline-none bg-transparent"
            placeholder="Quand ?"
            v-model="arrivee"
        />
      </div>
      <button v-if="arrivee" class="hover:bg-white" @click="reset('arrivee')">x</button>
      <div v-if="isSelected === 'arrivee'" class="absolute top-20 shadow-custom-bottom">
        <CardCommon :type="isSelected" @update:selected-range="updateDateSelected" />
      </div>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div class="flex justify-between p-4 rounded-6xl hover:bg-gray-100" :class="{'bg-white hover:bg-white': isSelected === 'depart'}" @click="focusInput('depart')">
      <div class="flex flex-col pr-4">
        <label for="arrivee-input" class="text-sm">Départ</label>
        <input
            id="arrivee-input"
            type="text"
            class="focus:border-transparent focus:outline-none bg-transparent"
            placeholder="Quand ?"
            v-model="depart"
        />
      </div>
      <button v-if="depart" class="hover:bg-white" @click="reset('depart')">x</button>
    </div>
    <span class="border-l-1.5 border-gray-300 m-2" />
    <div class="flex justify-between p-4 rounded-6xl hover:bg-gray-100" :class="{'bg-white hover:bg-white': isSelected === 'prix'}" @click="focusInput('prix')">
      <div class="flex flex-col pr-4">
        <label for="prix-input" class="text-sm">Prix</label>
        <input
            id="prix-input"
            type="text"
            class="focus:border-transparent focus:outline-none bg-transparent"
            placeholder="Indiquez votre prix"
            v-model="prix"
        />
      </div>
      <button class="bg-red-500 rounded-full p-2.5">
        <font-awesome-icon class="text-white" icon="search" />
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>