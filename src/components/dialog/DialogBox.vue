<script>
export default {
  name: 'DialogBox',
  props: {
    dialogClose: { type: Boolean },
    fullHeight: { default: false, type: Boolean },
    fullWidth: { default: false, type: Boolean },
    maximized: { default: false, type: Boolean },
    backdropFilter: { default: '', type: String },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  mounted() {},
  methods: {
    setIsOpen(isOpen) {
      this.isOpen = isOpen
    },
  },
  computed: {},
}
</script>

<template>
  <q-dialog
    v-model="isOpen"
    :full-height="fullHeight"
    :full-width="fullWidth"
    :maximized="maximized"
    :backdropFilter="backdropFilter"
  >
    <dialog-close v-if="dialogClose" @close="setIsOpen(false)"></dialog-close>
    <slot></slot>
  </q-dialog>
</template>
