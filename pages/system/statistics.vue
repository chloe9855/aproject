<template>
  <div class="mainContent">
    <div
      class="content_block"
      :class="[growDiv,boxWidth]"
    >
      <BreadCrumbTool
        :options="BreadCrumb"
      />
      <PageHeader
        icon="system"
        title="系統使用量統計"
        btn-text="資料下載"
        btn-name="button-primary"
        @PHBtnStatus="downloadPaper"
      />
      <div
        class="content_box"
      >
        <ToggleList
          v-if="tidyData.length >= 1"
          :all-tree-data="tidyData"
        />

        <ToggleList
          v-if="tidyData.length < 1 && noResult === false"
          :all-tree-data="initialData"
        />

        <div
          v-if="tidyData.length < 1 && noResult === true"
          class="no_filestat"
        >
          <img :src="require('~/assets/img/no_data.svg')">
          <p>查無資料</p>
        </div>
      </div>
    </div>
    <Search
      type="usageAmountSearch"
      @toggleStatus="getToggleStatus"
      @useAmountSearch="searchAmount"
      @clearUseAmount="clearAllHandler"
    />

    <!-- loading載入中視窗 -->
    <div
      v-if="loadingModal === true"
      class="modal_wrapper"
    >
      <div class="modal" />
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';
import ToggleList from '~/components/model/ToggleList.vue';

