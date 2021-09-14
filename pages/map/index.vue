<template>
  <div class="wrapper">
    <Header-component />
    <div class="main">
      <div class="side_bar">
        <Feature-component />
      </div>
      <DragBox-component
        :name="'圖層工具'"
        :icon-name="'icon-layer-ctrl'"
      >
        <template #content>
          <div class="navtabs__header">
            <div
              v-for="typeItem of layerOptions.typeList"
              :key="typeItem.id"
              class="navtabs__btn"
              :class="{ 'current': layerOptions.current === typeItem.id }"
              @click.stop="layerOptions.current = typeItem.id"
            >
              {{ typeItem.name }}
            </div>
          </div>
          <div class="navtabs__content">
            <div
              v-if="layerOptions.current === 1"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.surfaceList"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  :item="item"
                  @changeVisible="layerVisibleCtrl"
                  @setAllVisible="allLayerVisibleCtrl"
                />
              </div>
            </div>

            <div
              v-if="layerOptions.current === 4"
              class="shp__list"
            >
              <div class="btn_group_wms">
                <div
                  v-for="typeItem of shpOptions.typeList"
                  :key="typeItem.id"
                  class="btn"
                  :class="{ 'current': shpOptions.current === typeItem.id }"
                  @click.stop="shpOptions.current = typeItem.id"
                >
                  {{ typeItem.name }}
                </div>
              </div>
            </div>

            <div
              v-if="layerOptions.current === 5"
              class="ogc__list"
            >
              <div class="btn_group_wms">
                <div
                  v-for="typeItem of ogcOptions.typeList"
                  :key="typeItem.id"
                  class="btn"
                  :class="{ 'current': ogcOptions.current === typeItem.id }"
                  @click.stop="ogcOptions.current = typeItem.id"
                >
                  {{ typeItem.name }}
                </div>
              </div>
              <p class="title_name">
                服務路徑
              </p>
              <textarea
                name="value"
                :placeholder="ogcOptions.holder"
              />
              <div class="bt_wrap">
                <div
                  class="button-primary"
                  @click="getOgcHandler"
                >
                  <p class="button-text">
                    取得服務
                  </p>
                </div>
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
                <div class="og_item_wrap">
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
                <div
                  class="button-default"
                  @click="clearOgcLayer"
                >
                  <p class="button-text">
                    清除全部
                  </p>
                </div>
                <div class="button-primary right">
                  <p class="button-text">
                    加入圖層
                  </p>
                </div>
              </div>
              <div />
            </div>
          </div>
        </template>
      </DragBox-component>
      <NavTabs-component />
    </div>
    <!-- <Footer-component /> -->
  </div>
</template>

<script>
import Header from '~/components/model/Header';
// import Footer from '~/components/model/Footer';
import NavTabs from '~/components/tools/NavTabs.vue';
import Feature from '~/components/Feature.vue';
import DragBox from '~/components/DragBox.vue';
import LayerItem from '~/components/LayerItem.vue';

export default {
  components: {
    'Header-component': Header,
    // 'Footer-component': Footer,
    'NavTabs-component': NavTabs,
    'Feature-component': Feature,
    'DragBox-component': DragBox,
    'LayerItem-component': LayerItem
  },
  data () {
    return {
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
        surfaceList: []
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
  mounted () {
    const surface = require('~/static/surfaceLayer.json');
    this.layerOptions.surfaceList = [...surface.data];
  },
  methods: {
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
    // * @ 圖層工具：OGC介接 取得服務
    getOgcHandler () {
      this.ogcOptions.layerList = this.testData;
    },
    // * @ 圖層工具：OGC介接 清除全部
    clearOgcLayer () {
      this.ogcOptions.layerList = [];
    }
  }
};
</script>

<style lang="scss" scoped>

  .main{
    position: relative;
    border: 1px solid red;
    // height: calc(100vw - 106px);
  }

  .side_bar {
    position: absolute;
    right: 10px;
    top: 12px;
  }

  .navtabs__header {
    width: 420px;
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
      .right {
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

</style>
