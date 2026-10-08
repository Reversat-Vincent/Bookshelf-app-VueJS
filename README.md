# Bookshelf app (bookshelf-app)

Bookshelf app: a Quasar app (Vue.js 3, Vue Router, Pinia), for the browser or as an Electron desktop app, that talks to a backend API.
Since the backend API doesn't exist yet, we currently use a mock API.

## Install the dependencies

```bash
npm install
```

The Electron desktop app has its own dependencies (Electron and its packager) in `src-electron/package.json`: Quasar installs them the first time the app is started or built as an Electron app.

### Start the app in development mode

```bash
npm run dev:mock
# or, as an Electron desktop app
npm run dev:mock:electron
```

The mock API (`mock/api.js`) serves the test data of `data/` and keeps changes in memory only: they are lost when the dev server restarts.

### Lint the files

```bash
npm run lint
```

### Format the files

```bash
npm run format
```

### Build the app for production (still untested)

```bash
quasar build
# or, as an Electron desktop app
quasar build -m electron
```

The mock API only runs in development mode: a production build needs the backend.

## API

The frontend expects these endpoints:

| Method   | Path               | Body   | Response                    |
| -------- | ------------------ | ------ | --------------------------- |
| `GET`    | `/ping`            |        | `{ "status": "ok" }`        |
| `GET`    | `/books`           |        | `Book[]`                    |
| `GET`    | `/books/:id`       |        | `Book`                      |
| `POST`   | `/books`           | `Book` | created `Book`, with its id |
| `PUT`    | `/books/:id`       | `Book` | updated `Book`              |
| `DELETE` | `/books/:id`       |        | `204 No Content`            |
| `GET`    | `/books/:id/cover` |        | cover image (any format)    |

```json
{
  "id": "solo-leveling",
  "title": "Solo Leveling",
  "type": "manhwa",
  "rating": 5,
  "chapter": 179,
  "volume": null,
  "parent": null
}
```

## Test data (`data/*`)

- Bookshelf DB: `data/bookshelf.json`
- Book covers: `data/book/*`
