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
      title="停灌補償開放申請區域"
      class="w-90"
      :class="boxWidth"
    />
    <SelectAreaTool
      :is-clear="isClear"
      @onsearch="getAreaData"
    />
    <TableTool
      :table-column="tableAreaList"
      :is-paginate="false"
      :is-del="true"
      :class="boxWidth"
      class="editcompensateEventBind"
      @tableEvent="areaDel"
    />
    <SubTitleTool
      title="行政院農業委員會農田水利署停灌補償金申請書(二聯單)附款"
      class="w-90"
      :class="boxWidth"
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
      :btn-text="categoryBtnText"
      :btn-add="false"
      :btn-name="categoryBtnName"
      btn-sec-text="新增申請類別"
      :btn-sec-add="true"
      btn-sec-name="button-add"
      @STbtnStatus="adjustCategory"
      @STbtnSecStatus="addCategory"
    />
    <TableTool
      :table-column="tableList2"
      :is-paginate="false"
      :is-del="true"
      :class="boxWidth"
      :is-scroll-table="false"
      @tableEvent="removeCategory"
      @checkList="categoryCheckList"
      @inputObj="getCategoryData"
    />
    <AlertBox
      v-show="alertStatus"
      :title="compensateEventTitle"
      :box-icon="compensateEventIIcon"
      :text="compensateEventText"
      :cancel-button="isCancelButton"
      @confirm="sendEvent"
      @close="continueEdit"
    />
    <AlertBox
      v-show="alertErrorStatus"
      :title="errorEventTitle"
      box-icon="warning"
      :text="errorEventText"
      @confirm="continueEdit"
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
import SelectAreaTool from '~/components/model/editList/selectAreaTool.vue';

