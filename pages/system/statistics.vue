<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="slider"
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
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
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
.toggleList{
  margin: 0 auto !important;
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
