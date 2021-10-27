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
        icon="slider"
        title="群組權限管理"
        btn-text="新增群組"
        :btn-add="true"
        btn-name="button-add"
        @PHBtnStatus="addGroup"
      />
      <div
        class="content_box"
      >
        <TableTool
          :table-column="tableList"
          :is-paginate="false"
          :is-edit="true"
          :is-del="true"
          @tableEvent="changeGroup"
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
  name: 'Authority',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    addGroup (e) {
      if (e) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'group', title: '新增群組' });
      }
    },
    changeGroup (e) {
      if (e === 'isEdit') {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'group', title: '編輯群組' });
      } else if (e === 'isDel') {
        console.log('isDel');
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
  height: calc( 100vh - 175px );
  @include scrollBar;
}
.grow {
  width: 90%;
}
</style>
