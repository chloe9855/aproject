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
        icon="farmer"
        title="帳號管理"
        btn-text="新增帳號"
        :btn-add="true"
        btn-name="button-add"
        @PHBtnStatus="addAccount"
      />
      <div
        class="content_box"
      >
        <TableTool
          :table-column="tableList"
          :is-paginate="true"
          :is-edit="true"
          :is-del="true"
          :is-scroll-table="true"
          :column-min-width="150"
        />
      </div>
    </div>
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
  name: 'Account',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    addAccount (e) {
      if (e) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'addAccount', title: '新增帳號' });
      }
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
<style lang="scss" scoped>
.mainContent{
  position: relative;
}
.tableTool{
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
.content_block {
    width: calc(100% - 372px);
    transition: ease-in-out 0.4s;
    height:100%;
    margin : 0 5%;
}
.content_box{
  height: calc( 100vh - 190px );
  padding-right: 0.5em;
  @include scrollBar;
}
.grow {
  width: 90%;
}
</style>
