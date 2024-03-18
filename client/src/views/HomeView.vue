<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import Input from "~/components/common/InputCommon.vue"
import MenuConnexion from "~/components/MenuConnexion.vue";
import CardCommon from "~/components/common/CardCommon.vue";
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts'
import router from "~/router";

import type { RangeDateSelected } from "~/types/rangeDateSelected.type.ts";


const route = useRoute()
const connexionStore = useConnexionStore()
const inputType = ref('')
const start = ref('')
const end = ref('')


onMounted(() => {
  if (!localStorage.getItem('token') && route.query.token) {
    localStorage.setItem('token', <string>route.query.token)
    localStorage.setItem('firstName', <string>route.query.firstName)
    connexionStore.setFirstName(<string>localStorage.getItem('firstName'))
    router.push('/')
  }
  if(localStorage.getItem('token')) {
    connexionStore.setFirstName(<string>localStorage.getItem('firstName'))
  }
})

function updateInput (val: string) {
  inputType.value = val
}

function updateRange (val: RangeDateSelected ) {
  const newStart: string = formatDate(val.start)
  const newEnd: string = formatDate(val.end)

  start.value = newStart
  end.value = newEnd
}

function formatDate (date: Date) {
  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

function resetInput () {
  inputType.value = ''
  start.value = ''
  end.value = ''
}

</script>

<template>
  <div class="h-screen w-screen">
    <div>
      <MenuConnexion/>
    </div>
    <div class="w-full flex justify-center mt-10">
      <div class="flex flex-col absolute">
        <Input :start="start" :end="end" @update:input-selected="updateInput" @reset:input="resetInput"/>
        <div v-if="inputType === 'depart' || inputType === 'arrivee'" class="mt-3 relative shadow-custom-bottom">
          <CardCommon :type="inputType" @update:selected-range="updateRange"/>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
