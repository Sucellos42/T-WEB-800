import { defineStore } from 'pinia';
import { GeneralType } from '~/types/storeType/general.type';


export const useGeneralStore = defineStore('general', {
    state: (): GeneralType => ({
        isResponsive: JSON.parse(localStorage.getItem('isResponsive') || window.innerWidth < 1024),
        favoris: JSON.parse(localStorage.getItem('favoris') || '[]'),
    }),
    getters: {
        getIsResponsive: (state) => state.isResponsive,
        getFavoris: (state) => state.favoris,
    },
    actions: {
        updateIsResponsive(newIsResponsive: boolean) {
            this.isResponsive = newIsResponsive;
            localStorage.setItem('isResponsive', JSON.stringify(this.getIsResponsive));
        },
        updateFavoris(newFavoris: FavorisType) {
            this.favoris.push(newFavoris);
            localStorage.setItem('favoris', JSON.stringify(this.getFavoris));
        },
    },
});
