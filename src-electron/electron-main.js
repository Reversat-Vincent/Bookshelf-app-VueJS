import { app, BrowserWindow, net, protocol } from 'electron'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolveElectronAssetsPath } from '#q-app/electron/main'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

const currentDir = fileURLToPath(new URL('.', import.meta.url))

// Base URL of the backend API as seen by the app, and the backend it is forwarded to,
// set at build time (see quasar.config.js > electron > extendElectronMainConf)
const apiUrl = process.env.API_URL
const apiProxyTarget = process.env.API_PROXY_TARGET

// The packaged app is served from app://bookshelf-app/ instead of file://, so that its API calls
// (to a path like /api) stay on its own origin and can be forwarded to the backend
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true },
  },
])

function serveApp() {
  protocol.handle('app', (request) => {
    const { pathname, search } = new URL(request.url)

    // API: forwarded to the backend, like the dev server does, so the backend needs no CORS
    if (apiUrl.startsWith('/') && pathname.startsWith(`${apiUrl}/`)) {
      return net
        .fetch(`${apiProxyTarget}${pathname.slice(apiUrl.length)}${search}`, {
          method: request.method,
          headers: request.headers,
          body: request.body,
          duplex: 'half',
        })
        .catch(() => Response.json({ error: 'API unreachable' }, { status: 502 }))
    }

    // Files of the app, never outside of its folder
    const file = path.join(currentDir, decodeURIComponent(pathname))
    const relative = path.relative(currentDir, file)
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      return new Response(null, { status: 404 })
    }
    return net
      .fetch(pathToFileURL(file).toString())
      .catch(() => new Response(null, { status: 404 }))
  })
}

let mainWindow

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: resolveElectronAssetsPath('icons/icon.png'), // tray icon
    width: 1000,
    height: 800,
    useContentSize: true,
    webPreferences: {
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      // (compiled to CommonJS, next to this file)
      preload: path.join(currentDir, 'electron-preload.cjs'),
    },
  })

  if (import.meta.env.QUASAR_DEV) {
    mainWindow.loadURL(import.meta.env.QUASAR_APP_URL)
  } else {
    mainWindow.loadURL('app://bookshelf-app/index.html')
  }

  if (import.meta.env.QUASAR_DEBUG) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    // mainWindow.webContents.on('devtools-opened', () => {
    //   mainWindow.webContents.closeDevTools()
    // })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  serveApp()
  createWindow()
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
