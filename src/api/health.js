import http from './http'

export default {
  ping: () => http.get('/ping'),
}
