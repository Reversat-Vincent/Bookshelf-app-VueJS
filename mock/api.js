import fs from 'node:fs'
import path from 'node:path'

/**
 * Fake backend for `npm run dev:mock`, until the real backend exists.
 * Implements the API described in README.md with the books of data/bookshelf.json
 * and the covers of data/book/. Data stays in memory: changes are lost on restart.
 */

const contentTypes = {
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

export default function mockApi({ base, dataDir }) {
  const coverDir = path.join(dataDir, 'book')
  const legacy = JSON.parse(fs.readFileSync(path.join(dataDir, 'bookshelf.json'), 'utf8'))

  // The legacy file uses title slugs as ids: give each book a numeric id like a database would
  const ids = new Map(legacy.map((book, index) => [book.id, index + 1]))
  const covers = new Map(legacy.map((book) => [ids.get(book.id), book.id]))
  // It also has isTop instead of a rating: top books get the best score (5 stars)
  const books = legacy.map(({ isTop, ...book }) => ({
    ...book,
    id: ids.get(book.id),
    parent: ids.get(book.parent) ?? null,
    rating: book.rating ?? (isTop ? 5 : null),
  }))
  let nextId = books.length + 1

  function send(res, status, data) {
    res.statusCode = status
    if (data === undefined) return res.end()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  async function readBody(req) {
    let body = ''
    for await (const chunk of req) body += chunk
    return JSON.parse(body || '{}')
  }

  function sendCover(res, id) {
    const slug = covers.get(id)
    const file = slug && fs.readdirSync(coverDir).find((item) => item.startsWith(`${slug}.`))
    if (!file) return send(res, 404, { error: 'Cover not found' })
    res.setHeader('Content-Type', contentTypes[path.extname(file).toLowerCase()] ?? 'image/*')
    fs.createReadStream(path.join(coverDir, file)).pipe(res)
  }

  async function handle(req, res) {
    const [resource, rawId, sub] = new URL(req.url, 'http://mock').pathname
      .split('/')
      .filter(Boolean)

    if (resource === 'ping' && req.method === 'GET') return send(res, 200, { status: 'ok' })
    if (resource !== 'books') return send(res, 404, { error: 'Not found' })

    // /books
    if (rawId === undefined) {
      if (req.method === 'GET') return send(res, 200, books)
      if (req.method === 'POST') {
        const book = { ...(await readBody(req)), id: nextId++ }
        books.push(book)
        return send(res, 201, book)
      }
      return send(res, 405, { error: 'Method not allowed' })
    }

    // /books/:id and /books/:id/cover
    const id = Number(rawId)
    const index = books.findIndex((book) => book.id === id)
    if (index === -1) return send(res, 404, { error: 'Book not found' })
    if (sub === 'cover' && req.method === 'GET') return sendCover(res, id)
    if (sub !== undefined) return send(res, 404, { error: 'Not found' })
    if (req.method === 'GET') return send(res, 200, books[index])
    if (req.method === 'PUT') {
      books[index] = { ...(await readBody(req)), id }
      return send(res, 200, books[index])
    }
    if (req.method === 'DELETE') {
      if (books.some((book) => book.parent === id)) {
        return send(res, 409, { error: 'Book has related books' })
      }
      books.splice(index, 1)
      return send(res, 204)
    }
    return send(res, 405, { error: 'Method not allowed' })
  }

  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use(base, (req, res) => {
        handle(req, res).catch((err) => send(res, 400, { error: err.message }))
      })
    },
  }
}