export default {
  components: {
    PageHeader,
    BreadCrumbTool,
    Search: Search,
    ToggleList: ToggleList
  },
  data () {
    return {
      BreadCrumb: ['系統管理', '系統使用量統計'],
      toggleStatus: false,
      noResult: false,
      loadingModal: false,
      curIa: '',
      initialData: [],
      allData: [],
      tidyData: [],
      cloneRows: [],
      treeData: [
        {
          id: 1,
          name: '首頁',
          num: 387,
          bar: { barLength: 20, barColor: 'green', barWidth: 'bold' },
          show: false
        },
        {
          id: 2,
          name: '灌溉地管理',
          num: 20387,
          bar: { barLength: 60, barColor: 'orange', barWidth: 'bold' },
          show: false,
          node: [
            {
              id: 1,
              name: '灌溉地籍查詢',
              num: 0,
              bar: { barLength: 0, barColor: 'orange', barWidth: 'thin' },
              show: false
            },
            {
              id: 2,
              name: '停灌補償申報',
              num: 0,
              bar: { barLength: 0, barColor: 'orange', barWidth: 'thin' },
              show: false
            },
            {
              id: 3,
              name: '停灌資料異動',
              num: 0,
              bar: { barLength: 0, barColor: 'orange', barWidth: 'thin' },
              show: false
            },
            {
              id: 4,
              name: '統計報表',
              num: 0,
              bar: { barLength: 0, barColor: 'orange', barWidth: 'thin' },
              show: false
            }
          ]
        },
        {
          id: 3,
          name: '地理資訊圖台',
          num: 201,
          bar: { barLength: 30, barColor: 'red', barWidth: 'bold' },
          show: false,
          node: [
            {
              id: 1,
              name: '圖層工具',
              num: 0,
              bar: { barLength: 0, barColor: 'red', barWidth: 'thin' },
              show: false
            },
            {
              id: 2,
              name: '街景工具',
              num: 0,
              bar: { barLength: 0, barColor: 'red', barWidth: 'thin' },
              show: false
            },
            {
              id: 3,
              name: '測量工具',
              num: 0,
              bar: { barLength: 0, barColor: 'red', barWidth: 'thin' },
              show: false
            },
            {
              id: 4,
              name: '截圖工具',
              num: 0,
              bar: { barLength: 0, barColor: 'red', barWidth: 'thin' },
              show: false
            },
            {
              id: 5,
              name: '定位工具',
              num: 0,
              bar: { barLength: 0, barColor: 'red', barWidth: 'thin' },
              show: false
            },
            {
              id: 6,
              name: '查詢工具',
              num: 0,
              bar: { barLength: 0, barColor: 'red', barWidth: 'thin' },
              show: false
            }
          ]
        },
        {
          id: 4,
          name: '作業基金土地管理',
          num: 1000,
          bar: { barLength: 20, barColor: 'blue', barWidth: 'bold' },
          show: false
        },
        {
          id: 5,
          name: '系統管理',
          num: 20387,
          bar: { barLength: 60, barColor: 'lightGreen', barWidth: 'bold' },
          show: false,
          node: [
            {
              id: 1,
              name: '帳號管理',
              num: 0,
              bar: { barLength: 0, barColor: 'lightGreen', barWidth: 'thin' },
              show: false
            },
            {
              id: 2,
              name: '群組權限管理',
              num: 0,
              bar: { barLength: 0, barColor: 'lightGreen', barWidth: 'thin' },
              show: false
            },
            {
              id: 3,
              name: '首頁資料管理',
              num: 0,
              bar: { barLength: 0, barColor: 'lightGreen', barWidth: 'thin' },
              show: false
            }
          ]
        }
      ]
    };
  },
  name: 'Statistics',
  mounted () {
    this.getMountData();
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    // * 清除全部
    clearAllHandler () {
      this.tidyData = [];
      this.noResult = false;
    },
    // * 拿初始資料
    getMountData () {
      this.loadingModal = true;

      fetch('/AERC/rest/UsageAmount?Ia=', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        this.searchAmount(data, '', true);

        this.loadingModal = false;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 顯示查詢結果
    searchAmount (payload, nowIa, initial) {
      if (payload.length < 1) {
        this.tidyData = [];
        this.noResult = true;
        return;
      }
      this.curIa = nowIa;

      let cloneArr = [];
      cloneArr = _.cloneDeep(this.treeData);
      this.allData = payload;
      const row1 = this.allData.map(item => item.value_main);
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      const mainTotal = row1.reduce(reducer);

      this.allData.forEach((itemB) => {
        const index = cloneArr.findIndex(item => item.id === itemB.main_funtion);
        if (index !== -1) {
          cloneArr[index].num = itemB.value_main;
          cloneArr[index].bar.barLength = (itemB.value_main / mainTotal).toFixed(1) * 100;
          cloneArr[index].show = true;
          const mainBarLth = (itemB.value_main / mainTotal).toFixed(1) * 100;

          if (itemB.sub.length >= 1) {
            const row2 = itemB.sub.map(item => item.value);
            const subTotal = row2.reduce(reducer);

            itemB.sub.forEach((itemC) => {
              const index2 = cloneArr[index].node.findIndex(itemD => itemD.id === itemC.funtion);
              cloneArr[index].node[index2].num = itemC.value;
              cloneArr[index].node[index2].bar.barLength = (itemC.value / subTotal).toFixed(1) * mainBarLth;
              cloneArr[index].node[index2].show = true;
            });
          }
        }
      });

      this.tidyData = cloneArr;
      if (initial === true) {
        this.initialData = cloneArr;
      }
    },
    // * 資料下載報表
    downloadPaper () {
      fetch('/AERC/rest/DownloadUsageAmount', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          Ia: this.curIa
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        window.open(data);
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  computed: {
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    },
    growDiv () {
      const setWidth = this.toggleStatus ? '' : 'grow';
      return setWidth;
    },
    accountToggle () {
      return this.$store.state.settingAccount;
    }
  }
};
</script>
<style lang="scss">

.no_filestat {
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #EFF4F3;
    color: #3E9F88;
    height: 300px;
    @include noto-sans-tc-16-regular;
}

.mainContent{
  position: relative;
}
.downloadArea{
  display: flex;
  margin: 0 auto;
  .tableTool{
    flex:1;
  }
  .tableTool:nth-child(1){
    margin-right: 1em !important;
  }
}
.downloadTitle{
  display: flex;
  margin: 0 auto;
  .subTitleTool{
    flex:1;
  }
  .subTitleTool:nth-child(1){
    margin-right: 1em !important;
  }
}
.content_block {
    width: calc(100% - 372px);
    transition: ease-in-out 0.4s;
    height:100%;
    margin : 0 5%;
}
.content_box{
  height: calc( 100vh - 190px );
  padding-right: 0.5em;
  @include scrollBar;
}
.grow {
  width: 90%;
}

 .modal_wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  cursor: default;
}

.modal {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  flex-direction: column;
  background: url('~/assets/img/loading_icon.svg') no-repeat center/contain;
}

</style>
