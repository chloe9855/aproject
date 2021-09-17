<template>
  <div class="inputBox">
    <DropdownVertical
      title="工具分類"
      :options="member"
    />
    <DatePicker title="統計起始時間" />
    <DatePicker title="統計結束時間" />
    <div class="buttonBox">
      <Button
        :name="'button-primary'"
        :text="'清除全部'"
      />
      <Button
        :name="'button-default-disable'"
        :text="'查詢'"
      />
    </div>
  </div>
</template>

<script>
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DatePicker from '~/components/tools/DatePicker.vue';
import Button from '~/components/tools/Buttons';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    DatePicker: DatePicker,
    Button: Button
  },
  props: {},
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] }
    };
  },
  name: 'SystemSearch'
};
</script>

<style lang="scss" scoped>
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
