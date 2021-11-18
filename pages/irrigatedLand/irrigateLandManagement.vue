<template>
  <div>
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
          @nowPage="getPageNum"
        />
        <div
          class="calNoteBox w-90"
        >
          <CalNote
            name="水利小組"
            area="面積總計"
            :area-num="numfmt(sum_grp)"
          />
          <CalNote
            name="水利小組轄區農地"
            area="地籍面積總計"
            :area-num="numfmt(sum_tolarea)"
          />
          <CalNote
            name="水利小組轄區農地"
            area="灌溉面積總計"
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
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import NormalTable from '~/components/model/NormalTable.vue';
import Search from '~/components/model/Search.vue';
import CalNote from '~/components/tools/CalNote.vue';
import { getIrrigationLandArea, getIrrigationLand } from '~/publish/irrigation.js';
import { getIrrigationLand1 } from '~/api/irrigatedLand';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    NormalTable,
    Search,
    CalNote
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
        {
          name: '流水編號',
          value: '851705',
          id: 0
        },
        {
          name: '管理處代碼',
          value: '09',
          id: 1
        },
        {
          name: '管理處名稱',
          value: '851705',
          id: 2
        },
        {
          name: '管理分分處名稱',
          value: '09',
          id: 3
        },
        {
          name: '工作站代碼',
          value: '851705',
          id: 4
        },
        {
          name: '工作站名稱',
          value: '09',
          id: 5
        },
        {
          name: '水利小組代碼',
          value: '851705',
          id: 6
        },
        {
          name: '水利小組名稱',
          value: '泉厝支線小組',
          id: 7
        },
        {
          name: '輪區代碼',
          value: '851705',
          id: 8
        },
        {
          name: '輪區名稱',
          value: '09',
          id: 57
        },
        {
          name: '長度',
          value: '09',
          id: 66
        },
        {
          name: '渠道名稱',
          value: '851705',
          id: 62
        },
        {
          name: '渠道等級代碼',
          value: '09',
          id: 58
        },
        {
          name: '渠道等級名稱',
          value: '851705',
          id: 52
        }
      ],
      BreadCrumb: ['灌溉地管理', '灌溉地籍查詢'],
      toggleStatus: false,
      toggleCurrent: 0,
      sum_grp: 0,
      sum_irgarea: 0,
      sum_tolarea: 0,
      searchObj: {},
      search2Obj: {},
      dataCount: 0
    };
  },
  name: 'IrrigatedLand',
  mounted () {
    getIrrigationLand1().then(r => {
      console.log(r);
    }).catch(e => {
      console.log(e);
    });
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
    },
    onsearch (o) {
      const e = o.obj;
      if (this.toggleCurrent === 0) {
        this.searchObj = null;
        if (e && e.ia) {
          const x = [e.ia];
          x.push(e.mng || '');
          x.push(e.stn || '');
          x.push(e.grp || '');
          this.searchObj = [x];
        }
        getIrrigationLandArea(this.searchObj).then(r => {
          this.sum_grp = r.data[0].sum_grp;
          this.sum_irgarea = r.data[0].sum_irgarea;
          this.sum_tolarea = r.data[0].sum_tolarea;
          this.dataCount = r.data[0].pagemax;
          this.getPageNum({ page: 1 });
        });
      } else if (this.toggleCurrent === 1) {
        this.search2Obj = e;
        getIrrigationLand(1, 10, null, this.search2Obj.county, this.search2Obj.town, this.search2Obj.section, this.search2Obj.land).then(r => {
          const x = r.data[0];
          this.columnList = [
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
        });
      }
    },
    getPageNum (e) { // 換頁取得DATA
      getIrrigationLand(e.page, 10, this.searchObj).then(r => {
        this.tableList.body = r.data.map(x => {
          return { title: [x.ia_cns, x.mng_cns, x.stn_cns, x.grp_cns, x.grparea, x.tolarea, x.irgarea] };
        });
      });
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
  height: calc( 100vh - 175px );
  @include scrollBar;
}
.grow {
  width: 90%;
}
</style>
