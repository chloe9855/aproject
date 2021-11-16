<template>
  <div class="main">
    <SearchFund
      ref="searchFund"
      type="MyLandSearch"
      @showSidebar="payload => growUp = payload"
      @search="searchHandler"
      @clear="clearAllHandler"
    />

    <div
      class="content_block"
      :class="{ 'grow': !growUp }"
    >
      <div class="left_content">
        <BreadCrumbTool :options="breadCrumb" />
        <PageHeader
          icon="land"
          :hide-button="true"
          btn-name="button-primary"
        />
        <Table
          v-if="searchResult.authority !== ''"
          :no-wrap="true"
          :table-column="searchResult.authority"
          :is-map="true"
          :is-search="true"
          :is-check="false"
          @tableEvent="showDetailHandler"
        />

        <div
          v-if="searchResult.landNo !== ''"
          class="landno_wrap"
        >
          <!-- <NavTabs
            :type-list="options.typeList"
            :selected="options.current"
            @current="payload => options.current = payload"
          /> -->
          <NormalTable
            :list="searchResult.landNo"
            sizing="h-432"
            :shorten="true"
          />
        </div>

        <div
          v-if="searchResult.landNo === '' && searchResult.authority === ''"
          class="no_file"
        >
          <img :src="require('~/assets/img/no_file.svg')">
          <p>請設定查詢條件</p>
          <p>並開始查詢 !</p>
        </div>
      </div>
      <div
        v-if="showDetail"
        class="right_content"
      >
        <div
          class="close_icon"
          @click="addDetail(false)"
        />
        <div class="btn_wrap">
          <Buttons
            :name="'button-primary'"
            :text="'在地圖上顯示'"
            @click="showOnMap"
          />
        </div>

        <!-- <NavTabs
          :type-list="options.typeList"
          :selected="options.current"
          @current="payload => options.current = payload"
        /> -->
        <NormalTable2
          v-if="detailItem !== ''"
          :item="detailItem[0]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchFund from '~/components/model/SearchFund';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool';
