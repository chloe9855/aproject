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
      @PHBtnStatus="cancelEvent"
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
      @inputData="getEvent"
      @dateData="getDate"
      @tableEvent="eventClear"
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
      @textContent="getTextContent"
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
      @checkList="categoryCheckList"
      @inputObj="getCategoryData"
    />
    <AlertBox
      v-show="alertStatus"
      :title="compensateEventTitle"
      box-icon="warning"
      :text="compensateEventText"
      :cancel-button="isCancelButton"
      @confirm="sendEvent"
      @close="continueEdit"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import Textarea from '~/components/tools/Textarea.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
import { getEditApplySetting, editApplySetting, addApplySetting } from '~/api/apply';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    SubTitleTool,
    Textarea,
    AlertBox
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
        body: []
      },
      BreadCrumb: ['灌溉地管理', '停灌補償申報', '編輯停灌補償申請事件'],
      toggleStatus: false,
      categoryArr: [],
      start: '',
      end: '',
      eventName: '',
      note: '',
      alertStatus: false,
      compensateEventTitle: '',
      compensateEventText: '',
      isCancelButton: false,
      isSend: true
    };
  },
  name: 'EditCompensateEvent',
  mounted () {
    if (this.$store.state.editCompensateEventID !== '') {
      this.getEditData();
    }
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    getEditData () {
      getEditApplySetting(this.$store.state.editCompensateEventID).then(r => {
        this.editData = r.data[0];
        this.editType = 'edit';
        this.textAreaText = r.data[0].note;
        this.tableList1.body[0].title = [{ type: 'input', title: r.data[0].name }, { type: 'date', val: r.data[0].start }, { type: 'date', val: r.data[0].end }, { type: 'dropdownTreeList', option: r.data[0].open }];
        if (r.data[0].category.length > 0) {
          this.tableList2.body = [];
          r.data[0].category.forEach((t, i) => {
            this.tableList2.body.push({ val: i, title: [{ type: 'input', title: t.type }, { type: 'input', title: t.money }] });
            this.categoryArr[i] = { type: t.type, money: t.money };
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
      // console.log(e);
      if (e.event === 'isDel') {
        // console.log(this.tableList2.body);
        const z = this.tableList2.body.filter(a => {
          return a.val !== e.item.val;
        });
        this.tableList2.body = z;

        // console.log(this.tableList2.body);

        const arr = [];
        this.tableList2.body.forEach(element => {
          arr.push({ type: element.title[0].title, money: parseInt(element.title[1].title) });
        });
        this.categoryArr = arr;
        this.editData.Category = arr;
      }
    },
    applyEvent () {
      const data = {
        applysno: this.$store.state.editCompensateEventID,
        name: this.eventName,
        start: this.start,
        end: this.end,
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
        note: this.note,
        Category: this.categoryArr
      };
      if (this.editType === 'edit') {
        editApplySetting(data).then(r => {
          // console.log(r);
          this.$store.commit('SET_COMPENSATE_EVENT_ID', '');
          this.isSend = false;
          this.toggleAlertBox({ title: '完成編輯', text: '回到列表' });
          // this.$router.push('/irrigatedLand/dataChange/');
        }).catch(e => {
          console.log(e);
        });
      } else {
        addApplySetting(data).then(r => {
          this.isSend = false;
          this.toggleAlertBox({ title: '完成新增', text: '回到列表' });
          // this.$router.push('/irrigatedLand/dataChange/');
        }).catch(e => {
          console.log(e);
        });
      }
    },
    getEvent (e) {
      this.eventName = e[0].val;
    },
    getDate (e) {
      if (e && e[0] && e[1]) {
        this.start = e[0].val ? e[0].val : '';
        this.end = e[1].val ? e[1].val : '';
        this.editData.start = e[0].val ? e[0].val : '';
        this.editData.end = e[1].val ? e[1].val : '';
      }
    },
    eventClear (e) {
      // console.log(e);
    },
    getTextContent (e) {
      this.note = e;
    },
    categoryCheckList (e) {
      // console.log(e);
    },
    getCategoryData (e) {
      this.tableList2.body[e.id].title[e.num].title = e.val;
      const arr = [];
      this.tableList2.body.forEach(element => {
        arr.push({ type: element.title[0].title, money: parseInt(element.title[1].title) });
      });
      this.categoryArr = arr;
    },
    confirmEvent (e) {
      if (e) {
        if (this.editType === 'edit') {
          this.toggleAlertBox({ title: '確認修改', text: '確認修改該筆資料', isCancel: true });
        } else {
          this.toggleAlertBox({ title: '確認新增', text: '確認新增該筆資料', isCancel: true });
        }
      }
    },
    cancelEvent (e) {
      if (e) {
        this.toggleAlertBox({ title: '取消編輯', text: '該筆編輯將不會儲存', isCancel: true });
      }
    },
    sendEvent (e) {
      if (e) {
        console.log(this.isSend);
        if (this.isSend) {
          this.applyEvent();
        } else {
          this.closeAlert(true);
        }
      }
    },
    closeAlert (e) {
      if (e) {
        this.$router.push('/irrigatedLand/dataChange/');
      }
    },
    continueEdit () {
      this.alertStatus = !this.alertStatus;
      this.compensateEventTitle = '';
      this.compensateEventText = '';
      this.isCancelButton = !e.isCancel;
    },
    toggleAlertBox (e) {
      this.alertStatus = true;
      this.compensateEventTitle = e.title;
      this.compensateEventText = e.text;
      this.isCancelButton = e.isCancel;
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
