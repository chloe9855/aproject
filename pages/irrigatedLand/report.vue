<template>
  <div>
    <BreadCrumbTool
      :options="BreadCrumb"
      class="w-90"
    />
    <PageHeader
      icon="file"
      title="統計報表"
      class="w-90"
      tips="列印日期:110年8月3日"
      :is-border="true"
      :is-sticky="true"
    />
    <div class="w-90 treeListBox content_box">
      <div class="flexBox selectList">
        <SubTitleTool
          :title="'單位:'+IaName1"
          class="w-100"
        />
        <div class="flexBox treeList">
          <TreeSelectBox
            class="flex-1"
            title="停灌補償核定統計表"
            :options="treeData"
          />
          <TreeSelectBox
            class="flex-1"
            title="停灌補償申報統計表(日報)"
            :options="treeData"
          />
          <TreeSelectBox
            class="flex-1"
            title="補償(撥款)清冊"
          />
        </div>
      </div>
      <div class="flexBox selectList">
        <SubTitleTool
          :title="'單位:'+IaName2"
          class="w-100"
        />
        <div class="flexBox treeList">
          <TreeSelectBox
            class="flex-1"
            title="停灌補償核定統計表"
          />
          <TreeSelectBox
            class="flex-1"
            title="停灌補償申報統計表(日報)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import TreeSelectBox from '~/components/model/editList/TreeSelectTool.vue';
import { getAccount } from '~/api/account';
import { getMngs, getStns } from '~/publish/Irrigation.js';
// import { getMngs } from '~/publish/Irrigation.js';

export default {
  components: {
    PageHeader,
    BreadCrumbTool,
    SubTitleTool,
    TreeSelectBox
  },
  data () {
    return {
      BreadCrumb: ['灌溉地管理', '統計報表'],
      thisIa: '',
      IaName1: '',
      IaName2: '',
      mngData: [],
      StnData: [],
      treeData: [
        {
          ia: '',
          mng: []
        }
      ]
    };
  },
  name: 'Report',
  mounted () {
    const userId = sessionStorage.getItem('loginUser');
    // this.treeData = ['ts'];
    getAccount(userId).then(d => {
      this.thisIa = d.data[0].ia;
      this.IaName1 = d.data[0].ianame + '管理處';
      this.IaName2 = d.data[0].ianame;
      this.treeData[0].ia = this.thisIa;
      this.treeData[0].mng = [];
      this.treeData[0].mng.stn = [];
      // this.treeData = ['ss'];
      getMngs(this.thisIa).then(a => {
        this.mngData = a.data;
        a.data.forEach((element, i) => {
          this.treeData[0].mng.push({ title: element.Mng_cns, no: element.Mng, stn: [] });

          getStns(this.thisIa, element.Mng).then(b => {
            console.log(b);
            b.data.forEach(element1 => {
              // this.treeData[0].mng[i].stn = [];
              console.log(i);
              this.treeData[0].mng[i].stn.push({ name: element1.Stn_cns, no: element1.Stn, isChecked: false });
            });
          });
        });
      });
      console.log('this.treeData');
      console.log(this.treeData);
    }).catch(e => {
      console.log(e);
    });
  },
  watch: {
    treeData (n) {
      console.log('n');
      console.log(n);
    }
  }
};
</script>
<style lang="scss" scoped>
.mainContent{
  position: relative;
}
.content_box{
  padding-right: 0.5em;
  height: calc( 100vh - 190px );
}
.treeListBox{
  margin: 1em auto !important;
  display: flex;
  flex-direction: initial;
  .selectList{
    flex-direction: column;
    .treeList{
        flex-direction: initial;
    }
  }
  .selectList:nth-child(1) {
    margin-right: 5px;
    flex: 3;
  }
  .selectList:nth-child(2) {
    flex: 2;
  }
}
</style>
