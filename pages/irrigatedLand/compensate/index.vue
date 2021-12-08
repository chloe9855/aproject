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
        />
        <div
          class="calNoteBox w-90"
        >
          <CalNote />
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
import { getApplyEvent } from '~/api/apply';

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
          { title: '檢附資料' }
        ],
        body: []
      },
      BreadCrumb: ['灌溉地管理', '停灌補償案件'],
      toggleStatus: false
    };
  },
  name: 'Compensate',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    toEditCompensate (e) {
      if (e) {
        this.$router.push({ path: '/irrigatedLand/compensate/editcompensate' });
      }
    },
    onsearch (e) {
      if (e) {
        this.columnList = [];
        console.log(e.obj);
        getApplyEvent(e.obj).then(r => {
          r.data.forEach(item => {
            console.log(item);
            const result = {};
            result.val = item.applyer_id;
            result.title = [item.county_name, item.town_name, item.section_name, item.tolarea, item.owner_name, item.percent1 + '/' + item.percent2, item.own_scro, item.farmername, item.category, item.area, item.note];
            this.tableList.body.push(result);
          });
          // this.tableList.body =
        }).catch(err => {
          console.log(err);
        });
      }
    },
    clearSearchIrrigatedInfo () {
      this.columnList = [];
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
