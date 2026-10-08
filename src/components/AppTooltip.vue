<script>
export default {
  name: 'AppBtn',
  props: {
    color: { default: 'black-4', type: String },
    anchor: { default: 'top middle', type: String },
    self: { default: 'bottom middle', type: String },
  },
  emits: ['click'],
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  computed: {},
}
</script>

<template>
  <q-tooltip :class="`bg-${color}`" :anchor="anchor" :self="self" :offset="[0, 0]" persistent>
    <slot></slot>
  </q-tooltip>
</template>

<style>
.q-tooltip {
  font-size: 12px;
  border-radius: var(--br);
}
</style>
