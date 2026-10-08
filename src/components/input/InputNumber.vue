<script>
import { v4 as uuidv4 } from 'uuid'
import { useInputStore } from '../../stores/input'
export default {
  name: 'InputNumber',
  props: {
    type: { type: String, default: 'text' },
    label: { type: String, default: '' },
    value: { type: Number },
    min: { type: Number, default: 0 },
    float: { type: Boolean, default: false },
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
      type="number"
      :id="id"
      :value="value"
      :min="min"
      :style="inputStore.inputStyle(label, value, labelOnTop)"
      @input="
        (event) =>
          $emit(
            'input',
            event.target.value.length
              ? float
                ? parseFloat(event.target.value)
                : parseInt(event.target.value)
              : null,
          )
      "
    />
  </label>
</template>
