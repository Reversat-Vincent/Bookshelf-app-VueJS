import http, { apiUrl } from './http'

const bookPath = (id) => `/books/${encodeURIComponent(id)}`

export default {
  list: () => http.get('/books'),
  get: (id) => http.get(bookPath(id)),
  create: (book) => http.post('/books', book),
  update: (id, book) => http.put(bookPath(id), book),
  remove: (id) => http.delete(bookPath(id)),
  coverUrl: (id) => apiUrl(`${bookPath(id)}/cover`),
}