import PageHeader from '~/components/tools/PageHeader.vue';
import Table from '~/components/model/Table.vue';
import NormalTable2 from '~/components/model/NormalTable2.vue';
// import NavTabs from '~/components/tools/NavTabs.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    SearchFund: SearchFund,
    BreadCrumbTool: BreadCrumbTool,
    PageHeader: PageHeader,
    Table: Table,
    NormalTable2: NormalTable2,
    // NavTabs: NavTabs,
    Buttons: Buttons
  },
  data () {
    return {
      allData: '',
      growUp: true,
      showDetail: false,
      searchResult: {
        authority: '',
        landNo: ''
      },
      breadCrumb: ['作業基金土地管理'],
      options: {
        current: 0,
        typeList: [
          {
            name: '標示部',
            id: 0
          },
          {
            name: '所有權部',
            id: 1
          },
          {
            name: '土地參考',
            id: 2
          },
          {
            name: '作業基金土地資訊',
            id: 3
          }
        ]
      },
      //* 依單筆地號 查詢結果
      searchData1: {
        head: [
          { title: '縣市' },
          { title: '鄉鎮市區' },
          { title: '段名' },
          { title: '地號' }
        ],
        body: []
      },
      //* 依管理單位 查詢結果
      searchData2: {
        head: [
          { title: '縣市' },
          { title: '鄉鎮市區' },
          { title: '管理處' },
          { title: '管理分處' },
          { title: '工作站' },
          { title: '水利小組' }
        ],
        body: []
      },
      //* 依單筆地號 單筆詳細資料
      detailItem: '',
      myCountyId: '',
      mapIndex: ''
    };
  },
  mounted () {

  },
  methods: {
    addDetail (payload) {
      this.showDetail = payload;
      const _searchFund = this.$refs.searchFund;
      if (payload === true) {
        _searchFund.closeBar();
      } else {
        _searchFund.showBar();
      }
    },
    //* 單筆看詳細、定位至地圖
    showDetailHandler (payload) {
      if (payload.event === 'isSearch') {
        // payload.item = 地號
        // payload.myIndex = index
        this.mapIndex = payload.myIndex;

        fetch(`http://192.168.3.112/AERC/rest/Fund?CountyID=${this.myCountyId}&TownID=&LandLotNO=&LandNo=${payload.item}&pageCnt=1&pageRows=10`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then((response) => {
          return response.json();
        }).then((jsonData) => {
          console.log(jsonData);

          this.detailItem = '';
          this.addDetail(true);
          this.detailItem = jsonData;
        }).catch((err) => {
          console.log(err);
        });
      }

      if (payload.event === 'isMap') {
        // payload.item = index

        fetch('http://192.168.3.112/AERC/rest/Sec5cov?pageCnt=1&pageRows=5', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            CountyID: this.myCountyId,
            FID: this.allData[payload.item].FID
          })
        }).then((response) => {
          return response.json();
        }).then((jsonData) => {
          console.log(jsonData);

          window.open('http://192.168.3.112/test008/map/');
          localStorage.setItem('oriData', JSON.stringify(jsonData[0].geometry));
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    //* 搜尋
    searchHandler (type, data) {
      this.clearAllHandler();

      if (data.length < 1) {
        this.searchResult.authority = '';
        this.searchData1.body = [];
        return;
      }

      // 依單筆地號
      if (type === 0) {
        this.allData = data;

        const newArr = [];
        data.forEach((item) => {
          const result = {
            title: []
          };
          result.title[0] = item.CountyName;
          result.title[1] = item.TownName;
          result.title[2] = item.LandLot;
          result.title[3] = item.LandNo;
          newArr.push(result);
        });

        this.myCountyId = data[0].CountyID;
        this.searchData1.body = newArr;
        this.searchResult.authority = this.searchData1;
        this.$forceUpdate();
      }

      // 依管理單位
      if (type === 1) {
        // const data = require('~/static/land.json');
        // this.searchResult.authority = data;
      }
    },
    // * 清除全部
    clearAllHandler () {
      this.searchResult.authority = '';
      this.searchResult.landNo = '';
      this.searchData1.body = [];
    },
    // * 在地圖上顯示
    showOnMap () {
      fetch('http://192.168.3.112/AERC/rest/Sec5cov?pageCnt=1&pageRows=5', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          CountyID: this.myCountyId,
          FID: this.allData[this.mapIndex].FID
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);

        window.open('http://192.168.3.112/test008/map/');
        localStorage.setItem('oriData', JSON.stringify(jsonData[0].geometry));
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  watch: {
    growUp (value) {
      if (value === true) {
        this.showDetail = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

  .main {
    position: relative;
    height: calc(100vh - 86px);
    display: flex;
  }

  .content_block {
    // border: 1px solid purple;
    width: calc(100% - 372px);
    position: absolute;
    right: 0;
    transition: ease-in-out 0.4s;
    display: flex;
    height:100%;
  }

  .left_content {
    width: 100%;
    // padding: 13px;
    padding-right: 24px;
    padding-top: 0;
  }

  .right_content {
    width: 853px;
    box-shadow: -1px 0 5px rgba(135, 135, 135, 0.28);
    padding: 40px 10px 10px;
    position: relative;
  }

  .grow {
    width: calc(100% - 67px);
  }

  .close_icon {
    background: url('~/assets/img/close-icon.svg') no-repeat right/contain;
    width: 23px;
    height: 23px;
    cursor: pointer;
    position: absolute;
    top: 10px;
  }

  .no_file{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #EFF4F3;
    color: #3E9F88;
    height: 450px;
    @include noto-sans-tc-16-regular;
  }

  .btn_wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 13px;
  }

  .landno_wrap {
    position: relative;
  }

</style>
