import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLangStore = defineStore('lang', {
  state: () => ({
    lang: 'en',
  }),
  actions: {},
  getters: {},
  persist: {
    enabled: true,
    strategies: [{ paths: ['lang'] }],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLangStore, import.meta.hot))
}
