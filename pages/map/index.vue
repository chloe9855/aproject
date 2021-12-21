<template>
  <div class="wrapper mapWrap">
    <div
      class="main"
      :class="{ 'reduceHeight': $store.state.hideFooter === true }"
    >
      <!--    -->

      <canvas
        id="canvas"
        ref="mapCanvas"
        class="canvasShot"
        width="1500"
        height="635"
      />
      <div
        id="mapNode"
        ref="mapBox"
      />
      <!-- <div id="CoordTools">
        <label id="Coordinate">NaN NaN</label>
      </div> -->
      <div
        class="scbar_wrap"
      >
        <div
          id="ScaleTools"
        />
      </div>

      <!--  -->
      <Feature-component
        :current="activeWindow"
        @select="payload => activeWindow = payload"
        @zoomIn="zoomInCtrl"
        @zoomOut="zoomOutCtrl"
        @backFullPic="fullMapCtrl"
        @iaList="(payload) => { totalIaList = payload }"
      />

      <!--     圖層工具     -->
      <DragBox-component
        v-if="ctrlDragBoxVisible('switchLayersWindow')"
        :name="'圖層工具'"
        :icon-name="'icon-layer-ctrl'"
        @close="activeWindow = ''"
      >
        <template #content>
          <NavTabs-component
            :type-list="layerOptions.typeList"
            :selected="layerOptions.current"
            @current="payload => layerOptions.current = payload"
          />

          <div class="navtabs__content layerwindow theme_scrollbar">
            <!-- 點圖資 -->
            <div
              v-if="layerOptions.current === 0"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.pointList"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  category="pointList"
                  :item="item"
                  :drop-down="true"
                  @changeVisible="layerVisibleCtrl"
                  @changeBranchVisible="branchVisibleCtrl"
                  @setAllVisible="allPointCtrl"
                  @updateOpacity="layerOpacityCtrl"
                />
              </div>
            </div>
            <!-- 線圖資 -->
            <div
              v-if="layerOptions.current === 1"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.lineList"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  category="lineList"
                  :item="item"
                  :drop-down="true"
                  @changeVisible="layerVisibleCtrl"
                  @changeBranchVisible="branchVisibleCtrl"
                  @setAllVisible="allLineCtrl"
                  @updateOpacity="layerOpacityCtrl"
                />
              </div>
            </div>
            <!-- 面圖資 -->
            <div
              v-if="layerOptions.current === 2"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.surfaceList"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  category="surfaceList"
                  :item="item"
                  :drop-down="true"
                  @changeVisible="layerVisibleCtrl"
                  @changeBranchVisible="branchVisibleCtrl"
                  @setAllVisible="allSurfaceCtrl"
                  @updateOpacity="layerOpacityCtrl"
                />
              </div>
            </div>
            <!-- 底圖切換 -->
            <div
              v-if="layerOptions.current === 3"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.baseLayerList.slice().reverse()"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  category="baseLayer"
                  :item="item"
                  :drop-down="false"
                  @changeVisible="layerVisibleCtrl"
                  @updateOpacity="layerOpacityCtrl"
                />
              </div>
            </div>
            <!-- 臨時展繪 -->
            <div
              v-if="layerOptions.current === 4"
              class="shp__list"
            >
              <SwitchTabs-component
                :selected="shpOptions.current"
                :type-list="shpOptions.typeList"
                @current="payload => shpOptions.current = payload"
              />
              <div v-if="shpOptions.current === 0">
                <p class="tit">
                  請以 .zip 封存檔案，.zip檔案內需含有.shp .shx .dbf .prj 四種檔案類型
                </p>
                <div class="bt_wrap">
                  <Buttons-component
                    :name="'button-add'"
                    :text="'新增圖層'"
                    :add="true"
                    @click="$refs.formBt1.click()"
                  />
                  <input
                    id="formBt1"
                    ref="formBt1"
                    type="file"
                    style="display: none;"
                    @change="getShpHandler"
                  >
                </div>
              </div>

              <div v-if="shpOptions.current === 1">
                <p class="tit">
                  上傳格式限kml或是kmz，8MB為限
                </p>
                <div class="bt_wrap">
                  <Buttons-component
                    :name="'button-add'"
                    :text="'新增圖層'"
                    :add="true"
                    @click="$refs.upfile.click()"
                  />
                  <input
                    id="upfile"
                    ref="upfile"
                    type="file"
                    style="display: none;"
                    @click="$refs.upfile.value = null"
                    @change="fileUploader(shpOptions.current)"
                  >
                </div>
              </div>

              <div v-if="shpOptions.layerList.length >= 1">
                <ShpItem-component
                  :item="shpOptions.layerList[0]"
                  category="shpitem"
                  @changeVisible="layerVisibleCtrl"
                  @updateOpacity="layerOpacityCtrl"
                  @locate="zoomToSHP"
                  @delete="deleteShpLayer"
                />
              </div>
              <div
                v-if="shpOptions.layerList.length < 1"
                class="no_filemm"
              >
                <img :src="require('~/assets/img/no-file.svg')">
                <p>尚未取得服務</p>
              </div>
            </div>
            <!-- OGC介接 -->
            <div
              v-if="layerOptions.current === 5"
              class="ogc__list"
            >
              <div class="btn_group_wms">
                <SwitchTabs-component
                  :selected="ogcOptions.current"
                  :type-list="ogcOptions.typeList"
                  @current="payload => ogcOptions.current = payload"
                />
              </div>
              <p class="title_name">
                服務路徑
              </p>
              <textarea
                v-if="ogcOptions.current === 0"
                ref="wms"
                v-model="wmsUrl"
                name="value"
                :placeholder="ogcOptions.holder"
              />
              <textarea
                v-if="ogcOptions.current === 1"
                ref="wmts"
                v-model="wmTsUrl"
                name="value"
                :placeholder="ogcOptions.holder"
              />
              <div class="bt_wrapOGC">
                <Buttons-component
                  :text="'取得服務'"
                  @click="getOgcHandler(ogcOptions.current)"
                />
              </div>

              <div
                v-if="ogcOptions.layerList.length >= 1"
                class="ogc_table1"
              >
                <div class="og_title">
                  圖層名稱
                </div>
                <div class="og_item_wrap theme_scrollbar">
                  <div
                    v-for="ogItem in ogcOptions.layerList"
                    :key="ogItem.id"
                    class="og_item"
                  >
                    <div class="theme_checkbox">
                      <input
                        :id="ogItem.id"
                        v-model="ogItem.visible"
                        type="checkbox"
                        @click="selectMe(ogItem.id)"
                      >
                      <label
                        :for="ogItem.id"
                      >
                        {{ ogItem.title }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="ogcOptions.layerList.length < 1"
                class="ogc_table2"
              >
                <div class="og_title">
                  圖層名稱
                </div>
                <div class="no_filemm">
                  <img :src="require('~/assets/img/no-file.svg')">
                  <p>尚未取得服務</p>
                </div>
              </div>

              <div class="ogc_allbtn">
                <Buttons-component
                  :name="'button-default'"
                  :text="'清除全部'"
                  @click="clearOgcLayer"
                />
                <Buttons-component
                  :text="'加入圖層'"
                  @click="addOgcLayer(ogcOptions.current)"
                />
              </div>
              <div />
            </div>
          </div>
        </template>
      </DragBox-component>

      <!--     定位工具      -->
      <DragBox-component
        v-if="ctrlDragBoxVisible('setPositionWindow')"
        :name="'定位工具'"
        :icon-name="'icon-set-position'"
        @close="activeWindow = ''"
      >
        <template #content>
          <PositionNav-component
            :ia-list="totalIaList"
          />
        </template>
      </DragBox-component>

      <!--     測量工具      -->
      <DragBox-component
        v-if="ctrlDragBoxVisible('geoMeasureWindow')"
        :name="'測量工具'"
        :icon-name="'icon-geo-measure'"
        @close="closeMeasureWindow"
      >
        <template #content>
          <GeoMeasure-component
            :line-meter="drawTool.lineM"
            :line-kilo="drawTool.lineKm"
            :sur-meter="drawTool.surM"
            :sur-kilo="drawTool.surKm"
            @startDraw="startMeasure"
            @clear="clearMeasureResult"
          />
        </template>
      </DragBox-component>

      <!--     截圖工具      -->
      <DragBox-component
        v-if="ctrlDragBoxVisible('screenShotWindow')"
        :name="'截圖工具'"
        :icon-name="'icon-screen-shot'"
        @close="activeWindow = ''"
      >
        <template #content>
          <ScreenShot-component
            @update="payload => screenTitle = payload"
            @addJPG="downloadJPG"
            @addPDF="downloadPDF"
          />
        </template>
      </DragBox-component>

      <!--     街景工具      -->
      <DragBox-component
        v-if="ctrlDragBoxVisible('streetMapWindow')"
        :name="'街景工具'"
        :icon-name="'icon-street-map'"
        @close="activeWindow = ''"
      >
        <template #content>
          <div class="street_wrap">
            請於地圖圖面上，任一處「街道」點擊，
            即以另開啟視窗，展示Google街景影像！
            若要使用其他功能，將此視窗關閉即可！
          </div>
        </template>
      </DragBox-component>

      <!--    地圖搜尋欄     -->
      <MapSearchBox-component
        @iaList="(payload) => { totalIaList = payload }"
        @search="searchHandler"
        @clear="clearSearchResult"
      />
      <div
        v-if="searchResult.channel !== ''"
        class="result_table"
        :class="{'hide_block66': hideResult, 'show_block': !hideResult}"
      >
        <div
          class="hide_button_bigTable"
          @click="hideResult = !hideResult"
        >
          <p
            v-if="hideResult"
            :class="{'up_arrow': hideResult }"
          >
            顯示查詢結果
          </p>
          <p
            v-if="!hideResult"
            :class="{'up_arrow': hideResult }"
          >
            隱藏查詢結果
          </p>
        </div>
        <div class="table_wrap">
          <ScrollTable-component
            :table-data="searchResult.channel"
            :hide="hideResult"
            @isMap="getChannelMap"
          />
          <div class="border_bot" />
        </div>
      </div>

      <!-- 彈窗lightbox -->
      <AlertBox-component
        v-if="formatBox === true"
        title="上傳格式錯誤，請重新上傳"
        box-icon="warning"
        @close="formatBox = false"
        @confirm="formatBox = false"
      />
      <AlertBox-component
        v-if="sizeBox === true"
        title="上傳檔案大小以8MB為限，請重新上傳"
        box-icon="warning"
        @close="sizeBox = false"
        @confirm="sizeBox = false"
      />

      <!-- loading載入中視窗 -->
      <div
        v-if="loadModal === true"
        class="modal_wrapper888888"
      >
        <div class="modal888888" />
      </div>

      <!-- loading載入中視窗xxx -->
      <div
        id="modal88"
        class="modal_wrapper666666"
      >
        <div class="modal666666" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';
import Feature from '~/components/Feature.vue';
import DragBox from '~/components/DragBox.vue';
import LayerItem from '~/components/LayerItem.vue';
import ShpItem from '~/components/ShpItem.vue';
import SwitchTabs from '~/components/tools/SwitchTabs.vue';
import PositionNav from '~/components/PositionNav.vue';
import Buttons from '~/components/tools/Buttons.vue';
import GeoMeasure from '~/components/GeoMeasure.vue';
import ScreenShot from '~/components/ScreenShot.vue';
import MapSearchBox from '~/components/MapSearchBox.vue';
import ScrollTable from '~/components/tools/ScrollTable.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
// import JSZip from 'jszip';

export default {
  components: {
    'NavTabs-component': NavTabs,
    'Feature-component': Feature,
    'DragBox-component': DragBox,
    'LayerItem-component': LayerItem,
    'ShpItem-component': ShpItem,
    'SwitchTabs-component': SwitchTabs,
    'PositionNav-component': PositionNav,
    'Buttons-component': Buttons,
    'GeoMeasure-component': GeoMeasure,
    'ScreenShot-component': ScreenShot,
    'MapSearchBox-component': MapSearchBox,
    'ScrollTable-component': ScrollTable,
    'AlertBox-component': AlertBox
  },
  data () {
    return {
      mymap: '',
      userId: '',
      totalIaList: '',
      // * loading視窗
      loadModal: false,
      // * 目前所選取的功能視窗
      activeWindow: '',
      searchResult: {
        channel: ''
      },
      hideResult: false,
      // * 測量視窗
      openOnce: true,
      openLine: true,
      drawTool: '',
      // * 截圖
      screenTitle: '',
      screenImgSrc: '',
      // * 街景
      streetMap: '',
      openOnceStreet: true,
      // * 開啟圖層工具
      openOnceLa: true,
      // * 圖層工具
      layerOptions: {
        current: 0,
        typeList: [
          {
            name: '點圖資',
            id: 0
          },
          {
            name: '線圖資',
            id: 1
          },
          {
            name: '面圖資',
            id: 2
          },
          {
            name: '底圖切換',
            id: 3
          },
          {
            name: '臨時展繪',
            id: 4
          },
          {
            name: 'OGC介接',
            id: 5
          }
        ],
        pointList: [],
        lineList: [],
        surfaceList: [],
        baseLayerList: []
      },
      allVectors: '',
      allBaseLayer: [],
      // * OGC介接
      ogcOptions: {
        current: 0,
        typeList: [
          {
            name: 'wms',
            id: 0
          },
          {
            name: 'wmts',
            id: 1
          }
        ],
        holder: '請輸入服務連結',
        layerList: []
      },
      wmTsLayer: '',
      wmsLayer: '',
      wmTsUrl: 'https://wmts.nlsc.gov.tw/wmts',
      wmsUrl: 'https://wms.nlsc.gov.tw/wms',
      // * 臨時展繪的lightbox
      formatBox: false,
      sizeBox: false,
      // * 臨時展繪
      shpOptions: {
        current: 0,
        typeList: [
          {
            name: 'shp',
            id: 0
          },
          {
            name: 'kmz/kml',
            id: 1
          }
        ],
        layerList: [],
        kmlLayer: ''
      },
      allShpGraphic: [],
      allGeotry: [],
      //* 跳轉視窗 圖形
      geoData: '',
      localGraphic: '',
      // * 圖磚是否已有
      getCons: false,
      getCanal: false,
      getIa: false,
      getMng: false,
      getStn: false,
      getGrp: false,
      getRot: false,
      getPeriod: false,
      getPool: false,
      // * 渠道查詢表格 單筆圖形
      channelGraphic: ''
    };
  },
  // layout: 'map',
  // head: {
  //   script: [
  //     {
  //       src: 'scripts/setMap.js',
  //       async: true
  //     }
  //   ]
  // },
  // head: {
  //   script: [
  //     {
  //       src: 'scripts/Base.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/OperationBase.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/SuperGeoUtility.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/AjaxAgent.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Framework.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/MapBase.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Controls.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/MapLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Navigate.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/CachedLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/OpenStreetMap.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/ToolControls.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Tasks.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/GFX.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/FX.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Compass.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Tracker.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Geometry.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Symbol.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Draw.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Overview.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Bookmark.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/TemplatePicker.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Layer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/TiledLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/TileLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/DynamicLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Graphic.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/GraphicsLayer.js',
  //       async: true
  //     },

  //     {
  //       src: 'scripts/OSMLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/BingTiledLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Infowindow.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Mercator.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/CoordSys.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/PrintTool.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Process.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Query.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Edit.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/UndoManager.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Request.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/WMSLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/WMTSLayer.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Google.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Base64.js',
  //       async: true
  //     },
  //     {
  //       src: 'scripts/Projection.js',
  //       async: true
  //     },
  //     // {
  //     //   src: 'ServerGate/SGSGate.ashx?F=~/scripts/Framework.js',
  //     //   async: true
  //     // },
  //     {
  //       src: 'scripts/setMap.js',
  //       async: true
  //     }
  //   ]
  // },
  mounted () {
    this.getBaseLayer();

    this.userId = sessionStorage.getItem('loginUser');

    setTimeout(() => {
      this.getLocalStorage();
    }, 3000);

    // * 載入canvas
    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');

    const getPixelRatio = function (ctx) {
      const backingStore = ctx.backingStorePixelRatio ||
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    };
    const ratio = getPixelRatio(ctx);

    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    ctx.scale(ratio, ratio);
  },
  methods: {

    getVectorTile () {
      SuperGIS.LoadModules(['scripts/MVTData.js', 'vector_tile.js', 'pbf.js', 'scripts/KML.js', 'scripts/Collada.js'], () => {
        this.allVectors = new sg.layers.VectorMBTLayer('http://210.65.139.69/mapcache/01', {
          loaded: () => {
            this.loadVectors();
          }
        });
      });
    },
    loadVectors () {
      this.allVectors.Style['01_Grp'].visible = false;
      this.allVectors.updateStyle(this.allVectors.Style);
      pMapBase.AddLayer(this.allVectors);
      pMapBase.RefreshMap(true);
    },
    // * @ 圖層工具：底圖切換API
    getBaseLayer () {
      fetch('/AERC/rest/Layer', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        this.layerOptions.baseLayerList = data;
        this.layerOptions.baseLayerList.forEach((item, index) => {
          item.id = item.Layer_sno;
          item.visible = false;
          item.opacity = 100;
          if (item.LayerName === 'EMAP5') {
            item.visible = true;
          }

          // 載入底圖 wmts
          if (item.LayerType === '1') {
            this.loadAllBaseLayerTS(item.LayerName, index);
          }

          // 載入底圖 wms
          if (item.LayerType === '2') {
            this.loadAllBaseLayer(item.LayerName, index);
          }
        });
      }).catch((err) => {
        console.log('錯誤:', err);
      });
    },
    //* 載入底圖 wmts
    loadAllBaseLayerTS (layerName, index) {
      this.allBaseLayer.push(new sg.layers.WMTSLayer('https://wmts.nlsc.gov.tw/wmts', {
        serviceMode: 'KVP',
        loadEffect: true,
        loaded: () => {
          this.getMyWMTS(layerName, index);
        }
      }));

      // setTimeout(() => {
      //   this.allBaseLayer[index].layerInfo.identifier = layerName;
      //   pMapBase.AddLayer(this.allBaseLayer[index]);
      //   if (layerName !== 'EMAP5_OPENDATA') {
      //     this.allBaseLayer[index].hide();
      //   }
      //   pMapBase.RefreshMap(true);
      // }, 2000);
    },
    getMyWMTS (layerName, index) {
      this.allBaseLayer[index].layerInfo.identifier = layerName;
      setTimeout(() => {
        pMapBase.AddLayer(this.allBaseLayer[index]);
        if (layerName !== 'EMAP5') {
          this.allBaseLayer[index].hide();
        }
        pMapBase.RefreshMap(true);

        // document.getElementById('modal88').style.display = 'none';
      }, 3000);
    },
    //* 載入底圖 wms
    loadAllBaseLayer (layerName, index) {
      this.allBaseLayer.push(new sg.layers.WMSLayer('https://wms.nlsc.gov.tw/wms', {
        imageFormat: 'image/png',
        loadEffect: true,
        loaded: () => {
          this.getMyWMS(layerName, index);
        }
      }));

      // setTimeout(() => {
      //   this.allBaseLayer[index].visibleLayers = [];
      //   this.allBaseLayer[index].visibleLayers[0] = layerName;
      //   pMapBase.AddLayer(this.allBaseLayer[index]);
      //   if (layerName !== 'EMAP5_OPENDATA') {
      //     this.allBaseLayer[index].hide();
      //   }
      //   pMapBase.RefreshMap(true);
      // }, 2000);
    },
    getMyWMS (layerName, index) {
      this.allBaseLayer[index].visibleLayers = [];
      this.allBaseLayer[index].visibleLayers[0] = layerName;
      pMapBase.AddLayer(this.allBaseLayer[index]);
      if (layerName !== 'EMAP5_OPENDATA') {
        this.allBaseLayer[index].hide();
      }
      pMapBase.RefreshMap(true);
    },
    // * 控制視窗顯示
    ctrlDragBoxVisible (payload) {
      // @DragBox：電腦版可以在畫面上任意移動的 component
      return this.activeWindow === payload;
    },
    // * @ 測量圖形
    startMeasure (id) {
      // 長度測量
      if (id === 0) {
        drawTypee = 'LINESTRING';
        myUnit = 'Meters';
        myUnitNum = 1;
        this.drawTool.ActiveMeasureTool('LINESTRING');
      }
      // 面積測量
      if (id === 1) {
        this.openLine = false;
        drawTypee = 'POLYGON';
        myUnit = 'Square Meters';
        myUnitNum = 1;
        this.drawTool.ActiveMeasureTool('POLYGON');
      }
    },
    // * @ 測量圖形：關閉測量視窗
    closeMeasureWindow () {
      this.activeWindow = '';
      this.openLine = true;
      this.drawTool.ClearMap();
      this.drawTool.ActiveMeasureTool();
    },
    // * @ 測量圖形：清除所有測量圖形
    clearMeasureResult () {
      this.drawTool.ClearMap();
    },
    // * @ 左側搜尋 渠道查詢 表格結果
    searchHandler (payload) {
      // const data = require('~/static/channel.json');
      this.searchResult.channel = '';
      this.searchResult.channel = payload;
    },
    // * @ 左側搜尋：渠道查詢 清除搜尋結果
    clearSearchResult () {
      this.searchResult.channel = '';
      this.hideResult = false;
      pMapBase.drawingGraphicsLayer.remove(this.channelGraphic);
    },
    // * @ 左側搜尋 渠道查詢結果 單筆定位
    getChannelMap (info, type) {
      let url;
      if (type === 'Sec5cov') {
        this.getMapSec5(info.geometry);
        return;
      } else if (type === 'Ia') {
        url = `/AERC/rest/Ia/${this.userId}`;
      } else {
        url = `/AERC/rest/${type}`;
      }

      let newObj = {};
      if (type === 'Ia') {
        newObj = { Ia: info.Ia, FID: info.FID };
      }
      if (type === 'Mng') {
        newObj = { Ia: info.Ia, FID: info.FID };
      }
      if (type === 'Stn') {
        newObj = { Ia: info.Ia, Mng: info.Mng, FID: info.FID };
      }
      if (type === 'Grp') {
        newObj = { Ia: info.Ia, Mng: info.Mng, Stn: info.Stn, FID: info.FID };
      }
      if (type === 'Rot') {
        newObj = { Ia: info.Ia, FID: info.FID };
      }
      if (type === 'Period') {
        newObj = { Ia: info.Ia, FID: info.FID };
      }
      if (type === 'Pool') {
        newObj = { Ia: info.Ia, FID: info.FID };
      }
      if (type === 'Section') {
        newObj = { Section: info.Section, FID: info.FID };
      }
      // if (type === 'Sec5cov') {
      //   newObj = { CountyID: info.myCountyID, FID: info.FID };
      // }

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newObj)
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        // 先清除之前的
        pMapBase.drawingGraphicsLayer.remove(this.channelGraphic);
        // 畫圖
        const geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
        this.channelGraphic = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) });
        pMapBase.drawingGraphicsLayer.add(this.channelGraphic);
        // 定位
        const extent = geometry.extent;
        pMapBase.ZoomMapTo(extent);
        ZoomOut();
        pMapBase.getTransformation().FitLevel();
        pMapBase.RefreshMap(true);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 左側搜尋 渠道查詢結果 單筆定位 (地籍)
    getMapSec5 (geometryData) {
      // 先清除之前的
      pMapBase.drawingGraphicsLayer.remove(this.channelGraphic);
      // 畫圖
      const geometry = sg.geometry.Geometry.fromGeoJson(geometryData);
      this.channelGraphic = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) });
      pMapBase.drawingGraphicsLayer.add(this.channelGraphic);
      // 定位
      const extent = geometry.extent;
      pMapBase.ZoomMapTo(extent);
      ZoomOut();
      pMapBase.getTransformation().FitLevel();
      pMapBase.RefreshMap(true);
    },
    // * @ 圖層工具：切換圖層 顯示/隱藏
    layerVisibleCtrl ($event, id, category, layerName) {
      if (category === 'pointList') {
        const index = this.layerOptions.pointList.findIndex(item => item.id === id);
        this.layerOptions.pointList[index].visible = $event;

        // MBT.Style[layerName].visible = $event;
        // MBT.updateStyle(MBT.Style);
        layerName.forEach((item, index) => {
          allMBTX[index].updateStyle({
            [item]: { visible: $event }
          });
        });
      }
      if (category === 'lineList') {
        const index = this.layerOptions.lineList.findIndex(item => item.id === id);
        this.layerOptions.lineList[index].visible = $event;

        layerName.forEach((item, index) => {
          allMBTX[index].updateStyle({
            [item]: { visible: $event },
            [`${item}_Label`]: { visible: $event }
          });
        });
      }
      if (category === 'surfaceList') {
        const index = this.layerOptions.surfaceList.findIndex(item => item.id === id);
        this.layerOptions.surfaceList[index].visible = $event;

        layerName.forEach((item, index) => {
          const realName = item.substring(3);
          if (realName === 'Grp' || realName === 'Rot') {
            allMBTX[index].updateStyle({
              [item]: { visible: $event },
              [`${item}_Label`]: { visible: $event }
            });
          } else {
            allMBT[index].updateStyle({
              [item]: { visible: $event },
              [`${item}_Label`]: { visible: $event }
            });
          }
        });
      }
      // 底圖切換
      if (category === 'baseLayer') {
        const index = this.layerOptions.baseLayerList.findIndex(item => item.id === id);
        this.layerOptions.baseLayerList[index].visible = $event;

        if ($event === true) {
          this.allBaseLayer[index].show();
        } else {
          this.allBaseLayer[index].hide();
        }

        if (layerName === 'EMAP5') {
          firstLayer.putVisible($event);
        }

        pMapBase.RefreshMap(true);
      }
      if (category === 'shpitem') {
        const index = this.shpOptions.layerList.findIndex(item => item.id === id);
        this.shpOptions.layerList[index].visible = $event;

        if (this.shpOptions.kmlLayer !== '') {
          this.shpOptions.kmlLayer.putVisible($event);
        }

        if (this.allShpGraphic !== []) {
          this.allShpGraphic.forEach((item) => {
            item.layer.putVisible($event);
          });
        }
      }
    },
    // * @ 圖層工具：單一支線圖層 顯示/隱藏
    branchVisibleCtrl ($event, id, category, mainId, layerName, branchName, subId) {
      if (category === 'pointList') {
        const index = this.layerOptions.pointList.findIndex(item => item.id === mainId);
        const indexB = this.layerOptions.pointList[index].type.findIndex(item => item.id === id);
        this.layerOptions.pointList[index].type[indexB].visible = $event;

        layerName.forEach((item, index) => {
          allMBTX[index].updateStyle({
            [item]: { subid: subId, subs: { [branchName]: { visible: $event } } }
          });
        });
      }
      if (category === 'lineList') {
        const index = this.layerOptions.lineList.findIndex(item => item.id === mainId);
        const indexB = this.layerOptions.lineList[index].type.findIndex(item => item.id === id);
        this.layerOptions.lineList[index].type[indexB].visible = $event;

        // MBT.updateStyle({
        //   [layerName]: { subid: subId, subs: { [branchName]: { visible: $event } } }
        // });
        layerName.forEach((item, index) => {
          allMBTX[index].updateStyle({
            [item]: { subid: subId, subs: { [branchName]: { visible: $event } } }
          });
        });
      }
      if (category === 'surfaceList') {
        const index = this.layerOptions.surfaceList.findIndex(item => item.id === mainId);
        const indexB = this.layerOptions.surfaceList[index].type.findIndex(item => item.id === id);
        this.layerOptions.surfaceList[index].type[indexB].visible = $event;

        layerName.forEach((item, index) => {
          const realName = item.substring(3);

          if (realName === 'Grp' || realName === 'Rot') {
            allMBTX[index].updateStyle({
              [item]: { subid: subId, subs: { [branchName]: { visible: $event } } }
            });
          } else {
            allMBT[index].updateStyle({
              [item]: { subid: subId, subs: { [branchName]: { visible: $event } } }
            });
          }
        });
      }
    },
    // * @ 圖層工具：全部顯示/關閉
    allPointCtrl ($event, id, layerName) {
      const myId = parseFloat(id.split('-')[1]);
      const index = this.layerOptions.pointList.findIndex(item => item.id === myId);

      const newObj = {};
      let subId = '';
      this.layerOptions.pointList[index].type.forEach((item) => {
        item.visible = $event;

        newObj[item.name] = { visible: $event };
        subId = item.subId;
      });

      // MBT.updateStyle({
      //   [layerName]: { subid: subId, subs: newObj }
      // });
      layerName.forEach((item2, index2) => {
        allMBTX[index2].updateStyle({
          [item2]: { subid: subId, subs: newObj }
        });
      });

      this.layerOptions.pointList[index].allShow = $event;
    },
    allLineCtrl ($event, id, layerName) {
      const myId = parseFloat(id.split('-')[1]);
      const index = this.layerOptions.lineList.findIndex(item => item.id === myId);

      const newObj = {};
      let subId = '';
      this.layerOptions.lineList[index].type.forEach((item) => {
        item.visible = $event;

        newObj[item.name] = { visible: $event };
        subId = item.subId;
      });

      layerName.forEach((item2, index2) => {
        allMBTX[index2].updateStyle({
          [item2]: { subid: subId, subs: newObj }
        });
      });

      this.layerOptions.lineList[index].allShow = $event;
    },
    allSurfaceCtrl ($event, id, layerName) {
      const myId = parseFloat(id.split('-')[1]);
      const index = this.layerOptions.surfaceList.findIndex(item => item.id === myId);

      const newObj = {};
      let subId = '';
      this.layerOptions.surfaceList[index].type.forEach((item) => {
        item.visible = $event;

        newObj[item.name] = { visible: $event };
        subId = item.subId;
      });

      layerName.forEach((item2, index2) => {
        const realName = item2.substring(3);

        if (realName === 'Grp' || realName === 'Rot') {
          allMBTX[index2].updateStyle({
            [item2]: { subid: subId, subs: newObj }
          });
        } else {
          allMBT[index2].updateStyle({
            [item2]: { subid: subId, subs: newObj }
          });
        }
      });

      this.layerOptions.surfaceList[index].allShow = $event;
    },
    // * @ 圖層工具：透明度調整
    layerOpacityCtrl (id, value, category, layerName) {
      if (category === 'pointList') {
        const index = this.layerOptions.pointList.findIndex(item => item.id === id);
        const oldVal = this.layerOptions.pointList[index].opacity;
        if (oldVal === value) { return; }

        this.layerOptions.pointList[index].opacity = value;

        layerName.forEach((item, index) => {
          allMBTX[index].updateStyle({ [item]: { style: { opacity: value / 100 } } });
        });
      }
      if (category === 'lineList') {
        const index = this.layerOptions.lineList.findIndex(item => item.id === id);
        const oldVal = this.layerOptions.lineList[index].opacity;
        if (oldVal === value) { return; }

        this.layerOptions.lineList[index].opacity = value;

        layerName.forEach((item, index) => {
          allMBTX[index].updateStyle({
            [item]: { style: { opacity: value / 100 } },
            [`${item}_Label`]: { style: { opacity: value / 100 } }
          });
        });
      }
      if (category === 'surfaceList') {
        const index = this.layerOptions.surfaceList.findIndex(item => item.id === id);
        const oldVal = this.layerOptions.surfaceList[index].opacity;
        if (oldVal === value) { return; }

        this.layerOptions.surfaceList[index].opacity = value;

        // MBT.Style[layerName].style = { opacity: value / 100 };
        // MBT.updateStyle(MBT.Style);
        layerName.forEach((item, index) => {
          const realName = item.substring(3);
          if (realName === 'Grp' || realName === 'Rot') {
            allMBTX[index].updateStyle({
              [item]: { style: { opacity: value / 100 } },
              [`${item}_Label`]: { style: { opacity: value / 100 } }
            });
          } else {
            allMBT[index].updateStyle({
              [item]: { style: { opacity: value / 100 } },
              [`${item}_Label`]: { style: { opacity: value / 100 } }
            });
          }
        });
      }
      // 底圖切換
      if (category === 'baseLayer') {
        const index = this.layerOptions.baseLayerList.findIndex(item => item.id === id);
        this.layerOptions.baseLayerList[index].opacity = value;
        this.allBaseLayer[index].setOpacity(value / 100);

        if (layerName === 'EMAP5') {
          firstLayer.setOpacity(value / 100);
        }

        pMapBase.RefreshMap(true);
      }
      if (category === 'shpitem') {
        const index = this.shpOptions.layerList.findIndex(item => item.id === id);
        this.shpOptions.layerList[index].opacity = value;

        if (this.shpOptions.kmlLayer !== '') {
          this.shpOptions.kmlLayer.setOpacity(value / 100);
        }

        if (this.allShpGraphic !== []) {
          this.allShpGraphic.forEach((item) => {
            item.layer.setOpacity(value / 100);
          });
        }

        pMapBase.RefreshMap(true);
      }
    },
    // * @ 圖層工具：臨時展繪 新增圖層
    addShpLayer () {
      // document.getElementById('upfile').click();

      const result = {
        id: '5623355',
        name: '縣市界',
        visible: true,
        opacity: 50
      };
      this.shpOptions.layerList.push(result);
    },
    // * @ 圖層工具：臨時展繪 新增圖層
    fileUploader (current) {
      this.loadModal = true;
      const newFile = document.getElementById('upfile').files[0];

      if (newFile === undefined) { return; }
      const type = newFile.name.substring(newFile.name.length - 3, newFile.name.length);
      const fileName = newFile.name.substring(0, newFile.name.length - 4);
      const fileSize = newFile.size;

      console.log(newFile);
      console.log(`${current},${type}`);

      if (type !== 'kml' && type !== 'kmz' && type !== 'KML' && type !== 'KMZ') {
        this.formatBox = true;
        return;
      }
      if (fileSize > 8388608) {
        this.sizeBox = true;
        return;
      }

      if (type === 'kmz' || type === 'KMZ') {
        this.getKmzHandler(newFile);
        return;
      }

      // 先移除舊的檔案
      pMapBase.RemoveLayer(this.shpOptions.kmlLayer);
      pMapBase.RefreshMap(true);
      this.shpOptions.layerList = [];

      // const newArr = [];
      // const newZip = new JSZip();
      // newZip.loadAsync(newFile)
      //   .then((zip) => {
      //     console.log(zip);
      //     Object.keys(zip.files).forEach((key) => {
      //       newArr.push(zip.files[key]);
      //       console.log(newArr);
      //     });
      //   });

      // SuperGIS.LoadModules(['scripts/MVTData.js', 'vector_tile.js', 'pbf.js', 'scripts/KML.js', 'scripts/Collada.js'], () => {
      this.shpOptions.kmlLayer = new sg.layers.KMLLayer(null, { data: newFile });
      pMapBase.AddLayer(this.shpOptions.kmlLayer);
      const result = {
        id: Math.random(),
        name: fileName,
        visible: true,
        opacity: 100
      };
      this.shpOptions.layerList.push(result);
      this.zoomToLayer(this.shpOptions.kmlLayer);

      // this.shpOptions.kmlLayer = new sg.layers.KMLLayer(null, { data: newFile });
      // });

      pMapBase.RefreshMap(true);
      this.loadModal = false;
    },
    // * @ 圖層工具：臨時展繪 刪除圖層
    deleteShpLayer () {
      this.shpOptions.layerList = [];
      pMapBase.RemoveLayer(this.shpOptions.kmlLayer);

      this.allShpGraphic.forEach((item) => {
        pMapBase.drawingGraphicsLayer.remove(item);
      });
      this.allShpGraphic = [];

      pMapBase.RefreshMap(true);
    },
    zoomToLayer (layer) {
      console.log(layer);
      const extent = layer.extent;
      pMapBase.ZoomMapTo(extent);
      pMapBase.getTransformation().FitLevel();
      pMapBase.RefreshMap(true);
    },
    // * @ 圖層工具：臨時展繪 定位(只有SHP可)
    zoomToSHP () {
      const extent = sg.geometry.Extent.unionall(this.allGeotry.map(function (geom) { return geom.extent; }));
      pMapBase.ZoomMapTo(extent);
      ZoomOut();
      pMapBase.getTransformation().FitLevel();
      pMapBase.RefreshMap(true);
    },
    // * @ 圖層工具：臨時展繪 上傳kmz檔
    getKmzHandler (myFile) {
      const fileName = myFile.name.substring(0, myFile.name.length - 4);
      const formData = new FormData();
      formData.append('Datas', myFile);

      fetch('/AERC/rest/KmzLoader', {
        method: 'POST',
        body: formData
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        const newArr = data[0].File.filter(item => item.substring(item.length - 3, item.length) === 'kml');
        const newUrl = `${data[0].Folder}/${newArr[0]}`;
        // const newFile = new File([''], newUrl);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', newUrl);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          // blob = xhr.response;
          // LoadAndDisplayFile(blob);
          console.log(xhr.response);
          const oFile = new File([xhr.response], fileName, { type: xhr.response.type });
          this.loadMyKmz(oFile, fileName);
          console.log(oFile);
        };
        xhr.send();
      }).catch((err) => {
        console.log(err);
      });
    },
    loadMyKmz (myFile, fileName) {
      // 先移除舊的檔案
      pMapBase.RemoveLayer(this.shpOptions.kmlLayer);
      pMapBase.RefreshMap(true);
      this.shpOptions.layerList = [];
      //
      // SuperGIS.LoadModules(['scripts/MVTData.js', 'vector_tile.js', 'pbf.js', 'scripts/KML.js', 'scripts/Collada.js'], () => {
      this.shpOptions.kmlLayer = new sg.layers.KMLLayer(null, { data: myFile });
      pMapBase.AddLayer(this.shpOptions.kmlLayer);
      const result = {
        id: Math.random(),
        name: fileName,
        visible: true,
        opacity: 100
      };
      this.shpOptions.layerList.push(result);
      this.zoomToLayer(this.shpOptions.kmlLayer);
      // });

      pMapBase.RefreshMap(true);
      this.loadModal = false;
    },

    // * @ 圖層工具：臨時展繪 上傳shp檔
    getShpHandler () {
      this.loadModal = true;
      const newFile = document.getElementById('formBt1').files[0];
      const fileName = newFile.name.substring(0, newFile.name.length - 4);
      console.log(newFile);

      const formData = new FormData();
      formData.append('Datas', newFile);

      fetch('/AERC/rest/ShpLoader', {
        method: 'POST',
        // headers: new Headers({
        //   'Content-Type': 'application/json'
        // }),
        body: formData
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);

        // 先清除之前的
        this.shpOptions.layerList = [];

        this.allShpGraphic.forEach((item) => {
          pMapBase.drawingGraphicsLayer.remove(item);
        });
        this.allShpGraphic = [];
        // 畫圖
        data.forEach((item) => {
          const geometry = sg.geometry.Geometry.fromGeoJson(item.GEOMETRY);
          this.allShpGraphic.push(sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) }));
          this.allGeotry.push(geometry);
        });

        this.allShpGraphic.forEach((item) => {
          pMapBase.drawingGraphicsLayer.add(item);
        });
        // 加清單
        const result = {
          id: Math.random(),
          name: fileName,
          visible: true,
          opacity: 100
        };
        this.shpOptions.layerList.push(result);

        // 定位
        const extent = sg.geometry.Extent.unionall(this.allGeotry.map(function (geom) { return geom.extent; }));
        pMapBase.ZoomMapTo(extent);
        ZoomOut();
        pMapBase.getTransformation().FitLevel();
        pMapBase.RefreshMap(true);

        this.loadModal = false;
      }).catch((err) => {
        console.log(err);
      });
    },

    // * @ 圖層工具：OGC介接 取得服務
    getOgcHandler (current) {
      // const wmsUrl = this.$refs.wms.value;
      // const wmTsUrl = this.$refs.wmts.value;

      // WMS
      if (current === 0) {
        if (this.$refs.wms.value !== '') {
          this.wmsUrl = this.$refs.wms.value;
        } else {
          this.wmsUrl = 'https://wms.nlsc.gov.tw/wms';
        }

        this.wmsLayer = new sg.layers.WMSLayer(this.wmsUrl, {
          imageFormat: 'image/png',
          loadEffect: true,
          loaded: () => {
            this.ogcLayerCtrl(0);
          }
        });
      }

      // WMTS
      if (current === 1) {
        if (this.$refs.wmts.value !== '') {
          this.wmTsUrl = this.$refs.wmts.value;
        } else {
          this.wmTsUrl = 'https://wmts.nlsc.gov.tw/wmts';
        }

        this.wmTsLayer = new sg.layers.WMTSLayer(this.wmTsUrl, {
          serviceMode: 'KVP',
          loadEffect: true,
          loaded: () => {
            this.ogcLayerCtrl(1);
          }
        });
      }

      // pMapBase.AddLayer(this.wmTsLayer);
    },
    // * 圖層工具：OGC介接 取得WMS服務且載入完成後 進行處理
    ogcLayerCtrl (current) {
      // WMS
      if (current === 0) {
        this.wmsLayer.resourceInfo.layer.layers.forEach((item, index) => {
          const result = {
            title: item.title,
            id: index,
            visible: false,
            name: item.name
          };
          this.ogcOptions.layerList.push(result);
        });

        this.wmsLayer.visibleLayers = [];
      }

      // WMTS
      if (current === 1) {
        this.wmTsLayer.resourceInfo.layers.forEach((item, index) => {
          const result = {
            title: item.title,
            id: Math.random(),
            visible: false,
            name: item.identifier
          };
          this.ogcOptions.layerList.push(result);
        });

        this.wmTsLayer.visibleLayers = [];
      }

      // pMapBase.AddLayer(this.wmsLayer);
    },
    // * 圖層工具：OGC介接 單選checkbox
    selectMe (id) {
      this.ogcOptions.layerList.forEach((item) => {
        item.visible = false;
      });
      this.ogcOptions.layerList.forEach((item) => {
        if (item.id === id) {
          item.visible = true;
        }
      });
    },
    // * 圖層工具：OGC介接 加入WMS圖層
    addOgcLayer (current) {
      // WMS
      if (current === 0) {
        // 加入前先清除之前的圖層
        pMapBase.RemoveLayer(this.wmsLayer);
        pMapBase.RemoveLayer(this.wmTsLayer);
        pMapBase.RefreshMap(true);
        this.wmsLayer = new sg.layers.WMSLayer('https://wms.nlsc.gov.tw/wms', {
          imageFormat: 'image/png',
          loadEffect: true
        });
        this.wmsLayer.visibleLayers = [];

        setTimeout(() => {
          this.ogcOptions.layerList.forEach((item) => {
            if (item.visible === true) {
              this.wmsLayer.visibleLayers.push(item.name);
            }
          });

          pMapBase.AddLayer(this.wmsLayer);
          pMapBase.RefreshMap(true);
        }, 1000);
      }

      // WMTS
      if (current === 1) {
        // 加入前先清除之前的圖層
        pMapBase.RemoveLayer(this.wmsLayer);
        pMapBase.RemoveLayer(this.wmTsLayer);
        pMapBase.RefreshMap(true);
        this.wmTsLayer = new sg.layers.WMTSLayer('https://wmts.nlsc.gov.tw/wmts', {
          serviceMode: 'KVP',
          loadEffect: true
        });
        this.wmTsLayer.visibleLayers = [];

        setTimeout(() => {
          this.ogcOptions.layerList.forEach((item) => {
            if (item.visible === true) {
              this.wmTsLayer.visibleLayers.push(item.name);
              this.wmTsLayer.layerInfo.identifier = item.name;
            }
          });

          pMapBase.AddLayer(this.wmTsLayer);
          pMapBase.RefreshMap(true);
        }, 1000);
      }
    },
    // * @ 圖層工具：OGC介接 清除全部
    clearOgcLayer () {
      pMapBase.RemoveLayer(this.wmsLayer);
      pMapBase.RemoveLayer(this.wmTsLayer);
      this.ogcOptions.layerList = [];
      pMapBase.RefreshMap(true);
    },
    // * @ 截圖工具：JPG下載
    downloadJPG () {
      this.loadModal = true;
      const node = this.$refs.mapBox;
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 加邊框
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(100, 48.5, 1300, 538);

      // 加上地圖
      const mapImg = new Image();
      domtoimage.toPng(node, { quality: 0.95 })
        .then((dataUrl) => {
          mapImg.src = dataUrl;
        });

      mapImg.onload = function () {
        ctx.drawImage(mapImg, 100, 48.5, 1300, 538);
        console.log('地圖');
      };

      ctx.globalCompositeOperation = 'destination-over';

      setTimeout(() => {
        // 加上指北針圖
        const imgObj = new Image();
        imgObj.src = require('~/assets/img/compass.png');
        imgObj.onload = function () {
          ctx.drawImage(imgObj, 1250, 60);
          console.log('指北針');
        };

        // 加標題
        const textWidth = ctx.measureText(this.screenTitle).width;
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.fillText(this.screenTitle, (canvas.width / 2) - (textWidth / 2) - 80, 30);

        // 加比例尺
        ctx.globalCompositeOperation = 'source-over';

        const scale = document.getElementById('ScaleTools');
        const scaleImg = new Image();
        domtoimage.toPng(scale, { quality: 0.95 })
          .then((dataUrl) => {
            scaleImg.src = dataUrl;
          });
        scaleImg.onload = () => {
          ctx.drawImage(scaleImg, 100, 550);
          console.log('比例尺');

          canvas.toBlob((blob) => {
            saveAs(blob, 'iamap.jpg');
            console.log('印出來');

            this.loadModal = false;
            this.openPicPage();
          });
        };

        // 加日期
        ctx.font = '13px sans-serif';
        const date = new Date();
        const nowDate = `列印時間 : ${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        ctx.fillText(nowDate, 1290, 610);
        // console.log('日期');

        // 加版權
        ctx.fillText('地圖平台 : 農田水利署地理空間處理平台', 235, 610);
      }, 6000);

      // setTimeout(() => {
      //   canvas.toBlob(function (blob) {
      //     saveAs(blob, 'iamap.jpg');
      //     console.log('印出來');
      //   });
      // }, 7000);
    },
    // * @ 截圖工具：PDF下載
    downloadPDF () {
      this.loadModal = true;
      const node = this.$refs.mapBox;
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      window.jsPDF = window.jspdf.jsPDF;
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('l', 'px', [canvas.width, canvas.height]);

      // 加上地圖
      const mapImg = new Image();
      domtoimage.toPng(node, { quality: 0.95 })
        .then((dataUrl) => {
          mapImg.src = dataUrl;
        });
      mapImg.style.border = '2px solid #EA0000';

      mapImg.onload = () => {
        ctx.drawImage(mapImg, 100, 48.5, 1300, 538);
        console.log('地圖');

        // =============
        ctx.globalCompositeOperation = 'destination-over';

        // 加上指北針圖
        const imgObj = new Image();
        imgObj.src = require('~/assets/img/compass.png');
        imgObj.onload = function () {
          ctx.drawImage(imgObj, 1250, 60);
          console.log('指北針');
        };

        // 加標題
        const textWidth = ctx.measureText(this.screenTitle).width;
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.fillText(this.screenTitle, (canvas.width / 2) - (textWidth / 2) - 80, 30);

        // 加比例尺
        ctx.globalCompositeOperation = 'source-over';

        const scale = document.getElementById('ScaleTools');
        const scaleImg = new Image();
        domtoimage.toPng(scale, { quality: 0.95 })
          .then((dataUrl) => {
            scaleImg.src = dataUrl;
          });
        scaleImg.onload = () => {
          this.loadModal = false;

          ctx.drawImage(scaleImg, 100, 550);
          console.log('比例尺');

          const image = canvas.toDataURL();
          doc.addImage(image, 'JPEG', 0, 0, canvas.width, canvas.height);
          doc.save('iamap.pdf');
        };

        // 加日期
        ctx.font = '13px sans-serif';
        const date = new Date();
        const nowDate = `列印時間 : ${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        ctx.fillText(nowDate, 1290, 610);
        console.log('日期');

        // 加版權
        ctx.fillText('地圖平台 : 農田水利署地理空間處理平台', 235, 610);
      };

      // ctx.globalCompositeOperation = 'destination-over';

      // setTimeout(() => {
      //   // 加上指北針圖
      //   const imgObj = new Image();
      //   imgObj.src = require('~/assets/img/compass.png');
      //   imgObj.onload = function () {
      //     ctx.drawImage(imgObj, 1250, 60);
      //     console.log('指北針');
      //   };

      //   // 加標題
      //   const textWidth = ctx.measureText(this.screenTitle).width;
      //   ctx.font = '28px sans-serif';
      //   ctx.textAlign = 'center';
      //   ctx.fillStyle = '#000000';
      //   ctx.fillText(this.screenTitle, (canvas.width / 2) - (textWidth / 2) - 80, 30);

      //   // 加比例尺
      //   ctx.globalCompositeOperation = 'source-over';

      //   const scale = document.getElementById('ScaleTools');
      //   const scaleImg = new Image();
      //   domtoimage.toPng(scale, { quality: 0.95 })
      //     .then((dataUrl) => {
      //       scaleImg.src = dataUrl;
      //     });
      //   scaleImg.onload = () => {
      //     this.loadModal = false;

      //     ctx.drawImage(scaleImg, 100, 550);
      //     console.log('比例尺');

      //     const image = canvas.toDataURL();
      //     doc.addImage(image, 'JPEG', 0, 0, canvas.width, canvas.height);
      //     doc.save('iamap.pdf');
      //   };

      //   // 加日期
      //   ctx.font = '13px sans-serif';
      //   const date = new Date();
      //   const nowDate = `列印時間 : ${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      //   ctx.fillText(nowDate, 1290, 610);
      //   console.log('日期');

      //   // 加版權
      //   ctx.fillText('地圖平台 : 農田水利署地理空間處理平台', 235, 610);
      // }, 6000);
    },
    openPicPage () {
      const canvas = document.getElementsByTagName('canvas')[0];
      const myDataUrl = canvas.toDataURL();

      const nowUrl = window.location.href;
      const front = nowUrl.substring(0, nowUrl.length - 4);
      const end = 'showPic/';
      const myUrl = `${front}${end}`;

      window.open(myUrl);
      localStorage.setItem('picData', myDataUrl);
    },
    // * 回到全圖
    fullMapCtrl () {
      backFullMap();
    },
    // * 放大
    zoomInCtrl () {
      ZoomIn();
    },
    // * 縮小
    zoomOutCtrl () {
      ZoomOut();
    },
    // * 監測是否有localStorage傳來 有->接值進行繪圖
    getLocalStorage () {
      if (localStorage.getItem('oriData') !== null) {
        this.geoData = JSON.parse(localStorage.getItem('oriData'));

        // 先清除之前的
        pMapBase.drawingGraphicsLayer.remove(this.localGraphic);
        // 畫圖
        const geometry = sg.geometry.Geometry.fromGeoJson(this.geoData);
        this.localGraphic = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) });
        pMapBase.drawingGraphicsLayer.add(this.localGraphic);
        // 定位
        const extent = geometry.extent;
        pMapBase.ZoomMapTo(extent);
        ZoomOut();
        pMapBase.getTransformation().FitLevel();
        pMapBase.RefreshMap(true);
        // 清空localStorage
        localStorage.clear();
      }
    }

  },
  computed: {
    // sortSurfaceList () {
    //   this.layerOptions.surfaceList.sort((a, b) => { return a.id < b.id; });
    // }
  },
  watch: {
    'searchResult.channel': {
      handler (value) {
        if (value !== '') {
          this.$store.commit('HIDE_FOOTER_CTRL', true);
        } else {
          this.$store.commit('HIDE_FOOTER_CTRL', false);
        }
      }
    },
    // 'layerOptions.surfaceList': {
    //   handler (value) {
    //     this.layerOptions.surfaceList.sort((a, b) => { return a.id > b.id ? 1 : -1; });
    //   }
    // },
    activeWindow: {
      handler (value) {
        // 只會載入一次 new MeasureTool
        if (value === 'geoMeasureWindow' && this.openOnce === true) {
          this.openOnce = false;
          this.drawTool = new MeasureToolXX('', pMapBase);
        }
        // 打開測量視窗預設啟動長度測量
        if (value === 'geoMeasureWindow' && this.openLine === true) {
          drawTypee = 'LINESTRING';
          myUnit = 'Meters';
          myUnitNum = 1;
          this.drawTool.ActiveMeasureTool('LINESTRING');
        }
        // 從測量視窗切換至其他視窗
        if (value !== 'geoMeasureWindow' && this.openOnce === false) {
          this.openLine = true;
          this.drawTool.ClearMap();
          this.drawTool.ActiveMeasureTool();
        }
        // 開啟街景工具
        if (value === 'streetMapWindow' && this.openOnceStreet === true) {
          this.streetMap = new GoogleStreetMap();
          this.openOnceStreet = false;
        }
        if (value === 'streetMapWindow') {
          document.getElementsByTagName('body')[0].style.cursor = "url('images/pegman-cursor.png'), auto";
          this.streetMap.openStrMap(true);
        } else {
          this.streetMap = new GoogleStreetMap();
          document.getElementsByTagName('body')[0].style.cursor = 'default';
          this.streetMap.openStrMap(false);
        }
        // 點線面圖資載入
        if (value === 'switchLayersWindow' && this.openOnceLa === true) {
          if (allMBT.length < 1) { return; }
          // 圖磚1
          allMBT.forEach((itemBT) => {
            if (itemBT.Style === undefined) { return; }
            Object.keys(itemBT.Style.subs).forEach((key) => {
              // console.log(key);
              // console.log(itemBT.Style[key]);
              const mName = key.substring(3);

              let newList = [];
              const long = key.split('_');
              if (long.length === 2) {
                newList = iaList.map(item => `${item}_${mName}`);
              }

              const result = {
                id: Math.random(),
                LayerName: newList,
                visible: false,
                opacity: 100,
                LayerTitle: '',
                type: [],
                allShow: true
              };

              if (mName === 'Ia' && this.getIa === false) {
                if (itemBT.Style.subs[key].paint === undefined) { return; }

                this.getIa = true;
                result.LayerTitle = '管理處';
                result.visible = true;
                result.opacity = 50;
                result.id = 71;
                this.layerOptions.surfaceList.push(result);

                const newArr = [];
                const res = {
                  id: Math.random(),
                  name: '',
                  visible: true,
                  subId: 'Ia_cns',
                  bgColor: itemBT.Style.subs[key].paint['fill-color'],
                  border: itemBT.Style.subs[key].paint['fill-outline-color']
                };
                newArr.push(res);

                result.type = newArr;
              }
              if (mName === 'Mng' && this.getMng === false) {
                if (itemBT.Style.subs[key].paint === undefined) { return; }

                this.getMng = true;
                result.LayerTitle = '管理分處';
                result.opacity = 50;
                result.id = 72;
                this.layerOptions.surfaceList.push(result);

                const newArr = [];
                const res = {
                  id: Math.random(),
                  name: '',
                  visible: true,
                  subId: 'Mng_cns',
                  bgColor: itemBT.Style.subs[key].paint['fill-color'],
                  border: itemBT.Style.subs[key].paint['fill-outline-color']
                };
                newArr.push(res);

                result.type = newArr;
              }
              if (mName === 'Stn' && this.getStn === false) {
                if (itemBT.Style.subs[key].paint['fill-color'] === undefined) { return; }

                this.getStn = true;
                result.LayerTitle = '工作站';
                result.opacity = 50;
                result.id = 73;
                this.layerOptions.surfaceList.push(result);

                const newArr = [];
                itemBT.Style.subs[key].paint['fill-color'].forEach((item, index, array) => {
                  if (index % 2 === 1 && index !== array.length - 1) {
                    const res = {
                      id: Math.random(),
                      name: item[2],
                      visible: true,
                      subId: 'Stn',
                      picStn: ''
                    };
                    res.picStn = array[index + 1];

                    newArr.push(res);
                  }
                });

                result.type = newArr;
              }

              if (mName === 'Period' && this.getPeriod === false) {
                if (itemBT.Style.subs[key].paint['fill-color'] === undefined) { return; }

                this.getPeriod = true;
                result.LayerTitle = '期作別';
                result.opacity = 50;
                result.id = 76;
                this.layerOptions.surfaceList.push(result);

                const newArr = [];
                itemBT.Style.subs[key].paint['fill-color'].forEach((item, index, array) => {
                  if (index % 2 === 1 && index !== array.length - 1) {
                    const res = {
                      id: Math.random(),
                      name: item[2],
                      visible: true,
                      subId: 'Period_cns',
                      picPeriod: ''
                    };
                    res.picPeriod = array[index + 1];

                    newArr.push(res);
                  }
                });

                result.type = newArr;
              }
              if (mName === 'Pool' && this.getPool === false) {
                if (itemBT.Style.subs[key].paint === undefined) { return; }

                this.getPool = true;
                result.LayerTitle = '埤塘';
                result.opacity = 50;
                result.id = 80;
                this.layerOptions.surfaceList.push(result);

                const newArr = [];
                const res = {
                  id: Math.random(),
                  name: '',
                  visible: true,
                  subId: 'Pool_cns',
                  bgColor: itemBT.Style.subs[key].paint['fill-color'],
                  border: itemBT.Style.subs[key].paint['fill-outline-color']
                };
                newArr.push(res);

                result.type = newArr;
              }
            });
          });

          // 圖磚2
          allMBTX.forEach((itemBT) => {
            if (itemBT.Style === undefined) { return; }
            Object.keys(itemBT.Style.subs).forEach((key) => {
              const mName = key.substring(3);

              let newList = [];
              const long = key.split('_');
              if (long.length === 2) {
                newList = iaList.map(item => `${item}_${mName}`);
              }

              const result = {
                id: Math.random(),
                LayerName: newList,
                visible: false,
                opacity: 100,
                LayerTitle: '',
                type: [],
                allShow: true
              };

              if (mName === 'Cons' && this.getCons === false) {
                if (itemBT.Style.subs[key].layout['icon-image'] === undefined) { return; }

                this.getCons = true;
                result.LayerTitle = '水工構造物';
                this.layerOptions.pointList.push(result);

                const newArr = [];
                itemBT.Style.subs[key].layout['icon-image'].forEach((item, index, array) => {
                  if (index % 2 === 1 && index !== array.length - 1) {
                    const res = {
                      id: Math.random(),
                      name: item[2],
                      visible: true,
                      subId: 'Name',
                      picCons: item[2]
                    };

                    newArr.push(res);
                  }
                });

                result.type = newArr;
              }

              if (mName === 'Canal' && this.getCanal === false) {
                if (itemBT.Style.subs[key].paint === undefined) { return; }
                if (itemBT.Style.subs[key].paint['line-color'] === undefined) { return; }

                this.getCanal = true;
                result.LayerTitle = '渠道';
                this.layerOptions.lineList.push(result);

                const newArr = [];
                itemBT.Style.subs[key].paint['line-color'].forEach((item, index, array) => {
                  if (index % 2 === 1 && index !== array.length - 1) {
                    const res = {
                      id: Math.random(),
                      name: item[2],
                      visible: true,
                      subId: 'Sys_cls',
                      picCanal: ''
                    };
                    res.picCanal = array[index + 1];

                    newArr.push(res);
                  }
                });

                result.type = newArr;
              }

              if (mName === 'Grp' && this.getGrp === false) {
                if (itemBT.Style.subs[key].paint === undefined) { return; }

                this.getGrp = true;
                result.LayerTitle = '小組';
                result.opacity = 50;
                result.id = 74;
                this.layerOptions.surfaceList.push(result);

                const newArr = [];
                const res = {
                  id: Math.random(),
                  name: '',
                  visible: true,
                  subId: 'Grp_cns',
                  bgColor: itemBT.Style.subs[key].paint['fill-color'],
                  border: itemBT.Style.subs[key].paint['fill-outline-color']
                };
                newArr.push(res);

                result.type = newArr;
              }
              if (mName === 'Rot' && this.getRot === false) {
                if (itemBT.Style.subs[key].paint === undefined) { return; }

                this.getRot = true;
                result.LayerTitle = '輪區';
                result.opacity = 50;
                result.id = 75;
                this.layerOptions.surfaceList.push(result);

                const newArr = [];
                const res = {
                  id: Math.random(),
                  name: '',
                  visible: true,
                  subId: 'Rot_cns',
                  bgColor: itemBT.Style.subs[key].paint['fill-color'],
                  border: itemBT.Style.subs[key].paint['fill-outline-color']
                };
                newArr.push(res);

                result.type = newArr;
              }
            });
          });

          this.layerOptions.surfaceList.sort((a, b) => { return a.id > b.id ? 1 : -1; });

          this.openOnceLa = false;
        }
      }
    }
  }
};
</script>

