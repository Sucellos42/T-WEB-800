import { defineStore } from 'pinia';

import { MapType } from '~/types/storeType/map.type';
import { Event, AllEvents } from '~/types/events/events.type';

export const useMapStore = defineStore('map', {
  state: (): MapType => ({
    allEvents: [],
    isLoading: true,
  }),
  getters: {
    getEvent: (state) => (id: number) =>
      state.allEvents.find((event: Event) => event.id === id),
    getAllEvents: (state) => state.allEvents,
    getNumberEvents: (state) => state.allEvents.length,
    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    loadEvents(events: AllEvents) {
      this.allEvents = events;
      this.isLoading = false;
      console.log('Events loaded:', this.getAllEvents, this.getEvent(1));
    },
  },
});
