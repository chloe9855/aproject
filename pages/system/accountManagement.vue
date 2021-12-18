<template>
  <div class="mainContent">
    <div
      class="content_block"
      :class="[growDiv,boxWidth]"
    >
      <BreadCrumbTool
        :options="BreadCrumb"
      />
      <PageHeader
        icon="farmer"
        title="帳號管理"
        :btn-text="delBtn"
        :btn-add="false"
        btn-name="button-red"
        btn-sec-text="新增帳號"
        :btn-sec-add="true"
        btn-sec-name="button-add"
        @PHBtnStatus="onBatchRemove"
        @PHSecBtnStatus="addAccount"
      />
      <div
        class="content_box"
      >
        <TableTool
          v-if="showTable"
          :table-column="tableList"
          :is-paginate="true"
          :is-edit="true"
          :is-del="true"
          :is-scroll-table="true"
          :column-min-width="150"
          @tableEvent="getTableEvent"
          @checkScrollList="getTableCheck"
        />
      </div>
    </div>
    <Search
      type="userAcctSearch"
      @search="searchAccount"
      @toggleStatus="getToggleStatus"
      @clearSearch="clear"
    >
      <template #default="{ isClear }">
        <UserAcctSearch
          :is-clear="isClear"
          :search-obj-prop="searchObj"
        />
      </template>
    </Search>

    <AlertBox
      v-if="showRemoveConfirm"
      :title="`確定要刪除所選的${checkedAccount.length}筆資料`"
      @close="showRemoveConfirm = false"
      @confirm="batchRemove"
    />

    <AlertBox
      v-if="singleRemoveAccountId != null"
      title="確定要刪除帳號?"
      @close="singleRemoveAccountId = null"
      @confirm="singleRemove"
    />

    <AlertBox
      v-if="showSuccess"
      box-icon="success"
      title="刪除成功"
      :cancel-button="false"
      @confirm="showSuccess = false"
    />
  </div>
</template>

<script>
// @ts-check

/**
 * @typedef {import('types/Account').Account} Account
 */

import Vue from 'vue';
import dayjs from 'dayjs';
// @ts-ignore
import TableTool from '~/components/model/TableJJ.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search1.vue';
import { editAccount, getAccount } from '~/api/account';
import { accountData } from '~/publish/accountData';
import UserAcctSearch from '~/components/model/searchBox/userAcctSearch.vue';
import AlertBox from '~/components/tools/AlertBox.vue';

function getDefaultSearchObj () {
  return {
    group: '',
    ia: '',
    site: '',
    name: '',
    startTime: '',
    endTime: ''
  };
}

