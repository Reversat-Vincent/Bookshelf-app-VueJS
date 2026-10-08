<script>
import books from '../../../api/books'
import { maxRating } from '../../../models/Book.js'
export default {
  name: 'BookCard',
  props: {
    book: { required: true, type: Object },
  },
  data() {
    return {
      isOpen: false,
      maxRating,
    }
  },
  mounted() {},
  watch: {},
  methods: {
    coverUrl: books.coverUrl,
  },
  computed: {
    updateId() {
      return this.book.parent == null ? this.book.id : this.book.id
    },
  },
}
</script>

<template>
  <RouterLink v-if="book.id" :to="{ name: 'book', params: { id: updateId } }">
    <div :id="book.id" class="book-card" :class="{ 'book-card-top': book.getIsTop() }">
      <div class="book-card-img">
        <img-loader :src="coverUrl(book.id)">
          <div v-if="book.rating" class="book-card-rating">
            <q-badge role="img" :aria-label="`Rating : ${book.rating}/${maxRating}`">
              <q-icon
                v-for="star in maxRating"
                :key="star"
                :name="star <= book.rating ? 'star' : 'star_border'"
                color="secondary"
              />
            </q-badge>
          </div>
          <div class="book-card-tags">
            <q-badge v-if="book.type">{{ book.type.capitalize() }}</q-badge>
            <q-badge v-if="book.volume">Volume : {{ book.volume }}</q-badge>
            <q-badge v-if="book.chapter">Chapter : {{ book.chapter }}</q-badge>
          </div>
        </img-loader>
      </div>
      <div class="book-card-body">
        <span>{{ book.title }}</span>
      </div>
      <app-tooltip>
        {{ book.title }}
      </app-tooltip>
    </div>
  </RouterLink>
</template>

<style scoped>
.book-card {
  display: grid;
  aspect-ratio: 0.6;
  grid-template-rows: 1fr auto;
  height: 100%;
  border: 2px solid var(--q-black-1);
  border-radius: var(--br);
  .book-card-img {
    position: relative;
    overflow: hidden;
    border-top-left-radius: calc(0.5rem - 1px);
    border-top-right-radius: calc(0.5rem - 1px);
    .book-card-rating {
      position: absolute;
      top: 0.2rem;
      right: 0;
      padding: 0;
      background: transparent;
      opacity: 0;
      transition: opacity 0.2s ease;
      & > .q-badge {
        font-size: var(--fs-m);
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .book-card-tags {
      position: absolute;
      bottom: 0.2rem;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.2rem;
      padding: 0;
      background: transparent;
      & > .q-badge {
        font-size: var(--fs-s);
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
  .book-card-body {
    width: 100%;
    padding: 0.5rem;
    & > * {
      overflow: hidden;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  &:hover {
    & .book-card-rating {
      opacity: 1;
    }
  }
}
.book-card-top {
  border-color: var(--q-secondary);
}
</style>
