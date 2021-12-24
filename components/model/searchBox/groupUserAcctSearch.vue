<template>
  <div class="inputBox">
    <DropdownVertical2
      v-model="searchObj.group"
      title="群組"
      placeholders="請選擇群組"
      :options="groupList"
    />
    <DatePicker
      :time="searchObj.startTime"
      title="上次更新起始時間"
      @DateValue="startTime"
    />
    <DatePicker
      :time="searchObj.endTime"
      title="上次更新結束時間"
      @DateValue="endTime"
    />
  </div>
</template>

<script>
// @ts-check
import DropdownVertical2 from '~/components/tools/DropdownVertical2.vue';
import DatePicker from '~/components/tools/DatePickerJJ.vue';
import { groupListData } from '~/publish/groupListData';

export default {
  components: {
    DropdownVertical2,
    DatePicker: DatePicker
  },
  props: {
    searchObjProp: {
      type: /** @type {import('vue').PropType<{group: number, startTime: string, endTime: string}>} */(
        Object
      )
    },
    groups: {
      type: /** @type {import('vue').PropType<import('types/Group').Group[]>} */(
        Array
      )
    }
  },
  data () {
    return {
      member: [],
      searchObj: this.searchObjProp
    };
  },
  name: 'GroupUserAcctSearch',
  methods: {
    startTime (e) {
      if (e) {
        this.searchObj.startTime = e.val;
      }
    },
    endTime (e) {
      if (e) {
        this.searchObj.endTime = e.val;
      }
    }
  },
  computed: {
    /** @returns {any[]} */
    groupList () {
      return groupListData({ data: this.groups });
    }
  },
  watch: {
    searchObjProp (v) {
      this.searchObj = v;
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
