<template>
  <div class="inputBox">
    <NavTabs
      :type-list="options.typeList"
      :selected="options.current"
      @current="payload => options.current = payload"
    />
    <div
      v-if="options.current === 0"
      class="irrigatedLand"
    >
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
    </div>
    <div
      v-if="options.current === 1"
      class="irrigatedInfo"
    >
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownVertical :options="member" />
      <DropdownCheckList :options="member" />
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
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DropdownCheckList from '~/components/tools/DropdownCheckList.vue';
import NavTabs from '~/components/tools/NavTabs';
import Button from '~/components/tools/Buttons';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    DropdownCheckList: DropdownCheckList,
    NavTabs: NavTabs,
    Button: Button
  },
  props: {},
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      options: {
        current: 0,
        typeList: [
          {
            name: '管理處轄管灌溉地',
            id: 0
          },
          {
            name: '單筆地號基本資料',
            id: 1
          }
        ]
      }
    };
  },
  name: 'IrrigatedLandSearch'
};
</script>

<style lang="scss" scoped>

</style>
