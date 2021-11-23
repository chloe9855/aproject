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
          v-if="searchResult.authority === '' && noResult === true"
          class="no_file"
        >
          <img :src="require('~/assets/img/no_data.svg')">
          <p>查無資料</p>
        </div>

        <div
          v-if="searchResult.landNo === '' && searchResult.authority === '' && noResult === false"
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

    <div
      v-if="loadModal === true"
      class="modal_wrapper"
    >
      <div class="modal">
        <!-- <p
          class="p3"
          style="margin-bottom: 10px;"
        >
          載入中
        </p>
        <div class="bar" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import SearchFund from '~/components/model/SearchFund';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool';
import PageHeader from '~/components/tools/PageHeader.vue';
import Table from '~/components/model/TableForJoy.vue';
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
      loadModal: false,
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
      mapIndex: '',
      //* 依單筆地號 目前輸入地號的fid
      landnoFid: 0,
      //* 查無結果
      noResult: false
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

        this.loadModal = true;

        fetch(`http://192.168.3.112/AERC/rest/Sec5ByFID?CountyID=${this.myCountyId}&FID=${this.landnoFid}`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then((response) => {
          return response.json();
        }).then((jsonData) => {
          console.log(jsonData);

          this.loadModal = false;

          const nowUrl = window.location.href;
          const front = nowUrl.substring(0, nowUrl.length - 9);
          const end = 'map/';
          const myUrl = `${front}${end}`;

          window.open(myUrl);
          localStorage.setItem('oriData', JSON.stringify(jsonData[0].geometry));
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    //* 搜尋
    searchHandler (type, data, secFid) {
      this.clearAllHandler();

      // 回傳空值(查無結果)
      if (data.length < 1) {
        this.searchResult.authority = '';
        this.searchData1.body = [];
        this.noResult = true;
        return;
      }

      this.landnoFid = secFid;

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
      this.noResult = false;
    },
    // * 在地圖上顯示
    showOnMap () {
      this.loadModal = true;

      fetch(`http://192.168.3.112/AERC/rest/Sec5ByFID?CountyID=${this.myCountyId}&FID=${this.landnoFid}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);

        this.loadModal = false;

        const nowUrl = window.location.href;
        const front = nowUrl.substring(0, nowUrl.length - 9);
        const end = 'map/';
        const myUrl = `${front}${end}`;

        window.open(myUrl);
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

  .modal_wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  // background-color: rgba(0, 0, 0, 0.2);
  z-index: 9998;
  cursor: default;
}

.modal {
  width: 200px;
  height: 200px;
  // padding: 5px 31px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  // font-size: 16px;
  // text-align: center;
  // background-color: #fff;
  // border-radius: 10px;
  z-index: 9999;
  transform: translate(-50%, -50%);
  flex-direction: column;
  background: url('~/assets/img/loading_icon.svg') no-repeat center/contain;
}

.p3 {
  margin-top: 42px;
  font-size: 25px;
  font-weight: bold;
  color: #165f88;
}

.bar {
  width: 236px;
  height: 12px;
  margin: 10px 0 20px;
  background: url('~/assets/img/bar-new.svg') no-repeat center/contain;
}

  .main {
    position: relative;
    height: calc(100vh - 91px);
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
