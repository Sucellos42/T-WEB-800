<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Input from '~/components/common/InputCommon.vue';
import MenuConnexion from '~/components/MenuConnexion.vue';
import CardCommon from '~/components/common/CardCommon.vue';
import { useConnexionStore } from '~/stores/connexion/connexion.store.ts';
import router from '~/router';
import MapCommon from '~/components/events/EventMap.vue';

import type { RangeDateSelected } from '~/types/date/rangeDateSelected.type';

const route = useRoute();
const connexionStore = useConnexionStore();
const inputType = ref('');
const start = ref('');
const end = ref('');
const reset = ref(false);

onMounted(() => {
  if (!localStorage.getItem('token') && route.query.token) {
    localStorage.setItem('token', route.query.token as string);
    localStorage.setItem('firstName', route.query.firstName as string);
    connexionStore.setFirstName(localStorage.getItem('firstName') as string);
    router.push('/');
  }
  if (localStorage.getItem('token')) {
    connexionStore.setFirstName(localStorage.getItem('firstName') as string);
  }
});

function updateInput(val: string) {
  inputType.value = val;
}

function updateRange(val: RangeDateSelected) {
  const newStart: string = formatDate(val.start);
  const newEnd: string = formatDate(val.end);

  start.value = newStart;
  end.value = newEnd;
}

function formatDate(date: Date) {
  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

function updateReset() {
  reset.value = true;
  inputType.value = '';
}

function resetInputValue(val: string) {
  inputType.value = val;
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <div>
      <MenuConnexion />
    </div>
    <div v-click-outside="updateReset" class="w-full flex justify-center mt-10">
      <div class="flex flex-col">
        <Input
          :start="start"
          :end="end"
          :reset="reset"
          @update:input-selected="updateInput"
          @update:reset="reset = false"
          @reset:input="resetInputValue"
        />
        <div
          v-if="
            inputType === 'depart' ||
            inputType === 'arrivee' ||
            inputType === 'evenement' ||
            inputType === 'destination'
          "
          class="mt-3 relative shadow-custom-bottom"
          :class="{ 'max-w-48': inputType === 'destination' }"
        >
          <CardCommon :type="inputType" @update:selected-range="updateRange" />
        </div>
      </div>
    </div>
<!--    <div class="min-h-0 flex-grow p-2.5">-->
<!--      <MapCommon />-->
<!--    </div>-->
  </div>
</template>

<style scoped></style>
