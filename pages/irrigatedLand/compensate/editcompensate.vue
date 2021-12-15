<template>
  <div>
    <div
      class="content_block"
      :class="[growDiv,boxWidth]"
    >
      <BreadCrumbTool
        :options="BreadCrumb"
      />
      <PageHeader
        icon="edit"
        title="編輯停灌補償申請單"
        btn-text="取消"
        btn-name="button-default"
        btn-sec-text="新增"
        btn-sec-name="button-primary"
        :btn-sec-add="false"
        :is-border="true"
        :is-bg="true"
        :is-sticky="true"
        @PHBtnStatus="cancelEdit"
        @PHSecBtnStatus="sendCompensateData"
      />
      <SubTitleTool
        title="新增土地資料"
        class="w-90"
      />
      <component
        :is="componentInstance"
        class="w-90 openAddBox"
        :option="checkList"
        :class="[{isToggle:toggleStatus},test]"
        @addCompensate="addCompensate"
        @clear="boxToggle"
      />
      <SubTitleTool
        title="土地資料(填寫單位:桃園管理處)"
        class="w-90"
        :btn-text="isAddLandDataBtn"
        :btn-add="true"
        :btn-sec-text="isDelLandDataBtn"
        btn-sec-name="button-red"
        @STbtnStatus="boxToggle"
        @STbtnSecStatus="delLandData"
      />
      <TableTool
        :table-column="tableList"
        :is-paginate="false"
        class="w-90"
        :is-del="true"
        :is-scroll-table="false"
        @checkList="getDelList"
        @tableEvent="tableEvent"
      />
      <SubTitleTool
        title="申請人資料"
        class="w-90"
      />
      <div
        class="w-90 checkBoxOption"
        style="margin:0 auto"
      >
        <input
          id="self"
          v-model="userConfirm"
          type="checkbox"
          name="self"
          value="self"
        >確定為本人申請<label for="self" />
      </div>
      <RequisitionBox1
        class="w-90"
        :class="[{isToggle:toggleStatus}]"
        :bank-list="bankList"
        :data-list="userInfo1"
        @userInfo="getuserInfo"
      />
      <RequisitionBox2
        class="w-90"
        :class="[{isToggle:toggleStatus}]"
        :data-list="agentInfo1"
        @agentInfo="getagentInfo"
      />
    </div>
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import RequisitionBox2 from '~/components/model/editList/RequisitionBox2.vue';
import RequisitionBox1 from '~/components/model/editList/RequisitionBox1.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import AddLand from '~/components/model/editList/AddLand.vue';
import { getBankList } from '~/api/bank';
import { addApplyEvent, editApplyEvent } from '~/api/apply';
import { mapState } from 'vuex';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    SubTitleTool,
    RequisitionBox1,
    RequisitionBox2,
    AddLand
  },
  data () {
    return {
      tableList: {
        name: 'editCompensate',
        topHead: [
          { title: '土地資料', col: 4 },
          { title: '農田水利資料', col: 2 },
          { title: '土地所有權人', col: 3 },
          { title: '農民類別', col: 1 },
          { title: '申請項目', col: 4 }
        ],
        head: [
          { title: '縣市' },
          { title: '鄉鎮' },
          { title: '地段' },
          { title: '地籍面積㎡' },
          { title: '工作站' },
          { title: '灌溉面積㎡' },
          { title: '姓名' },
          { title: '權利範圍' },
          { title: '權利類別' },
          { title: '申請人類別' },
          { title: '申請類別' },
          { title: '申請面積㎡' },
          { title: '作物備註' },
          { title: '檢附資料', setW: 'setWidth720' }
        ],
        body: []
      },
      checkList: { data: [{ title: '全選', value: 'attachmentAll' }, { title: '1.身分證(正反)影本', value: 'attachment1' }, { title: '2.金融帳戶影本', value: 'attachment2' }, { title: '3.附件一:切結書', value: 'attachment3' }, { title: '4.附件二:實耕者證明文件', value: 'attachment4' }, { title: '5.代理委任書:(授權書或同意書)', value: 'attachment5' }] },
      BreadCrumb: ['灌溉地管理', '停灌補償申報', '編輯停灌補償申請單'],
      toggleStatus: false,
      boxToggleStatus: true,
      userConfirm: false,
      bankList: [],
      delCompensateList: [],
      sendData: [],
      attachmentText: '',
      attachmentList: {
        attachment1: '',
        attachment2: '',
        attachment3: '',
        attachment4: '',
        attachment5: ''
      },
      userInfo: {
        name: '',
        id: '',
        birth: '',
        address: '',
        phone: '',
        account: '',
        bank: ''
      },
      userInfo1: {
        name: '',
        id: '',
        birth: '',
        address: '',
        phone: '',
        account: '',
        bank: ''
      },
      agentInfo: {
        name: '',
        id: '',
        address: '',
        phone: ''
      },
      agentInfo1: {
        name: '',
        id: '',
        address: '',
        phone: ''
      }
    };
  },
  name: 'EditCompensate',
  mounted () {
    getBankList().then(r => {
      this.bankList = r.data.map(item => item.Bank_sno + ' ' + item.Name);
    });
    if (this.compensateData.event === 'isEdit') {
      const r = this.compensateData.item;
      let tableListLength = this.tableList.body.length;
      const num = tableListLength += 1;
      const attachmentContent = this.switchAttachment(1, r.attachment1) + this.switchAttachment(2, r.attachment2) + this.switchAttachment(3, r.attachment3) + this.switchAttachment(4, r.attachment4) + this.switchAttachment(5, r.attachment5);
      this.tableList.body.push({ val: `editCompensate${num}`, title: [`${r.county_name}`, `${r.town_name}`, `${r.section_name}`, `${r.tolarea}`, `${r.stn_name}`, `${r.tolarea}`, `${r.owner_name}`, `${r.percent1 / r.percent2}`, `${r.owner_scro}`, `${r.farmername}`, `${r.category}`, `${r.area}`, `${r.note}`, attachmentContent] });
      console.log(r);
      this.sendData.push({
        county_id: r.county_id,
        county_code: r.county_code,
        town_id: r.town_id,
        town_code: r.town_code,
        section: r.section,
        landno: r.landno,
        owner_id: r.owner_id,
        owner_name: r.owner_name,
        own_scro: 'A',
        percent2: r.percent2,
        percent1: r.percent1,
        farmer: r.farmer,
        landdetail: [{ category: r.category, ApplyArea: r.area }],
        note: r.note
      });
      console.log(r.attachment1);
      this.attachmentList = {
        attachment1: r.attachment1 ? 1 : 0,
        attachment2: r.attachment1 ? 1 : 0,
        attachment3: r.attachment1 ? 1 : 0,
        attachment4: r.attachment1 ? 1 : 0,
        attachment5: r.attachment1 ? 1 : 0
      };
      console.log(this.attachmentList);
      this.userInfo = {
        name: r.applyer_name,
        id: r.applyer_id,
        birth: r.applyer_birth,
        address: r.applyer_address,
        phone: r.applyer_phone,
        account: r.applyer_account,
        bank: r.bank
      };
      this.agentInfo = {
        name: r.agent_name,
        id: r.agent_id,
        address: r.agent_address,
        phone: r.agent_phone
      };

      this.userInfo1 = {
        name: r.applyer_name,
        id: r.applyer_id,
        birth: r.applyer_birth,
        address: r.applyer_address,
        phone: r.applyer_phone,
        account: r.applyer_account,
        bank: r.applyer_bank
      };
      this.agentInfo1 = {
        name: r.agent_name,
        id: r.agent_id,
        address: r.agent_address,
        phone: r.agent_phone
      };
    } else {
      console.log('test111');
    }
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    boxToggle (e) {
      this.boxToggleStatus = e;
    },
    getDelList (e) {
      if (e) {
        this.delCompensateList = e;
      }
    },
    addCompensate (e) {
      if (e) {
        console.log(e);
        let tableListLength = this.tableList.body.length;
        this.attachmentList = e.attachment;
        this.attachmentText = '';
        Object.keys(e.attachment).forEach((key, i) => {
          if (e.attachment[key] === 1) {
            this.attachmentText += (i + 1) + ',';
          }
        });
        e.compensateData.forEach(r => {
          const num = tableListLength += 1;
          this.tableList.body.push({ val: `editCompensate${num}`, title: [`${r.county_name}`, `${r.town_name}`, `${r.section_name}`, `${r.tolarea}`, `${r.stnCns}`, `${r.irgarea}`, `${r.owner_name}`, `${r.owner_percent}`, `${r.own_scro_text}`, `${r.farmer_title}`, `${r.landdetail[0].category}`, `${r.landdetail[0].ApplyArea}`, `${r.note}`, this.attachmentText] });
          this.sendData.push({
            county_id: r.county_id,
            county_code: r.county_code,
            town_id: r.town_id,
            town_code: r.town_code,
            section: r.section,
            landno: r.landno,
            owner_id: r.owner_id,
            owner_name: r.owner_name,
            own_scro: 'A',
            percent2: (r.owner_percent.split('/'))[1],
            percent1: (r.owner_percent.split('/'))[0],
            farmer: r.farmer,
            landdetail: [r.landdetail],
            note: r.note
          });
        });
      }
    },
    tableEvent (e) {
      if (e.event === 'isDel') {
        const a = this.tableList.body.findIndex(x => x.val === e.item.val);
        this.tableList.body.splice(a, 1);
        console.log(this.tableList);
      }
    },
    delLandData (e) {
      if (e) {
        const _this = this;
        const z = this.tableList.body.filter(function (item) {
          return _this.delCompensateList.indexOf(item.val) === -1;
        });
        this.tableList.body = z;
        console.log(this.tableList);
      }
    },
    getuserInfo (e) {
      this.userInfo.name = e.name;
      this.userInfo.id = e.id;
      this.userInfo.birth = e.birth;
      this.userInfo.address = e.address;
      this.userInfo.phone = e.phone;
      this.userInfo.account = e.account;
      if (e.bank.val) {
        this.userInfo.bank = e.bank.val.split(' ')[0];
      }
    },
    getagentInfo (e) {
      this.agentInfo.name = e.name;
      this.agentInfo.id = e.id;
      this.agentInfo.address = e.address;
      this.agentInfo.phone = e.phone;
    },
    switchAttachment (item, status) {
      let result = '';
      let attachment = '';
      if (status) {
        switch (item) {
          case 1:
            attachment = '身分證(正反)影本,';
            break;
          case 2:
            attachment = '金融帳戶影本,';
            break;
          case 3:
            attachment = '附件一:切結書,';
            break;
          case 4:
            attachment = '附件二:實耕者證明文件,';
            break;
          case 5:
            attachment = '代理委任書:(授權書或同意書)';
            break;
        }
      }
      // result = status === 1 ? attachment : '';
      result = attachment;
      return result;
    },
    sendCompensateData (e) {
      if (e) {
        console.log(this.attachmentList);
        console.log(this.userInfo);
        console.log(this.sendData);
        const data = {
          applyer: {
            applyer_id: this.userInfo.id,
            applyer_name: this.userInfo.name,
            applyer_birth: '1900-01-01 00:00:00',
            applyer_address: this.userInfo.address,
            applyer_phone: this.userInfo.phone,
            bank: this.userInfo.bank,
            account: this.userInfo.account,
            agent_name: this.agentInfo.name,
            agent_id: this.agentInfo.id,
            agent_address: this.agentInfo.address,
            agent_phone: this.agentInfo.phone,
            attachment1: this.attachmentList.attachment1,
            attachment2: this.attachmentList.attachment2,
            attachment3: this.attachmentList.attachment3,
            attachment4: this.attachmentList.attachment4,
            attachment5: this.attachmentList.attachment5
          },
          data: this.sendData
          // data: [{
          //   county_id: 'D',
          //   county_code: '67000',
          //   town_id: '09',
          //   town_code: '67000010',
          //   section: 'DD2001',
          //   landno: '766-12',
          //   owner_id: 'A123456789',
          //   owner_name: '王大明',
          //   own_scro: null,
          //   percent2: 1,
          //   percent1: 1,
          //   farmer: 0,
          //   landdetail: [
          //     { category: '水果', ApplyArea: 500.3 }
          //   ],
          //   note: '首次申請'
          // },
          // {
          //   county_id: 'D',
          //   county_code: '67000',
          //   town_id: '09',
          //   town_code: '67000010',
          //   section: 'DD2001',
          //   landno: '766-12',
          //   owner_id: 'A123456789',
          //   owner_name: '陳大明',
          //   own_scro: null,
          //   percent2: 1,
          //   percent1: 1,
          //   farmer: 0,
          //   landdetail: [
          //     { category: '水果', ApplyArea: 500.3 }
          //   ],
          //   note: '首次申請'
          // }]
        };
        console.log(data);
        if (this.compensateData.event === 'isEdit') {
          editApplyEvent(data).then(r => {
            console.log(r);
            alert('發送成功');
            this.$store.commit('SET_COMPENSATE_DATA', {});
            this.$router.push('/irrigatedLand/compensate/');
          }).catch(e => {
            console.log(e);
          });
        } else {
          addApplyEvent(data).then(r => {
            console.log(r);
            alert('發送成功');
            this.$router.push('/irrigatedLand/compensate/');
          }).catch(e => {
            console.log(e);
          });
        }
      }
    }
  },
  computed: {
    componentInstance () {
      return 'AddLand';
    },
    isAddLandDataBtn () {
      return this.boxToggleStatus ? '' : '新增土地資料';
    },
    isDelLandDataBtn () {
      return this.delCompensateList.length > 0 ? '刪除土地資料' : '';
    },
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    },
    growDiv () {
      const setWidth = this.toggleStatus ? '' : 'grow';
      return setWidth;
    },
    test () {
      return this.boxToggleStatus ? '' : 'closeBox';
    },
    ...mapState([
      'compensateData'
    ])
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.calNoteBox{
    display: flex;
    justify-content:flex-end;
    margin: 0 auto;
    div{
        margin: 0 2.5px;
    }
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
.editListBox{
  .Box4{
    .flexBox{
      @include pcm-width{
        flex-wrap: wrap;
      }
    }
  }
  .Box2{
    .button_wrap{
      min-width: 130px;
    }
  }
  .Box6{
    .flexBox{
      flex-wrap: wrap;
    }
  }
}
.requisitionBox{
  background: #EFF4F3;
  margin: 0 5%;
  padding: 0.25em;
  .flex-3{
    margin: 2px 0;
    .input-title{
      padding-left: 10px;
    }
    &.twoColume{
      input{
        @include pc-width{
          max-width:144px;
        }
        @include pcm-width{
          max-width:120px;
        }
        @include pcs-width{
          max-width:100px;
        }
        @include pcxs-width{
          max-width:80px;
        }
      }
      .input-box{
        input{
          margin-left: 6px;
          @include pcxs-width{
            margin-left: 1px;
          }
        }
      }
    }
  }
  &.isToggle{
    .flex-3{
      &.twoColume{
        input{
          @include pcxl-width{
            max-width:148px;
          }
          @include pcl-width{
            max-width:132px;
          }
          @include pc-width{
            max-width:108px;
          }
          @include pcm-width{
            max-width:88px;
          }
          @include pcs-width{
            max-width:72px;
          }
          @include pcxs-width{
            max-width:70px;
          }
        }
      }
      .input-box{
        input{
          margin-left: 3px;
          @include pcxl-width{
            margin-left: 2px;
          }
          @include pcxs-width{
            margin-left: 2px;
          }
        }
      }
    }
  }
}
.content_block {
    width: calc(100% - 372px);
    transition: ease-in-out 0.4s;
    height: calc(100% + 50px);
    margin: 0 5%;
    padding-bottom: 2em;
}
.grow {
  width: 90%;
}
.openAddBox{
  height: auto;
  display: block;
  padding: 0.5em 0.25em;
  transition: ease-in-out 0.4s;
}
.closeBox{
  height: 0;
  display: none;
}
.editcompensateContent{
  overflow:auto;
  height: calc( 100vh - 240px);
  &::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track{
    background: #FFF;
  }
  &::-webkit-scrollbar-thumb{
    background: #A1BFB8;
  }
}

.tableTool{
  min-height: 10px;
  max-height: 360px;
  overflow: auto;
  background-image: none;
  &::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track{
    background: #FFF;
  }
  &::-webkit-scrollbar-thumb{
    background: #A1BFB8;
  }
}
</style>
