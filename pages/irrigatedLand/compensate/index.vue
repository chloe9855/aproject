<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="layer"
      title="停灌補償案件"
      :class="boxWidth"
      btn-text="停灌補償申報"
      :btn-add="true"
      btn-name="button-add"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="true"
      :is-edit="true"
      :is-print="true"
      :class="boxWidth"
    />
    <div
      class="calNoteBox w-90"
      :class="boxWidth"
    >
      <CalNote />
    </div>
    <Search
      type="irrigatedLandSearch"
      @toggleStatus="getToggleStatus"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';
import CalNote from '~/components/tools/CalNote.vue';

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
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      tableList: {
        topHead: [
          { title: '土地資料', col: 4 },
          { title: '農田水利資料', col: 2 },
          { title: '土地所有權人', col: 3 },
          { title: '農民類別', col: 1 },
          { title: '申請項目', col: 2 }
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
          { title: '申請面積㎡' }
        ],
        body: [
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] }
        ]
      },
      BreadCrumb: ['灌溉地管理', '停灌補償案件'],
      toggleStatus: false
    };
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    }
  },
  computed: {
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    }
  }
};
</script>
<style lang="scss">
.page-header{
  margin: 1em auto !important;
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
  margin: 0 auto !important;
  .tableContent{
    table{
      tbody{
        text-align: left !important;
      }
    }
  }
}
.breadcrumb{
  margin: 1em auto !important;
}

</style>
