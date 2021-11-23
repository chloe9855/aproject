<template>
  <div>
    <PageHeader
      icon="news"
      class="w-90"
      :is-sticky="true"
      :is-bread-crumb="false"
    />
    <div class="mainContent">
      <TableTool
        :table-column="tableList.bulletin"
        :is-paginate="false"
        class="w-90 news"
      />
      <PageHeader
        icon="download"
        class="w-90"
      />
      <div class="downloadArea w-90">
        <div class="w-50 pr_2">
          <SubTitleTool title="相關表單資料" />
          <TableTool
            :table-column="tableList.tableData"
            :is-paginate="false"
          />
        </div>
        <div class="w-50">
          <SubTitleTool title="相關文件資料" />
          <TableTool
            :table-column="tableList.fileData"
            :is-paginate="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import { getBulletin } from '~/api/bulletin';
import { tableData } from '~/publish/tableData';

export default {
  components: {
    PageHeader,
    TableTool,
    SubTitleTool
  },
  data () {
    return {
      result: [],
      tableList: {
        head: [
          { title: '公告名稱' },
          { title: '公告內容' },
          { title: '發布時間' },
          { title: '相關連結' }
        ],
        body: [
          { title: ['系統維修更新(字多呈現)', '於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用', '2012/12/17', '連結1,連結2,連結3,連結4,連結5,連結6,連結7'] },
          { title: ['109年第2期停灌申請開始辦理', '依據XXX公告，公告類地區工作站可以相關規定進行停灌作業申請辦理', '2012/12/17', { type: 'link', data: ['./login', './login'] }] },
          { title: ['系統維修更新', '於xx/xx上午將進行系統維修更新，請避開該時段使用', '2012/12/17', { type: 'input' }] },
          { title: ['109年第1期停灌申請開始辦理', '依據XXX公告，公告類地區工作站可以相關規定進行停灌作業申請辦理', '2012/12/17', '連結1'] }
        ]
      }
    };
  },
  name: 'Main',
  layout: 'main2',
  middleware: 'routerAuth',
  async asyncData () {
    const a = getBulletin().then(({ data }) => ({
      tableList: {
        bulletin: {
          head: [
            { title: '公告名稱' },
            { title: '公告內容' },
            { title: '發布時間' },
            { title: '相關連結' }
          ],
          body: tableData(data, 0)
        },
        tableData: {
          head: [
            { title: '表單名稱' },
            { title: '相關檔案' }
          ],
          body: tableData(data, 1)
        },
        fileData: {
          head: [
            { title: '文件名稱' },
            { title: '相關檔案' }
          ],
          body: tableData(data, 2)
        }
      }
    })).catch(e => {
      console.log(e);
    });
    return a;
  },
  methods: {
  },
  computed: {}
};
</script>
<style lang="scss">
.mainContent{
  overflow:hidden;
  padding-bottom: 5vh;
}
.news{
  &.tableTool{
    flex:1;
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
}
.downloadArea{
  display: flex;
  margin: 0 auto;
  .tableTool{
    flex:1;
    background: white;
    min-height: auto;
  }
  .tableTool:nth-child(1){
    margin-right: 1em !important;
  }
  .pr_2{
    padding-right: 2em;
  }
}
</style>
