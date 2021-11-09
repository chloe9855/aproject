<template>
  <div class="inputBox">
    <DropdownVertical
      title="群組"
      :option-data="groupList"
      @DropdownVal="getGroup"
    />
    <DropdownVertical
      title="管理處"
      :option-data="iaList"
      @DropdownVal="getManagement"
    />
    <DropdownVertical
      title="工作站"
      :options="member"
      @DropdownVal="getSite"
    />
    <InputVertical
      title="姓名"
      @inputValue="getName"
    />
    <DatePicker
      title="上次登入起始時間"
      @DateValue="startTime"
    />
    <DatePicker
      title="上次登入結束時間"
      @DateValue="endTime"
    />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DatePicker from '~/components/tools/DatePicker.vue';
import { groupListData, iaListData } from '~/publish/groupListData';
import { getAccount } from '~/api/account';
import { getGroup } from '~/api/group';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    InputVertical: InputVertical,
    DatePicker: DatePicker
  },
  props: {},
  data: () => {
    return {
      searchObj: {
        group: '',
        management: '',
        site: '',
        name: '',
        startTime: '',
        endTime: ''
      },
      member: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }],
      iaList: [],
      group: []
    };
  },
  name: 'UserAcctSearch',
  mounted () {
    getAccount(this.$store.state.userInfo.id).then(r => {
      this.account = r.data[0];
      getGroup(r.data[0].ia).then(g => {
        this.iaList = iaListData(g);
        this.groupList = groupListData(g);
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    getGroup (e) {
      if (e) {
        this.searchObj.group = e;
      }
    },
    getManagement (e) {
      if (e) {
        this.searchObj.management = e;
      }
    },
    getSite (e) {
      if (e) {
        this.searchObj.site = e;
      }
    },
    getName (e) {
      if (e) {
        this.searchObj.name = e;
      }
    },
    startTime (e) {
      if (e) {
        this.searchObj.startTime = e;
      }
    },
    endTime (e) {
      if (e) {
        this.searchObj.endTime = e;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
