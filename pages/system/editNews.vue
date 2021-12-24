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
      :table-column="tableList.bulletin"
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
        :table-column="tableList.tableData"
        :is-paginate="false"
        :is-edit="true"
        :is-del="true"
        @tableEvent="changeTable"
      />
      <TableTool
        :table-column="tableList.fileData"
        :is-paginate="false"
        :is-edit="true"
        :is-del="true"
        @tableEvent="changeFile"
      />
    </div>
    <AlertBox
      v-if="showAlert"
      :box-icon="boxIcon"
      :title="alertTitle"
      text=""
      :cancel-button="false"
      @confirm="closeAlert"
      @close="closeAlert"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
// import { editNewsData } from '~/publish/editNewsData';
import { getBulletin, editBulletin } from '~/api/bulletin';
import { tableData } from '~/publish/tableData';

export default {
  components: {
    PageHeader,
    TableTool,
    SubTitleTool,
    BreadCrumbTool,
    AlertBox
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
      // tableData: {
      //   head: [
      //     { title: '表單名稱' },
      //     { title: '相關檔案' }
      //   ],
      //   body: [
      //     { title: ['XXXX表單', '資料填寫表單 資料填寫表單2'] },
      //     { title: ['XXXX表單', '資料填寫表單 '] },
      //     { title: ['XXXX資料須填寫XXXX表單', '資料填寫表單 '] },
      //     { title: ['XXXX資料須填寫XXXX表單', '資料填寫表單 '] }
      //   ]
      // },
      BreadCrumb: ['系統管理', '首頁資料管理'],
      delBtn: '',
      delData: [],
      showAlert: false,
      boxIcon: '',
      alertTitle: ''
    };
  },
  name: 'EditNews',
  // async asyncData () {
  //   return getBulletin().then(({ data }) => ({
  //     tableList: {
  //       head: [
  //         { title: '公告名稱' },
  //         { title: '公告內容' },
  //         { title: '發布時間' },
  //         { title: '相關連結' }
  //       ],
  //       body: editNewsData(data)
  //     }
  //   })).catch(e => {
  //     console.log(e);
  //   });
  // },
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
    addNews (e) {
      console.log(e);
      this.$store.commit('SET_FORM_DATA', {
        ID: '',
        slogan: '',
        content: '',
        link: {},
        rows: []
      });
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
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'addFileData', title: '新增文件資料' });
      }
    },
    changeGroup (e) {
      if (e.event === 'isEdit') {
        this.editAnounce(e.item);
      } else if (e.event === 'isDel') {
        const data = {
          bulletinsno: [e.item.info],
          status: 0
        };
        editBulletin(data).then(r => {
          this.showAlert = true;
          this.boxIcon = 'success';
          this.alertTitle = '已成功刪除';
          const result = this.tableList.bulletin.body.filter(item => {
            return item.info !== e.item.info;
          });
          this.tableList.bulletin.body = result;
        }).catch(e => {
          console.log(e);
        });
      }
    },
    changeTable (e) {
      if (e.event === 'isEdit') {
        console.log(e.item.info);
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'editTableData', title: '編輯表單' });
        fetch(`/AERC/rest/Bulletin?ID=${e.item.info}`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          const result = {
            bulletinsno: data[0].bulletinsno,
            slogan: data[0].name,
            content: data[0].content,
            link: {},
            name: [],
            data: [],
            rows: []
          };
          // result.rows = data[num].dataname;
          data[0].datacontent.forEach((item) => {
            result.rows.push(item.dataname);
          });
          data[0].datacontent.forEach((item, index) => {
            result.link[`a${index}`] = item.dataname;
            result.name.push(item.dataname);
          });
          data[0].datacontent.forEach((item, index) => {
            result.link[`b${index}`] = item.data;
            result.data.push(item.data);
          });
          console.log(result);
          this.$store.commit('SET_FORM_DATA', result);
        }).catch(e => {
          console.log(e);
        });
      } else if (e.event === 'isDel') {
        const data = {
          bulletinsno: [e.item.info],
          status: 0
        };
        editBulletin(data).then(r => {
          this.showAlert = true;
          this.boxIcon = 'success';
          this.alertTitle = '已成功刪除';
          const result = this.tableList.tableData.body.filter(item => {
            return item.info !== e.item.info;
          });
          this.tableList.tableData.body = result;
        }).catch(e => {
          console.log(e);
        });
      }
    },
    changeFile (e) {
      if (e.event === 'isEdit') {
        console.log(e.item.info);
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'editFileData', title: '編輯文件A' });
        fetch(`/AERC/rest/Bulletin?ID=${e.item.info}`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          const result = {
            bulletinsno: data[0].bulletinsno,
            slogan: data[0].name,
            content: data[0].content,
            name: [],
            data: [],
            link: {},
            rows: []
          };
          // result.rows = data[num].dataname;
          data[0].datacontent.forEach((item) => {
            result.rows.push(item.dataname);
          });
          data[0].datacontent.forEach((item, index) => {
            result.link[`a${index}`] = item.dataname;
            result.name.push(item.dataname);
          });
          data[0].datacontent.forEach((item, index) => {
            result.link[`b${index}`] = item.data;
            result.data.push(item.data);
          });
          console.log('resultRRRRR');
          console.log(result);
          this.$store.commit('SET_FORM_DATA', result);
        }).catch(e => {
          console.log(e);
        });
      } else if (e.event === 'isDel') {
        const data = {
          bulletinsno: [e.item.info],
          status: 0
        };
        editBulletin(data).then(r => {
          this.showAlert = true;
          this.boxIcon = 'success';
          this.alertTitle = '已成功刪除';
          const result = this.tableList.fileData.body.filter(item => {
            return item.info !== e.item.info;
          });
          this.tableList.fileData.body = result;
        }).catch(e => {
          console.log(e);
        });
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
    closeAlert () {
      this.showAlert = false;
      this.boxIcon = '';
      this.title = '';
    },
    delMNews () {
      const data = 'bulletinsno=[5,6]&status=1';
      editBulletin(data).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      });
    },
    // * 按下編輯公告
    editAnounce (myId) {
      const num = myId.info - 1;
      this.$store.commit('TOGGLE_POPUP_STATUS');
      this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'news', title: '編輯公告' });
      setTimeout(() => {
        fetch(`/AERC/rest/Bulletin?ID=${myId}`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          const result = {
            ID: num,
            slogan: data[num].name,
            content: data[num].content,
            link: {},
            rows: [],
            datasno: []
          };
          // result.rows = data[num].dataname;
          data[num].datacontent.forEach((item) => {
            result.rows.push(item.dataname);
          });
          data[num].datacontent.forEach((item, index) => {
            result.link[`a${index}`] = item.dataname;
          });
          data[num].datacontent.forEach((item, index) => {
            result.link[`b${index}`] = item.data;
          });
          data[num].datacontent.forEach((item, index) => {
            result.datasno.push(item.datasno);
          });
          data[num].datacontent.forEach((item, index) => {
            result.link[`c${index}`] = item.datasno;
          });
          this.$store.commit('SET_FORM_DATA', result);
        }).catch((err) => {
          console.log('錯誤:', err);
        });
      }, 1000);
    }
  },
  computed: {
    callPopup () {
      return this.$store.state.popupAlert;
    }
  },
  watch: {
    callPopup (e) {
      if (e.status) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.showAlert = true;
        this.boxIcon = 'success';
        this.alertTitle = '已成功';
        // const _this = this;
        getBulletin().then(data => {
          console.log(data);
          this.tableList.bulletin.body = tableData(data.data, 0);
          this.tableList.tableData.body = tableData(data.data, 1);
          this.tableList.fileData.body = tableData(data.data, 2);
        }).catch(e => {
          console.log(e);
        });
      }
      console.log(e);
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
