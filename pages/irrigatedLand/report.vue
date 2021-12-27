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
      :tips="'列印日期:'+yy+'年'+mm+'月'+dd+'日'"
      :is-border="true"
      :is-sticky="true"
    />
    <div class="w-90 treeListBox content_box">
      <div
        v-show="!isIA"
        class="flexBox selectList"
      >
        <SubTitleTool
          :title="'單位:'+IaName1"
          class="w-100"
          :is-report="true"
          @STApplySno="getApplySno"
          @STDate="getDate"
        />
        <div class="flexBox treeList">
          <TreeSelectBox
            class="flex-1"
            title="停灌補償核定統計表"
            :options="treeData"
            index-no="A"
            @getFile="linkFile"
            @query="getQuery"
          />
          <TreeSelectBox
            class="flex-1"
            title="停灌補償申報統計表(日報)"
            :options="treeData"
            index-no="B"
            @getFile="linkFile"
            @query="getQuery"
          />
          <TreeSelectBox
            class="flex-1"
            title="補償(撥款)清冊"
            index-no="C"
            @getFile="linkFile"
          />
        </div>
      </div>
      <div
        v-show="isIA"
        class="flexBox selectList"
      >
        <SubTitleTool
          :title="'單位:'+IaName2"
          class="w-100"
          :is-report="true"
          @STApplySno="getApplySno"
          @STDate="getDate"
        />
        <div class="flexBox treeList">
          <TreeSelectBox
            class="flex-1"
            :options="iaData"
            title="停灌補償核定統計表"
            index-no="D"
            :link="areaD_File"
            @query1="getMng"
            @getFile="linkFile"
          />
          <TreeSelectBox
            class="flex-1"
            :options="iaData"
            index-no="E"
            :link="areaE_File"
            title="停灌補償申報統計表(日報)"
            @query1="getMng"
            @getFile="linkFile"
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
import { getIaCheckReport, getIaApplyReport, getIaApply, getIRCheckReport, getIRApplyReport } from '~/api/report';
import { getIas, getMngs, getStns } from '~/publish/Irrigation.js';
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
      isIA: false,
      IaName1: '',
      IaName2: '',
      mngData: [],
      StnData: [],
      treeData: [
        {
          ia: '',
          mng: []
        }
      ],
      iaData: [
        {
          mng: []
        }
      ],
      apply_sno: 0,
      date: '',
      queryA: [],
      queryB: [],
      queryD: [],
      queryE: [],
      areaC_File: '',
      areaD_File: '',
      areaE_File: '',
      yy: '',
      mm: '',
      dd: '',
      fileData: {}
    };
  },
  name: 'Report',
  mounted () {
    const userId = sessionStorage.getItem('loginUser');
    this.yy = new Date().getFullYear() - 1911;
    this.mm = new Date().getMonth() + 1;
    this.dd = new Date().getDate();
    getIas().then(r => {
      r.data.forEach(element => {
        this.iaData[0].mng.push({ title: element.Ia_cns, no: element.Ia });
      });
    }).catch(e => {
      if ((e.response.status === 401)) {
        this.$router.push('/login');
      }
    });
    getAccount(userId).then(d => {
      this.isIA = d.data[0].permit.indexOf('C_05') > -1;
      this.thisIa = d.data[0].ia;
      this.IaName1 = d.data[0].ianame + '管理處';
      this.IaName2 = d.data[0].ianame;
      this.treeData[0].ia = this.thisIa;
      this.treeData[0].mng = [];
      this.treeData[0].mng.stn = [];
      getMngs(this.thisIa).then(a => {
        this.mngData = a.data;
        a.data.forEach((element, i) => {
          this.treeData[0].mng.push({ title: element.Mng_cns, no: element.Mng, stn: [] });

          getStns(this.thisIa, element.Mng).then(b => {
            b.data.forEach(element1 => {
              console.log(i);
              this.treeData[0].mng[i].stn.push({ name: element1.Stn_cns, no: element1.Stn, isChecked: false });
            });
          });
        });
      });
    }).catch(e => {
      if ((e.response.status === 401)) {
        this.$router.push('/login');
      }
    });
  },
  methods: {
    getApplySno (e) {
      if (e) {
        this.apply_sno = e.value;
      }
    },
    getDate (e) {
      if (e) {
        this.date = e.val;
      }
    },
    getQuery (e) {
      if (e.type === 'A' && this.Apply_sno !== '') {
        this.queryA = e.data;
        const data = {
          Ia: this.thisIa,
          query: this.queryA,
          Apply_sno: this.apply_sno
        };
        this.fileData = data;
      } else if (e.type === 'B' && this.Apply_sno !== '' && this.date !== '') {
        this.queryB = e.data;
        const data = {
          ia: this.thisIa,
          query: this.queryB,
          Apply_sno: this.apply_sno,
          date: this.date
        };
        this.fileData = data;
      }
    },
    getMng (e) {
      if (e.type === 'D' && this.Apply_sno !== '') {
        this.queryD = e.data;
        const data = {
          query: this.queryD,
          apply_sno: this.apply_sno
        };
        this.fileData = data;
      } else if (e.type === 'E' && this.Apply_sno !== '' && this.date !== '') {
        this.queryE = e.data;
        const data = {
          query: this.queryE,
          date: this.date,
          apply_sno: this.apply_sno
        };
        this.fileData = data;
      }
    },
    linkFile (e) {
      if (e === 'A') {
        getIaCheckReport(this.fileData).then(r => {
          window.location = r.data;
        }).catch(e => {
          if ((e.response.status === 401)) {
            this.$router.push('/login');
          }
        });
      } else if (e === 'B') {
        getIaApplyReport(this.fileData).then(r => {
          window.location = r.data;
        }).catch(e => {
          if ((e.response.status === 401)) {
            this.$router.push('/login');
          }
        });
      } else if (e === 'C') {
        const data = {
          Ia: this.thisIa,
          date: this.date,
          Apply_sno: this.apply_sno
        };
        getIaApply(data).then(r => {
          window.location = r.data;
        }).catch(e => {
          if ((e.response.status === 401)) {
            this.$router.push('/login');
          }
        });
      } else if (e === 'D') {
        getIRCheckReport(this.fileData).then(r => {
          window.location = r.data;
        }).catch(e => {
          if ((e.response.status === 401)) {
            this.$router.push('/login');
          }
        });
      } else if (e === 'E') {
        getIRApplyReport(this.fileData).then(r => {
          window.location = r.data;
        }).catch(e => {
          if ((e.response.status === 401)) {
            this.$router.push('/login');
          }
        });
      }
    }
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
