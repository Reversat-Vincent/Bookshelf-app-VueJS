import { defineRouter } from '#q-app'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import home from './home'
import bookshelf from './bookshelf'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: [
      home,
      bookshelf,
      {
        path: '/:catchAll(.*)*',
        component: () => import('@/pages/ErrorNotFound.vue'),
      },
    ],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  // Middleware
  Router.beforeEach(() => {
    console.start('router')
  })

  Router.afterEach((to) => {
    console.l(`Router : to ${to.name} in ${console.stop('router')}ms`)
  })

  Router.home = function () {
    this.push({ name: 'home' })
  }

  Router.reload = function () {
    this.replace({
      name: this.currentRoute.value.name,
      params: this.currentRoute.value.params,
      force: true,
    })
  }

  return Router
})
