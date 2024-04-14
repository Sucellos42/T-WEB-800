<template>
  <div class="event-list">
<!--    <EventCard-->
<!--        v-for="event in events"-->
<!--        :key="event.id"-->
<!--        :event="event"-->
<!--        @click="handleEventSelect(event)"-->
<!--    />-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const events = ref<Event[]>([]); // Vous les aurez probablement récupérés via une API
</script>

<style scoped>
/* CSS for the event list */
</style>
