export default {
  // Target: https://go.nuxtjs.dev/config-target
  mode: 'spa',
  vue: {
    config: {
      devtools: true,
      productionTip: false
    }
  },
  target: 'static',
  router: {
    base: '/test008/'
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
    script: [
      {
        src: '/test008/scripts/Map.js',
        async: true
      },
      // {
      //   src: '/test008/scripts/Framework.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Tasks.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/GFX.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/FX.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/MapBase.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Controls.js',
      //   async: true
      // },

      // {
      //   src: '/test008/scripts/MapLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Compass.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Navigate.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Tracker.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/CachedLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Geometry.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Symbol.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Draw.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Overview.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Bookmark.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/TemplatePicker.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Layer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/DynamicLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Symbol.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Graphic.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/GraphicsLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/TileLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/OSMLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/BingTiledLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Infowindow.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Mercator.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/CoordSys.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Bookmark.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/PrintTool.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Process.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Query.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Edit.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/UndoManager.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Request.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/WMSLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/WMTSLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/GroupLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/MapImageLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/KMLLayer.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Google.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Base64.js',
      //   async: true
      // },
      {
        src: '/test008/scripts/ToolControls.js',
        async: true
      },
      // {
      //   src: '/test008/scripts/SuperGeoUtility.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/jquery-3.4.0.min.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/CoordSys.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Mercator.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/Projection.js',
      //   async: true
      // },
      // {
      //   src: '/test008/scripts/VectorTiledLayer.js',
      //   async: true
      // },

      {
        src: '/test008/scripts/setMap.js',
        async: true
      }
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
    { src: '~/plugins/dragbox.js', mode: 'client' },
    { src: '~/plugins/select.js', mode: 'client' },
    { src: '~/plugins/vueHtml2canvas.js', mode: 'client' }

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
  },
  server: {
    host: 'localhost'
  }
};