import { getEditApplySetting, editApplySetting, addApplySetting } from '~/api/apply';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    SubTitleTool,
    Textarea,
    AlertBox,
    SelectAreaTool
  },
  data () {
    return {
      tableList1: {
        head: [
          { title: '事件名稱' },
          { title: '開放申請起始日' },
          { title: '開放申請截止日' }
        ],
        body: [
          { title: [{ type: 'input' }, { type: 'date' }, { type: 'date' }] }
        ]
      },
      tableAreaList: {
        head: [
          { title: '管理處' },
          { title: '管理分處' },
          { title: '工作站' },
          { title: '水利小組' }
        ],
        body: []
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
      BreadCrumb: ['灌溉地管理', '停灌資料異動', '編輯停灌補償申請事件'],
      toggleStatus: false,
      categoryArr: [],
      delCategoryList: [],
      start: '',
      end: '',
      eventName: '',
      note: '',
      alertStatus: false,
      alertErrorStatus: false,
      errorEventTitle: '',
      errorEventText: '',
      compensateEventTitle: '',
      compensateEventText: '',
      isCancelButton: false,
      isSend: true,
      categoryBtnText: '',
      categoryBtnName: 'button-primary',
      compensateEventIIcon: 'warning',
      areaOpen: [],
      isChangeDate: false,
      isCancelStatus: false,
      isClear: false
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
        this.tableList1.body[0].title = [{ type: 'input', title: r.data[0].name }, { type: 'date', val: r.data[0].start }, { type: 'date', val: r.data[0].end }];
        if (r.data[0].category.length > 0) {
          this.tableList2.body = [];
          r.data[0].category.forEach((t, i) => {
            this.tableList2.body.push({ val: i, title: [{ type: 'input', title: t.type }, { type: 'input', title: t.money }] });
            this.categoryArr[i] = { type: t.type, money: t.money };
          });
        }
        if (r.data[0].open.length > 0) {
          this.tableAreaList.body = [];
          this.areaOpen = [];
          const _this = this;
          r.data[0].open.forEach((t, i) => {
            let result = {};
            let result1 = {};
            console.log(t);
            // this.tableList2.body.push({ val: i, title: [{ type: 'input', title: t.type }, { type: 'input', title: t.money }] });
            // this.categoryArr[i] = { type: t.type, money: t.money };
            result1 = { title: [t.Ia_cns, t.Mng_cns, t.Stn_cns, t.Grp_cns] };
            result = {
              Ia: t.Ia,
              Ia_cns: t.Ia_cns,
              Mng: t.Mng,
              Mng_cns: t.Mng_cns,
              Stn: t.Stn,
              Stn_cns: t.Stn_cns,
              Grp: t.Grp,
              Grp_cns: t.Grp_cns
            };
            _this.tableAreaList.body.push(result1);
            _this.areaOpen.push(result);
          });

          // result1 = { title: [e.obj.Ia_cns, e.obj.Mng_cns, e.obj.Stn_cns, item.title] };
          // this.tableAreaList.body.push(result1);
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
      if (e.event === 'isDel') {
        const z = this.tableList2.body.filter(a => {
          return a.val !== e.item.val;
        });
        this.tableList2.body = z;

        const arr = [];
        this.tableList2.body.forEach(element => {
          arr.push({ type: element.title[0].title, money: parseInt(element.title[1].title) });
        });
        this.categoryArr = arr;
        this.editData.Category = arr;
      }
    },
    changeDate (e) {
      let result = e;
      if (e) {
        result = e.replace('T', ' ');
        return result;
      }
    },
    applyEvent () {
      const data = {
        applysno: this.$store.state.editCompensateEventID,
        name: this.eventName,
        open: this.areaOpen,
        note: this.note,
        Category: this.categoryArr
      };
      if (this.editType === 'edit') {
        if (this.isChangeDate) {
          data.start = this.changeDate(this.start);
          data.end = this.changeDate(this.end);
        };
        editApplySetting(data).then(r => {
          this.$store.commit('SET_COMPENSATE_EVENT_ID', '');
          this.isSend = false;
          this.compensateEventIIcon = 'success';
          this.toggleAlertBox({ title: '完成編輯', text: '回到列表' });
        }).catch(e => {
          if (e.response.status === 400) {
            this.alertErrorStatus = true;
            this.errorEventTitle = '發送失敗';
            this.errorEventText = e.response.data;
          } else if ((e.response.status === 401)) {
            this.$router.push('/login');
          }
          console.log(e);
        });
      } else {
        data.start = this.changeDate(this.start);
        data.end = this.changeDate(this.end);
        addApplySetting(data).then(r => {
          this.isSend = false;
          this.compensateEventIIcon = 'success';
          this.toggleAlertBox({ title: '完成新增', text: '回到列表' });
        }).catch(e => {
          if (e.response.status === 400) {
            this.alertErrorStatus = true;
            this.errorEventTitle = '發送失敗';
            this.errorEventText = e.response.data;
          } else if ((e.response.status === 401)) {
            this.$router.push('/login');
          }
          console.log(e);
        });
      }
    },
    getAreaData (e) {
      console.log(e.obj.Grp);
      this.isClear = false;
      if (e.obj.Grp.length > 0) {
        e.obj.Grp.forEach((item, i) => {
          let result = {};
          let result1 = { title: '' };
          result = {
            Ia: e.obj.Ia,
            Ia_cns: e.obj.Ia_cns,
            Mng: e.obj.Mng,
            Mng_cns: e.obj.Mng_cns,
            Stn: e.obj.Stn,
            Stn_cns: e.obj.Stn_cns,
            Grp: item.value,
            Grp_cns: item.title
          };
          result1 = { title: [e.obj.Ia_cns, e.obj.Mng_cns, e.obj.Stn_cns, item.title] };
          this.tableAreaList.body.push(result1);
          this.areaOpen.push(result);
        });
        const set1 = new Set();
        const result = [...new Set(this.areaOpen.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
        const result1 = this.tableAreaList.body.filter(item => {
          return !set1.has(item.title[3]) ? set1.add(item.title[3]) : false;
        });
        this.areaOpen = result;
        this.tableAreaList.body = result1;
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
    areaDel (e) {
      this.tableAreaList.body.splice(e.myIndex, 1);
      this.areaOpen.splice(e.myIndex, 1);
      this.isClear = true;
      // console.log(e.myIndex);
    },
    getTextContent (e) {
      this.note = e;
    },
    categoryCheckList (e) {
      console.log(e);
      if (e.length > 0) {
        this.delCategoryList = e;
        this.categoryBtnText = '刪除';
        this.categoryBtnName = 'button-red';
      } else {
        this.categoryBtnText = '';
        this.categoryBtnName = 'button-primary';
      }
    },
    delCategoryData (e) {
      if (e) {
        const _this = this;
        const z = this.tableList2.body.filter(function (item) {
          return _this.delCategoryList.indexOf(item.val) === -1;
        });
        this.tableList2.body = z;
        this.delCategoryList = [];
      }
    },
    adjustCategory (e) {
      if (e) {
        if (this.delCategoryList.length > 0) {
          this.delCategoryData(e);
        }
      }
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
        this.isCancelStatus = true;
        this.toggleAlertBox({ title: '取消編輯', text: '該筆編輯將不會儲存', isCancel: true });
      }
    },
    sendEvent (e) {
      if (e) {
        console.log(this.isSend);
        if (this.isSend && !this.isCancelStatus) {
          this.applyEvent();
        } else {
          this.closeAlert(true);
        }
      }
    },
    closeAlert (e) {
      if (e) {
        this.$router.push('/irrigatedLand/compensateChange/');
      }
    },
    continueEdit (e) {
      this.alertStatus = false;
      this.compensateEventTitle = '';
      this.compensateEventText = '';
      this.isCancelButton = !e.isCancel;

      this.alertErrorStatus = false;
      this.errorEventTitle = '';
      this.errorEventText = '';
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
  },
  watch: {
    start (n, o) {
      if (o !== '') {
        this.isChangeDate = true;
      }
    },
    end (n, o) {
      if (o !== '') {
        this.isChangeDate = true;
      }
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
