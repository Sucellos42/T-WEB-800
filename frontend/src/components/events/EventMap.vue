<template>
  <div id="map"></div>
  <EventCard
    v-if="selectedEvent"
    :event="selectedEvent"
    @close="selectedEvent = null"
  />
  <EventList :events="visibleEvents" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import {
  map,
  latLng,
  tileLayer,
  MapOptions,
  marker,
  Map as LeafletMap,
} from 'leaflet';
import { Event } from '~/types/eventsTypes';
import eventData from '~/data/events.json';
import EventCard from '~/components/events/EventCard.vue';
import EventList from '~/components/events/EventList.vue';

const troyesCoordinates = { latitude: 48.297, longitude: 4.074 };
const selectedEvent = ref<Event | null>(null);
const visibleEvents = ref<Event[]>([]);

const updateVisibleEvents = (map: LeafletMap) => {
  visibleEvents.value = eventData.filter((event) => {
    const lat = Number(event[7]);
    const lng = Number(event[6]);
    return map.getBounds().contains(latLng(lat, lng));
  });
};

const mapOptions: MapOptions = {
  center: [troyesCoordinates.latitude, troyesCoordinates.longitude],
  zoom: 13,
};

onMounted(() => {
  const myMap: LeafletMap = map('map', mapOptions);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  visibleEvents.value = eventData.filter((event) => {
    const lat = Number(event[7]);
    const lng = Number(event[6]);
    return myMap.getBounds().contains(latLng(lat, lng));
  });

  myMap.on('moveend', () => updateVisibleEvents(myMap));
  console.log('EventMap mounted', visibleEvents.value);
  //
  eventData.forEach((event) => {
    marker([Number(event[7]), Number(event[6])])
      .addTo(myMap)
      .on('click', () => {
        selectedEvent.value = event;
      });
  });
});
</script>

<style scoped>
#map {
  margin: 1rem;
  height: 90vh;
  z-index: 5;
}
</style>
