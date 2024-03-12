<script setup lang="ts">
import { ref } from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import CardCommon from "~/components/common/CardCommon.vue";

const isSelected = ref(false)

function reset () {
  isSelected.value = false
}
</script>

<template>
  <div v-click-outside="reset" @click="isSelected = !isSelected" class="flex relative justify-end w-screen">
    <div class="inline-flex mt-4 mr-4 ml-4 p-3 items-center rounded-full border-1.5 border-gray-200 hover:shadow-custom-bottom" :class="{'shadow-custom-bottom': isSelected}">
      <font-awesome-icon :icon="['fas', 'bars']" class="text-gray-500  mr-4"/>
      <font-awesome-icon :icon="['fas', 'user']" class="p-2 text-white bg-gray-500 rounded-full"/>
    </div>
    <div v-if="isSelected" class="flex absolute top-20 mr-4 shadow-custom-all">
      <CardCommon :type="'connexion'" />
    </div>
  </div>

</template>

<style scoped>

</style>