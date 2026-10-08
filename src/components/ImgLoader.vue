<script>
export default {
  name: 'ImgLoader',
  props: {
    src: { required: true, type: String },
    dialog: { default: false, type: Boolean },
    height: { default: '100%', type: String },
    width: { default: '100%', type: String },
    fit: { default: 'cover', type: String },
    style: { type: Object },
  },
  emits: ['load', 'error', 'click'],
  data() {
    return {
      isLoaded: false,
    }
  },
  mounted() {},
  methods: {
    load() {
      this.$emit('load')
    },
    error() {
      this.$emit('error')
    },
    click() {
      if (this.dialog && this.$refs.dialog !== undefined) {
        this.$refs.dialog.setIsOpen(true)
      }
      this.$emit('click')
    },
  },
  computed: {},
}
</script>

<template>
  <q-img
    :src="src"
    :height="height"
    :width="width"
    :fit="fit"
    :error-src="'/image.svg'"
    :style="style"
    @load="load"
    @error="error"
    @click="click"
  >
    <template v-slot:loading>
      <q-spinner-ios color="white" />
    </template>
    <template v-slot:error>
      <slot></slot>
    </template>
    <slot></slot>
  </q-img>
  <dialog-box v-if="dialog" ref="dialog" :maximized="true" :backdropFilter="'blur(3px)'">
    <img-loader
      :src="src"
      :fit="'contain'"
      :style="{ overflow: 'hidden' }"
      @click="this.$refs.dialog.setIsOpen(false)"
    >
      <slot></slot>
    </img-loader>
  </dialog-box>
</template>

<style stored>
.q-img {
  z-index: 1;
}
.q-img__content > div {
  background: unset;
}
.q-img__image[__qerror='true'] {
  object-fit: contain !important;
  padding: 25%;
  opacity: 0.2;
}
</style>
