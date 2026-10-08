import Book from '../models/Book.js'
import books from '../api/books'
import { defineStore, acceptHMRUpdate } from 'pinia'

// Pages display failures as a list of messages
function errorMessages(err) {
  return Array.isArray(err) ? err : [err.message]
}

export const useBookshelfStore = defineStore('bookshelf', {
  state: () => ({
    bookshelf: [],
    bookshelfLoadingError: false,
    filter: {
      type: 'all',
      volume: false,
    },
    book: null,
    bookLoadingError: false,
    types: [
      { label: 'Manga', value: 'manga' },
      { label: 'Manhwa', value: 'manhwa' },
      { label: 'Novel', value: 'novel' },
    ],
  }),
  actions: {
    loadBookshelf() {
      console.start('bookshelf')
      this.bookshelfLoadingError = false
      this.resetBookshelf()
      return books
        .list()
        .then((data) => {
          this.bookshelf = data.map((b) => new Book(b))
          this.sortBookshelf()
          console.l(`Bookshelf : loaded in ${console.stop('bookshelf')}ms`)
          return this.bookshelf
        })
        .catch((err) => {
          this.bookshelfLoadingError = true
          console.stop('bookshelf')
          console.l(`Bookshelf : loading failed`)
          return Promise.reject(err)
        })
    },
    sortBookshelf() {
      this.bookshelf.sort((a, b) => a.title.localeCompare(b.title))
      this.bookshelf.sort((a, b) => (a.getIsTop() === b.getIsTop() ? 0 : a.getIsTop() ? -1 : 1))
    },
    findBookOnBookshelf(id) {
      return this.bookshelf.find((b) => b.id == id)
    },
    findRelatedBooksOnBookshelf(id) {
      return this.bookshelf.filter((b) => b.parent == id)
    },
    resetBookshelf() {
      this.bookshelf = []
    },
    loadBook(id) {
      console.start('book')
      this.bookLoadingError = false
      this.resetBook()
      if (!id) {
        this.book = new Book()
        this.book.childs = []
        return Promise.resolve(this.book)
      }
      return this.loadBookshelf()
        .then(() => {
          const loading = this.findBookOnBookshelf(id)
          if (loading === undefined) {
            return Promise.reject(new Error('Book not found'))
          }
          this.book = loading
          this.book.childs = this.findRelatedBooksOnBookshelf(this.book.id)
          for (let i = 0; i < this.book.childs.length; i++) {
            const child = this.book.childs[i]
            child.childs = this.findRelatedBooksOnBookshelf(child.id)
            this.book.childs[i] = child
          }
          console.l(`Book : loaded in ${console.stop('book')}ms`)
          return this.book
        })
        .catch((err) => {
          this.bookLoadingError = true
          console.stop('book')
          console.l(`Book : loading failed`)
          return Promise.reject(err)
        })
    },
    addChildToBook() {
      if (this.book != null && Array.isArray(this.book.childs)) {
        this.book.childs.push(new Book())
      }
    },
    delChildToBook(child) {
      this.book.childs = this.book.childs.filter((c) => c != child)
    },
    saveBook(book) {
      console.start('book')
      return this.loadBookshelf()
        .then(async () => {
          const parent = new Book(book)
          const childs = book.childs.map((c) => new Book(c))
          const errors = []
          errors.push(...parent.isSaveable(this.bookshelf))
          childs.forEach((b) => {
            errors.push(...b.isSaveable(this.bookshelf))
          })
          if (errors.length) {
            return Promise.reject(errors)
          }
          // Book
          const saved =
            parent.id == null ? await books.create(parent) : await books.update(parent.id, parent)
          // Related books removed from the form
          const keptIds = childs.map((c) => c.id).filter((id) => id != null)
          for (const previousChild of this.findRelatedBooksOnBookshelf(saved.id)) {
            if (!keptIds.includes(previousChild.id)) await books.remove(previousChild.id)
          }
          // Related books
          for (const child of childs) {
            child.parent = saved.id
            if (child.id == null) await books.create(child)
            else await books.update(child.id, child)
          }
          console.l(`Book : saved in ${console.stop('book')}ms`)
        })
        .catch((err) => {
          console.stop('book')
          console.l(`Book : saving failed`)
          return Promise.reject(errorMessages(err))
        })
    },
    delBook(book) {
      console.start('book')
      return this.loadBookshelf()
        .then(() => {
          const errors = new Book(book).isDeletable(this.bookshelf)
          if (errors.length) {
            return Promise.reject(errors)
          }
          return books.remove(book.id)
        })
        .then(() => {
          console.l(`Book : deleted in ${console.stop('book')}ms`)
        })
        .catch((err) => {
          console.stop('book')
          console.l(`Book : deleting failed`)
          return Promise.reject(errorMessages(err))
        })
    },
    resetBook() {
      this.book = null
    },
  },
  getters: {
    filteredBookshelf() {
      return this.bookshelf.filter(
        (book) =>
          (this.filter.type == 'all' || book.type == this.filter.type) &&
          (this.filter.volume === true
            ? book.volume != null
            : this.filter.volume === null
              ? book.volume == null
              : true),
      )
    },
    index() {
      let data = this.filteredBookshelf.map(function (item) {
        return item.getIsTop() == true ? '&starf;' : item.title.first().toUpperCase()
      })
      // Create object to store occurrences of each item
      const occurrences = {}
      data.forEach((element) => {
        occurrences[element] = (occurrences[element] || 0) + 1
      })
      let cumulativeValue = 0
      // Calculate frequency of each element
      for (let key in occurrences) {
        cumulativeValue += (occurrences[key] / data.length) * 100
        occurrences[key] = cumulativeValue.toFixed(2)
      }
      // Return list index
      return occurrences
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookshelfStore, import.meta.hot))
}
