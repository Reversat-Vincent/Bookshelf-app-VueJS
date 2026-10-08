<script>
import BookshelfFilter from './components/BookshelfFilter.vue'
import BookCard from './components/BookCard.vue'
import { mapState, mapWritableState } from 'pinia'
import { useBookshelfStore } from '../../stores/bookshelf'
export default {
  name: 'BookshelfPage',
  components: {
    BookshelfFilter,
    BookCard,
  },
  data() {
    return {
      scrollPercentage: 0,
    }
  },
  mounted() {
    this.loadBookshelf()
  },
  watch: {
    filteredBookshelf() {
      this.$emit(
        'update-title',
        `Bookshelf (${this.filteredBookshelf.length}/${this.bookshelf.length})`,
      )
    },
  },
  methods: {
    loadBookshelf() {
      // A failure is shown with bookshelfLoadingError
      useBookshelfStore()
        .loadBookshelf()
        .catch(() => {})
    },
    scrollProgress(event) {
      this.scrollPercentage =
        Math.floor(
          (event.verticalPosition / (this.$refs.items.scrollHeight - event.verticalSize)) * 10000,
        ) / 100
    },
    scrollTo(key) {
      // Get index position of key
      const index = Object.keys(this.index).findIndex((item) => item === key)
      // Get value of previous index or 0 if first index
      const progress = index > 0 ? Object.values(this.index)[index - 1] : 0
      // Scroll to clicked item in index
      this.$refs.list.getScrollTarget().scrollTo({
        top: this.$refs.items.scrollHeight * (progress / 100),
        behavior: 'smooth',
      })
    },
  },
  computed: {
    ...mapState(useBookshelfStore, [
      'bookshelf',
      'filteredBookshelf',
      'index',
      'bookshelfLoadingError',
    ]),
    ...mapWritableState(useBookshelfStore, ['filter']),
    step() {
      return Object.values(this.index).filter((value) => {
        return value < this.scrollPercentage
      }).length
    },
  },
}
</script>

<template>
  <section id="bookshelf">
    <BookshelfFilter />
    <q-scroll-area
      id="bookshelf-list"
      ref="list"
      v-if="this.filteredBookshelf.length"
      @scroll="scrollProgress($event)"
      :style="{ 'border-top': '1px solid var(--q-white)' }"
    >
      <div id="bookshelf-items" ref="items">
        <BookCard v-for="book in this.filteredBookshelf" :key="book.id" :book="book"></BookCard>
      </div>
    </q-scroll-area>
    <app-error v-else-if="bookshelfLoadingError" id="bookshelf-error">
      <app-btn icon="refresh" @click="loadBookshelf()"></app-btn>
    </app-error>
    <div id="bookshelf-index">
      <nav id="bookshelf-index-nav">
        <div
          v-for="(progress, item) in this.index"
          :key="item"
          @click="scrollTo(item)"
          v-html="item"
        ></div>
        <div id="bookshelf-index-cursor"></div>
      </nav>
    </div>
  </section>
</template>

<style scoped>
#bookshelf {
  display: grid;
  grid-template-areas: 'bookshelf-filter bookshelf-filter' 'bookshelf-list bookshelf-index';
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  gap: 1rem;
  height: 100%;
}

/* List */
#bookshelf-list {
  grid-area: bookshelf-list;
}

#bookshelf-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12ch, 1fr));
  grid-template-rows: auto;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

#bookshelf-error {
  grid-area: bookshelf-list;
}

/* Index */
#bookshelf-index {
  grid-area: bookshelf-index;
  display: flex;
  align-items: center;
  & > #bookshelf-index-nav {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--q-black-1);
    border-radius: var(--br);
    padding: 0.5rem 0;
    & > div:not(#bookshelf-index-cursor) {
      display: flex;
      justify-content: center;
      z-index: 1;
      height: 1.25rem;
      width: 2rem;
      margin-left: -0.5rem;
      margin-right: -0.5rem;
    }
    & > #bookshelf-index-cursor {
      position: absolute;
      top: calc(0.5rem + 1px + v-bind(step) * 1.25rem);
      left: -1px;
      height: 1rem;
      width: 1rem;
      border-left: 2px solid var(--q-secondary);
      border-bottom: 2px solid var(--q-secondary);
      border-radius: var(--br-c);
    }
  }
}
</style>
