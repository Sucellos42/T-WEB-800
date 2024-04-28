<template>
  <div class="md:flex max-h-full overflow-hidden">
    <div class="md:w-2/5 overflow-y-scroll">
      <EventList :events="visibleEvents"/>
    </div>
    <div class="md:w-3/5">
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
import {ref, onMounted, computed, watchEffect} from 'vue';
import 'leaflet/dist/leaflet.css';
import {
  map,
  latLng,
  tileLayer,
  MapOptions,
  marker,
  Map as LeafletMap,
} from 'leaflet';
import {Event} from '~/types/events/events.type';
// import eventData from '~/data/events.json';
import EventCard from '~/components/events/EventCard.vue';
import EventList from '~/components/events/EventList.vue';
import EventModal from '~/components/events/EventModal.vue';
import {useMapStore} from "~/stores/general/map.store.ts";

// const store = useMapStore();

const selectedEvent = ref<Event | null>(null);
const visibleEvents = ref<Event[]>();
const store = useMapStore();
let events: Event[] = computed(() => store.getAllEvents).value;
// let events: Event[] = useMapStore().getAllEvents;

const updateVisibleEvents = (map: LeafletMap, events: Event[]) => {
  visibleEvents.value = events.filter((event) => {
    const lat = Number(event.latitude);
    const lng = Number(event.longitude);
    return map.getBounds().contains(latLng(lat, lng));
  });
};

onMounted(async () => {
  console.log(events.length, 'Events loaded');
  // Réduire le nombre d'event à charger à 20
  if (events.length === 0) {
    // wait 1 second to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 2000));
    events = store.getAllEvents;
  }
    console.log(events, 'Events loadedddddd')
    const myMap: LeafletMap = map('map', {
      center: [events[0].latitude, events[0].longitude],
      zoom: 13,
    });
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(myMap);

    visibleEvents.value = events.filter((event) => {
      const lat = Number(event.longitude);
      const lng = Number(event.latitude);
      return myMap.getBounds().contains(latLng(lat, lng));
    });

  if (events.length > 0) {
    updateVisibleEvents(myMap, events);
  }
  myMap.on('moveend', () => updateVisibleEvents(myMap, events));
  console.log('EventMap mounted', visibleEvents.value);

  events.forEach((event) => {
    marker([Number(event.latitude), Number(event.longitude)])
        .addTo(myMap)
        .on('click', () => {
          selectedEvent.value = event;
          console.log('selectedEvent:', selectedEvent.value);
        });
  });
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
