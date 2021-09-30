<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="edit"
      title="停灌資料異動"
      :class="boxWidth"
    />
    <SubTitleTool
      title="停灌補償申請事件設定"
      :class="boxWidth"
      btn-text="新增事件"
      :btn-add="true"
      btn-name="button-add"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="false"
      :is-edit="true"
      :class="boxWidth"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    SubTitleTool
  },
  data () {
    return {
      tableList: {
        head: [
          { title: '事件名稱' },
          { title: '開放申請起始日' },
          { title: '開放申請截止日' },
          { title: '開放申請區域' }
        ],
        body: [
          { title: ['109年第2期', '109/6/10', '109/7/10', 'XX管理處XX水利小組、XX管理處XX水利小組、XX管理處XX水利小組'] },
          { title: ['109年第1期', '109/3/10', '109/4/10', 'XX管理處XX水利小組、XX管理處XX水利小組、XX管理處XX水利小組'] }
        ]
      },
      BreadCrumb: ['灌溉地管理', '灌溉地籍查詢'],
      toggleStatus: false
    };
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
.page-header{
  margin: 1em auto !important;
}
.calNoteBox{
    display: flex;
    justify-content:flex-end;
    margin: 0 auto;
    div{
        margin: 0 2.5px;
    }
}
.tableTool{
  margin: 0 auto !important;
  .tableContent{
    table{
      tbody{
        text-align: left !important;
      }
    }
  }
}
.breadcrumb{
  margin: 1em auto !important;
}

</style>
