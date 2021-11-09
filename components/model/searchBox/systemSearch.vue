<template>
  <div class="inputBox">
    <DropdownVertical
      title="工具分類"
      :options="member"
    />
    <DatePicker title="統計起始時間" />
    <DatePicker title="統計結束時間" />
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
      member: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }]
    };
  },
  name: 'SystemSearch'
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
