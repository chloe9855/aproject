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
        icon="system"
        title="系統使用量統計"
        btn-text="資料下載"
        btn-name="button-primary"
      />
      <div
        class="content_box"
      >
        <ToggleList />
      </div>
    </div>
    <Search
      type="usageAmountSearch"
      @toggleStatus="getToggleStatus"
    />
  </div>
</template>

<script>
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';
import ToggleList from '~/components/model/ToggleList.vue';

export default {
  components: {
    PageHeader,
    BreadCrumbTool,
    Search: Search,
    ToggleList: ToggleList
  },
  data () {
    return {
      tableList: {
        head: [
          { title: '群組名稱' },
          { title: '最後變更日期' }
        ],
        body: [
          { title: ['XX工作站', '2012/12/17'] },
          { title: ['XX工作站', '2012/12/17'] },
          { title: ['OX工作站', '2012/12/17'] },
          { title: ['OO工作站', '2012/12/17'] },
          { title: ['XX工作站', '2012/12/17'] },
          { title: ['XX工作站', '2012/12/17'] },
          { title: ['OX工作站', '2012/12/17'] },
          { title: ['OO工作站', '2012/12/17'] }
        ]
      },
      BreadCrumb: ['系統管理', '系統使用量統計'],
      toggleStatus: false
    };
  },
  name: 'Statistics',
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
    },
    accountToggle () {
      return this.$store.state.settingAccount;
    }
  }
};
</script>
<style lang="scss">
.mainContent{
  position: relative;
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
