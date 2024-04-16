import { defineStore } from 'pinia';

import { MapType } from '~/types/storeType/map.type';
import { Event, AllEvents } from '~/types/events/events.type';

export const useMapStore = defineStore('map', {
  state: (): MapType => ({
    allEvents: [],
  }),
  getters: {
    getEvent: (state) => (id: number) =>
      state.allEvents.find((event: Event) => event.id === id),
    getAllEvents: (state) => state.allEvents,
    getNumberEvents: (state) => state.allEvents.length,
  },
  actions: {
    loadEvents(events: AllEvents) {
      this.allEvents = events;
    },
  },
});
