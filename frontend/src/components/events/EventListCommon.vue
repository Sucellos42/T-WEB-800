<template>
  <div class="event-list">
    <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @click="handleEventSelect(event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EventCard from './EventCard.vue';
import { Event } from '@/types';

const events = ref<Event[]>([]); // Vous les aurez probablement récupérés via une API

function handleEventSelect(event: Event) {
  // Logique pour sélectionner l'événement ou faire autre chose
}
</script>

<style scoped>
/* CSS for the event list */
</style>
