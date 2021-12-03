<template>
  <div class="inputBox">
    <InputVertical
      title="身分證字號"
      is-warn="userId"
      @inputValue="getUserID"
    />
    <DropdownVertical
      title="縣市"
      :options="member.county"
      :change-text="isClear"
      @DropdownVal="countyDrop"
    />
    <DropdownVertical
      title="鄉鎮"
      :options="member.town"
      :change-text="isClear"
      @DropdownVal="townDrop"
    />
    <DropdownVertical
      title="段名"
      :options="member.section"
      :change-text="isClear"
      @DropdownVal="sectionDrop"
    />
    <InputVertical
      title="地號"
      :green-hint="`地號範圍: ${minNo}-${maxNo}`"
      :search-input="Sec5covList"
      star-sign="*"
      @inputValue="getLandValue"
    />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import { getCounties, getTowns, getSections, getSecNo, getSecNoList } from '~/publish/Irrigation.js';
export default {
  components: {
    DropdownVertical,
    InputVertical
  },
  props: {},
  data: () => {
    return {
      // member: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }],
      searchObj: {
        userId: '',
        county: '',
        town: '',
        section: '',
        land: ''
      },
      member: {
        county: [],
        town: [],
        section: [],
        land: ''
      },
      userId: '',
      landValue: '',
      // * 地號清單
      Sec5covList: [],
      minNo: '',
      maxNo: '',
      myLandnoList: []
      //
    };
  },
  name: 'CompensateSearch',
  mounted () {
    getCounties().then(r => {
      this.member.county = r.data.map(x => ({ title: x.COUNTYNAME, value: x.COUNTYID }));
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    getUserID (e) {
      if (e) {
        this.userId = e;
      }
    },
    countyDrop (payload) {
      this.searchObj.county = payload.value;
      this.searchObj.town = '';
      this.searchObj.section = '';
      this.searchObj.land = '';
      this.member.town = [];
      this.member.section = [];
      this.member.land = { option: [{ title: '', value: '0' }] };
      getTowns(this.searchObj.county).then(r => {
        this.member.town = r.data.map(x => ({ title: x.TOWNNAME, value: x.TOWNID }));
      });
    },
    townDrop (payload) {
      this.searchObj.town = payload.value;
      this.searchObj.section = '';
      this.searchObj.land = '';
      this.member.section = [];
      this.member.land = { option: [{ title: '', value: '0' }] };
      getSections(this.searchObj.county, this.searchObj.town).then(r => {
        this.member.section = r.data.map(x => ({ title: x.Sec_cns, value: x.Section }));
      });
    },
    sectionDrop (payload) {
      this.searchObj.section = payload.value;
      this.searchObj.land = '';
      this.member.land = { option: [{ title: '', value: '0' }] };
      getSecNo(this.searchObj.county, this.searchObj.section).then(r => {
        this.maxNo = r.data[0].Max;
        this.minNo = r.data[0].Min;
      });
      getSecNoList(this.searchObj.county, this.searchObj.section).then(r => {
        this.Sec5covList = r.data.map(item => item.Land_no);
      });
    },
    landDrop (payload) {
      this.searchObj.land = payload.value;
    },
    getLandValue (e) {
      console.log(e);
      if (e) {
        this.landValue = e;
      }
    },
    search () {
      this.searchObj.userId = this.userId;
      this.searchObj.land = this.landValue;
      console.log(this.searchObj);
      this.$emit('onsearch', { obj: this.searchObj });
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
