<template>
  <div>
    <PageHeader
      icon="news"
      class="w-90"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="false"
      class="w-90"
    />
    <PageHeader
      icon="download"
      class="w-90"
    />
    <div class="downloadArea w-90">
      <TableTool
        :table-column="tableData"
        :is-paginate="false"
      />
      <TableTool
        :table-column="tableData"
        :is-paginate="false"
      />
    </div>
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';

export default {
  components: {
    PageHeader,
    TableTool
  },
  data () {
    return {
      tableList: {
        head: [
          { title: '公告名稱' },
          { title: '公告內容' },
          { title: '發布時間' },
          { title: '相關連結' }
        ],
        body: [
          { title: ['系統維修更新(字多呈現)', '於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用', '2012/12/17', '連結1,連結2,連結3,連結4,連結5,連結6,連結7'] },
          { title: ['109年第2期停灌申請開始辦理', '依據XXX公告，公告類地區工作站可以相關規定進行停灌作業申請辦理', '2012/12/17', '連結1'] },
          { title: ['系統維修更新', '於xx/xx上午將進行系統維修更新，請避開該時段使用', '2012/12/17', '連結1'] },
          { title: ['109年第1期停灌申請開始辦理', '依據XXX公告，公告類地區工作站可以相關規定進行停灌作業申請辦理', '2012/12/17', '連結1'] }
        ]
      },
      tableData: {
        head: [
          { title: '表單名稱' },
          { title: '相關檔案' }
        ],
        body: [
          { title: ['XXXX表單', '資料填寫表單 資料填寫表單2'] },
          { title: ['XXXX表單', '資料填寫表單 '] },
          { title: ['XXXX資料須填寫XXXX表單', '資料填寫表單 '] },
          { title: ['XXXX資料須填寫XXXX表單', '資料填寫表單 '] }
        ]
      }
    };
  },
  name: 'Main',
  layout: 'main'
};
</script>
<style lang="scss" scoped>
.tableTool{
  .tableContent{
    table{
      tbody{
        text-align: left !important;
        tr{
          td:nth-child(2){
            min-width: 240px;
          }
          td:nth-child(5){
            min-width: 320px;
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

</style>
