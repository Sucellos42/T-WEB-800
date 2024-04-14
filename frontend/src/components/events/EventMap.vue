<template>
  <div id="map"></div>
  <EventCard v-if="selectedEvent" :event="selectedEvent" @close="selectedEvent = null" />
  <EventList :events="visibleEvents" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '~/types/eventsTypes';
import eventData from '~/data/events.json';
import EventCard from "~/components/events/EventCard.vue";
import EventList from "~/components/events/EventList.vue";

const troyesCoordinates = { latitude: 48.297, longitude: 4.074 };
const selectedEvent = ref<Event | null>(null);

onMounted(() => {
  const map = L.map('map').setView([troyesCoordinates.latitude, troyesCoordinates.longitude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  eventData.forEach((event) => {
    const marker = L.marker([Number(event[7]), Number(event[6])]).addTo(map);
    marker.on('click', () => {
      selectedEvent.value = event;
    });
  });
});
</script>

<style scoped>
#map {
  margin: 1rem;
  height: 90vh;
}
</style>
