// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import mockApi from './mock/api.js'

export default defineConfig((ctx) => {
  // Same .env files as the app (Vite mode), see .env.example
  const env = loadEnv(
    ctx.dev ? 'development' : 'production',
    fileURLToPath(new URL('.', import.meta.url)),
    '',
  )

  // Base URL of the backend API, as seen by the app
  const apiUrl = (env.VITE_API_URL || '/api').replace(/\/+$/, '')

  // Backend that a relative apiUrl is forwarded to, by the dev server and by the packaged Electron app.
  // 127.0.0.1, not localhost: Node may resolve localhost to IPv6 (::1),
  // while the backend listens on IPv4 (0.0.0.0)
  const apiProxyTarget = (env.API_PROXY_TARGET || 'http://127.0.0.1:3000').replace(/\/+$/, '')

  // `npm run dev:mock` answers the API from ./data instead of forwarding it to the backend
  const mock = ctx.dev && process.argv.includes('--mock')

  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['prototype', 'i18n', 'components', 'properties', 'notify', 'profiling', 'log'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: ['app.css'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      vueOptionsAPI: true, // the app uses the Options API (off by default since Quasar CLI 3)

      // Only the env vars with this prefix reach the app, as import.meta.env.VITE_* (see .env.example)
      env: { clientPrefix: 'VITE_' },

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
            // compositionOnly: false,

            // if you want to use named tokens in your Vue I18n messages, such as 'Hello {name}',
            // you need to set `runtimeOnly: false`
            // runtimeOnly: false,

            ssr: ctx.modeName === 'ssr',

            // you need to set i18n resource including paths !
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],
        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand:
                'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}" "./mock/**/*.js"',
              useFlatConfig: true,
            },
          },
          { server: true },
        ],
        mock && [
          mockApi,
          { base: apiUrl, dataDir: fileURLToPath(new URL('./data', import.meta.url)) },
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#devserver
    devServer: {
      // https: true,
      open: false, // opens browser window automatically

      // Forward /api/* to the backend during development, so the backend needs no CORS
      proxy:
        mock || !apiUrl.startsWith('/')
          ? undefined
          : {
              [`${apiUrl}/`]: {
                target: apiProxyTarget,
                changeOrigin: true,
                rewrite: (path) => path.slice(apiUrl.length),
                // Backend not started: answer like the API instead of an empty error 500
                configure: (proxy) => {
                  proxy.on('error', (err, req, res) => {
                    if ('writeHead' in res && !res.headersSent) {
                      res.writeHead(502, { 'Content-Type': 'application/json' })
                      res.end(JSON.stringify({ error: 'API unreachable' }))
                    }
                  })
                },
              },
            },
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework
    framework: {
      config: {
        dark: true,
        brand: {
          primary: '#3f51b5',
          secondary: '#ffc107',
          // secondary: '#ffeb3b',
          success: '#4caf50',
          error: '#f44336',
          white: '#fafafa',
          'black-1': '#1e2124',
          'black-2': '#282b30',
          'black-3': '#36393e',
          'black-4': '#424549',
          'black-5': '#4A4C51',
        },
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['AddressbarColor', 'Dialog', 'Notify'],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: 'all',

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
    //   pwaServiceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    //   bexManifestFile: 'src-bex/manifest.json
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],

      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      pwa: false,
      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!

      // pwaExtendGenerateSWOptions (cfg) {},
      // pwaExtendInjectManifestOptions (cfg) {}
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      // swFilename: 'sw.js',
      // manifestFilename: 'manifest.json'
      // extendManifestJson (json) {},
      // useCredentialsForManifestTag: true,
      // injectPwaMetaTags: false,
      // extendPWACustomSWConf (esbuildConf) {},
      // extendGenerateSWOptions (cfg) {},
      // extendInjectManifestOptions (cfg) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // The packaged app forwards the API calls itself (see src-electron/electron-main.js)
      extendElectronMainConf(rolldownConf) {
        const { define } = rolldownConf.transform
        define['process.env.API_URL'] = JSON.stringify(apiUrl)
        define['process.env.API_PROXY_TARGET'] = JSON.stringify(apiProxyTarget)
      },
      // extendElectronPreloadConf (rolldownConf) {},

      // extendPackageJson (json) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: ['electron-preload'],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'bookshelf-app',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: [],
    },
  }
})
