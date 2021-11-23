<template>
  <div>
    <BreadCrumbTool
      :options="BreadCrumb"
      class="w-90"
    />
    <PageHeader
      icon="file"
      title="統計報表"
      class="w-90"
      tips="列印日期:110年8月3日"
      :is-border="true"
      :is-sticky="true"
    />
    <div class="w-90 treeListBox content_box">
      <div class="flexBox selectList">
        <SubTitleTool
          title="單位:桃園管理處"
          class="w-100"
        />
        <div class="flexBox treeList">
          <TreeSelectBox
            class="flex-1"
            title="停灌補償核定統計表"
          />
          <TreeSelectBox
            class="flex-1"
            title="停灌補償申報統計表(日報)"
          />
          <TreeSelectBox
            class="flex-1"
            title="補償(撥款)清冊"
          />
        </div>
      </div>
      <div class="flexBox selectList">
        <SubTitleTool
          title="單位:農田水利署"
          class="w-100"
        />
        <div class="flexBox treeList">
          <TreeSelectBox
            class="flex-1"
            title="停灌補償核定統計表"
          />
          <TreeSelectBox
            class="flex-1"
            title="停灌補償申報統計表(日報)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import TreeSelectBox from '~/components/model/editList/TreeSelectTool.vue';

export default {
  components: {
    PageHeader,
    BreadCrumbTool,
    SubTitleTool,
    TreeSelectBox
  },
  data () {
    return {
      BreadCrumb: ['灌溉地管理', '統計報表']
    };
  },
  name: 'Report'
};
</script>
<style lang="scss" scoped>
.mainContent{
  position: relative;
}
.content_box{
  padding-right: 0.5em;
  height: calc( 100vh - 200px );
}
.treeListBox{
  margin: 1em auto !important;
  display: flex;
  flex-direction: initial;
  .selectList{
    flex-direction: column;
    .treeList{
        flex-direction: initial;
    }
  }
  .selectList:nth-child(1) {
    margin-right: 5px;
    flex: 3;
  }
  .selectList:nth-child(2) {
    flex: 2;
  }
}
</style>
