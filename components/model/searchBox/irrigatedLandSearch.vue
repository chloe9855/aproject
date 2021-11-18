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
        @DropdownVal="iaDrop"
      />
      <DropdownVertical
        title="管理分處"
        :options="member.mng"
        @DropdownVal="mngDrop"
      />
      <DropdownVertical
        title="工作站"
        :options="member.stn"
        @DropdownVal="stnDrop"
      />
      <DropdownVertical
        title="水利小組"
        :options="member.grp"
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
        @DropdownVal="countyDrop"
      />
      <DropdownVertical
        title="鄉鎮"
        :options="member.town"
        @DropdownVal="townDrop"
      />
      <DropdownVertical
        title="段名"
        :options="member.section"
        @DropdownVal="sectionDrop"
      />
      <DropdownCheckList
        title="地號"
        :options="member.land"
        @DropdownVal="landDrop"
      />
    </div>
  </div>
</template>

<script>
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DropdownCheckList from '~/components/tools/DropdownCheckList.vue';
import NavTabs from '~/components/tools/NavTabs';
import { getIas, getMngs, getStns, getGrps, getCounties, getTowns, getSections, getLands } from '~/publish/irrigation.js';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    DropdownCheckList: DropdownCheckList,
    NavTabs: NavTabs
  },
  props: {},
  data: () => {
    return {
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
        land: { option: [{ title: '', value: '0' }] }
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
      }
    };
  },
  updated () {
    this.$emit('tabCurrent', this.options.current);
  },
  mounted () {
    getIas().then(r => {
      this.member.ia = r.data.map(x => ({ title: x.Ia_cns, value: x.Ia }));
    });
    getCounties().then(r => {
      console.log(r);
      this.member.county = r.data.map(x => ({ title: x.COUNTYNAME, value: x.COUNTYCODE }));
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
        this.member.town = r.data.map(x => ({ title: x.TOWNNAME, value: x.TOWNCODE }));
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
      getLands(this.searchObj.county, this.searchObj.town, this.searchObj.section).then(r => {
        this.member.land = { option: r.data.map(x => ({ title: x.Land, value: x.Land_no })) };
      });
    },
    landDrop (payload) {
      this.searchObj.land = payload.value;
    },
    search () {
      this.$emit('onsearch', this.searchObj);
    }
  }
};
</script>

<style lang="scss" scoped>
.irrigatedLand,.irrigatedInfo{
  padding: 0 15px;
}
</style>
