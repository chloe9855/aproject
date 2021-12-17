const dev = process.env.NODE_ENV === 'development';

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
        src: '/IRCloud/scripts/Map.js',
        async: true
      },
      // {
      //   src: '/IRCloud/scripts/Framework.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Tasks.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/GFX.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/FX.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/MapBase.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Controls.js',
      //   async: true
      // },

      // {
      //   src: '/IRCloud/scripts/MapLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Compass.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Navigate.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Tracker.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/CachedLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Geometry.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Symbol.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Draw.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Overview.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Bookmark.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/TemplatePicker.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Layer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/DynamicLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Symbol.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Graphic.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/GraphicsLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/TileLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/OSMLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/BingTiledLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Infowindow.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Mercator.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/CoordSys.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Bookmark.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/PrintTool.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Process.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Query.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Edit.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/UndoManager.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Request.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/WMSLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/WMTSLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/GroupLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/MapImageLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/KMLLayer.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Google.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Base64.js',
      //   async: true
      // },
      {
        src: '/IRCloud/scripts/ToolControls.js',
        async: true
      },
      // {
      //   src: '/IRCloud/scripts/SuperGeoUtility.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/jquery-3.4.0.min.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/CoordSys.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Mercator.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/Projection.js',
      //   async: true
      // },
      // {
      //   src: '/IRCloud/scripts/VectorTiledLayer.js',
      //   async: true
      // },

      {
        src: '/IRCloud/scripts/setMap.js',
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

  proxy: dev
    ? {
        '/aerc': 'http://192.168.3.112/',
        '/AERC': 'http://192.168.3.112/'
      }
    : undefined,

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
