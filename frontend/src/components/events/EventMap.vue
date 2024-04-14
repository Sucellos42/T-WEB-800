<template>
  <div id="map"></div>
<!--  Appeler la card event card if event -->
  <EventCard v-if="selectedEvent" :event="selectedEvent" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '~/types/eventsTypes'
import eventData from '~/data/events.json';
import EventCard from "~/components/events/EventCard.vue";

const troyesCoordinates = { latitude: 48.297, longitude: 4.074 };
const events = ref<Event[]>([]);
const selectedEvent = ref<Event | null>(null);

onMounted(async () => {
  const map = L.map('map').setView([troyesCoordinates.latitude, troyesCoordinates.longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Utilisez les données importées pour ajouter des marqueurs sur la carte
  eventData.forEach((event) => {
    const marker = L.marker([Number(event[7]), Number(event[6])])
        .bindPopup(String(event[2])) // ou toute autre information que vous souhaitez afficher
        .addTo(map);
    marker.on('click', (marker) => {
      console.log('Marker clicked:', marker);
      const event = eventData.find((e) => e[6] === marker.latlng.lng && e[7] === marker.latlng.lat);
      if (event) {
        selectedEvent.value = event;
        console.log('Selected event from parent:', selectedEvent.value);
      }
    });
  });

  // Ajout d'un écouteur d'événement pour le changement de centre de la carte
  map.on('moveend', () => {
    const center = map.getCenter();
    const bounds = map.getBounds();
    console.log(`Nouveau centre: Latitude ${center.lat}, Longitude ${center.lng}`);
    console.log(`Bords de la carte: Latitude ${bounds.getNorth()}, Longitude ${bounds.getEast()}, Latitude ${bounds.getSouth()}, Longitude ${bounds.getWest()}`);
  });
});
</script>

<style scoped>
#map {
  z-index: 0;
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
