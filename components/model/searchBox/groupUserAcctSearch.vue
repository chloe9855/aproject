<template>
  <div class="inputBox">
    <DropdownVertical
      title="群組"
      :option-data="member"
      @DropdownVal="getGroup"
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
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DatePicker from '~/components/tools/DatePicker.vue';
import { getGroup } from '~/api/group';
import { groupListData } from '~/publish/groupListData';
import { getAccount } from '~/api/account';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    DatePicker: DatePicker
  },
  props: {},
  data: () => {
    return {
      member: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }],
      searchObj: {
        group: '',
        startTime: '',
        endTime: ''
      }
    };
  },
  name: 'GroupUserAcctSearch',
  mounted () {
    getAccount(this.$store.state.userInfo.id).then(r => {
      this.account = r.data[0];
      getGroup(r.data[0].ia).then(g => {
        this.member = groupListData(g);
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
