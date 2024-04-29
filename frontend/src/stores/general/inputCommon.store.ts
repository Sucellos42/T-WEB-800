import { defineStore } from 'pinia';

import { useMapStore } from '~/stores/general/map.store';
import { useGeneralStore } from '~/stores/general/general.store';

import { InputCommonType } from '~/types/storeType/inputCommon.type';
import { RangeDateSelected } from '~/types/date/rangeDateSelected.type';
import { EventsSelected } from '~/types/events/events.type';
import { FavorisType } from '~/types/storeType/general.type';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export const useInputCommonStore = defineStore('inputCommon', {
  state: (): InputCommonType => ({
    city: '',
    date: { start: new Date(), end: new Date() },
    events: [],
    eventsTranslated: [],
    allCities: [],
    isSelectedCity: false,
  }),
  getters: {
    getCity: (state) => state.city,
    getDate: (state) => state.date,
    getEvents: (state) => state.events,
    getEventsTranslated: (state) => state.eventsTranslated,
    getAllCities: (state) => state.allCities,
    getIsSelectedCity: (state) => state.isSelectedCity,
  },
  actions: {
    async loadAllData(callback: boolean, favoris?: FavorisType) {
      if (this.city.length > 0 && this.eventsTranslated.length > 0 && !callback) {
        await this.loadEventsWithCity(this.getCity, this.getEventsTranslated);
        useGeneralStore().updateFavoris({city: this.getCity, events: this.getEvents, eventsTranslated: this.getEventsTranslated});
        this.updateEvents([], []);
        this.updateCity('');
      }
      else if (favoris && callback) {
        await this.loadEventsWithCity(favoris.city, favoris.eventsTranslated);
        this.updateCity('');
        this.updateEvents([], []);
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
    async loadEventsWithCity(city: string, events: EventsSelected) {
      // Set the loader to true
      useMapStore().isLoading = true;
      try {
        const res = await fetch(
          `${apiBaseUrl}/events/bycityandtype/${city}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ types: events }),
          },
        );
        const data = await res.json();
        useMapStore().loadEvents(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        useMapStore().isLoading = false;
      }
    },
    async loadAllCities() {
      try {
        const res = await fetch(`${apiBaseUrl}/events/getcity`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        this.allCities = data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    updateIsSelectedCity(isSelected: boolean) {
      this.isSelectedCity = isSelected;
    },
  },
});
