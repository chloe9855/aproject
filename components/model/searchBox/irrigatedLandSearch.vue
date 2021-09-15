<template>
  <div class="inputBox">
    <div class="irrigatedLand">
      <Dropdown :options="member" />
      <Dropdown :options="member" />
      <Dropdown :options="member" />
      <Dropdown :options="member" />
    </div>
    <div class="irrigatedInfo">
      <Dropdown :options="member" />
      <Dropdown :options="member" />
      <Dropdown :options="member" />
      <InputTool />
    </div>
  </div>
</template>

<script>
import InputTool from '~/components/tools/InputTool.vue';
import Dropdown from '~/components/tools/Dropdown.vue';
export default {
  components: {
    Dropdown: Dropdown,
    InputTool: InputTool
  },
  props: {},
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] }
    };
  },
  name: 'IrrigatedLandSearch'
};
</script>

<style lang="scss" scoped>

</style>
