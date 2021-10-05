export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/cloudmap/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '農田水利灌溉管理整合雲系統',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/sliderbar.js', mode: 'client' },
    { src: '~/plugins/paginate.js', mode: 'client' },
    { src: '~/plugins/dragbox.js', mode: 'client' }

    // { src: '~/plugins/Base.js', mode: 'client' },
    // { src: '~/plugins/OperationBase.js', mode: 'client' },
    // { src: '~/plugins/SuperGeoUtility.js', mode: 'client' },
    // { src: '~/plugins/AjaxAgent.js', mode: 'client' },
    // { src: '~/plugins/Framework.js', mode: 'client' },
    // { src: '~/plugins/MapBase.js', mode: 'client' },
    // { src: '~/plugins/Controls.js', mode: 'client' },
    // { src: '~/plugins/MapLayer.js', mode: 'client' },
    // { src: '~/plugins/Navigate.js', mode: 'client' },
    // { src: '~/plugins/CachedLayer.js', mode: 'client' },
    // { src: '~/plugins/OpenStreetMap.js', mode: 'client' },
    // { src: '~/plugins/ToolControls.js', mode: 'client' },
    // { src: '~/plugins/ServerGate.js', mode: 'client' },
    // { src: '~/plugins/SGServer.js', mode: 'client' },

    // { src: '~/plugins/setMap.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  styleResources: {
    scss: ['./assets/scss/utils/*.scss']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }) {
      if (!isDev) {
        config.output.publicPath = './_nuxt/';
      }
      return config;
    },
    filenames: {
      app: () => '[name].js',
      chunk: () => '[name].js'
    }
  }
};
