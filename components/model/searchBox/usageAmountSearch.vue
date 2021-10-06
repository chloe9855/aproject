<template>
  <div class="inputBox">
    <DropdownVertical
      title="管理處"
      :options="member"
    />
  </div>
</template>

<script>
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
export default {
  components: {
    DropdownVertical: DropdownVertical
  },
  props: {},
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] }
    };
  },
  name: 'UsageAmountSearch'
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
