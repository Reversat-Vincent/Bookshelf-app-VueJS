import health from '../api/health'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    apiIsReachable: null,
  }),
  actions: {
    checkApi() {
      console.start('api')
      return health
        .ping()
        .then(() => {
          this.apiIsReachable = true
          console.l(`API : reachable in ${console.stop('api')}ms`)
        })
        .catch((err) => {
          this.apiIsReachable = false
          console.stop('api')
          console.l(`API : unreachable`)
          console.error(err)
        })
    },
  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
