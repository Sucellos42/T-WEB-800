<template>
  <div class="event-card">
    <h3>{{ props.event[1] }}</h3>
    <p>{{ props.event[2] }}</p>
    <p>{{ props.event[3] }}</p>
    <p>{{ props.event[4] }}</p>
    <p>{{ props.event[5] }}</p>
    <div id="event-card-description">
      <p>{{ props.event[8] }}</p>
    </div>
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
  z-index: 100;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
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
