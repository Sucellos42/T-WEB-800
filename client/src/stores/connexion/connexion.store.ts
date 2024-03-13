import {defineStore} from 'pinia';
import router from "~/router";

export const useConnexionStore = defineStore('connexion', {
    state: (): { user: NonNullable<unknown>, firstName: string } => ({
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
    setFirstName(firstName: string) {
        this.firstName = firstName;
    },
    async oAuthLogin () {
      window.location.href = 'http://localhost:3000/google';
    },
    logout () {
      if(localStorage.getItem('token')) {
        this.user = {};
        this.firstName = '';
        localStorage.removeItem('token');
        router.push('/');
        window.location.reload();
        return;
      }
      return;
    }
  },
});
