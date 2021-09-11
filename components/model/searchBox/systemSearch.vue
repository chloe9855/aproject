<template>
  <div class="inputBox">
    <Dropdown :options="member" />
    <DatePicker />
    <DatePicker />
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import DatePicker from '~/components/tools/DatePicker.vue';
export default {
  name: 'SystemSearch',
  components: {
    Dropdown: Dropdown,
    DatePicker: DatePicker
  },
  props: {},
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] }
    };
  },
  computed: {},
  created: function () {

  }
};
</script>

<style lang="scss" scoped>

</style>
