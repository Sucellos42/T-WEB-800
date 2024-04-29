<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '~/router';


function redirection(url: string) {
  router.push({ path: url })
}

</script>

<template>
  <div class="flex justify-around p-2 mb-4">
    <font-awesome-icon :icon="['fas', 'home']" class="text-gray-500 text-2xl" @click="redirection('/')"/>
    <font-awesome-icon :icon="['fas', 'star']" class="text-gray-500 text-2xl" @click="redirection('/favoris')"/>
    <font-awesome-icon :icon="['fas', 'user']" class="text-gray-500 text-2xl" @click="redirection('/user')" />
  </div>
</template>

<style scoped></style>
