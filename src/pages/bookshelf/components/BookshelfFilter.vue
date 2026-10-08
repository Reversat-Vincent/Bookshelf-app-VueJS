<script>
import { mapWritableState } from 'pinia'
import { useBookshelfStore } from '../../../stores/bookshelf'
export default {
  name: 'BookshelfFilter',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapWritableState(useBookshelfStore, ['filter', 'types']),
  },
}
</script>

<template>
  <div id="bookshelf-filter">
    <div>
      <input-select
        label="Type"
        :options="[{ label: 'All', value: 'all' }, ...types]"
        @change="(value) => (filter.type = value)"
        labelOnTop
      ></input-select>
      <input-checkbox
        label="Volume"
        :checked="filter.volume"
        indeterminate
        @change="(value) => (filter.volume = value)"
        labelOnTop
      ></input-checkbox>
    </div>
    <div>
      <app-btn icon="add" @click="this.$router.push({ name: 'book-add' })">
        <app-tooltip> Add </app-tooltip>
      </app-btn>
    </div>
  </div>
</template>

<style scoped>
#bookshelf-filter {
  grid-area: bookshelf-filter;
  grid-column: 1 / span 2;
  display: flex;
  & > *:first-child {
    flex: 1;
    display: flex;
    align-items: flex-start;
    column-gap: 1rem;
  }
}
</style>
