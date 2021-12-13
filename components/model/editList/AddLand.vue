<template>
  <div class="editListBox">
    <div class="listBox Box1">
      <div class="listTitle">
        申請土地位置
      </div>
      <div class="flexBox">
        <Dropdown
          title="縣市"
          :options="member.county"
          :change-text="isClearCounty"
          class="flex-4"
          @DropdownVal="countyDrop"
        />
        <Dropdown
          title="鄉鎮"
          :options="member.town"
          :change-text="isClearTown"
          class="flex-4"
          @DropdownVal="townDrop"
        />
        <Dropdown
          title="段名"
          :options="member.section"
          :change-text="isClearSection"
          class="flex-4"
          @DropdownVal="sectionDrop"
        />
        <InputTool
          title="地號"
          :search-input="Sec5covList"
          star-sign="*"
          class="flex-4"
          :change-text="isClearLandNo"
          @inputValue="getInputValue"
        />
        <span class="flex-4">地號範圍:{{ minNo }}-{{ maxNo }}</span>
        <Button
          :name="'button-default'"
          :text="'查詢'"
          @click="getArea"
        />
        <div>
          <img
            alt=""
            class="vector"
            :src="require('~/assets/img/delete.svg')"
            @click="clearLandLocation"
          >
        </div>
        <div>
          <img
            alt=""
            class="vector"
            :src="require('~/assets/img/map.svg')"
            @click="goMapPage"
          >
        </div>
      </div>
    </div>
    <div
      v-show="areaText!==''"
      class="listBox Box2"
    >
      <div class="listTitle" />
      <AreaNote
        :text="areaText"
      />
    </div>
    <div
      v-show="areaText!==''"
      class="listBox Box2"
    >
      <div class="listTitle">
        土地所有權人
      </div>
      <div class="flexBox ownerBox">
        <Button
          :name="'button-default'"
          :text="'選擇所有權人'"
          class="flex-2"
          @click="toggleOwnerList"
        />
        {{ owner }}
        <div
          v-show="statusOwnerList"
          class="ownerList"
        >
          <TableTool
            :table-column="ownerList"
            :is-paginate="false"
            @checkList="ownerListData"
          />
          <div class="flexBox ownerBtnBox">
            <Button
              :name="'button-default'"
              :text="'取消'"
              @click="toggleOwnerList"
            />
            <Button
              :name="'button-primary'"
              :text="'確定'"
              @click="toggleOwnerList"
            />
          </div>
        </div>
        <div class="tips flex-16">
          <span>已選擇{{ ownerList.body.length }}位所有權人</span>
        </div>
      </div>
    </div>
    <div class="listBox Box3">
      <div class="listTitle">
        農民類別
      </div>
      <div class="flexBox">
        <Dropdown
          :options="memberTest"
          class="flex-1"
          @DropdownVal="getFarmerCategory"
        />
        <div class="flex-4" />
      </div>
    </div>
    <div class="listBox Box4">
      <div class="listTitle">
        申請類別
      </div>
      <CheckInput
        name="category"
        @checkInputVal="getCategory"
      />
    </div>
    <div class="listBox Box5">
      <div class="listTitle">
        作物備註
      </div>
      <div class="flexBox">
        <InputTool @inputValue="cropNote" />
      </div>
    </div>
    <div class="listBox Box6">
      <div class="listTitle">
        檢附資料
      </div>
      <div class="flexBox checkBoxOption">
        <span
          v-for="(item , index) in option.data"
          :key="index"
        >
          <input
            :id="item.value"
            v-model="dataArr"
            type="checkbox"
            :name="item.value"
            :value="item.value"
          ><label :for="item.value" /><span>{{ item.title }}</span>
        </span>
      </div>
    </div>
    <div class="buttonBox">
      <Button
        :name="'button-default'"
        :text="'收合新增視窗'"
        @click="$emit('clear',false)"
      />
      &emsp;
      <Button
        :name="'button-primary'"
        :text="'確認新增'"
        @click="addCompensate"
      />
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import Button from '~/components/tools/Buttons';
import InputTool from '~/components/tools/InputTool';
import CheckInput from '~/components/model/editList/CheckInputTool';
import AreaNote from '~/components/tools/AreaNote.vue';
import TableTool from '~/components/model/Table';
import axios from 'axios';
import { getCounties, getTowns, getSections, getSecNo, getSecNoList, getFarmer, getOwner } from '~/publish/Irrigation.js';
export default {
  components: {
    Dropdown,
    Button,
    CheckInput,
    InputTool,
    AreaNote,
    TableTool
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return { data: [{ title: '無清單資料1', value: '0' }, { title: '無清單資料2', value: '1' }] };
      }
    }
  },
  data: () => {
    return {
      memberTest: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }],
      statusOwnerList: false,
      areaText: '',
      options: {
        current: 0,
        typeList: [
          {
            name: '依管理單位',
            id: 0
          },
          {
            name: '依單筆地號',
            id: 1
          }
        ]
      },
      dataArr: [],
      note: '',
      owner: '',
      category: [],
      // categoryContent: '',
      searchObj: {
        county_id: '',
        county_code: '',
        town_id: '',
        town_code: '',
        section: '',
        landno: '',
        owner_id: '',
        owner_name: '',
        own_scro: '',
        percent2: 0,
        percent1: 0,
        farmer: 0,
        category: 0,
        area: 0,
        note: ''
      },
      attachment: {
        attachment1: 0,
        attachment2: 0,
        attachment3: 0,
        attachment4: 0,
        attachment5: 0
      },
      member: {
        county: [],
        town: [],
        section: [],
        land: ''
      },
      // * 地號清單
      Sec5covList: [],
      minNo: '',
      maxNo: '',
      myLandnoList: [],
      //
      countyList: [],
      townList: [],
      farmerList: [],
      isClearCounty: false,
      isClearTown: false,
      isClearSection: false,
      isClearLandNo: false,
      countyId: '',
      countyFID: '',
      ownerList: {
        head: [
          { title: '所有權人' },
          { title: '權力範圍' },
          { title: '權力類別' }
        ],
        body: []
      }
    };
  },
  name: 'LandSearch',
  mounted () {
    getCounties().then(r => {
      this.member.county = r.data.map(x => ({ title: x.COUNTYNAME, value: x.COUNTYID }));
      this.countyList = r.data;
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    toggleOwnerList () {
      this.statusOwnerList = !this.statusOwnerList;
      if (this.statusOwnerList) {
        const data = {
          county: this.searchObj.county_id,
          town: this.searchObj.town_id,
          Section: this.searchObj.section,
          land_no: this.searchObj.landno
        };
        getOwner(data).then(r => {
          // this.ownerList.body = {

          // };
          console.log(r.data);
          const result = [];
          r.data.forEach(item => {
            console.log(item);
            result.push({ val: item.owner_id, title: [item.name, item.percent1 + '/' + item.percent2, item.own_scro] });
          });
          console.log(result);
          this.ownerList.body = result;
        }).catch(e => {
          console.log(e);
        });

        // body: [
        //   { val: 0, title: ['陳旺旺', '1/3', '公同共有'] },
        //   { val: 1, title: ['張旺旺', '1/3', '公同共有'] },
        //   { val: 2, title: ['鄧旺旺', '1/3', '公同共有'] }
        // ];
      }
    },
    cropNote (e) {
      if (e) {
        console.log(e);
        this.searchObj.note = e.val;
      }
    },
    ownerListData (e) {
      console.log(e);
      if (e) {
        this.owner = e;
      }
    },
    getFarmerCategory (e) {
      console.log(e);
      getFarmer().then(r => {
        console.log(r);
        this.farmerList = r;
      }).catch(e => {
        console.log(e);
      });
    },
    getCategory (e) {
      console.log(e);
      if (e) {
        this.category.push(e);
        // this.categoryContent = e.text;
      }
    },
    addCompensate () {
      const result = {};
      if (this.note)result.note = this.note;
      if (this.category)result.category = this.category;
      if (this.categoryContent)result.categoryContent = this.categoryContent;
      if (this.dataArr[0])result.attachment1 = this.dataArr[0];
      if (this.dataArr[1])result.attachment2 = this.dataArr[1];
      if (this.dataArr[2])result.attachment3 = this.dataArr[2];
      if (this.dataArr[3])result.attachment4 = this.dataArr[3];
      if (this.dataArr[4])result.attachment5 = this.dataArr[4];
      this.$emit('addCompensate', this.searchObj);
    },
    countyDrop (payload) {
      this.searchObj.county_id = payload.value;
      this.searchObj.town_id = '';
      this.searchObj.section = '';
      this.searchObj.landno = '';
      this.searchObj.county_code = this.getCountyCode(this.searchObj.county_id);
      this.member.town = [];
      this.member.section = [];
      this.member.land = { option: [{ title: '', value: '0' }] };
      getTowns(this.searchObj.county_id).then(r => {
        this.townList = r.data;
        this.member.town = r.data.map(x => ({ title: x.TOWNNAME, value: x.TOWNID }));
        this.isClearCounty = false;
      });
    },
    townDrop (payload) {
      this.searchObj.town_id = payload.value;
      this.searchObj.section = '';
      this.searchObj.landno = '';
      this.member.section = [];
      this.member.land = { option: [{ title: '', value: '0' }] };
      this.searchObj.town_code = this.getTownCode(this.searchObj.town_id);
      getSections(this.searchObj.county_id, this.searchObj.town_id).then(r => {
        this.member.section = r.data.map(x => ({ title: x.Sec_cns, value: x.Section }));
        this.isClearTown = false;
      });
    },
    sectionDrop (payload) {
      this.searchObj.section = payload.value;
      this.searchObj.landno = '';
      this.member.land = { option: [{ title: '', value: '0' }] };
      // getLands(this.searchObj.county, this.searchObj.town, this.searchObj.section).then(r => {
      //   this.member.land = { option: r.data.map(x => ({ title: x.Land, value: x.Land_no })) };
      // });
      getSecNo(this.searchObj.county_id, this.searchObj.section).then(r => {
        this.maxNo = r.data[0].Max;
        this.minNo = r.data[0].Min;
      });
      getSecNoList(this.searchObj.county_id, this.searchObj.section).then(r => {
        this.Sec5covList = r.data.map(item => item.Land_no);
        this.isClearSection = false;
      });
    },
    getInputValue (e) {
      if (e) {
        this.inputValue = e;
        this.searchObj.landno = e.val;
        this.isClearLandNo = false;
      }
    },
    getCountyCode (e) {
      const result = this.countyList.filter(item => item.COUNTYID === e);
      return result[0].COUNTYCODE;
    },
    getTownCode (e) {
      const result = this.townList.filter(item => item.TOWNID === e);
      return result[0].TOWNCODE;
    },
    getArea () {
      const data = {
        county: this.searchObj.county_id,
        town: this.searchObj.town_id,
        Section: this.searchObj.section,
        land_no: this.searchObj.landno
      };

      axios.post('/AERC/rest/IrrigationLand?pageCnt=1&pageRows=1', data).then(r => {
        this.countyId = r.data[0].county_id;
        this.countyFID = r.data[0].FID;
        this.areaText = `本地號 地籍面積${r.data[0].tolarea}平方公尺 灌溉面積${r.data[0].irgarea}平方公尺 已申請面積 平方公尺`;
      });
    },
    clearLandLocation () {
      this.isClearCounty = true;
      this.isClearTown = true;
      this.isClearSection = true;
      this.isClearLandNo = true;
    },
    // * 跳轉地圖
    goMapPage () {
      const countyId = this.countyId;
      const fid = this.countyFID;
      this.$store.commit('TOGGLE_LOADING_STATUS');
      fetch(`http://192.168.3.112/AERC/rest/Sec5ByFID?CountyID=${countyId}&FID=${fid}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.$store.commit('TOGGLE_LOADING_STATUS');
        const nowUrl = window.location.origin;
        const front = this.$router.options.base;
        const end = 'map/';
        const myUrl = `${nowUrl}${front}${end}`;

        window.open(myUrl);
        localStorage.setItem('oriData', JSON.stringify(jsonData[0].geometry));
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  computed: {
  },
  watch: {
    dataArr (n, o) {
      const all = 'attachmentAll';
      const isAll = this.dataArr.indexOf(all) > -1;
      const dataLength = this.dataArr.length;
      if (isAll && dataLength < 6) {
        if (o.indexOf(all) > -1) {
          const a = this.dataArr.indexOf(all);
          this.dataArr.splice(a, 1);
        } else {
          this.dataArr = ['attachmentAll', 'attachment1', 'attachment2', 'attachment3', 'attachment4', 'attachment5'];
        }
      } else if (!isAll && dataLength >= 5) {
        if (o.indexOf(all) > -1) {
          this.dataArr = [];
        } else {
          this.dataArr.unshift(all);
        }
      }
      this.attachment.attachment1 = this.dataArr.indexOf('attachment1') > -1 ? 1 : 0;
      this.attachment.attachment2 = this.dataArr.indexOf('attachment2') > -1 ? 1 : 0;
      this.attachment.attachment3 = this.dataArr.indexOf('attachment3') > -1 ? 1 : 0;
      this.attachment.attachment4 = this.dataArr.indexOf('attachment4') > -1 ? 1 : 0;
      this.attachment.attachment5 = this.dataArr.indexOf('attachment5') > -1 ? 1 : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.editListBox{
  margin: 1em auto;
  background: #EFF4F3;
  //padding: 10px;
}
.button_wrap{
  min-width: 130px;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .button_wrap{
    min-width: none;
  }
}
.listBox{
    display: flex;
    margin: 5px 0;
    flex-wrap:initial;
    align-items: center;
    .listTitle{
        padding-right: 1em;
        min-width: 100px;
        padding-left: 1em;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        height: 20px;
        color: #111;
    }
    div{
        line-height: 20px;
        text-align: left;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        align-items: center;
        color: #494949;
        div{
            margin: 0 5px 0 0;
        }
        @include pc-width{
          flex-wrap: wrap;
        }
        @include pcm-width{
          flex-wrap: wrap;
        }
        @include pcs-width{
          flex-wrap: wrap;
        }
        @include pcxs-width{
          flex-wrap: wrap;
        }
        .check-input-box{
          margin: 2.5px 0;
        }
    }
}
.checkBoxOption{
  input[type="checkbox"] {
    display:none;
  }
  input[type="checkbox"] + label
  {
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
    @include checkbox;
  }
  input[type="checkbox"]:checked + label
  {
    background: url("~/assets/img/check.svg");
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
}
.ownerList{
  position: absolute;
  top: 32px;
  z-index: 1000;
  min-width: 120px;
  background: white;
  min-height: 30px;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
}
.ownerBox{
  position: relative;
}
.ownerBtnBox{
  justify-content: flex-end;
  .button_wrap{
    min-width: auto;
  }
}
</style>
