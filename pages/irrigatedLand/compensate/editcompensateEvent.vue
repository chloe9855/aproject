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
      @PHSecBtnStatus="confirmEvent"
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
      title="行政院農業委員會農田水利署停灌補償金申請書(二聯單)附款"
      class="w-90"
      :class="boxWidth"
      btn-text="存檔"
      :btn-add="false"
      btn-name="button-primary"
    />
    <Textarea
      class="w-90"
      :class="boxWidth"
      :default-text="textAreaText"
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
      @STbtnSecStatus="addCategory"
    />
    <TableTool
      :table-column="tableList2"
      :is-paginate="false"
      :is-del="true"
      :class="boxWidth"
      @tableEvent="removeCategory"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import Textarea from '~/components/tools/Textarea.vue';
import { getEditApplySetting, editApplySetting } from '~/api/apply';

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
      textAreaText: '',
      editType: 'add',
      tableList2: {
        head: [
          { title: '類別名稱' },
          { title: '補償金額(元)' }
        ],
        body: [
          { val: 0, title: [{ type: 'input' }, { type: 'input' }] }
        ]
      },
      BreadCrumb: ['灌溉地管理', '停灌補償申報', '編輯停灌補償申請事件'],
      toggleStatus: false,
      editData: {}
    };
  },
  name: 'EditCompensateEvent',
  mounted () {
    if (this.$store.state.editDataID !== '') {
      this.getEditData();
    }
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    getEditData () {
      getEditApplySetting(this.$store.state.editDataID).then(r => {
        console.log(r.data[0]);
        this.editData = r.data[0];
        this.editType = 'edit';
        this.textAreaText = r.data[0].note;
        this.tableList1.body[0].title = [{ type: 'input', title: r.data[0].name }, { type: 'date', val: r.data[0].start }, { type: 'date', val: r.data[0].end }, { type: 'dropdownTreeList' }];
        if (r.data[0].category.length > 0) {
          this.tableList2.body = [];
          r.data[0].category.forEach((t, i) => {
            console.log(t);
            this.tableList2.body.push({ val: i, title: [{ type: 'input', title: t.type }, { type: 'input', title: t.money }] });
          });
        }
      });
    },
    addCategory (e) {
      if (e) {
        const num = this.tableList2.body.length;
        this.tableList2.body.push({ val: num, title: [{ type: 'input' }, { type: 'input' }] });
      }
    },
    removeCategory (e) {
      console.log(e);
      if (e.event === 'isDel') {
        console.log(this.tableList2.body);
        const z = this.tableList2.body.filter(a => {
          return a.val !== e.item.val;
        });
        this.tableList2.body = z;
        console.log(this.tableList2.body);
      }
    },
    confirmEvent () {
      const data = {
        applysno: 16,
        name: '109年第2期',
        start: '2021-01-01 00:00:00',
        end: '2022-05-01 00:00:00',
        open: [
          {
            Ia: '01',
            Ia_cns: '宜蘭',
            Mng: '0',
            Mng_cns: '無',
            Stn: '01',
            Stn_cns: '頭城站',
            Grp: '01',
            Grp_cns: '五股小組'
          }
        ],
        note: '申請人承諾下列事項，絕無虛假不實情事：',
        Category:
        [
          { type: '玉米', money: 90000 },
          { type: '水果', money: 50000 }
        ]
      };
      if (this.editType === 'edit') {
        editApplySetting(data).then(r => {
          console.log(r);
        }).catch(e => {
          console.log(e);
        });
      }
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
  height: calc( 100vh - 190px ) !important;
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
