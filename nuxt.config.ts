// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
      ],
    },
  },
  routeRules: {
    '/about': { prerender: true },
    '/': { swr: true },
    '/catalog/**': { swr: 3600 },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/icon',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  fonts: {
    families: [
      { name: 'Jost', provider: 'google', weights: [400, 500, 600] },
    ],
  },
  icon: {
    mode: 'svg',
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons',
      },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "/assets/scss/mixins.scss" as *;
            `,
          silenceDeprecations: ['mixed-decls'],
        },
      },
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },
  nitro: {
    routeRules: {
      '/api/products': {
        cache: {
          maxAge: 3600
        }
      }
    }
  },
  runtimeConfig: {
    dbHost: process.env.NUXT_DB_HOST || '127.0.0.1',
    dbPort: Number(process.env.NUXT_DB_PORT || 3306),
    dbUser: process.env.NUXT_DB_USER || 'root',
    dbPassword: process.env.NUXT_DB_PASSWORD || '',
    dbName: process.env.NUXT_DB_NAME || 'nuxt_shop',
    jwtSecret: process.env.NUXT_JWT_SECRET || 'dev-jwt-secret-change-me',
    public: {
      imageUrl: process.env.NUXT_PUBLIC_IMAGEURL,
    },
  },
  devServer: {
    port: 3020,
    host: '127.0.0.1',
  },
})
