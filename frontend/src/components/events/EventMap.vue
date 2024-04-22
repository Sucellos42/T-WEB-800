<template>
  <div class="md:flex max-h-full overflow-hidden p-10">
    <div class="md:w-3/5 overflow-y-scroll">
      <EventList :events="visibleEvents" />
    </div>
    <div class="md:w-2/5">
      <div id="map"></div>
      <EventCard
        v-if="selectedEvent"
        :event="selectedEvent"
        @close="selectedEvent = null"
      />
    </div>
    <div class="event-modal">
      <EventModal
        :event="selectedEvent"
        class="event-modal"
        @update:event="selectedEvent = $event"
      />
    </div>
  </div>
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
import {useMapStore} from "~/stores/general/map.store.ts";
import EventCard from '~/components/events/EventCard.vue';
import EventList from '~/components/events/EventList.vue';
import EventModal from '~/components/events/EventModal.vue';

const troyesCoordinates = { latitude: 48.297, longitude: 4.074 };
const selectedEvent = ref<Event | null>(null);
const visibleEvents = ref<Event[]>([]);
const eventData = useMapStore().getAllEvents;

const updateVisibleEvents = (map: LeafletMap) => {
  // visibleEvents.value = eventData.filter((event) => {
  //   const lat = Number(event[7]);
  //   const lng = Number(event[6]);
  //   return map.getBounds().contains(latLng(lat, lng));
  // });
};

const mapOptions: MapOptions = {
  center: [troyesCoordinates.latitude, troyesCoordinates.longitude],
  zoom: 13,
};

onMounted(() => {
  console.log('EventMap mounted', eventData);
  // selectedEvent.value = useMapStore().getAllEvents;
  // const myMap: LeafletMap = map('map', mapOptions);
  // tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   attribution:
  //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  // }).addTo(myMap);
  // visibleEvents.value = eventData.filter((event) => {
  //   const lat = Number(event[7]);
  //   const lng = Number(event[6]);
  //   return myMap.getBounds().contains(latLng(lat, lng));
  // });
  //
  // myMap.on('load', () => updateVisibleEvents(myMap));
  // myMap.on('moveend', () => updateVisibleEvents(myMap));
  // console.log('EventMap mounted', visibleEvents.value);
  // //
  // eventData.forEach((event) => {
  //   marker([Number(event[7]), Number(event[6])])
  //     .addTo(myMap)
  //     .on('click', () => {
  //       selectedEvent.value = event;
  //       console.log('selectedEvent:', selectedEvent.value);
  //     });
  // });
});
</script>

<style scoped>
#map {
  height: 100vh;
  z-index: 5;
}

.event-modal {
  z-index: 10;
}
</style>
