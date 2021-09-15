<template>
  <div class="inputBox">
    <InputVertical />
    <DropdownVertical :options="member" />
    <DropdownVertical :options="member" />
    <DropdownVertical :options="member" />
    <InputVertical />
    <Button
      :name="'button-primary'"
      :text="'清除全部'"
    />
    <Button
      :name="'button-default-disable'"
      :text="'查詢'"
    />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import Button from '~/components/tools/Buttons';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    InputVertical: InputVertical,
    Button: Button
  },
  props: {},
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] }
    };
  },
  name: 'CompensateSearch'
};
</script>

<style lang="scss" scoped>

</style>
