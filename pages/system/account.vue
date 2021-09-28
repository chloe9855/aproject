<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="slider"
      title="帳號管理"
      :class="boxWidth"
      btn-text="新增帳號"
      :btn-add="true"
      btn-name="button-add"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="true"
      :is-edit="true"
      :is-del="true"
      :class="boxWidth"
    />
    <Search
      type="userAcctSearch"
      @toggleStatus="getToggleStatus"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    Search: Search
  },
  data () {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      tableList: {
        head: [
          { title: '帳號' },
          { title: '姓名' },
          { title: '管理處' },
          { title: '工作站' },
          { title: '權限群組' },
          { title: '上次登入時間' },
          { title: '狀態' }
        ],
        body: [
          { val: 0, title: ['aaaaaa', '陳旺旺', 'XX管理處', 'nn工作站', 'nn工作站', '2021/01/01', '驗證中'] },
          { val: 1, title: ['bbbbbb', '張旺旺', 'XX管理處', 'mm工作站', 'mm工作站', '2021/02/01', '啟用中'] },
          { val: 2, title: ['cccccc', '鄧旺旺', 'XX管理處', 'uu工作站', 'uu工作站', '2021/03/01', '啟用中'] },
          { val: 3, title: ['dddddd', '王旺旺', 'XX管理處', 'zz工作站', 'zz工作站', '2021/04/01', '啟用中'] },
          { val: 4, title: ['eeeeee', '呂旺旺', 'XX管理處', 'ww工作站', 'ww工作站', '2021/05/01', '啟用中'] },
          { val: 5, title: ['ffffff', '廖旺旺', 'XX管理處', 'ee工作站', 'ee工作站', '2021/06/01', '停用中'] },
          { val: 6, title: ['gggggg', '曾旺旺', 'XX管理處', 'rr工作站', 'rr工作站', '2021/07/01', '啟用中'] },
          { val: 7, title: ['hhhhhh', '林旺旺', 'XX管理處', 'yy工作站', 'yy工作站', '2021/08/01', '停用中'] }
        ]
      },
      BreadCrumb: ['系統管理', '帳號管理'],
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
.page-header,.subTitleTool{
  margin: 1em auto !important;
}
.tableTool{
  margin: 0 auto !important;
  .tableContent{
    table{
      tbody{
        text-align: left !important;
        tr{
          td:nth-child(2){
            width: 120px;
          }
        }
      }
    }
  }
}
.downloadArea{
  display: flex;
  margin: 0 auto;
  .tableTool{
    flex:1;
  }
  .tableTool:nth-child(1){
    margin-right: 1em !important;
  }
}
.downloadTitle{
  display: flex;
  margin: 0 auto;
  .subTitleTool{
    flex:1;
  }
  .subTitleTool:nth-child(1){
    margin-right: 1em !important;
  }
}
.breadcrumb{
  margin: 1em auto !important;
}

</style>
