<template>
  <div class="search_container">
    <div
      class="search_box"
      :class="{'no_radius': columnList.length >= 1 && (barOptions.current === 0 || barOptions.current === 3) }"
    >
      <NavTabs-component
        :type-list="barOptions.typeList"
        :selected="barOptions.current"
        @current="payload => barOptions.current = payload"
      />
      <keep-alive>
        <component
          :is="componentInstance"
          :click-map-list="ListCS"
          @channelSearch="$emit('search')"
          @keywordSearch="getVerticalData"
          @clearKeyword="clearVerticalData"
          @clear="$emit('clear')"
        />
      </keep-alive>
    </div>
    <div
      v-if="columnList.length >= 1 && (barOptions.current === 0 || barOptions.current === 3)"
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
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';

export default {
  components: {
    'NavTabs-component': NavTabs
  },
  data () {
    return {
      hideResult: false,
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
      //* 屬性資料表格
      columnList: [],
      backList: [],
      //* 第一次按下點擊查詢
      openOnceCS: true,
      ListCS: []
    };
  },
  name: 'MapSearchBox',
  mounted () {
    const data = require('~/static/channel.json');
    this.searchResult.channel = data;

    const vdata = require('~/static/singleLand.json');
    this.backList = vdata.data;
  },
  methods: {
    clearVerticalData () {
      this.columnList = [];
    },
    //* 取得屬性資料表格
    getVerticalData (payload) {
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
    }
  },
  computed: {
    searchType () {
      return (this.barOptions.current === 0) ? 'KeyWordSearch' : (this.barOptions.current === 1) ? 'ChannelSearch' : (this.barOptions.current === 2) ? 'StakeSearch' : (this.barOptions.current === 3) ? 'ClickSearch' : '';
    },
    componentInstance () {
      const myType = this.searchType;
      return () => import(`~/components/model/MapSearchBox/${myType}`);
    }
  },
  watch: {
    'barOptions.current': {
      handler (value) {
        if (value === 3 && this.openOnceCS === true) {
          Object.keys(MBT.Style).forEach((key) => {
            const mName = key.substring(3);
            const result = {
              id: Math.random(),
              LayerName: key,
              title: '',
              value: key,
            };
            if (mName === 'Cons') {
              result.title = '水工構造物';
              this.ListCS.push(result);
            }
            if (mName === 'Canal') {
              result.title = '渠道';
              this.ListCS.push(result);
            }
            if (mName === 'Ia') {
              result.title = '管理處';
              this.ListCS.push(result);
            }
            if (mName === 'Mng') {
              result.title = '管理分處';
              this.ListCS.push(result);
            }
            if (mName === 'Stn') {
              result.title = '工作站';
              this.ListCS.push(result);
            }
            if (mName === 'Grp') {
              result.title = '小組';
              this.ListCS.push(result);
            }
            if (mName === 'Rot') {
              result.title = '輪區';
              this.ListCS.push(result);
            }
            if (mName === 'Period') {
              result.title = '期作別';
              this.ListCS.push(result);
            }
            if (mName === 'Pool') {
              result.title = '埤塘';
              this.ListCS.push(result);
            }
          });
          this.openOnceCS = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>

  .search_container {
    width: 350px;
    display: flex;
    flex-direction: column;
    height: 100%;
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
