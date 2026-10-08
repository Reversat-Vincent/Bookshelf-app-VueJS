<script>
import { v4 as uuidv4 } from 'uuid'
import { useInputStore } from '../../stores/input'
export default {
  name: 'InputSelect',
  props: {
    label: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    selected: { type: String, default: null },
    labelOnTop: { type: Boolean, default: false },
  },
  emits: ['change'],
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
    <select
      :id="id"
      :style="inputStore.selectStyle(label, options, labelOnTop)"
      @change="(event) => $emit('change', event.target.value)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :selected="option.value == (selected ? selected : '')"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
