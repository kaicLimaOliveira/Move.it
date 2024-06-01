// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  css: [
		'~/assets/css/global.css',
		'~/assets/css/components.css',
	],
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
