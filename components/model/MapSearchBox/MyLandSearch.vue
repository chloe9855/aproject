<template>
  <div class="inputBox">
    <NavTabs
      :type-list="options.typeList"
      :selected="options.current"
      @current="payload => options.current = payload"
    />
    <div
      v-show="options.current === 0"
      class="landNum"
    >
      <DropdownVertical
        title="縣市"
        star-sign="*"
        :options="countyList1.County"
        :change-text="clearLand1"
        :show-error="coData1.County === '' && unFilled === true ? true : false"
        @DropdownVal="(payload) => { nextMenuHandler(payload, 'Town'), clearLand1 = false, payload !== '' ? coData1.County = payload.COUNTYID : coData1.County = '' }"
      />
      <DropdownVertical
        title="鄉鎮市區"
        star-sign="*"
        :options="countyList1.Town"
        :change-text="clearLand2"
        :show-error="coData1.Town === '' && unFilled === true ? true : false"
        @DropdownVal="(payload) => { nextMenuHandler(payload, 'Section'), clearLand2 = false, payload !== '' ? coData1.Town = payload.TOWNID : coData1.Town = '' }"
      />
      <DropdownVertical
        title="段名"
        star-sign="*"
        :options="countyList1.Section"
        :change-text="clearLand3"
        :show-error="coData1.Section === '' && unFilled === true ? true : false"
        @DropdownVal="(payload) => { getLandnoList(payload), clearLand3 = false, payload !== '' ? coData1.Section = payload.Section : coData1.Section = '' }"
      />
      <InputVertical
        title="地號"
        :green-hint="`地號範圍: ${minNo}-${maxNo}`"
        star-sign="*"
        :change-text="clearLand4"
        :search-input="Sec5covList"
        :unfill-error="coData1.Sec5cov === '' && unFilled === true ? true : false"
        @inputValue="(payload) => { coData1.Sec5cov = payload, clearLand4 = false }"
      />
    </div>
    <div
      v-show="options.current === 1"
      class="landUnit"
    >
      <DropdownVertical
        title="管理處"
        :options="countyList2.Ia"
        :change-text="clearLand7"
        @DropdownVal="(payload) => { nextListHandler(payload, 'Mng'), clearLand7 = false, payload !== '' ? coData2.Ia = payload.Ia : coData2.Ia = '' }"
      />
      <DropdownVertical
        title="縣市"
        :options="countyList2.County"
        :change-text="clearLand5"
        @DropdownVal="(payload) => { getTownData(payload), clearLand5 = false, payload !== '' ? coData2.County = payload.COUNTYID : coData2.County = '' }"
      />
      <DropdownVertical
        title="鄉鎮市區"
        :options="countyList2.Town"
        :change-text="clearLand6"
        @DropdownVal="(payload) => { clearLand6 = false, payload !== '' ? coData2.Town = payload.TOWNID : coData2.Town = '' }"
      />
    </div>
    <div class="buttonBox">
      <Button
        :name="'button-default'"
        :text="'清除全部'"
        @click="clearHandler"
      />
      <Button
        :name="'button-primary'"
        :text="'查詢'"
        @click="searchData(options.current)"
      />
    </div>
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import NavTabs from '~/components/tools/NavTabs';
import Button from '~/components/tools/Buttons.vue';
export default {
  components: {
    DropdownVertical: DropdownVertical,
    InputVertical: InputVertical,
    NavTabs: NavTabs,
    Button: Button
  },
  data: () => {
    return {
      userId: '',
      options: {
        current: 0,
        typeList: [
          {
            name: '依單筆地號',
            id: 0
          },
          {
            name: '依管理單位',
            id: 1
          }
        ]
      },
      //* 單筆地號 縣市資料
      countyList1: {
        County: [],
        Town: [],
        Section: [],
        Sec5cov: []
      },
      // * 單筆地號 清除值
      clearLand1: false,
      clearLand2: false,
      clearLand3: false,
      clearLand4: false,
      // * 管理單位 清除值
      clearLand5: false,
      clearLand6: false,
      clearLand7: false,
      //* 管理單位 縣市資料
      countyList2: {
        County: [],
        Town: [],
        Ia: []
      },
      //* 單筆地號 選值
      coData1: {
        County: '',
        Town: '',
        Section: '',
        Sec5cov: ''
      },
      //* 管理單位 選值
      coData2: {
        County: '',
        Town: '',
        Ia: ''
      },
      // * 地號清單
      Sec5covList: [],
      minNo: '',
      maxNo: '',
      myLandnoList: [],
      //
      unFilled: false
    };
  },
  name: 'MyLandSearch',
  mounted () {
    this.userId = sessionStorage.getItem('loginUser');
    this.getCountyData();
    this.getIaList();
  },
  methods: {
    // * 搜尋
    searchData (current) {
      if ((this.coData1.County === '' || this.coData1.Town === '' || this.coData1.Section === '' || this.coData1.Sec5cov === '') && current === 0) {
        this.unFilled = true;
        return;
      }
      // if ((this.coData2.County === '' || this.coData2.Town === '' || this.coData2.Ia === '') && current === 1) {
      //   this.unFilled = true;
      //   return;
      // }

      let url = '';
      if (current === 0) {
        url = `/AERC/rest/Fund?CountyID=${this.coData1.County}&TownID=${this.coData1.Town}&LandLotNO=${this.coData1.Section}&LandNo=${this.coData1.Sec5cov}&pageCnt=1&pageRows=10`;
      }
      if (current === 1) {
        url = `/AERC/rest/Fund?CountyID=${this.coData2.County}&TownID=${this.coData2.Town}&Ia=${this.coData2.Ia}&pageCnt=1&pageRows=10`;
      }

      fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);

        this.unFilled = false;
        // 總頁數
        const pageCount = Math.ceil(data[0].totalCount / 10);

        if (current === 0) {
          const nowNum = this.myLandnoList.filter(item => item.Land_no === this.coData1.Sec5cov);
          this.$emit('search', current, data[0].data, nowNum[0].FID, pageCount);
        }
        if (current === 1) {
          this.$emit('search', current, data[0].data, '', pageCount, this.coData2);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 取得管理處資料
    getIaList () {
      fetch(`/AERC/rest/Ia/${this.userId}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({

        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        // console.log(data);

        data.forEach((item) => {
          item.value = item.FID;
          item.title = item.Ia_cns;
        });
        this.countyList2.Ia = data;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 取得縣市資料
    getCountyData () {
      fetch('/AERC/rest/County', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({

        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        // console.log(data);

        data.forEach((item) => {
          item.value = item.FID;
          item.title = item.COUNTYNAME;
        });
        this.countyList1.County = data;
        this.countyList2.County = data;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 管理單位 取得鄉鎮資料
    getTownData (payload) {
      fetch('/AERC/rest/Town', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          CountyID: payload.COUNTYID
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);

        data.forEach((item) => {
          item.value = item.FID;
          item.title = item.TOWNNAME;
        });
        this.countyList2.Town = data;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 管理單位 取得管理處以下 之下一排清單資料
    nextListHandler (payload, nextType) {
      // console.log(payload);
      // console.log(nextType);

      let myObj = {};
      if (nextType === 'Mng') {
        myObj = { Ia: payload.Ia };
      }
      if (nextType === 'Stn') {
        myObj = { Ia: payload.Ia, Mng: payload.Mng };
      }
      if (nextType === 'Grp') {
        myObj = { Ia: payload.Ia, Mng: payload.Mng, Stn: payload.Stn };
      }

      fetch(`/AERC/rest/${nextType}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(myObj)
      }).then((response) => {
        if (response.status === 403) {
          this.countyList2[nextType] = [{ title: '不拘', value: 'none' }];
          if (nextType === 'Mng') {
            this.countyList2[nextType] = [{ title: '不拘', value: 'none', Mng: 0, Mng_cns: '' }];
          }
          if (nextType === 'Stn') {
            this.countyList2[nextType] = [{ title: '不拘', value: 'none', Stn: 0, Stn_cns: '' }];
          }
          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);

        jsonData.forEach((item) => {
          item.value = item.FID;
          if (nextType === 'Mng') { item.title = item.Mng_cns; }
          if (nextType === 'Stn') { item.title = item.Stn_cns; }
          if (nextType === 'Grp') { item.title = item.Grp_cns; }
        });
        this.countyList2[nextType] = jsonData;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 依單筆地號  取得下一排清單資料
    nextMenuHandler (payload, nextType) {
      if (payload === '') { return; }

      // console.log(payload);
      // console.log(nextType);

      let myObj = {};
      if (nextType === 'Town') {
        myObj = { CountyID: payload.COUNTYID };
      }
      if (nextType === 'Section') {
        myObj = { CountyID: payload.COUNTYID, TownID: payload.TOWNID };
      }

      fetch(`/AERC/rest/${nextType}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(myObj)
      }).then((response) => {
        if (response.status === 403) {
          this.countyList1[nextType] = [{ title: '不拘', value: 'none' }];
          if (nextType === 'Town') {
            this.countyList1[nextType] = [{ title: '不拘', value: 'none', TOWNID: '' }];
          }
          if (nextType === 'Section') {
            this.countyList1[nextType] = [{ title: '不拘', value: 'none', Section: '' }];
          }

          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);

        jsonData.forEach((item) => {
          item.value = item.FID;
          if (nextType === 'Town') { item.title = item.TOWNNAME; }
          if (nextType === 'Section') { item.title = item.Sec_cns; }
          // if (nextType === 'Sec5cov') { item.title = item.Land_no; }
        });
        this.countyList1[nextType] = jsonData;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 依單筆地號 取得地號清單、取得地號最大最小值
    getLandnoList (payload) {
      if (payload === '') { return; }

      // 取得地號清單
      fetch(`/aerc/rest/Sec5nos?CountyID=${this.coData1.County}&Section=${payload.Section}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.myLandnoList = jsonData;

        const nameList = jsonData.map(item => item.Land_no);
        this.Sec5covList = nameList;
      }).catch((err) => {
        console.log(err);
      });

      // 取得地號最大最小值
      fetch(`/aerc/rest/Sec5no?CountyID=${this.coData1.County}&Section=${payload.Section}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);

        this.minNo = jsonData[0].Min;
        this.maxNo = jsonData[0].Max;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 依單筆地號 清除全部
    clearHandler () {
      this.clearLand1 = true;
      this.clearLand2 = true;
      this.clearLand3 = true;
      this.clearLand4 = true;

      this.clearLand5 = true;
      this.clearLand6 = true;
      this.clearLand7 = true;

      this.countyList1.Town = [];
      this.countyList1.Section = [];
      this.countyList1.Sec5cov = [];

      this.countyList2.Town = [];
      // this.countyList2.Ia = [];

      this.coData1.County = '';
      this.coData1.Town = '';
      this.coData1.Section = '';
      this.coData1.Sec5cov = '';

      this.coData2.County = '';
      this.coData2.Town = '';
      this.coData2.Ia = '';

      this.minNo = '';
      this.maxNo = '';

      this.unFilled = false;

      this.$emit('clear');
    }
  },
  watch: {
    'options.current': {
      handler (value) {
        this.$emit('nowOption', value);
      },
      deep: true
    }

  }
};
</script>

<style lang="scss" scoped>
.landNum, .landUnit {
  padding: 0 15px;
}

.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  padding-right: 20px;
  .button_wrap{
    padding-left: 5px;
  }
}

</style>
