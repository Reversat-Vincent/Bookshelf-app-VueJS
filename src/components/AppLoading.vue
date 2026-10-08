<script>
export default {
  name: 'AppLoading',
  props: {
    size: { type: String },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  computed: {},
}
</script>

<template>
  <section class="loading">
    <slot name="loading">
      <q-spinner-ios color="white" :size="size" />
    </slot>
  </section>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
