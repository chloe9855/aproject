<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="edit"
      title="編輯停灌補償申請單"
      :class="boxWidth"
      btn-text="停灌補償申報"
      :btn-add="true"
      btn-name="button-add"
    />
    <SubTitleTool
      title="新增土地資料"
      class="w-90"
      :class="boxWidth"
    />
    <SubTitleTool
      title="土地資料(填寫單位:桃園管理處)"
      class="w-90"
      :class="boxWidth"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
      :class="boxWidth"
    />
    <Search
      type="irrigatedLandSearch"
      @toggleStatus="getToggleStatus"
    />
    <SubTitleTool
      title="申請人資料"
      class="w-90"
      :class="boxWidth"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    Search,
    SubTitleTool
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
        body: [
          { val: 0, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3,4'] },
          { val: 1, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3'] },
          { val: 2, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2'] },
          { val: 3, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3,4'] },
          { val: 4, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1'] },
          { val: 5, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3'] },
          { val: 6, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2'] },
          { val: 7, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3,4'] }
        ]
      },
      BreadCrumb: ['灌溉地管理', '停灌補償申報', '編輯停灌補償申請單'],
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
.subTitleTool{
  margin: 1em auto !important;
}

</style>
