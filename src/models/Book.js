const types = ['manga', 'manhwa', 'novel']
export const maxRating = 5

export default class Book {
  constructor(data = {}) {
    // Given by the backend when the book is created
    this.id = data.id ?? null
    this.title = data.title ?? ''
    // Score in stars, from 1 to maxRating, or null if not rated
    this.rating = data.rating ?? null
    this.type = data.type ?? 'manhwa'
    this.chapter = data.chapter ?? null
    this.volume = data.volume ?? null
    this.parent = data.parent ?? null
  }

  // Books with the best score: shown first on the bookshelf, with a golden border
  getIsTop() {
    return this.rating === maxRating
  }

  getSlug() {
    return this.title.slugify()
  }

  validate() {
    const errors = []
    if (typeof this.title !== 'string' || !this.title.length) {
      errors.push('Title is required')
    } else if (!this.title.trim().length) {
      errors.push('Title cannot be empty')
    }
    if (
      this.rating != null &&
      !(Number.isInteger(this.rating) && this.rating >= 1 && this.rating <= maxRating)
    ) {
      errors.push(`Rating must be between 1 and ${maxRating} stars`)
    }
    if (!this.type) {
      errors.push('Type is required')
    } else if (!types.includes(this.type)) {
      errors.push(`${this.type} is not supported`)
    }
    if (this.chapter != null && !(this.chapter >= 1)) {
      errors.push('Chapter must be a positive number')
    }
    if (this.volume != null && !(this.volume >= 1)) {
      errors.push('Volume must be a positive number')
    }
    return errors
  }

  isSaveable(bookshelf) {
    const errors = []
    // Model validation
    errors.push(...this.validate())
    // Title is unique in bookshelf
    if (bookshelf.find((b) => b.id != this.id && b.getSlug() == this.getSlug()) !== undefined) {
      errors.push('Title (or similar) already exist')
    }
    // Errors
    return errors
  }

  isDeletable(bookshelf) {
    const errors = []
    // Related books
    if (bookshelf.filter((b) => b.parent == this.id).length) {
      errors.push('Book has related books')
    }
    // Errors
    return errors
  }

  // Data sent to the backend
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      rating: this.rating,
      type: this.type,
      chapter: this.chapter,
      volume: this.volume,
      parent: this.parent,
    }
  }
}
