import { defineStore } from 'pinia';

import { MapStoreType } from '~/types/storeType/map.type';
import { AllEvents } from '~/types/events/allEvents.type';
import { Event } from '~/types/events/event.type';

export const useMapStore = defineStore('map', {
  state: (): MapStoreType => ({
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
      console.log('Events loaded', this.getAllEvents, this.getEvent(0));
    },
  },
});