<style lang="scss">

  @import '~/assets/scss/components/_map.scss';

  // .map {
  //   width: 100%;
  //   height: 100%;
  //   background-color: pink;
  //   z-index: -1;
  // }

  @keyframes dash-cycle-ani {
    100% {
      stroke-dashoffset: 0;
    }
  }

  .modal_wrapper666666 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000000000;
    cursor: default;
    display: none;
  }

  .modal666666 {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    transform: translate(-50%, -50%);
    flex-direction: column;
    background: url('~/assets/img/loading_icon.svg') no-repeat center/contain;
  }

  .modal_wrapper888888 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000000000;
    cursor: default;
  }

  .modal888888 {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    transform: translate(-50%, -50%);
    flex-direction: column;
    background: url('~/assets/img/loading_icon.svg') no-repeat center/contain;
  }

  .scbar_wrap {
    position: absolute;
    bottom: 28px;
    left: 9px;
  }

  .canvasShot {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -2000;
  }

  .mapWrap {

    .border_bot {
    height: 1px;
    background: $light-green;
    width: calc(100% - 4.5px);
  }

  .hide_button_bigTable {
    background: $main-green;
    text-align: center;
    width: 250px;
    padding: 8.5px 0;
    color: white;
    cursor: pointer;
    position: absolute;
    top: -34px;
    border-radius: 0 22px 0 0;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -7px;
    }

    p::before {
      content: '';
      width: 18px;
      height: 18px;
      background: url('~/assets/img/down-white-triangle.svg') no-repeat right/contain;
      display: inline-block;
      margin-right: 7px;
    }
  }

  .up_arrow::before {
    background: url('~/assets/img/white-triangle.svg') no-repeat right/contain !important;
  }

  .hide_block66 {
    transition: transform 0.4s;
    // transform: translateY(62.5%);
    transform: translateY(100%);
  }

  .show_block {
    transition: transform 0.4s;
    transform: translateY(0);
  }

  .table_wrap {
    padding: 10px;
  }

  .reduceHeight {
    height: calc(100vh - 91px) !important;
  }

  .main{
    position: relative;
    width: 100%;
    height: calc(100vh - 91px);
    overflow: hidden;
    z-index: 0;
    // background: pink;
  }

  .layerwindow {
    width: 363px;
    //max-height: 440.2px;
    max-height: 421px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .layer__list {

    .layer__item:nth-child(odd) {
      background-color:#F5F5F5;
    }
  }

  .layer__item {
    @include noto-sans-tc-16-medium;
  }

  .btn_group_wms {
    display: flex;
    border-radius: 5px;

    .btn {
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 13px;
      font-family: "Noto Sans TC";
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      color: rgba(73, 73, 73, 1);
      text-align: center;
      background-color: rgba(226, 228, 228, 1);
      border: 2px solid #e2e4e4;
      cursor: pointer;
    }

    .current {
      background-color: rgba(255, 224, 177, 1);
      border: 2px solid rgba(234, 181, 101, 1);
    }

    .btn:nth-child(1) {
      border-radius: 5px 0 0 5px;
    }

    .btn:nth-child(2) {
      border-radius: 0 5px 5px 0;
    }
  }

  .bt_wrapOGC {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #959595;
  }

  .button-primary , .button-default {
    // width: 64px;

    .button-text {
      font-weight: 100;
    }
  }

  .ogc__list {
    @include noto-sans-tc-16-medium;

    .title_name {
      margin: 5px 0;
    }

    textarea {
      resize: none;
      width: 359px;
      height: 25px;
      border-radius: 5px;
      border: 1px solid #959595;
      color: #494949;
      font-size: 16px;
      padding: 5px 0 3px;
    }

    .ogc_table1 {
      border: 1px solid #C4DED8;
      margin-top: 9px;

      input {
        margin-right: 15px;
      }

      .og_item {
        padding: 8px 0;
        color: #494949;
        padding-left: 7px;
        @include noto-sans-tc-16-regular-line16;
      }

      .og_item:nth-child(even) {
        background-color: #F5F5F5;
      }

      .og_item_wrap {
        height: 140px;
        overflow-y: scroll;
      }
    }

    .ogc_allbtn {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;

      div:nth-child(2) {
        margin-left: 10px;
      }
    }

    .og_title {
        border-bottom:  5px solid #3E9F88;
        padding: 7px 0;
        padding-left: 7px;
        @include noto-sans-tc-16-medium;
    }

    .title {
      color: $header-black;
      @include noto-sans-tc-16-medium;
    }

    .ogc_table2 {
      border: 1px solid #C4DED8;
      margin-top: 9px;

      .og_title {
        padding-left: 15px;
      }
    }
  }

  .no_filemm {
    background-color: #EFF4F3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #3E9F88;
    padding: 10px 0;
    @include noto-sans-tc-16-regular;
  }

  .shp__list {

    @include noto-sans-tc-16-regular;
    .tit {
      width: 386px;
      color:  #595959;
      margin-top: 7px;
    }

    .bt_wrap {
      border: none;
      display: flex;
      justify-content: flex-end;
      padding-bottom: 10px;
    }
  }

  .street_wrap {
    width: 310px;
    padding: 10px 20px 0 20px;
    color: #595959;
    @include noto-sans-tc-16-regular;
  }

  .result_table {
    position: absolute;
    bottom: 0;
    left: 0;
    background: white;
    z-index: 100000;
    width: 100%;
    // height: 430px;
  }

  .checkBoxOption{
  input[type="checkbox"] {
    display:none;
  }
  input[type="checkbox"] + label
  {
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
    @include checkbox;
  }
  input[type="checkbox"]:checked + label
  {
    background: url("~/assets/img/check.svg");
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
}

  }

</style>
