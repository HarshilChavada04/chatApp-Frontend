import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        access_token: LocalStorage.has('auth')
            ? JSON.parse(LocalStorage.getItem('auth') || '{}').access_token : null,
        isDark: LocalStorage.has('auth')
            ? JSON.parse(LocalStorage.getItem('auth') || '{}').isDark : null,
    }),

    getters: {
        isAuthenticated(state){
            return !!state.access_token;
        },
        getToken(state) {
            return state.access_token;
        },
        getUserTheme(state) {
            return state.isDark ?? 1
        },
    },

    actions: {
      setToken(strToken) {
        this.access_token = strToken;
        const auth = LocalStorage.has('auth')
          ? JSON.parse(LocalStorage.getItem('auth') || '{}')
          : {};
        auth.access_token = this.access_token;
        LocalStorage.set('auth', JSON.stringify(auth));
      },
      setThemes(arrData) {
        this.isDark = arrData;
        const auth = LocalStorage.has('auth')
            ? JSON.parse(LocalStorage.getItem('auth') || '{}')
            : {};
        auth.isDark = this.isDark;
        LocalStorage.set('auth', JSON.stringify(auth));
      },
    },
})