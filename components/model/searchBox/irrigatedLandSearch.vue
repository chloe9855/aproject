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
      <DropdownVertical
        title="管理處"
        :options="member"
      />
      <DropdownVertical
        title="管理分處"
        :options="member"
      />
      <DropdownVertical
        title="工作站"
        :options="member"
      />
      <DropdownVertical
        title="水利小組"
        :options="member"
      />
    </div>
    <div
      v-if="options.current === 1"
      class="irrigatedInfo"
    >
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
      <DropdownCheckList
        title="地號"
        :options="member"
      />
    </div>
  </div>
</template>

<script>
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DropdownCheckList from '~/components/tools/DropdownCheckList.vue';
import NavTabs from '~/components/tools/NavTabs';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    DropdownCheckList: DropdownCheckList,
    NavTabs: NavTabs
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
  updated () {
    this.$emit('tabCurrent', this.options.current);
  }
};
</script>

<style lang="scss" scoped>
.irrigatedLand{
  padding: 0 15px;
}
</style>
