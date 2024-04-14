<template>
  <div class="event-card">
    <p id="event-card-description">{{ event[3] }}</p>
    <button @click="$emit('close')">Fermer</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { Event } from '~/types/eventsTypes';

const props = defineProps<{ event: Event }>();

onMounted(() => {
  console.log('Selected event from child:', props.event);
});
</script>

<style scoped>
.event-card {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  width: 90%;
  height: fit-content;
}

#event-card-description {
  max-height: 100px;
  overflow: auto;
}
</style>
