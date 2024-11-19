// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: [
    '~/assets/css/main.scss',
    'vue-final-modal/style.css'
  ],
  runtimeConfig: {
    public: {
      API_BASEURL: process.env.API_BASEURL
    }
  },
  sanctum: {
    baseUrl: process.env.API_BASEURL ? process.env.API_BASEURL : 'http://localhost:8000/v1',
    mode: 'token',
    endpoints: {
      login: '/auth/login/admin',
      logout: '/auth/logout',
      user: '/user'
    }
  },
  modules: ['@vueuse/nuxt', 'nuxt-auth-sanctum'],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})