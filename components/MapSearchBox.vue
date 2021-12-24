<template>
  <div
    class="search_container"
    @mouseover="getMyIaList"
  >
    <div
      class="search_box"
      :class="{'no_radius': (columnList.length >= 1 || allClickData.length >= 1) && (barOptions.current === 0 || barOptions.current === 3) }"
    >
      <NavTabs
        :type-list="barOptions.typeList"
        :selected="barOptions.current"
        @current="payload => barOptions.current = payload"
      />
      <keep-alive>
        <component
          :is="componentInstance"
          :all-ia-list="myIaList"
          :click-map-list="ListCS"
          @channelSearch="getChannelData"
          @keywordSearch="getKeywordData"
          @clickSearch="getClickData"
          @clearKeyword="clearKeywordData"
          @clearCliSearch="clearClickData"
          @clear="$emit('clear')"
        />
      </keep-alive>
    </div>
    <div
      v-if="columnList.length >= 1 && barOptions.current === 0"
      class="content_block"
      :class="{'hide_VVblock': hideResult, 'show_block': !hideResult}"
    >
      <p class="title">
        屬性表格
      </p>
      <div class="table_block_wrap">
        <div class="table_block theme_scrollbar">
          <table>
            <tbody>
              <tr
                v-for="item in columnList"
                :key="item.id"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="hide_button"
        @click="hideResult = !hideResult"
      >
        <p
          v-if="hideResult"
          :class="{'down_arrow': hideResult }"
        >
          顯示查詢結果
        </p>
        <p
          v-if="!hideResult"
          :class="{'down_arrow': hideResult }"
        >
          隱藏查詢結果
        </p>
      </div>
    </div>

    <!--  點擊查詢結果  -->
    <div
      v-if="allClickData.length >= 1 && barOptions.current === 3"
      class="content_block"
      :class="{'hide_VVblock': hideResult2, 'show_block': !hideResult2}"
    >
      <div
        v-if="allClickData[0].name !== 'noResult'"
        style="height: 100%;"
      >
        <p class="title">
          屬性表格 {{ blockTitle }}
        </p>
        <div class="table_block_wrap">
          <div class="table_block theme_scrollbar">
            <table>
              <tbody>
                <tr
                  v-for="(item, index) in allClickData"
                  :key="index"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        v-if="allClickData[0].name === 'noResult'"
        class="nores"
      >
        <img :src="require('~/assets/img/no_data.svg')">
        <p>查無資料</p>
      </div>
      <div
        class="hide_button"
        @click="hideResult2 = !hideResult2"
      >
        <p
          v-if="hideResult2"
          :class="{'down_arrow': hideResult2 }"
        >
          顯示查詢結果
        </p>
        <p
          v-if="!hideResult2"
          :class="{'down_arrow': hideResult2 }"
        >
          隱藏查詢結果
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';
import ChannelSearch from '~/components/model/MapSearchBox/ChannelSearch.vue';
import ClickSearch from '~/components/model/MapSearchBox/ClickSearch.vue';
import KeyWordSearch from '~/components/model/MapSearchBox/KeyWordSearch.vue';
import StakeSearch from '~/components/model/MapSearchBox/StakeSearch.vue';

