<script>
import { v4 as uuidv4 } from 'uuid'
import { useInputStore } from '../../stores/input'
export default {
  name: 'InputRating',
  props: {
    label: { type: String, default: '' },
    value: { type: Number },
    max: { type: Number, default: 5 },
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
  <label :class="{ 'label-on-top': labelOnTop }">
    <span :id="id" :style="inputStore.labelStyle(label)">
      {{ inputStore.fullLabel(label) }}
    </span>
    <!-- A click on the selected star clears the score (0), emitted as null -->
    <q-rating
      :aria-labelledby="id"
      :model-value="value ?? 0"
      :max="max"
      size="1.5rem"
      color="secondary"
      icon="star_border"
      icon-selected="star"
      :icon-aria-label="label"
      @update:model-value="(rating) => $emit('change', rating || null)"
    />
  </label>
</template>
