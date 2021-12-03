<template>
  <div class="mainContent">
    <div
      class="content_block"
      :class="[growDiv,boxWidth]"
    >
      <BreadCrumbTool
        :options="BreadCrumb"
      />
      <PageHeader
        icon="bungalow"
        title="灌溉地籍查詢與統計"
        :btn-text="topBtnText"
        btn-name="button-primary"
        @PHBtnStatus="phBtnEvent"
      />
      <div
        v-if=" toggleCurrent === 0 "
        class="content_box"
      >
        <TableTool
          :table-column="tableList"
          :is-paginate="true"
          :column-min-width="150"
          :data-count="dataCount"
          :is-no-data-bg="isNoDataBg"
          @nowPage="getPageNum"
        />
        <div
          class="calNoteBox w-90"
        >
          <CalNote
            name="水利小組"
            area="面積總計㎡"
            :area-num="numfmt(sum_grp)"
          />
          <CalNote
            name="水利小組轄區農地"
            area="地籍面積總計㎡"
            :area-num="numfmt(sum_tolarea)"
          />
          <CalNote
            name="水利小組轄區農地"
            area="灌溉面積總計㎡"
            :area-num="numfmt(sum_irgarea)"
          />
        </div>
      </div>
      <div
        v-else-if="toggleCurrent === 1"
        class="irrigatedLand content_box"
      >
        <NormalTable
          v-if="columnList.length >= 1"
          :list="columnList"
          class="listTable"
        />
      </div>
    </div>

    <Search
      type="irrigatedLandSearch"
      @toggleStatus="getToggleStatus"
      @toggleCurrent="getToggleCurrent"
      @onsearch="onsearch"
    />
    <AlertBox
      v-show="alertError"
      :title="alertText"
      text=""
      box-icon="warning"
      @close="closeAlert"
      @confirm="closeAlert"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table555.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import NormalTable from '~/components/model/NormalTable.vue';
import Search from '~/components/model/Search.vue';
import CalNote from '~/components/tools/CalNote.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
import { getMultipleSearch } from '~/publish/getMultipleSearch.js';
import { getDownloadIrrigationLand } from '~/publish/Irrigation.js';

