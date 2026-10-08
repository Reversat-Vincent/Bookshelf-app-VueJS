<script>
import { AddressbarColor, getCssVar } from 'quasar'
import NavBar from './components/NavBar.vue'
import AppLog from './components/AppLog.vue'
import { useAppStore } from './stores/app'

export default {
  name: 'App',
  components: {
    NavBar,
    AppLog,
  },
  data() {
    return {
      title: null,
      titleLoading: false,
      routeLoading: false,
      appLogIsOpen: false,
      fontSize: this.$fontSize,
    }
  },
  mounted() {
    useAppStore().checkApi()
  },
  watch: {
    $route(to) {
      this.title = null
      if (to.meta) {
        if (to.meta.title) this.title = to.meta.title
        if (to.meta.titleFn) this.title = to.meta.titleFn(to.params)
        if (to.meta.loading) this.titleLoading = to.meta.loading
      }
    },
  },
  methods: {
    updateTitle(title, loading = false) {
      this.title = title
      this.titleLoading = loading
    },
    toggleAppLog() {
      this.appLogIsOpen = !this.appLogIsOpen
    },
  },
  created() {
    AddressbarColor.set(getCssVar('primary'))

    if (this.$route.meta && this.$route.meta.title) {
      this.title = this.$route.meta.title
    }

    // Start loader
    this.$router.beforeEach(() => {
      this.routeLoading = true
    })

    // Stop loader
    this.$router.afterEach(() => {
      this.routeLoading = false
    })
  },
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <q-toolbar class="bg-primary text-white">
        <q-avatar>
          <img-loader :src="'/favicon.ico'" dialog></img-loader>
        </q-avatar>
        <q-toolbar-title>Bookshelf app</q-toolbar-title>
        <app-btn icon="computer" @click="toggleAppLog">
          <app-tooltip> Log </app-tooltip>
        </app-btn>
      </q-toolbar>
    </q-header>
    <NavBar />
    <AppLog :isOpen="appLogIsOpen" @update:isOpen="toggleAppLog" />
    <q-page-container>
      <q-page v-if="!routeLoading">
        <h1 v-if="title != null || titleLoading">
          <span v-html="title"></span>
          <q-spinner-ios v-if="titleLoading" color="white"></q-spinner-ios>
        </h1>
        <q-scroll-area>
          <router-view @update-title="updateTitle" />
        </q-scroll-area>
      </q-page>
      <q-page v-else>
        <app-loading :size="'20vh'" :style="{ 'grid-row': '1 / span 2' }"></app-loading>
      </q-page>
    </q-page-container>
    <q-footer>
      <q-toolbar class="text-white">
        <q-avatar>
          <img-loader :src="'/favicon.ico'" dialog></img-loader>
        </q-avatar>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style>
body {
  --br: 0.5rem; /* border-radius */
  --br-c: 50%; /* border-radius circle */
}
.q-layout {
  --fs: v-bind(fontSize); /* font-size */
  --fs-s: calc(1px * var(--fs) * 0.75); /* font-size small */
  --fs-m: calc(1px * var(--fs) * 1); /* font-size medium */
  --fs-l: calc(1px * var(--fs) * 1.25); /* font-size large */
}
.q-toolbar {
  padding-left: calc(0.5px * var(--fs));
  padding-right: calc(0.5px * var(--fs));
}
.q-toolbar .q-avatar {
  font-size: calc(2px * var(--fs));
}
.q-header {
  background-color: var(--q-primary);
}
.q-page {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 1rem 1rem 0 1rem;
  background-color: var(--q-black-2);
}
.q-scrollarea__container {
  overflow-x: hidden;
}
.q-scrollarea__content {
  height: 100%;
}
.q-footer {
  background-color: var(--q-black-3);
}
</style>
