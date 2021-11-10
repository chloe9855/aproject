<template>
  <div class="news">
    <BreadCrumbTool
      class="w-90"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="edit"
      title="首頁資料管理"
      class="w-90"
      :is-bg="true"
      :is-border="true"
      :is-sticky="true"
    />
    <SubTitleTool
      title="最新公告"
      :btn-text="delBtn"
      :btn-add="false"
      btn-name="button-red"
      btn-sec-text="新增公告"
      :btn-sec-add="true"
      btn-sec-name="button-add"
      class="w-90"
      @STbtnStatus="delMNews"
      @STbtnSecStatus="addNews"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="false"
      :is-edit="true"
      :is-del="true"
      class="w-90 news"
      @tableEvent="changeGroup"
      @checkList="getTableCheck"
    />

    <div class="downloadTitle w-90">
      <SubTitleTool
        title="相關表單資料"
        :btn-add="true"
        btn-text="新增表單"
        @STbtnStatus="addTable"
      />
      <SubTitleTool
        title="相關文件資料"
        :btn-add="true"
        btn-text="新增文件"
        @STbtnStatus="addFile"
      />
    </div>
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
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import { editNewsData } from '~/publish/editNewsData';
import { getBulletin, editBulletin } from '~/api/bulletin';

export default {
  components: {
    PageHeader,
    TableTool,
    SubTitleTool,
    BreadCrumbTool
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
          { val: 0, title: ['系統維修更新(字多呈現)', '於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用於xx/xx上午將進行系統維修更新，請避開該時段使用', '2012/12/17', '連結1,連結2,連結3,連結4,連結5,連結6'] },
          { val: 1, title: ['109年第2期停灌申請開始辦理', '依據XXX公告，公告類地區工作站可以相關規定進行停灌作業申請辦理', '2012/12/17', '連結1'] },
          { val: 2, title: ['系統維修更新', '於xx/xx上午將進行系統維修更新，請避開該時段使用', '2012/12/17', '連結1'] },
          { val: 3, title: ['109年第1期停灌申請開始辦理', '依據XXX公告，公告類地區工作站可以相關規定進行停灌作業申請辦理', '2012/12/17', '連結1'] }
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
      },
      BreadCrumb: ['系統管理', '首頁資料管理'],
      delBtn: '',
      delData: []
    };
  },
  name: 'EditNews',
  async asyncData () {
    return getBulletin().then(({ data }) => ({
      tableList: {
        head: [
          { title: '公告名稱' },
          { title: '公告內容' },
          { title: '發布時間' },
          { title: '相關連結' }
        ],
        body: editNewsData(data)
      }
    })).catch(e => {
      console.log(e);
    });
  },
  methods: {
    addNews (e) {
      console.log(e);
      if (e) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'news', title: '新增公告' });
      }
    },
    addTable (e) {
      if (e) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'addTableData', title: '新增表單資料' });
      }
    },
    addFile (e) {
      if (e) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'file', title: '新增文件資料' });
      }
    },
    changeGroup (e) {
      if (e === 'isEdit') {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'news', title: '編輯公告' });
      } else if (e === 'isDel') {
        console.log('isDel');
      }
    },
    getTableCheck (e) {
      if (e) {
        this.delData = e;
        if (e.length > 1) {
          this.delBtn = '多筆刪除';
        } else {
          this.delBtn = '';
        };
      }
    },
    delMNews () {
      console.log('del');
      const data = `bulletinsno=${this.delData}&status=1`;
      editBulletin(data).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      });
    }
  }

};
</script>
<style lang="scss">
.news{
  padding-bottom:5vh !important;
  &.tableTool{
    padding-bottom:0 !important;
    flex:1;
    @include noto-sans-tc-16-regular;
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
</style>
