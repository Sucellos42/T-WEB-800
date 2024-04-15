<template>
  <div class="event-card">
    <p>{{ props.event[2] }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { Event } from '~/types/eventsTypes';

const props = defineProps<{ event: Event }>();

onMounted(() => {});
</script>

<style scoped>
.event-card {
  bottom: 20px;
  left: 20px;
  z-index: 10;
  background-color: #f9f9f9;
  padding: 10px;
  width: 90%;
  height: fit-content;
}

#event-card-description {
  max-height: 100px;
  overflow: auto;
  display: none;
}
</style>
