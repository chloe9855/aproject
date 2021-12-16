<template>
  <div class="selectArea flexBox">
    <DropdownVertical
      title="管理處"
      :options="member.Ia"
      :change-text="isClearFirst"
      @DropdownVal="iaDrop"
    />
    <DropdownVertical
      title="管理分處"
      :options="member.Mng"
      :change-text="isClearFirst"
      @DropdownVal="mngDrop"
    />
    <DropdownVertical
      title="工作站"
      :options="member.Stn"
      :change-text="isClearFirst"
      @DropdownVal="stnDrop"
    />
    <DropdownCheckList
      title="水利小組"
      :options="member.Grp"
      :change-text="isClearFirst"
      @DropdownVal="grpDrop"
    />
  </div>
</template>

<script>
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import DropdownCheckList from '~/components/tools/DropdownCheckList.vue';
import { getIas, getMngs, getStns, getGrps } from '~/publish/Irrigation.js';
export default {
  components: {
    DropdownVertical,
    DropdownCheckList
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      inputValue: '',
      searchObj: {
        Ia: '',
        Ia_cns: '',
        Mng: '',
        Mng_cns: '',
        Stn: '',
        Stn_cns: '',
        Grp: '',
        Grp_cns: ''
      },
      member: {
        Ia: [],
        Mng: [],
        Stn: [],
        Grp: []
      }
    };
  },
  name: 'SelectArea',
  mounted () {
    getIas(this).then(r => {
      this.member.Ia = r.data.map(x => ({ title: x.Ia_cns, value: x.Ia }));
    });
  },
  methods: {
    iaDrop (payload) {
      console.log(payload);
      this.searchObj.Ia = payload.value;
      this.searchObj.Ia_cns = payload.title;
      this.searchObj.Grp = '';
      this.searchObj.Grp_cns = '';
      this.searchObj.Stn = '';
      this.searchObj.Stn_cns = '';
      this.searchObj.Mng = '';
      this.searchObj.Mng_cns = '';
      this.member.Grp = [];
      this.member.Stn = [];
      this.member.Mng = [];
      this.$emit('onsearch', { obj: this.searchObj });
      getMngs(this.searchObj.Ia).then(r => {
        this.member.Mng = r.data.map(x => ({ title: x.Mng_cns, value: x.Mng }));
      }).catch(e => {
        if (e.response.status === 403) {
          this.member.Mng = [{ title: '不拘', value: '' }];
        };
      });
      getStns(this.searchObj.Ia).then(r => {
        this.member.stn = r.data.map(x => ({ title: x.Stn_cns, value: x.Stn }));
      });
    },
    mngDrop (payload) {
      console.log(payload);
      this.searchObj.Mng = payload.value;
      this.searchObj.Mng_cns = payload.title;
      this.searchObj.Grp = '';
      this.searchObj.Grp_cns = '';
      this.searchObj.Stn = '';
      this.searchObj.Stn_cns = '';
      this.member.Grp = [];
      this.member.Stn = [];
      this.$emit('onsearch', { obj: this.searchObj });
      getStns(this.searchObj.Ia, this.searchObj.Mng).then(r => {
        this.member.Stn = r.data.map(x => ({ title: x.Stn_cns, value: x.Stn }));
      });
    },
    stnDrop (payload) {
      console.log(payload);
      this.searchObj.Stn = payload.value;
      this.searchObj.Stn_cns = payload.title;
      this.searchObj.Grp = '';
      this.searchObj.Grp_cns = '';
      this.member.Grp = [];
      this.$emit('onsearch', { obj: this.searchObj });
      getGrps(this.searchObj.Ia, this.searchObj.Mng, this.searchObj.Stn).then(r => {
        this.member.Grp = r.data.map(x => ({ title: x.Grp_cns, value: x.Grp }));
      });
    },
    grpDrop (payload) {
      console.log(payload);
      this.searchObj.Grp = payload;
      this.$emit('onsearch', { obj: this.searchObj });
    }
  }
};
</script>

<style lang="scss">

</style>
