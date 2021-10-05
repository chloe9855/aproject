<template>
  <div class="inputBox">
    <DropdownVertical
      title="群組"
      :options="member"
    />
    <DropdownVertical
      title="管理處"
      :options="member"
    />
    <DropdownVertical
      title="工作站"
      :options="member"
    />
    <InputVertical title="姓名" />
    <DatePicker title="上次登入起始時間" />
    <DatePicker title="上次登入結束時間" />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DatePicker from '~/components/tools/DatePicker.vue';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    InputVertical: InputVertical,
    DatePicker: DatePicker
  },
  props: {},
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] }
    };
  },
  name: 'UserAcctSearch'
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
