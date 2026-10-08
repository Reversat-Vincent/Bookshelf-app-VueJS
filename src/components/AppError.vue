<script>
export default {
  name: 'AppError',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  computed: {},
}
</script>

<template>
  <section class="error">
    <div class="error-msg">
      <slot name="msg">Loading error</slot>
    </div>
    <div class="error-btn">
      <slot name="default"></slot>
    </div>
  </section>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.error-msg {
  color: var(--q-error);
  text-align: center;
}
.error-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
