<script>
import { getCssVar } from 'quasar'
export default {
  name: 'AppLog',
  props: {
    isOpen: { required: true, type: Boolean },
    logs: { type: Array, default: () => [] },
  },
  data() {
    return {
      localIsOpen: this.isOpen,
      colors: {
        log: getCssVar('white'),
        warning: getCssVar('secondary'),
        success: getCssVar('success'),
        error: getCssVar('error'),
      },
    }
  },
  mounted() {},
  watch: {
    isOpen(newValue) {
      this.localIsOpen = newValue
    },
  },
  methods: {
    computeLog(log) {
      const date = new Date(log.date).toLocaleString('fr-FR', {
        hour12: false,
        dateStyle: 'short',
        timeZone: 'Europe/Paris',
      })
      const time = new Date(log.date).toLocaleString('fr-FR', {
        hour12: false,
        timeStyle: 'short',
        timeZone: 'Europe/Paris',
      })
      return `[${date} ${time}] ${log.key ? `${log.key}: ` : ''}${log.val}`
    },
  },
  computed: {},
}
</script>

<template>
  <q-drawer
    v-model="localIsOpen"
    side="right"
    behavior="mobile"
    overlay
    @update:model-value="$emit('update:isOpen', value)"
  >
    <div id="app-log">
      <h1>Log</h1>
      <q-scroll-area>
        <div
          class="app-log"
          v-for="(log, index) in console.logs"
          :key="index"
          :style="{ 'border-bottom': '1px solid ' + colors[log.type] + '1a' }"
        >
          {{ computeLog(log) }}
        </div>
      </q-scroll-area>
    </div>
  </q-drawer>
</template>

<style scoped>
#app-log {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: var(--q-black-2);
  & > h1 {
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    border-bottom: 1px solid var(--q-white);
  }
  & .app-log {
    font-size: var(--fs-s);
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    &:hover {
      cursor: pointer;
      background-color: var(--q-black-3);
    }
  }
}
</style>
