/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    accessToken: process.env.X_JIKE_ACCESS_TOKEN,
    deviceId: process.env.X_JIKE_DEVICE_ID,
    refreshToken: process.env.X_JIKE_REFRESH_TOKEN,
    tencentSecretId: process.env.TENCENT_SECRET_ID,
    tencentSecretKey: process.env.TENCENT_SECRET_KEY,
    provider: process.env.PROVIDER,
    openaiApi: process.env.OPENAI_API,
    openaiBaseUrl: process.env.OPENAI_BASE_URL,
    openaiModel: process.env.OPENAI_MODEL,
    groqApi: process.env.GROQ_API,
    groqBaseUrl: process.env.GROQ_BASE_URL,
    groqModel: process.env.GROQ_MODEL,
    doubaoApi: process.env.DOUBAO_API,
    doubaoBaseUrl: process.env.DOUBAO_BASE_URL,
    doubaoModel: process.env.DOUBAO_MODEL,
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
    'nuxt-security',
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

  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginOpenerPolicy: 'same-origin',
      contentSecurityPolicy: {
        'default-src': '\'self\'',
        'img-src': '\'self\' data: https: http:',
        'connect-src': '\'self\' ws: wss:',
        'script-src': '\'self\' \'unsafe-inline\' \'unsafe-eval\' https:',

      },

    },
  },

  compatibilityDate: '2024-07-13',
})
