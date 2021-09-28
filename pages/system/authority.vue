<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="slider"
      title="群組權限管理"
      :class="boxWidth"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="false"
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
          { title: '群組名稱' },
          { title: '最後變更日期' }
        ],
        body: [
          { val: 0, title: ['XX工作站', '2012/12/17'] },
          { val: 1, title: ['XX工作站', '2012/12/17'] },
          { val: 2, title: ['OX工作站', '2012/12/17'] },
          { val: 3, title: ['OO工作站', '2012/12/17'] },
          { val: 4, title: ['XX工作站', '2012/12/17'] },
          { val: 5, title: ['XX工作站', '2012/12/17'] },
          { val: 6, title: ['OX工作站', '2012/12/17'] },
          { val: 7, title: ['OO工作站', '2012/12/17'] }
        ]
      },
      BreadCrumb: ['系統管理', '群組權限管理'],
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
