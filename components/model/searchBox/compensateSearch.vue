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
      :change-text="isClearFirst"
      @DropdownVal="countyDrop"
    />
    <DropdownVertical
      title="鄉鎮"
      :options="member.town"
      :change-text="isClearFirst"
      @DropdownVal="townDrop"
    />
    <DropdownVertical
      title="段名"
      :options="member.section"
      :change-text="isClearFirst"
      @DropdownVal="sectionDrop"
    />
    <InputVertical
      title="地號"
      :green-hint="`地號範圍: ${minNo}-${maxNo}`"
      :search-input="Sec5covList"
      :change-text="isClearFirst"
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
  props: {
    isClearFirst: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      // member: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }],
      searchObj: {
        id: '',
        county_id: '',
        town_id: '',
        section: '',
        landno: ''
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
      myLandnoList: [],
      //
      isClear1: false,
      isClear2: false,
      isClear3: false,
      isClear4: false
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
      this.searchObj.county_id = payload.value;
      this.searchObj.town_id = '';
      this.searchObj.section = '';
      this.searchObj.landno = '';
      this.member.town = [];
      this.member.section = [];
      this.member.land = { option: [{ title: '', value: '0' }] };
      this.$emit('onsearch', { obj: this.searchObj });
      getTowns(this.searchObj.county_id).then(r => {
        this.member.town = r.data.map(x => ({ title: x.TOWNNAME, value: x.TOWNID }));
      });
    },
    townDrop (payload) {
      this.searchObj.town_id = payload.value;
      this.searchObj.section = '';
      this.searchObj.landno = '';
      this.member.section = [];
      this.member.land = { option: [{ title: '', value: '0' }] };
      this.$emit('onsearch', { obj: this.searchObj });
      getSections(this.searchObj.county_id, this.searchObj.town_id).then(r => {
        this.member.section = r.data.map(x => ({ title: x.Sec_cns, value: x.Section }));
      });
    },
    sectionDrop (payload) {
      this.searchObj.section = payload.value;
      this.searchObj.landno = '';
      this.member.land = { option: [{ title: '', value: '0' }] };
      this.$emit('onsearch', { obj: this.searchObj });
      getSecNo(this.searchObj.county_id, this.searchObj.section).then(r => {
        this.maxNo = r.data[0].Max;
        this.minNo = r.data[0].Min;
      });
      getSecNoList(this.searchObj.county_id, this.searchObj.section).then(r => {
        this.Sec5covList = r.data.map(item => item.Land_no);
      });
    },
    landDrop (payload) {
      this.searchObj.landno = payload.value;
    },
    getLandValue (e) {
      if (e) {
        this.landValue = e;
        this.searchObj.id = '7eYXGw66I2tilK8qDRnzWg==';
        this.searchObj.landno = this.landValue;
        this.$emit('onsearch', { obj: this.searchObj });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
