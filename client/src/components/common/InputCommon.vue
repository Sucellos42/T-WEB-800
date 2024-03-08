<script setup lang="ts">
import { ref } from "vue"

const destination = ref("")
const depart = ref("")
const arrivee = ref("")
const prix = ref("")
const isSelected = ref("")
const isHidden = ref(false)

function reset (type : String) {
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

</script>

<template>
  <div class="inline-flex flex-wrap rounded-6xl border-0.5 border-gray-300 shadow-custom" :class="{'bg-gray-200': isHidden}">
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
    <div class="flex justify-between p-4 rounded-6xl hover:bg-gray-100" :class="{'bg-white hover:bg-white': isSelected === 'arrivee'}" @click="focusInput('arrivee')">
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
      <button v-if="prix" class="hover:bg-white" @click="reset('prix')">x</button>
    </div>
  </div>

</template>

<style scoped>

</style>