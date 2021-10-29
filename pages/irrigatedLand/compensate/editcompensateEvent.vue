<template>
  <div class="content_box">
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="layer"
      title="編輯停灌補償申請事件"
      :class="boxWidth"
      btn-text="取消"
      :btn-add="false"
      btn-name="button-default"
      btn-sec-text="確定"
      :btn-sec-add="false"
      btn-sec-name="button-primary"
      :is-border="true"
    />
    <SubTitleTool
      title="停灌補償申請事件綁定"
      class="w-90"
      :class="boxWidth"
    />
    <TableTool
      :table-column="tableList1"
      :is-paginate="false"
      :is-del="true"
      :class="boxWidth"
      class="editcompensateEventBind"
    />
    <SubTitleTool
      title="行政院農業委員會農田水利署停灌補償金申請書(二聯單)付款"
      class="w-90"
      :class="boxWidth"
      btn-text="存檔"
      :btn-add="false"
      btn-name="button-primary"
    />
    <Textarea
      class="w-90"
      :class="boxWidth"
    />
    <SubTitleTool
      title="停灌補償申請別"
      class="w-90"
      :class="boxWidth"
      btn-text="存檔"
      :btn-add="false"
      btn-name="button-primary"
      btn-sec-text="新增申請類別"
      :btn-sec-add="true"
      btn-sec-name="button-add"
    />
    <TableTool
      :table-column="tableList2"
      :is-paginate="false"
      :is-del="true"
      :class="boxWidth"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import Textarea from '~/components/tools/Textarea.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    SubTitleTool,
    Textarea
  },
  data () {
    return {
      tableList1: {
        head: [
          { title: '事件名稱' },
          { title: '開放申請起始日' },
          { title: '開放申請截止日' },
          { title: '開放申請區域' }
        ],
        body: [
          { title: [{ type: 'input' }, { type: 'date' }, { type: 'date' }, { type: 'dropdownTreeList' }] }
        ]
      },
      tableList2: {
        head: [
          { title: '類別名稱' },
          { title: '補償金額(元)' }
        ],
        body: [
          { val: 0, title: [{ type: 'input' }, { type: 'input' }] },
          { val: 1, title: [{ type: 'input' }, { type: 'input' }] }
        ]
      },
      BreadCrumb: ['灌溉地管理', '停灌補償申報', '編輯停灌補償申請事件'],
      toggleStatus: false
    };
  },
  name: 'EditCompensateEvent',
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
.content_box{
  padding-right: 0.5em;
  height: calc( 100vh - 88px ) !important;
}
.tableTool{
  .tableContent{
    table{
      tbody{
        text-align: left !important;
      }
    }
  }
}
.editcompensateEventBind{
  .tableBox{
    overflow: initial !important;
  }
}
</style>
