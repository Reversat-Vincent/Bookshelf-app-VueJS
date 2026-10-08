<script>
export default {
  name: 'AppBtn',
  props: {
    icon: { required: true, type: String },
    disabled: { default: false, type: Boolean },
    to: { default: null, type: Object },
  },
  emits: ['click'],
  data() {
    return {}
  },
  mounted() {},
  methods: {
    click() {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
  },
  computed: {},
}
</script>

<template>
  <button v-if="to == null" type="button" class="app-btn" @click="click()" :disabled="disabled">
    <q-icon :name="icon" />
    <slot></slot>
  </button>
  <RouterLink v-else-if="!disabled" :to="to" class="app-btn">
    <q-icon :name="icon" />
    <slot></slot>
  </RouterLink>
  <RouterLink v-else :to="to" class="app-btn" disabled>
    <q-icon :name="icon" />
    <slot></slot>
  </RouterLink>
</template>
