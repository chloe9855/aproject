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
        @DropdownVal="(payload) => { nextMenuHandler(payload, 'Town'), coData1.County = payload.COUNTYID }"
      />
      <DropdownVertical
        title="鄉鎮市區"
        star-sign="*"
        :options="countyList1.Town"
        @DropdownVal="(payload) => { nextMenuHandler(payload, 'Section'), coData1.Town = payload.TOWNID }"
      />
      <DropdownVertical
        title="段名"
        star-sign="*"
        :options="countyList1.Section"
        @DropdownVal="(payload) => { nextMenuHandler(payload, 'Sec5cov'), coData1.Section = payload.Section }"
      />
      <InputVertical
        title="地號"
        green-hint="地號範圍:0"
        star-sign="*"
        :options="countyList1.Sec5cov"
        @DropdownVal="(payload) => { coData1.Sec5cov = payload.Land_no }"
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
        @click="$emit('clear')"
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
      }
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
      let url = '';
      if (current === 0) {
        url = `http://192.168.3.112/AERC/rest/Fund?CountyID=${this.coData1.County}&TownID=${this.coData1.Town}&LandLotNO=${this.coData1.Section}&LandNo=${this.coData1.Sec5cov}`;
      }
      if (current === 1) {
        url = `http://192.168.3.112/AERC/rest/Fund?CountyID=${this.coData2.County}&TownID=${this.coData2.Town}&LandLotNO=&LandNo=`;
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
        this.$emit('search', options.current, data);
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
      console.log(payload);
      console.log(nextType);

      let myObj = {};
      if (nextType === 'Town') {
        myObj = { CountyID: coData1.County };
      }
      if (nextType === 'Section') {
        myObj = { CountyID: coData1.County, TOWNID: coData1.Town };
      }
      if (nextType === 'Sec5cov') {
        myObj = { CountyID: coData1.County, TOWNID: coData1.Town, Section: coData1.Section };
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
          if (nextType === 'Sec5cov') {
            this.countyList1[nextType] = [{ title: '不拘', value: 'none', Land_no: '' }];
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
          if (nextType === 'Sec5cov') { item.title = item.Land_no; }
        });
        this.countyList1[nextType] = jsonData;
      }).catch((err) => {
        console.log(err);
      });
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
