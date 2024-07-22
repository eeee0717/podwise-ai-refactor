/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    accessToken: process.env.X_JIKE_ACCESS_TOKEN,
    deviceId: process.env.X_JIKE_DEVICE_ID,
    refreshToken: process.env.X_JIKE_REFRESH_TOKEN,
    tencentSecretId: process.env.TENCENT_SECRET_ID,
    tencentSecretKey: process.env.TENCENT_SECRET_KEY,
    openaiApi: process.env.OPENAI_API,
    openaiBaseUrl: process.env.OPENAI_BASE_URL,
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@pinia/nuxt',
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    routeRules: {
      '/*': {
        cors: true,
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },

  compatibilityDate: '2024-07-13',
})
