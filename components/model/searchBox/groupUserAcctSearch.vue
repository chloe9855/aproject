<template>
  <div class="inputBox">
    <DropdownVertical
      title="群組"
      :options="member"
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