export default {
  components: {
    NavTabs,
    ChannelSearch,
    ClickSearch,
    KeyWordSearch,
    StakeSearch
  },
  data () {
    return {
      hideResult: false,
      hideResult2: false,
      barOptions: {
        current: 0,
        typeList: [
          {
            name: '關鍵字查詢',
            id: 0
          },
          {
            name: '渠道查詢',
            id: 1
          },
          {
            name: '樁號查詢',
            id: 2
          },
          {
            name: '點擊查詢',
            id: 3
          }
        ]
      },
      searchResult: {
        channel: ''
      },
      myIaList: '',
      //* 關鍵字查詢 屬性資料表格
      columnList: [],
      backList: [],
      //* 第一次按下點擊查詢
      openOnceCS: true,
      ListCS: [],
      //* 點擊查詢
      allClickData: [],
      consData: [],
      iaData: [],
      canalData: [],
      stnData: [],
      grpData: [],
      mngData: [],
      poolData: [],
      rotData: [],
      periodData: [],
      sectionData: [],
      sec5Data: [],
      blockTitle: '',
      userId: '',
      //* 渠道查詢
      newSection: [],
      newIa: [],
      newMng: [],
      newStn: [],
      newGrp: [],
      newRot: [],
      newPeriod: [],
      newPool: [],
      newSec5cov: []

    };
  },
  name: 'MapSearchBox',
  mounted () {
    this.userId = sessionStorage.getItem('loginUser');
    // this.getIaList();

    const data = require('~/static/channel.json');
    this.searchResult.channel = data;

    const data1 = require('~/static/singleLand.json');
    this.backList = data1.data;

    const data2 = require('~/static/clickCons.json');
    this.consData = data2.data;

    const data3 = require('~/static/clickIa.json');
    this.iaData = data3.data;
    this.newIa = data3.data.map(item => {
      return { title: item.name };
    });

    const data4 = require('~/static/clickCanal.json');
    this.canalData = data4.data;

    const data5 = require('~/static/clickStn.json');
    this.stnData = data5.data;
    this.newStn = data5.data.map(item => {
      return { title: item.name };
    });

    const data6 = require('~/static/clickGrp.json');
    this.grpData = data6.data;
    this.newGrp = data6.data.map(item => {
      return { title: item.name };
    });

    const data7 = require('~/static/clickPeriod.json');
    this.periodData = data7.data;
    this.newPeriod = data7.data.map(item => {
      return { title: item.name };
    });

    const data8 = require('~/static/clickMng.json');
    this.mngData = data8.data;
    this.newMng = data8.data.map(item => {
      return { title: item.name };
    });

    const data9 = require('~/static/clickPool.json');
    this.poolData = data9.data;
    this.newPool = data9.data.map(item => {
      return { title: item.name };
    });

    const data10 = require('~/static/clickRot.json');
    this.rotData = data10.data;
    this.newRot = data10.data.map(item => {
      return { title: item.name };
    });

    const data11 = require('~/static/AddSection.json');
    this.sectionData = data11.data;
    this.newSection = data11.data.map(item => {
      return { title: item.name };
    });

    const data12 = require('~/static/AddSec5cov.json');
    this.sec5Data = data12.data;
    this.newSec5cov = data12.data.map(item => {
      return { title: item.name };
    });
  },
  methods: {
    // * @ 取得管理處資料
    getMyIaList () {
      if (vueIa !== null) {
        const arr = vueIa;
        arr.forEach((item) => {
          item.value = item.FID;
          item.title = item.Ia_cns;
        });

        this.myIaList = arr;
        this.$emit('iaList', this.myIaList);
      }
    },
    // // * @ 取得管理處資料
    // getIaList () {
    //   fetch(`/AERC/rest/Ia/${this.userId}`, {
    //     method: 'POST',
    //     headers: new Headers({
    //       'Content-Type': 'application/json'
    //     }),
    //     body: JSON.stringify({

    //     })
    //   }).then((response) => {
    //     return response.json();
    //   }).then((data) => {
    //     console.log(data);

    //     data.forEach((item) => {
    //       item.value = item.FID;
    //       item.title = item.Ia_cns;
    //     });
    //     this.myIaList = data;
    //     this.$emit('iaList', this.myIaList);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // },
    // * @ 點擊查詢 : 取得屬性資料表格
    getClickData (id, info, title) {
      if (info === undefined || info === '') {
        this.allClickData = [
          { name: 'noResult' }
        ];
        return;
      }

      this.blockTitle = title;

      // 管理處
      if (id === 'Ia') {
        this.iaData.forEach((item) => {
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
        });

        this.allClickData = [];
        this.allClickData = this.iaData;
      }

      // 渠道
      if (id === 'Canal') {
        this.canalData.forEach((item) => {
          if (item.name === '渠道編號-通用碼') {
            item.value = info.Ex_sys;
          }
          if (item.name === '小組代碼') {
            item.value = info.Grp;
          }
          if (item.name === '小組名稱') {
            item.value = info.Grp_cns;
          }
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '渠道長度(m)') {
            item.value = info.Length;
          }
          if (item.name === '管理分處代碼') {
            item.value = info.Mng;
          }
          if (item.name === '輪區代碼') {
            item.value = info.Rot;
          }
          if (item.name === '工作站代碼') {
            item.value = info.Stn;
          }
          if (item.name === '工作站名稱') {
            item.value = info.Stn_cns;
          }
          if (item.name === '渠道編號-個別管理處') {
            item.value = info.Sys;
          }
          if (item.name === '渠道屬性') {
            item.value = info.Sys_atb;
          }
          if (item.name === '渠道等級名稱') {
            item.value = info.Sys_cls;
          }
          if (item.name === '渠道名稱') {
            item.value = info.Sys_cns;
          }
          if (item.name === '渠道等級代碼') {
            item.value = info.Sys_type;
          }
          if (item.name === '渠道取得性質') {
            item.value = info.Uc;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
        });

        this.allClickData = [];
        this.allClickData = this.canalData;
      }

      // 水工構造物
      if (id === 'Cons') {
        this.consData.forEach((item) => {
          if (item.name === '構造物名稱') {
            item.value = info.Consname;
          }
          if (item.name === '結束位置') {
            item.value = info.End_;
          }
          if (item.name === '設施編號通用碼') {
            item.value = info.Ex_consno;
          }
          if (item.name === '座落渠道編號-通用碼') {
            item.value = info.Ex_sys;
          }
          if (item.name === '檢核結果') {
            item.value = info.Flag;
          }
          if (item.name === '小組代碼') {
            item.value = info.Grp;
          }
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '構造物照片檔名稱') {
            item.value = info.Image_key;
          }
          if (item.name === '內面工形式') {
            item.value = info.Inside;
          }
          if (item.name === '內面工種類') {
            item.value = info.Kind;
          }
          if (item.name === '管理分處代碼') {
            item.value = info.Mng;
          }
          if (item.name === '構造物種類') {
            item.value = info.Name;
          }
          if (item.name === '輪區代碼') {
            item.value = info.Rot;
          }
          if (item.name === '起始樁號') {
            item.value = info.S_location;
          }
          if (item.name === '起始位置') {
            item.value = info.Start;
          }
          if (item.name === '工作站代碼') {
            item.value = info.Stn;
          }
          if (item.name === '工作站名稱') {
            item.value = info.Stn_cns;
          }
          if (item.name === '座落渠道編號-管理處') {
            item.value = info.Sys;
          }
          if (item.name === '座落渠道名稱') {
            item.value = info.Sys_cns;
          }
          if (item.name === '構造物種類代號') {
            item.value = info.Type;
          }
        });

        this.allClickData = [];
        this.allClickData = this.consData;
      }

      // 工作站
      if (id === 'Stn') {
        this.stnData.forEach((item) => {
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
          if (item.name === '管理分處代碼') {
            item.value = info.Mng;
          }
          if (item.name === '管理分處名稱') {
            item.value = info.Mng_cns;
          }
          if (item.name === '工作站代碼') {
            item.value = info.Stn;
          }
          if (item.name === '工作站名稱') {
            item.value = info.Stn_cns;
          }
        });

        this.allClickData = [];
        this.allClickData = this.stnData;
      }

      // 小組
      if (id === 'Grp') {
        this.grpData.forEach((item) => {
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
          if (item.name === '小組代碼') {
            item.value = info.Grp;
          }
          if (item.name === '小組名稱') {
            item.value = info.Grp_cns;
          }
          if (item.name === '管理分處代碼') {
            item.value = info.Mng;
          }
          if (item.name === '管理分處名稱') {
            item.value = info.Mng_cns;
          }
          if (item.name === '工作站代碼') {
            item.value = info.Stn;
          }
          if (item.name === '工作站名稱') {
            item.value = info.Stn_cns;
          }
        });

        this.allClickData = [];
        this.allClickData = this.grpData;
      }

      // 期作別
      if (id === 'Period') {
        this.periodData.forEach((item) => {
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '期作別代碼') {
            item.value = info.Period;
          }
          if (item.name === '期作別') {
            item.value = info.Period_cns;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
        });

        this.allClickData = [];
        this.allClickData = this.periodData;
      }

      // 管理分處
      if (id === 'Mng') {
        this.mngData.forEach((item) => {
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '管理分處代碼') {
            item.value = info.Mng;
          }
          if (item.name === '管理分處名稱') {
            item.value = info.Mng_cns;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
        });

        this.allClickData = [];
        this.allClickData = this.mngData;
      }

      // 池塘
      if (id === 'Pool') {
        this.poolData.forEach((item) => {
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '管理分處代碼') {
            item.value = info.Mng;
          }
          if (item.name === '管理分處名稱') {
            item.value = info.Mng_cns;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
          if (item.name === '工作站代碼') {
            item.value = info.Stn;
          }
          if (item.name === '工作站名稱') {
            item.value = info.Stn_cns;
          }
          if (item.name === '小組代碼') {
            item.value = info.Grp;
          }
          if (item.name === '小組名稱') {
            item.value = info.Grp_cns;
          }
          if (item.name === '碼池塘名稱') {
            item.value = info.Pool_cns;
          }
          if (item.name === '池塘編號-通用碼') {
            item.value = info.Ex_poolno;
          }
        });

        this.allClickData = [];
        this.allClickData = this.poolData;
      }

      // 輪區
      if (id === 'Rot') {
        this.rotData.forEach((item) => {
          if (item.name === '管理處代碼') {
            item.value = info.Ia;
          }
          if (item.name === '管理處名稱') {
            item.value = info.Ia_cns;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '管理分處代碼') {
            item.value = info.Mng;
          }
          if (item.name === '管理分處名稱') {
            item.value = info.Mng_cns;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
          if (item.name === '工作站代碼') {
            item.value = info.Stn;
          }
          if (item.name === '工作站名稱') {
            item.value = info.Stn_cns;
          }
          if (item.name === '小組代碼') {
            item.value = info.Grp;
          }
          if (item.name === '小組名稱') {
            item.value = info.Grp_cns;
          }
          if (item.name === '輪區代碼') {
            item.value = info.Rot;
          }
          if (item.name === '輪區名稱') {
            item.value = info.Rot_cns;
          }
        });

        this.allClickData = [];
        this.allClickData = this.rotData;
      }

      // 地段
      if (id === 'Section') {
        this.sectionData.forEach((item) => {
          if (item.name === '縣市') {
            item.value = info.City;
          }
          if (item.name === '縣市代碼') {
            item.value = info.City_no;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Area;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
          if (item.name === '鄉鎮市區') {
            item.value = info.Town;
          }
          if (item.name === '鄉鎮市區代碼') {
            item.value = info.Town_no;
          }
          if (item.name === '地段代碼') {
            item.value = info.Section;
          }
          if (item.name === '地段名稱') {
            item.value = info.Sec_cns;
          }
        });

        this.allClickData = [];
        this.allClickData = this.sectionData;
      }

      // 地籍
      if (id === 'Sec5cov') {
        this.sec5Data.forEach((item) => {
          if (item.name === '段號') {
            item.value = info.Section_no;
          }
          if (item.name === '地號') {
            item.value = info.Land;
          }
          if (item.name === '地目') {
            item.value = info.Ltype_cns2;
          }
          if (item.name === '地段代碼') {
            item.value = info.Section;
          }
          if (item.name === '地段名稱') {
            item.value = info.Sec_cns;
          }
          if (item.name === '地號') {
            item.value = info.Land_no;
          }
          if (item.name === '面積(m2)') {
            item.value = info.Desc_area;
          }
          if (item.name === '圖面面積(m2)') {
            item.value = info.Maparea;
          }
          if (item.name === '地目代碼') {
            item.value = info.L_type;
          }
          if (item.name === '地目') {
            item.value = info.Ltype_cns;
          }
          if (item.name === '鄉鎮市區代碼') {
            item.value = info.Town;
          }
          if (item.name === '使用分區代碼') {
            item.value = info.Class;
          }
          if (item.name === '使用分區') {
            item.value = info.Class_cns;
          }
          if (item.name === '使用地類別代碼') {
            item.value = info.Use_dir;
          }
          if (item.name === '使用地類別') {
            item.value = info.Use_dircns;
          }
          if (item.name === '公告現值') {
            item.value = info.Cur_price;
          }
          if (item.name === '公告地價') {
            item.value = info.Land_price;
          }
          if (item.name === '申報地價') {
            item.value = info.Dec_price;
          }
          if (item.name === '資料日期') {
            item.value = info.Ymd;
          }
        });

        this.allClickData = [];
        this.allClickData = this.sec5Data;
      }
    },
    // * @ 點擊查詢 : 清除全部
    clearClickData () {
      this.allClickData = [];
      this.blockTitle = '';
    },
    // * @ 按地圖工具列的 清除全部 (後來加的)
    clearAllDataXX () {
      this.$store.commit('CLEAR_CANAL_BOX', true);
      this.$store.commit('CLEAR_KEYWORD_BOX', true);
      this.clearClickData();
      this.clearKeywordData();
    },
    // * @ 關鍵字查詢 : 清除全部
    clearKeywordData () {
      this.columnList = [];
    },
    // * @ 關鍵字查詢 : 取得屬性資料表格
    getKeywordData (payload) {
      if (payload.length < 1) {
        return;
      }
      this.backList.forEach((item) => {
        if (item.name === '流水編號') {
          item.value = payload[0].FID;
        }
        if (item.name === '管理處代碼') {
          item.value = payload[0].Ia;
        }
        if (item.name === '管理處名稱') {
          item.value = payload[0].Ia_cns;
        }
        if (item.name === '管理分處代碼') {
          item.value = payload[0].Mng;
        }
        if (item.name === '管理分處名稱') {
          item.value = payload[0].Mng_cns;
        }
        if (item.name === '工作站代碼') {
          item.value = payload[0].Stn;
        }
        if (item.name === '工作站名稱') {
          item.value = payload[0].Stn_cns;
        }
        if (item.name === '小組代碼') {
          item.value = payload[0].Grp;
        }
        if (item.name === '小組名稱') {
          item.value = payload[0].Grp_cns;
        }
        if (item.name === '輪區代碼') {
          item.value = payload[0].Rot;
        }
        if (item.name === '輪區名稱') {
          item.value = payload[0].Rot_cns;
        }
        if (item.name === '渠道長度(m)') {
          item.value = payload[0].Length;
        }
        if (item.name === '渠道編號-通用碼') {
          item.value = payload[0].Ex_sys;
        }
        if (item.name === '渠道編號-個別管理處') {
          item.value = payload[0].Sys;
        }
        if (item.name === '渠道名稱') {
          item.value = payload[0].Sys_cns;
        }
        if (item.name === '渠道等級代碼') {
          item.value = payload[0].Sys_type;
        }
        if (item.name === '渠道等級名稱') {
          item.value = payload[0].Sys_cls;
        }
        if (item.name === '渠道取得性質') {
          item.value = payload[0].Uc;
        }
        if (item.name === '渠道屬性') {
          item.value = payload[0].Sys_atb;
        }
        if (item.name === '渠道灌溉類型') {
          item.value = payload[0].Sys_dir;
        }
        if (item.name === '資料日期') {
          item.value = payload[0].Ymd;
        }
        if (item.name === '渠道種類代號') {
          item.value = payload[0].Sys_kind;
        }
      });

      this.columnList = [];
      this.columnList = this.backList;
    },
    // * @ 渠道查詢 : 送出表格資料 emit上層
    getChannelData (allData, type) {
      if (type === 'Section') {
        allData.head = this.newSection;
      }
      if (type === 'Ia') {
        allData.head = this.newIa;
      }
      if (type === 'Mng') {
        allData.head = this.newMng;
      }
      if (type === 'Stn') {
        allData.head = this.newStn;
      }
      if (type === 'Grp') {
        allData.head = this.newGrp;
      }
      if (type === 'Rot') {
        allData.head = this.newRot;
      }
      if (type === 'Period') {
        allData.head = this.newPeriod;
      }
      if (type === 'Pool') {
        allData.head = this.newPool;
      }
      if (type === 'Sec5cov') {
        allData.head = this.newSec5cov;
      }
      if (type === 'none') {
        allData = '';
      }

      this.$emit('search', allData);
    }
  },
  computed: {
    searchType () {
      return (this.barOptions.current === 0) ? 'KeyWordSearch' : (this.barOptions.current === 1) ? 'ChannelSearch' : (this.barOptions.current === 2) ? 'StakeSearch' : (this.barOptions.current === 3) ? 'ClickSearch' : '';
    },
    componentInstance () {
      const myType = this.searchType;
      return myType;
    }
  },
  watch: {
    // 'barOptions.current': {
    //   handler (value) {
    //     if (value === 3 && this.openOnceCS === true) {
    //       Object.keys(MBT.Style).forEach((key) => {
    //         const mName = key.substring(3);
    //         const result = {
    //           id: Math.random(),
    //           LayerName: key,
    //           title: '',
    //           value: key
    //         };
    //         if (mName === 'Cons') {
    //           result.title = '水工構造物';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Canal') {
    //           result.title = '渠道';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Ia') {
    //           result.title = '管理處';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Mng') {
    //           result.title = '管理分處';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Stn') {
    //           result.title = '工作站';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Grp') {
    //           result.title = '小組';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Rot') {
    //           result.title = '輪區';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Period') {
    //           result.title = '期作別';
    //           this.ListCS.push(result);
    //         }
    //         if (mName === 'Pool') {
    //           result.title = '埤塘';
    //           this.ListCS.push(result);
    //         }
    //       });
    //       this.openOnceCS = false;
    //     }
    //   },
    //   deep: true
    // }
  }
};
</script>

<style lang="scss" scoped>

  .nores {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:  #595959;
    @include noto-sans-tc-16-regular;
  }

  .search_container {
    width: 350px;
    display: flex;
    flex-direction: column;
    // height: 100%;
    height: 97.3%;
    z-index: 7000;
  }

  .search_box {
    background-color: #EFF4F3;
    border-radius: 0 0 22px 0;
    z-index: 70000;
  }

  .content_block {
    z-index: 60000;
    background: white;
    color: #494949;
    text-align: left;
    padding: 8px 15px 0;
    position: relative;
    border-radius: 0 0 22px 0;
    overflow: hidden;
    flex-grow: 1;
    width: 320px;
    @include noto-sans-tc-16-regular;

    table {
      text-align: left;
      margin: 0 auto;
      width: 100%;
      word-break: break-all;

      td {
        padding: 10px;
      }

      tr:nth-child(odd) {
        background-color: #F5F5F5;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    @include noto-sans-tc-20-medium;
  }

   .title::before {
      content: '';
      width: 26px;
      height: 26px;
      background: url('~/assets/img/table-icon.svg') no-repeat right/contain;
      display: inline-block;
   }

  .table_block_wrap {
    width: 100%;
    height: 81%;
    position: relative;
  }

  .table_block {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .hide_button {
    background: $main-green;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 6px 0;
    color: white;
    cursor: pointer;

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
      background: url('~/assets/img/white-triangle.svg') no-repeat right/contain;
      display: inline-block;
      margin-right: 7px;
    }
  }

  .hide_VVblock {
    transition: transform 0.4s;
    transform: translateY(-92.5%);
  }

  .show_block {
    transition: transform 0.4s;
    transform: translateY(0);
  }

  .no_radius {
    border-radius: 0;
  }

  .down_arrow::before {
    background: url('~/assets/img/down-white-triangle.svg') no-repeat right/contain !important;
  }

</style>
