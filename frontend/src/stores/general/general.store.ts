import { defineStore } from 'pinia';

import { GeneralType } from '~/types/storeType/general.type';

export const useGeneralStore = defineStore('general', {
    state: (): GeneralType => ({
        isResponsive: false,
        favoris: JSON.parse(localStorage.getItem('favoris') || '[]'),
    }),
    getters: {
        getIsResponsive: (state) => state.isResponsive,
        getFavoris: (state) => state.favoris,
    },
    actions: {
        updateIsResponsive(newIsResponsive: boolean) {
            this.isResponsive = newIsResponsive;
        },
        updateFavoris(newFavoris: FavorisType) {
            this.favoris.push(newFavoris);
            localStorage.setItem('favoris', JSON.stringify(this.getFavoris));
        },
    },
});
