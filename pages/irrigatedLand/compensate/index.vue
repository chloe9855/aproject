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
        icon="layer"
        title="停灌補償案件"
        btn-text="停灌補償申報"
        :btn-add="true"
        btn-name="button-add"
      />
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
          { val: 1, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 2, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 3, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 4, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 5, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 6, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 7, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 8, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 9, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 10, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 11, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] },
          { val: 12, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506'] }
        ]
      },
      BreadCrumb: ['灌溉地管理', '停灌補償案件'],
      toggleStatus: false
    };
  },
  name: 'Compensate',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
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
    height:100%;
    margin : 0 5%;
}
.grow {
  width: 90%;
}
</style>
