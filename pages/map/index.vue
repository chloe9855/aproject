<template>
  <div class="wrapper">
    <div
      class="main"
      :class="{ 'reduceHeight': $store.state.hideFooter === true }"
    >
      <Feature-component
        :current="activeWindow"
        @select="payload => activeWindow = payload"
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
            <div
              v-if="layerOptions.current === 0"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.surfaceList"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  :item="item"
                  :drop-down="true"
                  @changeVisible="layerVisibleCtrl"
                  @setAllVisible="allLayerVisibleCtrl"
                />
              </div>
            </div>
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
                  :item="item"
                  :drop-down="true"
                  @changeVisible="layerVisibleCtrl"
                  @setAllVisible="allLayerVisibleCtrl"
                />
              </div>
            </div>
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
                  :item="item"
                  :drop-down="true"
                  @changeVisible="layerVisibleCtrl"
                  @setAllVisible="allLayerVisibleCtrl"
                />
              </div>
            </div>
            <div
              v-if="layerOptions.current === 3"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.surfaceList"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  :item="item"
                  :drop-down="false"
                  @changeVisible="layerVisibleCtrl"
                  @setAllVisible="allLayerVisibleCtrl"
                />
              </div>
            </div>

            <div
              v-if="layerOptions.current === 4"
              class="shp__list"
            >
              <SwitchTabs-component
                :selected="shpOptions.current"
                :type-list="shpOptions.typeList"
                @current="payload => shpOptions.current = payload"
              />
              <p class="tit">
                請以 .zip 封存檔案，.zip檔案內需含有.shp .shx .dbf .prj 四種檔案類型
              </p>
              <div class="bt_wrap">
                <Buttons-component
                  :name="'button-add'"
                  :text="'新增圖層'"
                  :add="true"
                  @click="addShpLayer"
                />
              </div>

              <div v-if="shpOptions.layerList.length >= 1">
                <ShpItem-component
                  :item="shpOptions.layerList[0]"
                  @changeVisible="layerVisibleCtrl"
                  @delete="deleteShpLayer"
                />
              </div>
              <div
                v-if="shpOptions.layerList.length < 1"
                class="no_file"
              >
                <img :src="require('~/assets/img/no-file.svg')">
                <p>尚未取得服務</p>
              </div>
            </div>

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
                name="value"
                :placeholder="ogcOptions.holder"
              />
              <div class="bt_wrap">
                <Buttons-component
                  :text="'取得服務'"
                  @click="getOgcHandler"
                />
              </div>

              <div
                v-if="ogcOptions.layerList.length >= 1"
                class="ogc_table1"
              >
                <div class="og_title">
                  <label class="title">
                    <input type="checkbox">
                    圖層名稱
                  </label>
                </div>
                <div class="og_item_wrap theme_scrollbar">
                  <div
                    v-for="ogItem in ogcOptions.layerList"
                    :key="ogItem.id"
                    class="og_item"
                  >
                    <label class="title">
                      <input type="checkbox">
                      {{ ogItem.name }}
                    </label>
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
                <div class="no_file">
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
          <PositionNav-component />
        </template>
      </DragBox-component>

      <!--     測量工具      -->
      <DragBox-component
        v-if="ctrlDragBoxVisible('geoMeasureWindow')"
        :name="'測量工具'"
        :icon-name="'icon-geo-measure'"
        @close="activeWindow = ''"
      >
        <template #content>
          <GeoMeasure-component />
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
          <ScreenShot-component />
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
        @search="searchHandler"
        @clear="clearSearchResult"
      />
      <div
        v-if="searchResult.channel !== ''"
        class="result_table"
        :class="{'hide_block': hideResult, 'show_block': !hideResult}"
      >
        <div
          class="hide_button"
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
          <Table-component
            :table-column="searchResult.channel"
            :is-check="false"
            :is-map="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Footer from '~/components/model/Footer';
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
import Table from '~/components/model/Table.vue';

