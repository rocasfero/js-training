export default {
  mode: 'spa',
  srcDir: 'nuxt',
  head: {
    title: 'Todo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Todo管理するやつ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css' }
    ],
    script: [
      { src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js' }
    ]
  },
  css: [],
  modules: ['@nuxtjs/axios'],
  serverMiddleware: [
    { path: '/api', handler: '~~/api' }
  ]
};