import client from './plugins/contentful';
require('dotenv').config();

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-blog-contentful',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/contentful'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/dotenv', '@nuxtjs/markdownit'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  loading: { color: '#3B8070' },

  build: {
  },

  markdownit: {
    injected: true
  },

  generate: {
    routes () {
      return client.getEntries({ content_type: 'title' }).then(entries => {
        return entries.items.map(entry => {
          console.log(entry)
          return {
            route: entry.fields.slug,
            payload: entry
          }
        })
      })
    }
  },


}
