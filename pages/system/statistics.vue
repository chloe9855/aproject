<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="system"
      title="系統使用量統計"
      :class="boxWidth"
      btn-text="資料下載"
      btn-name="button-primary"
    />
    <ToggleList :class="boxWidth" />
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
    }
  }
};
</script>
<style lang="scss">
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
