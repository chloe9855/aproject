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
          @click="getArea(searchObj)"
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
        <div
          v-show="statusOwnerList"
          class="ownerList"
        >
          <TableTool
            :table-column="ownerList"
            :is-paginate="false"
            class="ownerListTable"
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
          <span>已選擇{{ owner.length }}位所有權人</span>
        </div>
      </div>
    </div>
    <div class="listBox Box3">
      <div class="listTitle">
        農民類別
      </div>
      <div class="flexBox">
        <Dropdown
          :options="farmerList"
          class="flex-1"
          :placeholders="compensateData.farmername"
          :change-text="isClearFarmer"
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
        v-for="(item, index) in categoryList"
        :key="index"
        :num="index"
        :text="item.text"
        :val="item.id"
        :type="item.type"
        :money="item.money"
        :set-check="isCategoryCheck"
        :error-text="categoryAreaError"
        name="category"
        @checkInputVal="getCategory"
      />
    </div>
    <div class="listBox Box5">
      <div class="listTitle">
        作物備註
      </div>
      <div class="flexBox">
        <InputTool
          :change-text="isClearNote"
          @inputValue="cropNote"
        />
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
import { getApplySetting } from '~/api/apply';
import { getCounties, getTowns, getSections, getSecNo, getSecNoList, getFarmer, getOwner } from '~/publish/Irrigation.js';
import { mapState } from 'vuex';
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
      farmerList: [],
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
      owner: [],
      category: [],
      // categoryContent: '',
      searchObj: {
        county_id: '',
        county_name: '',
        county_code: '',
        town_id: '',
        town_name: '',
        town_code: '',
        section: '',
        section_name: '',
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
      categoryList: [],
      farmer: {
        value: '',
        title: ''
      },
      isClearCounty: false,
      isClearTown: false,
      isClearSection: false,
      isClearLandNo: false,
      isClearFarmer: false,
      isClearNote: false,
      isCategoryCheck: false,
      categoryAreaError: '',
      countyId: '',
      countyFID: '',
      tolarea: '',
      irgarea: '',
      stnCns: '',
      categoryAreaSum: 0,
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
    getFarmer().then(r => {
      this.farmerList = r;
      const result = [];
      r.data.forEach(item => {
        result.push({ title: item.Name, value: item.Code });
      });
      this.farmerList = result;
    }).catch(e => {
      console.log(e);
    });
    getApplySetting(new Date()).then(r => {
      const result = [];
      r.data[0].category.forEach((item, i) => {
        result.push({ id: `category${i}`, text: `${item.type}(${item.money})`, type: item.type, money: item.money });
      });
      this.categoryList = result;
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
          const result = [];
          r.data.forEach(item => {
            result.push({ val: item.owner_id, title: [item.name, item.percent1 + '/' + item.percent2, item.own_scro] });
          });
          this.ownerList.body = result;
        }).catch(e => {
          console.log(e);
        });
      }
    },
    cropNote (e) {
      if (e) {
        this.searchObj.note = e.val;
      }
    },
    ownerListData (e) {
      if (e) {
        this.owner = e;
      }
    },
    getFarmerCategory (e) {
      console.log(e);
      if (e) {
        this.farmer = e;
      }
    },
    getCategory (e) {
      if (e) {
        this.categoryAreaError = '';
        if (e.isCheck) {
          this.category[e.num] = { category: e.category, ApplyArea: e.text };
        } else {
          // this.category[e.num] = '';
          delete this.category[e.num];
        }
      }
    },
    addCompensate () {
      const CompensateData = [];
      this.categoryAreaSum = 0;
      this.owner.forEach(ownerID => {
        const ownerName = (this.ownerList.body.filter(item => item.val === ownerID))[0].title[0];
        const ownerPercent = (this.ownerList.body.filter(item => item.val === ownerID))[0].title[1];
        const ownerScro = (this.ownerList.body.filter(item => item.val === ownerID))[0].title[2];
        this.category.forEach(item2 => {
          const getCategoryArea = this.fractionCalculate(item2.ApplyArea, ownerPercent);
          this.categoryAreaSum += getCategoryArea;
          CompensateData.push({
            owner_id: ownerID,
            owner_name: ownerName,
            own_scro_text: this.switchOwnerScro(ownerScro),
            own_scro: ownerScro,
            owner_percent: ownerPercent,
            farmer: this.farmer.value,
            farmer_title: this.farmer.title,
            county_id: this.searchObj.county_id,
            county_code: this.searchObj.county_code,
            county_name: this.searchObj.county_name,
            town_id: this.searchObj.town_id,
            town_code: this.searchObj.town_code,
            town_name: this.searchObj.town_name,
            section: this.searchObj.section,
            section_name: this.searchObj.section_name,
            irgarea: this.irgarea,
            tolarea: this.tolarea,
            landno: this.searchObj.landno,
            stnCns: this.stnCns,
            landdetail: { category: item2.category, ApplyArea: getCategoryArea },
            note: this.searchObj.note
          });
        });
      });
      if (this.categoryAreaSum > this.irgarea) {
        this.categoryAreaError = '申請面積超過 請重新輸入';
      } else {
        this.$emit('addCompensate', { compensateData: CompensateData, attachment: this.attachment });
        this.clearLandLocation();
      };

      // this.$emit('attachment', this.attachment);
    },
    fractionCalculate (num, data) {
      const fraction = data.split('/');
      return Math.round((num * fraction[0]) / fraction[1]);
    },
    countyDrop (payload) {
      this.searchObj.county_id = payload.value;
      this.searchObj.county_name = payload.title;
      this.searchObj.town_id = '';
      this.searchObj.section = '';
      this.searchObj.landno = '';
      this.searchObj.county_code = this.getCountyCode(this.searchObj.county_id);
      this.member.town = [];
      this.member.section = [];
      this.member.land = { option: [{ title: '', value: '0' }] };
      this.toggleClear();
      getTowns(this.searchObj.county_id).then(r => {
        this.townList = r.data;
        this.member.town = r.data.map(x => ({ title: x.TOWNNAME, value: x.TOWNID }));
        this.isClearCounty = false;
      });
    },
    townDrop (payload) {
      this.searchObj.town_id = payload.value;
      this.searchObj.town_name = payload.title;
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
      this.searchObj.section_name = payload.title;
      this.searchObj.landno = '';
      this.member.land = { option: [{ title: '', value: '0' }] };
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
    getArea (obj) {
      const data = {
        county: obj.county_id,
        town: obj.town_id,
        Section: obj.section,
        land_no: obj.landno
      };

      axios.post('/AERC/rest/IrrigationLand?pageCnt=1&pageRows=1', data).then(r => {
        this.countyId = r.data[0].county_id;
        this.countyFID = r.data[0].FID;
        this.tolarea = r.data[0].tolarea;
        this.irgarea = r.data[0].irgarea;
        this.stnCns = r.data[0].stn_cns;
        this.areaText = `本地號 地籍面積${r.data[0].tolarea}平方公尺 灌溉面積${r.data[0].irgarea}平方公尺 已申請面積 平方公尺`;
      });
    },
    switchOwnerScro (data) {
      let result = '';
      switch (data) {
        case 'A':
          result = '全部';
          break;
        case 'B':
          result = '公同共有';
          break;
        case 'C':
          result = '見地價備註事項';
          break;
        case 'Z':
          result = '見其他登記事項';
          break;
        default:
          result = data;
          break;
      }
      return result;
    },
    clearLandLocation () {
      const _this = this;
      this.isClearCounty = true;
      this.isClearTown = true;
      this.isClearSection = true;
      this.isClearLandNo = true;
      this.isClearFarmer = true;
      this.isClearNote = true;
      this.isCategoryCheck = true;
      this.areaText = '';
      this.ownerList.body = [];
      this.minNo = '';
      this.maxNo = '';
      // this.dataArr = [];
      setTimeout(function () {
        _this.dataArr = [];
      }, 5000);
    },
    toggleClear () {
      this.isClearFarmer = false;
      this.isClearNote = false;
      this.isCategoryCheck = false;
    },
    categoryArea () {
      // const irgarea = this.irgarea;
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
    ...mapState([
      'compensateData'
    ])
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
.ownerListTable{
  max-height: 150px;
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
