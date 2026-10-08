<script>
import BookForm from './components/BookForm.vue'
import { mapState, mapWritableState } from 'pinia'
import { useBookshelfStore } from '../../stores/bookshelf'
export default {
  name: 'BookView',
  components: {
    BookForm,
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  created() {
    // A failure is shown with bookLoadingError
    useBookshelfStore()
      .loadBook(this.id)
      .catch(() => {})
  },
  watch: {
    book() {
      if (this.$route.params.id !== undefined) {
        this.$emit('update-title', `Book : ${this.book ? this.book.title : ''}`)
      }
    },
  },
  methods: {
    addChildToBook() {
      useBookshelfStore().addChildToBook()
    },
    delChildToBook(child) {
      useBookshelfStore().delChildToBook(child)
    },
    saveBook(book) {
      useBookshelfStore()
        .saveBook(book)
        .then(() => {
          this.$q.notify({
            type: 'success',
            message: 'Successfully saved',
          })
          useBookshelfStore().resetBook()
          useBookshelfStore().router.push({ name: 'bookshelf' })
        })
        .catch((errors) => {
          errors.forEach((error) => {
            this.$q.notify({
              type: 'error',
              message: error,
            })
          })
        })
    },
    delBook(book) {
      useBookshelfStore()
        .delBook(book)
        .then(() => {
          this.$q.notify({
            type: 'success',
            message: 'Successfully deleted',
          })
          useBookshelfStore().resetBook()
          useBookshelfStore().router.push({ name: 'bookshelf' })
        })
        .catch((errors) => {
          errors.forEach((error) => {
            this.$q.notify({
              type: 'error',
              message: error,
            })
          })
        })
    },
  },
  computed: {
    ...mapState(useBookshelfStore, ['bookLoadingError']),
    ...mapWritableState(useBookshelfStore, ['book']),
  },
}
</script>

<template>
  <template v-if="book != null">
    <section id="book">
      <div id="book-tools">
        <app-btn icon="book" :to="{ name: 'bookshelf' }">
          <app-tooltip> Bookshelf </app-tooltip>
        </app-btn>
        <app-btn
          v-if="book.parent != null"
          icon="arrow_back"
          :to="{ name: 'book', params: { id: book.parent } }"
        >
          <app-tooltip> Relative </app-tooltip>
        </app-btn>
        <app-btn icon="refresh" @click="$router.reload()">
          <app-tooltip> Reset </app-tooltip>
        </app-btn>
        <app-btn icon="save" @click="saveBook(book)">
          <app-tooltip> Save </app-tooltip>
        </app-btn>
      </div>
      <BookForm
        :book="book"
        :key="book.id"
        @update="(form) => Object.assign(book, form)"
        @delChildToBook="delBook"
      ></BookForm>
      <div id="book-related">
        <div>
          <h2>Related</h2>
          <app-btn icon="add" @click="addChildToBook()">
            <app-tooltip> Add </app-tooltip>
          </app-btn>
        </div>
        <BookForm
          :book="related"
          v-for="related in book.childs"
          :key="related.id"
          @update="(form) => Object.assign(related, form)"
          @delChildToBook="delChildToBook"
          :optionalTools="['open']"
        ></BookForm>
      </div>
    </section>
  </template>
  <app-error v-else-if="bookLoadingError">
    <app-btn icon="refresh" @click="this.$router.reload()"></app-btn>
    <app-btn icon="home" @click="this.$router.push({ name: 'bookshelf' })"></app-btn>
  </app-error>
  <app-loading v-else></app-loading>
</template>

<style scoped>
#book {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  #book-tools {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
  }
  #book-related {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    & > *:first-child {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
}
</style>
