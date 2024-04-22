<script setup lang="ts">
import { onMounted } from 'vue';
import { useInputCommonStore } from '~/stores/general/inputCommon.store.ts';

onMounted(() => {
  useInputCommonStore().loadAllCities();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
