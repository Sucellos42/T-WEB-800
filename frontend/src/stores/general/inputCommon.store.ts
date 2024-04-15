import { defineStore } from 'pinia';

import { DataInput } from '~/types/inputCommon/dataInput.type';
import { RangeDateSelected } from '~/types/rangeDateSelected.type';
import { EventsSelected } from '~/types/cardCommon/eventsSelected.type';

export const useInputCommonStore = defineStore('inputCommon', {
  state: (): DataInput => ({
    city: '',
    date: { start: new Date(), end: new Date() },
    events: [],
  }),
  getters: {
    getCity: (state) => state.city,
    getDate: (state) => state.date,
    getEvents: (state) => state.events,
  },
  actions: {
    sendAllData() {
      console.log('Data sent: ', this.city, this.date, this.events);
    },
    updateEvents(newEvents: EventsSelected) {
      console.log('Events to update: ', newEvents);
      this.events = newEvents;
      console.log('Events updated: ', this.events);
    },
    updateCity(newCity: string) {
      this.city = newCity;
    },
    updateDate(newDate: RangeDateSelected) {
      this.date = newDate;
    },
  },
});
