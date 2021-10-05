<template>
  <div class="inputBox">
    <InputVertical title="身分證字號" />
    <DropdownVertical
      title="縣市"
      :options="member"
    />
    <DropdownVertical
      title="鄉鎮"
      :options="member"
    />
    <DropdownVertical
      title="段名"
      :options="member"
    />
    <InputVertical title="地號" />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    InputVertical: InputVertical
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
.inputBox{
  padding: 0 15px;
}
</style>
