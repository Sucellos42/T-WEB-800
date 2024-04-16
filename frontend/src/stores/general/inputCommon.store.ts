import { defineStore } from 'pinia';

import { useMapStore } from '~/stores/general/map.store';

import { DataInput } from '~/types/inputCommon/dataInput.type';
import { RangeDateSelected } from '~/types/rangeDateSelected.type';
import { EventsSelected } from '~/types/cardCommon/eventsSelected.type';

export const useInputCommonStore = defineStore('inputCommon', {
  state: (): DataInput => ({
    city: '',
    date: { start: new Date(), end: new Date() },
    events: [],
    eventsTranslated: [],
  }),
  getters: {
    getCity: (state) => state.city,
    getDate: (state) => state.date,
    getEvents: (state) => state.events,
    getEventsTranslated: (state) => state.eventsTranslated,
  },
  actions: {
    async loadAllData() {
      if (this.city.length > 0 && this.eventsTranslated.length > 0) {
        for (const event of this.eventsTranslated) {
          await this.loadEventsWithCity(this.city, event);
        }
        this.updateEvents([], []);
        this.updateCity('');
      }
    },
    updateEvents(
      newEvents: EventsSelected,
      newEventsTranslated: EventsSelected,
    ) {
      this.events = newEvents;
      this.eventsTranslated = newEventsTranslated;
    },
    updateCity(newCity: string) {
      this.city = newCity;
    },
    updateDate(newDate: RangeDateSelected) {
      this.date = newDate;
    },
    async loadEventsWithCity(city: string, event: string) {
      try {
        const res = await fetch(
          `http://localhost:3000/events/bycityandtype/${city}/${event}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await res.json();
        useMapStore().loadEvents(data);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
});
