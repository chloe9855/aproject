export default {
  // Target: https://go.nuxtjs.dev/config-target
  mode: 'universal',
  vue: {
    config: {
      devtools: true,
      productionTip: false
    }
  },
  target: 'static',
  router: {
    base: '/IRCloud/'
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
        src: 'scripts/Base.js',
        async: true
      },
      {
        src: 'scripts/OperationBase.js',
        async: true
      },
      {
        src: 'scripts/SuperGeoUtility.js',
        async: true
      },
      {
        src: 'scripts/AjaxAgent.js',
        async: true
      },
      {
        src: 'scripts/Framework.js',
        async: true
      },
      {
        src: 'scripts/MapBase.js',
        async: true
      },
      {
        src: 'scripts/Controls.js',
        async: true
      },
      {
        src: 'scripts/MapLayer.js',
        async: true
      },
      {
        src: 'scripts/Navigate.js',
        async: true
      },
      {
        src: 'scripts/CachedLayer.js',
        async: true
      },
      {
        src: 'scripts/OpenStreetMap.js',
        async: true
      },
      {
        src: 'scripts/ToolControls.js',
        async: true
      },
      {
        src: 'scripts/Tasks.js',
        async: true
      },
      {
        src: 'scripts/GFX.js',
        async: true
      },
      {
        src: 'scripts/FX.js',
        async: true
      },
      {
        src: 'scripts/Compass.js',
        async: true
      },
      {
        src: 'scripts/Tracker.js',
        async: true
      },
      {
        src: 'scripts/Geometry.js',
        async: true
      },
      {
        src: 'scripts/Symbol.js',
        async: true
      },
      {
        src: 'scripts/Draw.js',
        async: true
      },
      {
        src: 'scripts/Overview.js',
        async: true
      },
      {
        src: 'scripts/Bookmark.js',
        async: true
      },
      {
        src: 'scripts/TemplatePicker.js',
        async: true
      },
      {
        src: 'scripts/Layer.js',
        async: true
      },
      {
        src: 'scripts/TiledLayer.js',
        async: true
      },
      {
        src: 'scripts/TileLayer.js',
        async: true
      },
      {
        src: 'scripts/DynamicLayer.js',
        async: true
      },
      {
        src: 'scripts/Graphic.js',
        async: true
      },
      {
        src: 'scripts/GraphicsLayer.js',
        async: true
      },

      {
        src: 'scripts/OSMLayer.js',
        async: true
      },
      {
        src: 'scripts/BingTiledLayer.js',
        async: true
      },
      {
        src: 'scripts/Infowindow.js',
        async: true
      },
      {
        src: 'scripts/Mercator.js',
        async: true
      },
      {
        src: 'scripts/CoordSys.js',
        async: true
      },
      {
        src: 'scripts/PrintTool.js',
        async: true
      },
      {
        src: 'scripts/Process.js',
        async: true
      },
      {
        src: 'scripts/Query.js',
        async: true
      },
      {
        src: 'scripts/Edit.js',
        async: true
      },
      {
        src: 'scripts/UndoManager.js',
        async: true
      },
      {
        src: 'scripts/Request.js',
        async: true
      },
      {
        src: 'scripts/WMSLayer.js',
        async: true
      },
      {
        src: 'scripts/WMTSLayer.js',
        async: true
      },
      {
        src: 'scripts/Google.js',
        async: true
      },
      {
        src: 'scripts/Base64.js',
        async: true
      },
      {
        src: 'scripts/Projection.js',
        async: true
      },
      // {
      //   src: 'ServerGate/SGSGate.ashx?F=~/scripts/Framework.js',
      //   async: true
      // },
      {
        src: 'scripts/setMap.js',
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