// import { getIrrigationLand1 } from '~/api/irrigatedLand';
import axios from 'axios';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    NormalTable,
    Search,
    CalNote,
    AlertBox
  },
  data () {
    return {
      tableList: {
        head: [
          { title: '管理處' },
          { title: '管理分處' },
          { title: '工作站' },
          { title: '水利小組' },
          { title: '水利小組面積㎡' },
          { title: '水利小組轄區 農地地籍面積㎡' },
          { title: '水利小組轄區 農地灌溉面積㎡' }
        ],
        body: []
      },
      columnList: [
        // {
        //   name: '流水編號',
        //   value: '851705',
        //   id: 0
        // },
        // {
        //   name: '管理處代碼',
        //   value: '09',
        //   id: 1
        // },
        // {
        //   name: '管理處名稱',
        //   value: '851705',
        //   id: 2
        // },
        // {
        //   name: '管理分分處名稱',
        //   value: '09',
        //   id: 3
        // },
        // {
        //   name: '工作站代碼',
        //   value: '851705',
        //   id: 4
        // },
        // {
        //   name: '工作站名稱',
        //   value: '09',
        //   id: 5
        // },
        // {
        //   name: '水利小組代碼',
        //   value: '851705',
        //   id: 6
        // },
        // {
        //   name: '水利小組名稱',
        //   value: '泉厝支線小組',
        //   id: 7
        // },
        // {
        //   name: '輪區代碼',
        //   value: '851705',
        //   id: 8
        // },
        // {
        //   name: '輪區名稱',
        //   value: '09',
        //   id: 57
        // },
        // {
        //   name: '長度',
        //   value: '09',
        //   id: 66
        // },
        // {
        //   name: '渠道名稱',
        //   value: '851705',
        //   id: 62
        // },
        // {
        //   name: '渠道等級代碼',
        //   value: '09',
        //   id: 58
        // },
        // {
        //   name: '渠道等級名稱',
        //   value: '851705',
        //   id: 52
        // }
      ],
      BreadCrumb: ['灌溉地管理', '灌溉地籍查詢'],
      toggleStatus: false,
      toggleCurrent: 0,
      sum_grp: 0,
      sum_irgarea: 0,
      sum_tolarea: 0,
      searchObj: {},
      search2Obj: {},
      dataCount: 0,
      alertError: false,
      alertText: '',
      topBtnText: '',
      downloadIrrigationLand: '',
      isNoDataBg: false,
      countyId: '',
      countyFID: ''
    };
  },
  name: 'IrrigatedLand',
  mounted () {
    // fetch('/AERC/rest/IrrigationLand?pageCnt=1&pageRows=10', {
    //   method: 'POST',
    //   headers: new Headers({
    //     'Content-Type': 'application/json'
    //   }),
    //   body: JSON.stringify({ query: [['11', '4', '', '']] })
    // }).then((response) => {
    //   return response.json();
    // }).then((data) => {
    //   console.log(data);
    // });
    // axios.post('/AERC/rest/IrrigationLand?pageCnt=1&pageRows=10', { query: [['11', '4', '', '']] }).then(r => {
    //   console.log(r);
    // }).catch(function (error) {
    //   console.log(error);
    // });
  },
  methods: {
    numfmt (n) {
      function chunk (a, s) {
        return Array.init(Math.ceil(a.length / s), n => a.slice(n * s, n * s + s));
      }
      const ns = n.toString().split('.');
      ns[0] = chunk(Array.from(ns[0]).reverse(), 3).map(x => x.reverse().join('')).reverse().join(',');
      if (ns.length >= 2) {
        ns[1] = chunk(Array.from(ns[1]), 3).map(x => x.join('')).join(',');
      }
      return ns.join('.');
    },
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    getToggleCurrent (e) {
      this.toggleCurrent = e;
      if (e === 0) {
        this.topBtnText = this.tableList.body.length > 0 ? '資料下載' : '';
      } else if (e === 1) {
        this.topBtnText = this.columnList.length > 0 ? '在地圖上顯示' : '';
      }
    },
    clearSearchIrrigatedLand () {
      this.tableList.body = [];
      this.sum_grp = 0;
      this.sum_irgarea = 0;
      this.sum_tolarea = 0;
      this.dataCount = 0;
    },
    clearSearchIrrigatedInfo () {
      this.columnList = [];
    },
    onsearch (o) {
      // console.log(o);
      const e = o.obj;
      if (this.toggleCurrent === 0) {
        this.clearSearchIrrigatedLand();
        this.searchObj = null;
        if (e && e.ia) {
          if (e.grp.length > 0) {
            this.searchObj = getMultipleSearch(e);
          } else {
            const x = [e.ia];
            x.push(e.mng || '');
            x.push(e.stn || '');
            x.push(e.grp || '');
            this.searchObj = [x];
          }
          axios.post('http://192.168.3.112/AERC/rest/IrrigationLandArea', { query: this.searchObj }).then(r => {
            this.sum_grp = r.data[0].data[0].sum_grp;
            this.sum_irgarea = r.data[0].data[0].sum_irgarea;
            this.sum_tolarea = r.data[0].data[0].sum_tolarea;
            this.dataCount = r.data[0].totalCount;
            this.getPageNum({ page: 1, size: 10 });
            this.topBtnText = '資料下載';
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          this.alertText = '管理處為必選';
          this.alertError = true;
        }
      } else if (this.toggleCurrent === 1) {
        this.clearSearchIrrigatedInfo();
        this.search2Obj = e;
        const _this = this;
        if (e && e.county) {
          console.log(e);
          this.$store.commit('TOGGLE_LOADING_STATUS');
          const x = {
            county: e.county,
            town: e.town,
            section: e.section,
            land_no: e.land
          };
          this.searchObj = x;
          axios.post('/AERC/rest/IrrigationLand?pageCnt=1&pageRows=1', this.searchObj).then(r => {
            const x = r.data[0];
            this.countyId = x.county_id;
            this.countyFID = x.FID;
            if (r.data.length < 1) {
              _this.isNoDataBg = true;
            } else {
              _this.columnList = [
                { name: '縣市', value: x.county_name },
                { name: '鄉鎮市區', value: x.town_name },
                { name: '地段名稱', value: x.sec_cns },
                { name: '地號', value: x.land_no },
                { name: '管理處', value: x.ia_cns },
                { name: '管理分處', value: x.mng_cns },
                { name: '工作站', value: x.stn_cns },
                { name: '水利小組', value: x.grp_cns },
                { name: '地籍面積m2', value: x.tolarea },
                { name: '灌溉面積m2', value: x.irgarea }
              ];
              _this.isNoDataBg = false;
              _this.topBtnText = '在地圖上顯示';
            }
          }).then(function () {
            _this.$store.commit('TOGGLE_LOADING_STATUS');
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          this.alertText = '縣市為必選';
          this.alertError = true;
        }
      }
    },
    getPageNum (e) { // 換頁取得DATA
      const _this = this;
      this.$store.commit('TOGGLE_LOADING_STATUS');
      axios.post(`http://192.168.3.112/AERC/rest/IrrigationLand?pageCnt=${e.page}&pageRows=${e.size}`, { query: _this.searchObj }).then(r => {
        _this.tableList.body = r.data.map(x => {
          return { title: [x.ia_cns, x.mng_cns, x.stn_cns, x.grp_cns, x.grparea, x.tolarea, x.irgarea] };
        });
      }).then(function () {
        if (_this.tableList.body.length < 1) {
          _this.isNoDataBg = true;
        } else {
          _this.isNoDataBg = false;
        }
        _this.$store.commit('TOGGLE_LOADING_STATUS');
      }).then(function () {
        getDownloadIrrigationLand({ query: _this.searchObj }).then(r => {
          _this.downloadIrrigationLand = r.data;
        });
      }).catch(function (error) {
        console.log(error);
      });
    },
    // * 跳轉地圖
    goMapPage () {
      const countyId = this.countyId;
      const fid = this.countyFID;
      this.$store.commit('TOGGLE_LOADING_STATUS');
      fetch(`http://192.168.3.112/AERC/rest/Sec5ByFID?CountyID=${countyId}&FID=${fid}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.$store.commit('TOGGLE_LOADING_STATUS');
        const nowUrl = window.location.origin;
        const front = this.$router.options.base;
        const end = 'map/';
        const myUrl = `${nowUrl}${front}${end}`;

        window.open(myUrl);
        localStorage.setItem('oriData', JSON.stringify(jsonData[0].geometry));
      }).catch((err) => {
        console.log(err);
      });
    },
    phBtnEvent (e) {
      if (e) {
        const current = this.toggleCurrent;
        if (current === 0 && this.downloadIrrigationLand !== '') {
          window.location = this.downloadIrrigationLand;
        } else if (current === 1) {
          this.goMapPage();
        }
      }
    },
    closeAlert (e) {
      console.log(e);
      if (e) {
        this.alertError = false;
      };
    }
  },
  computed: {
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    },
    growDiv () {
      const setWidth = this.toggleStatus ? '' : 'grow';
      return setWidth;
    },
    accountToggle () {
      return this.$store.state.settingAccount;
    }
  }
};
</script>
<style lang="scss" scoped>
.mainContent{
  position: relative;
}
.calNoteBox{
    display: flex;
    justify-content:flex-end;
    margin: 1em auto;
    div{
        margin: 0 2.5px;
    }
}
.tableTool{
  .tableContent{
    table{
      tbody{
        text-align: left !important;
      }
    }
  }
}
.listTable{
  margin: 0 auto;
}
.content_block {
  width: calc(100% - 372px);
  transition: ease-in-out 0.4s;
  height:100%;
  margin : 0 5%;
}
.content_box{
  padding-right: 0.5em;
  height: calc( 100vh - 190px );
  @include scrollBar;
}
.grow {
  width: 90%;
}
</style>