export default {
  components: {
    // 'Footer-component': Footer,
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
    'Table-component': Table
  },
  data () {
    return {
      // * 目前所選取的功能視窗
      activeWindow: '',
      searchResult: {
        channel: ''
      },
      hideResult: false,
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
        surfaceList: [],
        lineList: []
      },
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
        holder: 'https://irrggis2.aerc.org.tw/arcgis/services/Aerc/03Ia/MapServer/WMSServer',
        layerList: []
      },
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
        layerList: []
      },
      testData: [
        {
          name: 'yayayaya',
          id: 0
        },
        {
          name: 'lsls',
          id: 1
        },
        {
          name: 'dfzsg',
          id: 2
        },
        {
          name: 'fdgdg',
          id: 3
        },
        {
          name: 'ghfdh',
          id: 4
        }
      ]
    };
  },
  // layout: 'map',
  mounted () {
    const surface = require('~/static/surfaceLayer.json');
    const line = require('~/static/lineLayer.json');
    this.layerOptions.surfaceList = [...surface.data];
    this.layerOptions.lineList = [...line.data];
  },
  methods: {
    // * 控制視窗顯示
    ctrlDragBoxVisible (payload) {
      // @DragBox：電腦版可以在畫面上任意移動的 component
      return this.activeWindow === payload;
    },
    // * @ 左側搜尋
    searchHandler () {
      const data = require('~/static/channel.json');
      this.searchResult.channel = data;
    },
    // * @ 清除搜尋結果
    clearSearchResult () {
      this.searchResult.channel = '';
      this.hideResult = false;
    },
    // * @ 圖層工具：切換圖層顯示
    layerVisibleCtrl ($event, id) {
      console.log(id);
      console.log($event);
    },
    // * @ 圖層工具：全部顯示/關閉
    allLayerVisibleCtrl ($event, id) {
      // 拿到的id是渠道的id
      console.log(id);
      console.log($event);
      const index = this.layerOptions.surfaceList.findIndex(item => item.id === id);
      this.layerOptions.surfaceList[index].type.forEach((item) => {
        item.visible = $event;
      });
    },
    // * @ 圖層工具：臨時展繪 新增圖層
    addShpLayer () {
      const result = {
        id: '5623355',
        name: '縣市界',
        visible: true,
        opacity: 50
      };
      this.shpOptions.layerList.push(result);
    },
    // * @ 圖層工具：臨時展繪 刪除圖層
    deleteShpLayer () {
      this.shpOptions.layerList = [];
    },
    // * @ 圖層工具：OGC介接 取得服務
    getOgcHandler () {
      this.ogcOptions.layerList = this.testData;
    },
    // * @ 圖層工具：OGC介接 清除全部
    clearOgcLayer () {
      this.ogcOptions.layerList = [];
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>

  // .map {
  //   width: 100%;
  //   height: 100%;
  //   background-color: pink;
  //   z-index: -1;
  // }

  .hide_button {
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

  .hide_block {
    transition: transform 0.4s;
    transform: translateY(62.5%);
  }

  .show_block {
    transition: transform 0.4s;
    transform: translateY(0);
  }

  .table_wrap {
    padding: 10px;
  }

  .reduceHeight {
    height: calc(100vh - 66px) !important;
  }

  .main{
    position: relative;
    width: 100%;
    height: calc(100vh - 86px);
    overflow: hidden;
    z-index: 0;
    background: pink;
  }

  .layerwindow {
    width: 380px;
    max-height: 440.2px;
    overflow-y: auto;
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

  .bt_wrap {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #959595;
  }

  .button-primary , .button-default {
    width: 64px;

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
      width: 380px;
      height: 58px;
      border-radius: 5px;
      border: 1px solid #959595;
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
    }

    .ogc_table2 {
      border: 1px solid #C4DED8;
      margin-top: 9px;

      .og_title {
        padding-left: 15px;
      }
    }
  }

  .no_file {
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
    height: 430px;
  }

  .checkBoxOption{
  input[type="checkbox"] {
    display:none;
  }
  input[type="checkbox"] + label
  {
    background: #999;
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
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

</style>
