<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useInputCommonStore } from '~/stores/general/inputCommon.store.ts';
import { useGeneralStore } from '~/stores/general/general.store.ts';

const isResponsive = ref(window.innerWidth < 1024);
const sizeWindow = ref(window.innerWidth);
const generalStore = useGeneralStore();

const updateWidth = () => {
  sizeWindow.value = window.innerWidth;
};

watch(
    () => sizeWindow.value,
    (newWidth) => {
      isResponsive.value = newWidth < 1024;
      generalStore.updateIsResponsive(isResponsive.value);
    },
    { immediate: true },
);

onMounted(() => {
  window.addEventListener('resize', updateWidth);
  useInputCommonStore().loadAllCities();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
