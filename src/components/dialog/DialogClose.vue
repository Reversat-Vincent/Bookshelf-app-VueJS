<script>
export default {
  name: 'DialogClose',
  props: {},
  emits: ['close'],
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  computed: {},
}
</script>

<template>
  <app-btn icon="close" @click="$emit('close')" class="dialog-close">
    <app-tooltip> Close </app-tooltip>
  </app-btn>
</template>
