<template>
  <div>
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
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      tableList1: {
        head: [
          { title: '事件名稱' },
          { title: '開放申請起始日' },
          { title: '開放申請截止日' },
          { title: '開放申請區域' }
        ],
        body: [
          { title: [{ type: 'input' }, { type: 'date' }, { type: 'date' }, { type: 'dropdown' }] }
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
      checkList: { data: [{ title: '全選', value: 'all' }, { title: '1.身分證(正反)影本', value: 0 }, { title: '2.金融帳戶影本', value: 1 }, { title: '3.附件一:切結書', value: 2 }, { title: '4.附件二:實耕者證明文件', value: 3 }, { title: '5.代理委任書:(授權書或同意書)', value: 4 }] },
      BreadCrumb: ['灌溉地管理', '停灌補償申報', '編輯停灌補償申請事件'],
      toggleStatus: false,
      RequisitionDqata1: { data: [{ title: '姓名', name: '', isRequire: true }, { title: '身份證字號', name: '', isRequire: true }, { title: '出生日期', name: '', isRequire: true }, { title: '地址', name: '', isRequire: true }, { title: '連絡電話', name: '', isRequire: true }, { title: '匯款資訊', name: '', isRequire: true, isSecondInput: true }] },
      RequisitionDqata2: { data: [{ title: '代理人姓名', name: '', isRequire: true }, { title: '代理人身份證字號', name: '', isRequire: true }, { title: '代理人地址', name: '', isRequire: true }, { title: '代理人連絡電話', name: '', isRequire: true }] }
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
.page-header{
  margin: 1em auto !important;
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
.subTitleTool{
  margin: 1em auto !important;
}
</style>
