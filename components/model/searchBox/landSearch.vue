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
      <DropdownVertical
        title="縣市"
        star-sign="*"
        :options="member"
      />
      <DropdownVertical
        title="鄉鎮市區"
        star-sign="*"
        :options="member"
      />
      <DropdownVertical
        title="段名"
        star-sign="*"
        :options="member"
      />
      <InputVertical
        title="地號"
        green-hint="地號範圍:0"
        star-sign="*"
      />
    </div>
    <div
      v-if="options.current === 1"
      class="landUnit"
    >
      <DropdownVertical
        title="縣市"
        :options="member"
      />
      <DropdownVertical
        title="鄉鎮市區"
        :options="member"
      />
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
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import NavTabs from '~/components/tools/NavTabs';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    InputVertical: InputVertical,
    NavTabs: NavTabs
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
.landNum, .landUnit {
  padding: 0 15px;
}

</style>
