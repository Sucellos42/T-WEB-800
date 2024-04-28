import { defineStore } from 'pinia';

import { GeneralType } from '~/types/storeType/general.type';

export const useGeneralStore = defineStore('general', {
    state: (): GeneralType => ({
        isResponsive: false,
    }),
    getters: {
        getIsResponsive: (state) => state.isResponsive,
    },
    actions: {
        updateIsResponsive(newIsResponsive: boolean) {
            this.isResponsive = newIsResponsive;
        },
    },
});