export default Vue.extend({
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    Search,
    UserAcctSearch,
    AlertBox
  },
  data () {
    return {
      tableList: {
        head: [
          { title: '帳號' },
          { title: '姓名' },
          { title: '管理處' },
          { title: '工作站' },
          { title: '權限群組' },
          { title: '上次登入時間', minW: 'minWidth150' },
          { title: '狀態' }
        ],
        body: [
          { val: 0, title: ['aaaaaa', '陳旺旺', 'XX管理處', 'nn工作站', 'nn工作站', '2021/01/01', '驗證中'] },
          { val: 1, title: ['bbbbbb', '張旺旺', 'XX管理處', 'mm工作站', 'mm工作站', '2021/02/01', '啟用中'] },
          { val: 2, title: ['cccccc', '鄧旺旺', 'XX管理處', 'uu工作站', 'uu工作站', '2021/03/01', '啟用中'] },
          { val: 3, title: ['dddddd', '王旺旺', 'XX管理處', 'zz工作站', 'zz工作站', '2021/04/01', '啟用中'] },
          { val: 4, title: ['eeeeee', '呂旺旺', 'XX管理處', 'ww工作站', 'ww工作站', '2021/05/01', '啟用中'] },
          { val: 5, title: ['ffffff', '廖旺旺', 'XX管理處', 'ee工作站', 'ee工作站', '2021/06/01', '停用中'] },
          { val: 6, title: ['gggggg', '曾旺旺', 'XX管理處', 'rr工作站', 'rr工作站', '2021/07/01', '啟用中'] },
          { val: 7, title: ['hhhhhh', '林旺旺', 'XX管理處', 'yy工作站', 'yy工作站', '2021/08/01', '停用中'] }
        ]
      },
      BreadCrumb: ['系統管理', '帳號管理'],
      toggleStatus: false,
      editItem: {},
      delBtn: '',
      /** @type {Account[]} */
      accountList: [],
      showTable: true,
      searchObj: getDefaultSearchObj(),
      checkedAccount: [],
      showRemoveConfirm: false,
      singleRemoveAccountId: null,
      showSuccess: false
    };
  },
  name: 'Account',
  async asyncData () {
    const r = await getAccount();
    return {
      tableList: {
        head: [
          { title: '帳號' },
          { title: '姓名' },
          { title: '管理處' },
          { title: '工作站' },
          { title: '權限群組' },
          { title: '上次登入時間', setW: 'setWidth200' },
          { title: '狀態' }
        ],
        body: accountData(r.data)
      },
      accountList: r.data
    };
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    addAccount (e) {
      console.log(e);
      if (e) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'addAccount', title: '新增帳號' });
      }
    },
    getTableEvent (e) {
      if (e) {
        switch (e.event) {
          case 'isEdit':
            this.$store.commit('TOGGLE_POPUP_STATUS');
            this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'editAccount', title: '編輯帳號', editId: e.item.title[0] });
            break;
          case 'isDel':
            this.singleRemoveAccountId = e.item.val;
            break;
        }
      }
    },
    getTableCheck (e) {
      if (e) {
        if (e.length > 1) {
          this.delBtn = '多筆刪除';
        } else {
          this.delBtn = '';
        };
      }

      this.checkedAccount = e || [];
    },
    async searchAccount () {
      const { searchObj } = this;

      let filtered = this.accountList;

      if (searchObj.group != null || searchObj.group !== '') {
        const group = parseInt(searchObj.group);

        if (!isNaN(group)) {
          filtered = filtered.filter(a => a.groupsno === group);
        }
      }

      if (searchObj.name) {
        filtered = filtered.filter(a => a.account === searchObj.name);
      }

      if (searchObj.ia) {
        filtered = filtered.filter(a => a.ia === searchObj.ia);
      }

      if (searchObj.site) {
        filtered = filtered.filter(a => a.stn === searchObj.site);
      }

      if (searchObj.startTime) {
        const startTime = dayjs(searchObj.startTime).valueOf();

        filtered = filtered.filter(a => dayjs(a.logintime).valueOf() >= startTime);
      }

      if (searchObj.endTime) {
        const endTime = dayjs(searchObj.endTime).valueOf();

        filtered = filtered.filter(a => dayjs(a.logintime).valueOf() < endTime);
      }

      this.tableList.body = accountData(filtered);
    },
    clear () {
      this.searchObj = getDefaultSearchObj();
    },
    onBatchRemove () {
      if (this.checkedAccount.length) {
        this.showRemoveConfirm = true;
      }
    },
    async batchRemove () {
      if (!this.checkedAccount) {
        return;
      }

      const { status } = await editAccount({
        id: this.checkedAccount,
        status: 2
      });

      this.checkedAccount = [];
      this.checkAndShowSuccess(status);
    },
    async singleRemove () {
      if (this.singleRemoveAccountId == null) {
        return;
      }

      const { status } = await editAccount({
        id: this.singleRemoveAccountId,
        status: 2
      });

      this.singleRemoveAccountId = null;
      this.checkAndShowSuccess(status);
    },
    /**
     * @param {number} status
     */
    checkAndShowSuccess (status) {
      this.showSuccess = status < 300;
    }
  },
  computed: {
    /** @returns {string} */
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    },
    /** @returns {string} */
    growDiv () {
      const setWidth = this.toggleStatus ? '' : 'grow';
      return setWidth;
    }
  }
});
</script>

<style lang="scss" scoped>
.mainContent{
  position: relative;
}
.tableTool{
  .tableContent{
    table{
      tbody{
        text-align: left !important;
        tr{
          td:nth-child(2){
            width: 120px;
          }
        }
      }
    }
  }
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
.content_block {
    width: calc(100% - 372px);
    transition: ease-in-out 0.4s;
    height:100%;
    margin : 0 5%;
}
.content_box{
  height: calc( 100vh - 190px );
  padding-right: 0.5em;
  @include scrollBar;
}
.grow {
  width: 90%;
}
</style>
