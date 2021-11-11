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
        src: 'http://192.168.3.112/testyy/scripts/Base.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/OperationBase.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/SuperGeoUtility.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/AjaxAgent.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Framework.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/MapBase.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Controls.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/MapLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Navigate.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/CachedLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/OpenStreetMap.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/ToolControls.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Tasks.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/GFX.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/FX.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Compass.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Tracker.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Geometry.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Symbol.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Draw.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Overview.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Bookmark.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/TemplatePicker.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Layer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/TiledLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/TileLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/DynamicLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Graphic.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/GraphicsLayer.js',
        async: true
      },

      {
        src: 'http://192.168.3.112/testyy/scripts/OSMLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/BingTiledLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Infowindow.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Mercator.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/CoordSys.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/PrintTool.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Process.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Query.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Edit.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/UndoManager.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Request.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/WMSLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/WMTSLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Google.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Base64.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/Projection.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/GroupLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/KMLLayer.js',
        async: true
      },
      {
        src: 'http://192.168.3.112/testyy/scripts/VectorTiledLayer.js',
        async: true
      },
      // {
      //   src: 'http://192.168.3.112/ServerGate/SGSGate.ashx?F=~/scripts/Framework.js',
      //   async: true
      // },
      {
        src: 'http://192.168.3.112/testyy/scripts/setMap.js',
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
