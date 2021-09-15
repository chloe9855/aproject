<template>
  <div class="inputBox">
    <NavTabs
      :type-list="options.typeList"
      :selected="options.current"
      @current="payload => options.current = payload"
    />
    <div
      v-if="options.current === 0"
      class="landNum"
    >
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
    </div>
    <div
      v-if="options.current === 1"
      class="landUnit"
    >
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <InputTool />
    </div>
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
import InputTool from '~/components/tools/InputTool.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import NavTabs from '~/components/tools/NavTabs';
import Button from '~/components/tools/Buttons';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    InputTool: InputTool,
    NavTabs: NavTabs,
    Button: Button
  },
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      options: {
        current: 0,
        typeList: [
          {
            name: '依單筆地號',
            id: 0
          },
          {
            name: '依管理單位',
            id: 1
          }
        ]
      }
    };
  },
  name: 'LandSearch',
  computed: {}
};
</script>

<style lang="scss" scoped>

</style>
