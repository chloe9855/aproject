<template>
  <div class="inputBox">
    <NavTabs
      :type-list="options.typeList"
      :selected="options.current"
      @current="payload => options.current = payload"
    />
    <div
      v-show="options.current === 0"
      class="irrigatedLand"
    >
      <DropdownVertical
        title="管理處"
        :options="member.ia"
        :change-text="isClear"
        @DropdownVal="iaDrop"
      />
      <DropdownVertical
        title="管理分處"
        :options="member.mng"
        :change-text="isClear"
        @DropdownVal="mngDrop"
      />
      <DropdownVertical
        title="工作站"
        :options="member.stn"
        :change-text="isClear"
        @DropdownVal="stnDrop"
      />
      <DropdownVertical
        title="水利小組"
        :options="member.grp"
        :change-text="isClear"
        @DropdownVal="grpDrop"
      />
    </div>
    <div
      v-show="options.current === 1"
      class="irrigatedInfo"
    >
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
      <!-- <DropdownCheckList
        title="地號"
        :options="member.land"
        @DropdownVal="landDrop"
      /> -->
      <InputVertical
        title="地號"
        :green-hint="`地號範圍: ${minNo}-${maxNo}`"
        :search-input="Sec5covList"
        star-sign="*"
        @inputValue="getInputValue"
      />
      <!-- <InputVertical
        title="地號"
        :green-hint="`地號範圍: ${minNo}-${maxNo}`"
        star-sign="*"
        :change-text="clearLand4"
        :search-input="Sec5covList"
        :unfill-error="coData1.Sec5cov === '' && unFilled === true ? true : false"
        @inputValue="(payload) => { coData1.Sec5cov = payload, clearLand4 = false }"
      /> -->
    </div>
  </div>
</template>

<script>
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
// import DropdownCheckList from '~/components/tools/DropdownCheckList.vue';
import InputVertical from '~/components/tools/InputVertical.vue';
import NavTabs from '~/components/tools/NavTabs';
import { getIas, getMngs, getStns, getGrps, getCounties, getTowns, getSections, getSecNo, getSecNoList } from '~/publish/Irrigation.js';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    // DropdownCheckList: DropdownCheckList,
    NavTabs: NavTabs,
    InputVertical: InputVertical
  },
  props: {
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      inputValue: '',
      searchObj: {
        ia: '',
        mng: '',
        stn: '',
        grp: '',
        county: '',
        town: '',
        section: '',
        land: ''
      },
      member: {
        ia: [],
        mng: [],
        stn: [],
        grp: [],
        county: [],
        town: [],
        section: [],
        land: ''
      },
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
      },
      // * 地號清單
      Sec5covList: [],
      minNo: '',
      maxNo: '',
      myLandnoList: []
      //
    };
  },
  updated () {
    this.$emit('tabCurrent', this.options.current);
  },
  mounted () {
    getIas(this).then(r => {
      this.member.ia = r.data.map(x => ({ title: x.Ia_cns, value: x.Ia }));
    });
    getCounties().then(r => {
      this.member.county = r.data.map(x => ({ title: x.COUNTYNAME, value: x.COUNTYID }));
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    iaDrop (payload) {
      this.searchObj.ia = payload.value;
      this.searchObj.grp = '';
      this.searchObj.stn = '';
      this.searchObj.mng = '';
      this.member.grp = [];
      this.member.stn = [];
      this.member.mng = [];
      getMngs(this.searchObj.ia).then(r => {
        this.member.mng = r.data.map(x => ({ title: x.Mng_cns, value: x.Mng }));
      }).catch(e => {
        if (e.response.status === 403) {
          this.member.mng = [{ title: '不拘', value: '' }];
        };
      });
      getStns(this.searchObj.ia).then(r => {
        this.member.stn = r.data.map(x => ({ title: x.Stn_cns, value: x.Stn }));
      });
    },
    mngDrop (payload) {
      this.searchObj.mng = payload.value;
      this.searchObj.grp = '';
      this.searchObj.stn = '';
      this.member.grp = [];
      this.member.stn = [];
      getStns(this.searchObj.ia, this.searchObj.mng).then(r => {
        this.member.stn = r.data.map(x => ({ title: x.Stn_cns, value: x.Stn }));
      });
    },
    stnDrop (payload) {
      this.searchObj.stn = payload.value;
      this.searchObj.grp = '';
      this.member.grp = [];
      getGrps(this.searchObj.ia, this.searchObj.mng, this.searchObj.stn).then(r => {
        this.member.grp = r.data.map(x => ({ title: x.Grp_cns, value: x.Grp }));
      });
    },
    grpDrop (payload) {
      this.searchObj.grp = payload.value;
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
      // getLands(this.searchObj.county, this.searchObj.town, this.searchObj.section).then(r => {
      //   this.member.land = { option: r.data.map(x => ({ title: x.Land, value: x.Land_no })) };
      // });
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
    getInputValue (e) {
      if (e) {
        this.inputValue = e;
      }
    },
    search () {
      console.log(this.searchObj);
      this.searchObj.land = this.inputValue;
      this.$emit('onsearch', { obj: this.searchObj, select: this.options.current });
      // if (this.options.current === 0) {
      //   this.$emit('onsearch', this.searchObj);
      // };
    }
  }
};
</script>

<style lang="scss" scoped>
.irrigatedLand,.irrigatedInfo{
  padding: 0 15px;
}
</style>
