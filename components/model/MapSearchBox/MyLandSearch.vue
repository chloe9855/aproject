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
        @DropdownVal="(payload) => { nextMenuHandler(payload, 'Town'), clearLand1 = false, payload !== '' ? coData1.County = payload.COUNTYID : coData1.County = '' }"
      />
      <DropdownVertical
        title="鄉鎮市區"
        star-sign="*"
        :options="countyList1.Town"
        :change-text="clearLand2"
        @DropdownVal="(payload) => { nextMenuHandler(payload, 'Section'), clearLand2 = false, payload !== '' ? coData1.Town = payload.TOWNID : coData1.Town = '' }"
      />
      <DropdownVertical
        title="段名"
        star-sign="*"
        :options="countyList1.Section"
        :change-text="clearLand3"
        @DropdownVal="(payload) => { getLandnoList(payload), clearLand3 = false, payload !== '' ? coData1.Section = payload.Section : coData1.Section = '' }"
      />
      <InputVertical
        title="地號"
        :green-hint="`地號範圍: ${minNo}-${maxNo}`"
        star-sign="*"
        :change-text="clearLand4"
        :search-input="Sec5covList"
        @inputValue="(payload) => { coData1.Sec5cov = payload, clearLand4 = false }"
      />
    </div>
    <div
      v-show="options.current === 1"
      class="landUnit"
    >
      <DropdownVertical
        title="縣市"
        :options="countyList2.County"
        @DropdownVal="(payload) => { getTownData(payload), coData2.County = payload.COUNTYID }"
      />
      <DropdownVertical
        title="鄉鎮市區"
        :options="countyList2.Town"
        @DropdownVal="(payload) => { coData2.Town = payload.TOWNID }"
      />
      <DropdownVertical
        title="管理處"
        :options="countyList2.Ia"
        @DropdownVal="(payload) => { nextListHandler(payload, 'Mng'), coData2.Ia = payload.Ia }"
      />
      <DropdownVertical
        title="管理分處"
        :options="countyList2.Mng"
        @DropdownVal="(payload) => { nextListHandler(payload, 'Stn'), coData2.Mng = payload.Mng }"
      />
      <DropdownVertical
        title="工作站"
        :options="countyList2.Stn"
        @DropdownVal="(payload) => { nextListHandler(payload, 'Grp'), coData2.Stn = payload.Stn }"
      />
      <DropdownVertical
        title="水利小組"
        :options="countyList2.Grp"
        @DropdownVal="(payload) => { coData2.Grp = payload.Grp }"
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
      member: [{ title: '01 宜蘭', value: '1' }, { title: '02 宜蘭', value: '2' }, { title: '03 宜蘭', value: '3' }, { title: '04 宜蘭', value: '4' }],
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
      //* 管理單位 縣市資料
      countyList2: {
        County: [],
        Town: [],
        Ia: [],
        Mng: [],
        Stn: [],
        Grp: []
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
        Ia: '',
        Mng: '',
        Stn: '',
        Grp: ''
      },
      // * 地號清單
      Sec5covList: [],
      minNo: '',
      maxNo: '',
      myLandnoList: []
    };
  },
  name: 'MyLandSearch',
  mounted () {
    this.getCountyData();
    this.countyList2.Ia = [{
      title: '宜蘭01',
      value: 1,
      Ia_cns: '宜蘭01'
    }];
  },
  methods: {
    // * 搜尋
    searchData (current) {
      if (this.coData1.County === '' || this.coData1.Town === '' || this.coData1.Section === '' || this.coData1.Sec5cov === '') { return; }

      let url = '';
      if (current === 0) {
        url = `http://192.168.3.112/AERC/rest/Fund?CountyID=${this.coData1.County}&TownID=${this.coData1.Town}&LandLotNO=${this.coData1.Section}&LandNo=${this.coData1.Sec5cov}&pageCnt=1&pageRows=10`;
      }
      if (current === 1) {
        url = `http://192.168.3.112/AERC/rest/Fund?CountyID=${this.coData2.County}&TownID=${this.coData2.Town}&LandLotNO=&LandNo=&pageCnt=1&pageRows=10`;
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

        const nowNum = this.myLandnoList.filter(item => item.Land_no === this.coData1.Sec5cov);
        this.$emit('search', current, data, nowNum[0].FID);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 取得縣市資料
    getCountyData () {
      fetch('http://192.168.3.112/AERC/rest/County', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({

        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);

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
      fetch('http://192.168.3.112/AERC/rest/Town', {
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
      console.log(payload);
      console.log(nextType);

      let myObj = {};
      if (nextType === 'Mng') {
        myObj = { Ia: '01' };
      }
      if (nextType === 'Stn') {
        myObj = { Ia: '01', Mng: payload.Mng };
      }
      if (nextType === 'Grp') {
        myObj = { Ia: '01', Mng: payload.Mng, Stn: payload.Stn };
      }

      fetch(`http://192.168.3.112/AERC/rest/${nextType}/admin5`, {
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
        console.log(jsonData);

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

      console.log(payload);
      console.log(nextType);

      let myObj = {};
      if (nextType === 'Town') {
        myObj = { CountyID: payload.COUNTYID };
      }
      if (nextType === 'Section') {
        myObj = { CountyID: payload.COUNTYID, TownID: payload.TOWNID };
      }

      fetch(`http://192.168.3.112/AERC/rest/${nextType}`, {
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
        console.log(jsonData);

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
      fetch(`http://192.168.3.112/aerc/rest/Sec5nos?CountyID=${this.coData1.County}&Section=${payload.Section}`, {
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
      fetch(`http://192.168.3.112/aerc/rest/Sec5no?CountyID=${this.coData1.County}&Section=${payload.Section}`, {
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

      this.countyList1.Town = [];
      this.countyList1.Section = [];
      this.countyList1.Sec5cov = [];

      this.coData1.County = '';
      this.coData1.Town = '';
      this.coData1.Section = '';
      this.coData1.Sec5cov = '';

      this.$emit('clear');
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
