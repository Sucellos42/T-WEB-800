import { defineStore } from 'pinia';
import router from '~/router';

import { UserType } from '~/types/storeType/user.type';

export const useConnexionStore = defineStore('connexion', {
  state: (): UserType => ({
    user: {},
    firstName: '',
  }),
  getters: {
    getUser: (state) => state.user,
    getFirstName: (state) => state.firstName,
  },
  actions: {
    setUser(newUser: NonNullable<unknown>) {
      this.user = newUser;
    },
    setFirstName(firstName: string | null) {
      this.firstName = firstName;
    },
    async oAuthLogin() {
      window.location.href = 'http://localhost:3000/google';
    },
    logout() {
      if (localStorage.getItem('token')) {
        this.user = {};
        this.firstName = '';
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        router.push('/');
        return;
      }
      return;
    },
  },
});
