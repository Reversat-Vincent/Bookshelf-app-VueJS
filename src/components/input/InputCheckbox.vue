<script>
import { v4 as uuidv4 } from 'uuid'
import { useInputStore } from '../../stores/input'
export default {
  name: 'InputCheckbox',
  props: {
    label: { type: String, default: '' },
    checked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    labelOnTop: { type: Boolean, default: false },
  },
  emits: ['change'],
  data() {
    return {
      id: uuidv4(),
      inputStore: useInputStore(),
      value: 0,
      values: [false, null, true],
    }
  },
  mounted() {
    this.value = this.values.indexOf(this.checked)
  },
  watch: {
    value() {
      this.$emit('change', this.values[this.value])
    },
  },
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
      type="checkbox"
      :id="id"
      :checked="value ? true : false"
      :indeterminate="value == 1 ? true : false"
      @change="() => (indeterminate ? (value = value ? value - 1 : 2) : (value = value ? 0 : 2))"
    />
  </label>
</template>
