<template>
  <div class="inputBox">
    <InputVertical
      title="身分證字號"
      @inputValue="getUserID"
    />
    <DropdownVertical
      title="縣市"
      :options="member"
      @DropdownVal="countyDrop"
    />
    <DropdownVertical
      title="鄉鎮"
      :options="member"
      @DropdownVal="townDrop"
    />
    <DropdownVertical
      title="段名"
      :options="member"
      @DropdownVal="sectionDrop"
    />
    <InputVertical
      title="地號"
      :green-hint="`地號範圍: ${minNo}-${maxNo}`"
      :search-input="Sec5covList"
      star-sign="*"
      @inputValue="getInputValue"
    />
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
      member: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }],
      // * 地號清單
      Sec5covList: [],
      minNo: '',
      maxNo: '',
      myLandnoList: []
      //
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
