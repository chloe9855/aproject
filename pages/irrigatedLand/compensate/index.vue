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
        icon="layer"
        title="停灌補償案件"
        btn-text="停灌補償申報"
        :btn-add="true"
        btn-name="button-add"
        @PHBtnStatus="toEditCompensate"
      />
      <div class="content_box">
        <TableTool
          :table-column="tableList"
          :is-paginate="true"
          :is-edit="true"
          :is-print="true"
          :is-scroll-table="true"
          :is-toggle="toggleStatus"
          :column-min-width="80"
          @tableEvent="tableEvent"
        />
        <div
          class="calNoteBox w-100"
        >
          <CalNote
            :date-note="true"
            :date1="dateName"
            :date2="dateOpen"
          />
        </div>
      </div>
    </div>
    <Search
      type="compensateSearch"
      @toggleStatus="getToggleStatus"
      @onsearch="onsearch"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';
import CalNote from '~/components/tools/CalNote.vue';
import axios from 'axios';
import { getApplySetting, getApplyEvent, getApplyList } from '~/api/apply';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    Search,
    CalNote
  },
  data () {
    return {
      tableList: {
        topHead: [
          { title: '土地資料', col: 4 },
          { title: '農田水利資料', col: 2 },
          { title: '土地所有權人', col: 3 },
          { title: '農民類別', col: 1 },
          { title: '申請項目', col: 4 }
        ],
        head: [
          { title: '縣市' },
          { title: '鄉鎮' },
          { title: '地段' },
          { title: '地籍面積㎡' },
          { title: '工作站' },
          { title: '灌溉面積㎡' },
          { title: '姓名' },
          { title: '權利範圍' },
          { title: '權利類別' },
          { title: '申請人類別' },
          { title: '申請類別' },
          { title: '申請面積㎡' },
          { title: '作物備註' },
          { title: '檢附資料', setW: 'setWidth720' }
        ],
        body: [],
        main: {}
      },
      BreadCrumb: ['灌溉地管理', '停灌補償案件'],
      toggleStatus: false,
      dateName: '',
      dateOpen: '',
      Apply_sno: ''
    };
  },
  name: 'Compensate',
  mounted () {
    this.getDateNote();
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    toEditCompensate (e) {
      if (e) {
        this.$router.push({ path: '/irrigatedLand/compensate/editcompensate' });
      }
    },
    getDateNote () {
      getApplySetting(new Date()).then(r => {
        console.log(r);
        this.Apply_sno = r.data[0].Apply_sno;
        this.dateName = r.data[0].name;
        this.dateOpen = r.data[0].start.split('T')[0] + '~' + r.data[0].end.split('T')[0];
      });
    },
    onsearch (e) {
      if (e) {
        this.tableList.body = [];
        const arr = [];
        let n = 0;
        const _this = this;
        getApplyEvent(e.obj).then(r => {
          r.data.forEach(item => {
            console.log(item);
            const attachmentContent = this.switchAttachment(1, item.attachment1) + this.switchAttachment(2, item.attachment2) + this.switchAttachment(3, item.attachment3) + this.switchAttachment(4, item.attachment4) + this.switchAttachment(5, item.attachment5);
            const data = {
              county: item.county_id,
              town: item.town_id,
              section: item.section,
              land_no: item.landno
            };
            axios.post('/AERC/rest/IrrigationLand?pageCnt=1&pageRows=1', data).then(d => {
              const result = {};
              result.main = r;
              result.title = [item.county_name, item.town_name, item.section_name, d.data[0].tolarea, item.stn_name, d.data[0].irgarea, item.owner_name, item.percent1 + '/' + item.percent2, item.own_scro, item.farmername, item.category, item.area, item.note, attachmentContent];
              arr.push(result);
              n += 1;
              if (r.data.length === n) {
                _this.tableList.body = arr;
              }
            });
          });
        }).catch(err => {
          console.log(err);
        });
      }
    },
    getLandArea (countyID, townID, section, landNO) {
      const data = {
        county: countyID,
        town: townID,
        section: section,
        land_no: landNO
      };
      const result = {
        irgarea: '',
        tolarea: ''
      };
      axios.post('/AERC/rest/IrrigationLand?pageCnt=1&pageRows=1', data).then(r => {
        result.irgarea = r.data[0].irgarea;
        result.tolarea = r.data[0].tolarea;
      });
      return result;
    },
    switchAttachment (item, status) {
      let result = '';
      let attachment = '';
      if (status) {
        switch (item) {
          case 1:
            attachment = '身分證(正反)影本,';
            break;
          case 2:
            attachment = '金融帳戶影本,';
            break;
          case 3:
            attachment = '附件一:切結書,';
            break;
          case 4:
            attachment = '附件二:實耕者證明文件,';
            break;
          case 5:
            attachment = '代理委任書:(授權書或同意書)';
            break;
        }
      }
      // result = status === 1 ? attachment : '';
      result = attachment;
      return result;
    },
    clearSearchIrrigatedInfo () {
      this.tableList.body = [];
    },
    tableEvent (e) {
      if (e.event === 'isEdit') {
        console.log(e);
        this.$router.push('/irrigatedLand/compensate/editcompensate');
        this.$store.commit('SET_COMPENSATE_DATA', { item: e.item.main, event: e.event });
      } else if (e.event === 'isPrint') {
        const item = e.item.data.main.data[e.item.num];
        const data1 = {
          apply_sno: this.Apply_sno,
          id: item.applyer_id,
          county_id: item.county_id,
          town_id: item.town_id,
          section: item.section,
          landno: item.landno
        };

        getApplyList(data1).then(r => {
          if (r.data !== '') {
            window.location = r.data;
          }
        });
      }
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
    }
  }
};
</script>
<style lang="scss">
.mainContent{
  position: relative;
}
.calNoteBox{
    display: flex;
    justify-content:flex-end;
    margin: 0 auto;
    div{
      margin: 0.5em 0;
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
.content_block {
    width: calc(100% - 372px);
    transition: ease-in-out 0.4s;
    margin : 0 5%;
}
.grow {
  width: 90%;
}
.content_box{
  height: calc( 100vh - 190px);
  padding-right: 0.5em;
  @include scrollBar;
}
</style>
