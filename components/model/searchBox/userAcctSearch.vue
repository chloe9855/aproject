<template>
  <div class="inputBox">
    <DropdownVertical
      title="群組"
      placeholders="請選擇群組"
      :options="groupList"
      :change-text="isClear"
      @DropdownVal="getGroup"
    />
    <DropdownVertical
      title="管理處"
      placeholders="請選擇管理處"
      :options="iaList"
      :change-text="isClear"
      @DropdownVal="getIa"
    />
    <DropdownVertical
      title="工作站"
      placeholders="請選擇工作站"
      :options="member"
      :change-text="isClear"
      @DropdownVal="getSite"
    />
    <DropdownVertical
      title="姓名"
      placeholders="請選擇姓名"
      :options="accountList"
      :change-text="isClear"
      @DropdownVal="getName"
    />
    <DatePicker
      :time="searchObj.startTime"
      title="上次登入起始時間"
      @DateValue="startTime"
    />
    <DatePicker
      :time="searchObj.endTime"
      title="上次登入結束時間"
      @DateValue="endTime"
    />
  </div>
</template>

<script>
// @ts-check

/**
 * @typedef {import('types/DropdownVerticalOption').DropdownVerticalOption} DropdownVerticalOption
 */

import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DatePicker from '~/components/tools/DatePickerJJ.vue';
import { groupListData, stnListData } from '~/publish/groupListData';
import { getGroup } from '~/api/group';
import { getStns } from '~/publish/Irrigation1';
import { getIaOptionFromAccount } from '~/publish/accountData';

export default {
  components: {
    DropdownVertical,
    DatePicker
  },
  props: {
    searchObjProp: {
      /** @type {import('vue').PropType<{
       * group: string,
       * ia: string,
       * site: string,
       * name: string,
       * startTime: string,
       * endTime: string
       * }>} */
      type: Object,
      required: true
    },
    accounts: {
      type: /** @type {import('vue').PropType<import('types/Account').Account[]>} */(Array)
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchObj: this.searchObjProp,
      member: [],
      group: [],
      groupList: []
    };
  },
  name: 'UserAcctSearch',
  mounted () {
    this.fetchOptions();
  },
  methods: {
    /** @param {DropdownVerticalOption} e */
    getGroup (e) {
      if (e) {
        this.searchObj.group = e.value;
      }
    },
    /** @param {DropdownVerticalOption} e */
    getIa (e) {
      if (e) {
        this.searchObj.ia = e.value;
      }

      this.fetchSite();
    },
    /** @param {DropdownVerticalOption} e */
    getSite (e) {
      if (e) {
        this.searchObj.site = e.value;
      }
    },
    /** @param {DropdownVerticalOption} e */
    getName (e) {
      if (e) {
        this.searchObj.name = e.value;
      }
    },
    startTime (e) {
      if (e) {
        this.searchObj.startTime = e.val;
      }
    },
    endTime (e) {
      if (e) {
        this.searchObj.endTime = e.val;
      }
    },
    async fetchOptions () {
      // const r = await getAccount(this.$store.state.userInfo.id);
      const g = await getGroup(/* r.data[0].ia */);
      this.groupList = groupListData(g);
    },
    async fetchSite () {
      if (!this.searchObj.ia) {
        this.member = [];
        return;
      }

      const res = await getStns(this.searchObj.ia);
      this.member = stnListData(res);
    }
  },
  computed: {
    /** @returns {DropdownVerticalOption[]} */
    iaList () {
      return getIaOptionFromAccount(this.accounts);
    },
    /** @returns {DropdownVerticalOption[]} */
    accountList () {
      return this.accounts.map(account => ({
        value: account.account,
        title: account.name
      }));
    }
  },
  watch: {
    searchObjProp () {
      this.searchObj = this.searchObjProp;
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
