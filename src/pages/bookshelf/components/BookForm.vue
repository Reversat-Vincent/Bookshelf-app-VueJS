<script>
import BookFormTools from './BookFormTools.vue'
import books from '../../../api/books'
import { mapState } from 'pinia'
import { useBookshelfStore } from '../../../stores/bookshelf'
export default {
  name: 'BookForm',
  components: {
    BookFormTools,
  },
  props: {
    book: { required: true, type: Object },
    optionalTools: { default: () => [], type: Array },
  },
  emits: ['update', 'delChildToBook'],
  data() {
    return {
      imageLoadingError: false,
      form: {
        id: this.book.id,
        title: this.book.title,
        type: this.book.type,
        rating: this.book.rating,
        volume: this.book.volume,
        chapter: this.book.chapter,
      },
      formToolsWidth: 0,
    }
  },
  mounted() {},
  watch: {
    form: {
      handler() {
        this.$emit('update', this.form)
      },
      deep: true,
    },
  },
  methods: {
    coverUrl: books.coverUrl,
  },
  computed: {
    ...mapState(useBookshelfStore, ['types']),
    hasFormTools() {
      return this.formToolsWidth > 0 ? 1 : 0
    },
  },
}
</script>

<template>
  <div class="book-form">
    <div class="book-data">
      <div class="book-images">
        <div
          v-if="form.id != null"
          class="book-image"
          :class="{ 'book-image-error': imageLoadingError }"
        >
          <img-loader
            :src="coverUrl(form.id)"
            dialog
            @error="imageLoadingError = true"
          ></img-loader>
        </div>
      </div>
      <div class="book-infos">
        <input-text
          label="Title"
          :value="form.title"
          @input="(value) => (form.title = value)"
        ></input-text>
        <input-select
          label="Type"
          :options="types"
          :selected="form.type"
          @change="(value) => (form.type = value)"
        ></input-select>
        <input-rating
          label="Rating"
          :value="form.rating"
          @change="(value) => (form.rating = value)"
        ></input-rating>
        <input-number
          label="Volume"
          :value="form.volume"
          @input="(value) => (form.volume = value)"
        ></input-number>
        <input-number
          label="Chapter"
          :value="form.chapter"
          @input="(value) => (form.chapter = value)"
        ></input-number>
      </div>
    </div>
    <BookFormTools
      :book="book"
      :optionalTools="optionalTools"
      @delChildToBook="$emit('delChildToBook', $event)"
      @vue:mounted="
        ($event) => {
          formToolsWidth = $event.el.clientWidth
        }
      "
    />
  </div>
</template>

<style scoped>
.book-form {
  position: relative;
  display: flex;
  border-radius: var(--br);
  .book-data {
    display: flex;
    gap: 1rem;
    flex: 1;
    transition: padding-right 0.2s ease;
    .book-images {
      width: 30%;
      max-width: 10rem;
      .book-image {
        border: 0.15rem dashed var(--q-black-1);
        border-radius: var(--br);
        padding: 0.15rem;
      }
      .book-image-error {
        aspect-ratio: 1/1;
      }
    }
    .book-infos {
      flex: 1;
      overflow: auto;
      &:hover {
        padding-right: calc(1px * v-bind(formToolsWidth) + 1rem * v-bind(hasFormTools));
      }
    }
  }
  .book-tools {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  &:hover {
    & .book-tools {
      pointer-events: auto;
      opacity: 1;
    }
  }
}
</style>
