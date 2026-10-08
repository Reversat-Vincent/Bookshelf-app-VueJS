<script>
import { v4 as uuidv4 } from 'uuid'
import { useInputStore } from '../../stores/input'
export default {
  name: 'InputText',
  props: {
    label: { type: String, default: '' },
    value: { type: String, required: true },
    labelOnTop: { type: Boolean, default: false },
  },
  emits: ['input'],
  data() {
    return {
      id: uuidv4(),
      inputStore: useInputStore(),
    }
  },
  mounted() {},
  watch: {},
  methods: {},
  computed: {},
}
</script>

<template>
  <label :for="id" :class="{ 'label-on-top': labelOnTop }">
    <span :style="inputStore.labelStyle(label)">
      {{ inputStore.fullLabel(label) }}
    </span>
    <input
      type="text"
      :id="id"
      :value="value"
      :style="inputStore.inputStyle(label, value, labelOnTop)"
      @input="(event) => $emit('input', event.target.value)"
    />
  </label>
</template>
