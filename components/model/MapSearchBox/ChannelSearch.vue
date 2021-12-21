<template>
  <div class="out_wrap">
    <Dropdown-component
      :options="allIaList"
      :placeholders="'請選擇管理處'"
      :change-text="clearText1"
      @DropdownVal="getCanalLists"
    />
    <InputTool-component
      :input-text="'輸入渠道關鍵字或是點擊地圖'"
      :search-input="canalList"
      :change-text="clearText2"
      :add-text="addCanalText"
      @inputValue="searchCanal"
    />
    <div class="input_wrap">
      <div>
        <span class="s1">渠道總長度(公尺)</span>
        <span>{{ canalLength }}</span>
      </div>

      <div class="theme_checkbox">
        <input
          id="check1"
          v-model="isReverse"
          type="checkbox"
        >
        <label
          for="check1"
        >
          反向
        </label>
      </div>

      <div class="meme">
        <span>椿號定位</span>
        <InputTool-component
          :add-text="sContent1"
          :change-text="clearText3"
          sizing="w-30"
          @inputValue="(payload) => { payload.val !== '' ? range1 = parseInt(payload.val, 10) : range1 = '', clearText3 = false }"
        />
        ~
        <InputTool-component
          :add-text="canalLength.toString()"
          :change-text="clearText4"
          sizing="w-30"
          @inputValue="(payload) => { payload.val !== '' ? range2 = parseInt(payload.val, 10) : range2 = '', clearText4 = false }"
        />
      </div>
      <div class="theme_checkbox box_margin">
        <input
          id="check2"
          v-model="isCircle"
          type="checkbox"
        >
        <label
          for="check2"
        >
          使用環域(公尺 : 最大200公尺)
        </label>
      </div>
      <div class="wrap2">
        <Dropdown-component
          :placeholders="'請輸入欲查詢圖資'"
          :options="infoList"
          :change-text="clearText5"
          sizing="w-70"
          @DropdownVal="(payload) => { payload.value !== '' ? engName = payload.value : engName = '', clearText5 = false }"
        />
        <InputTool-component
          :input-text="'半徑'"
          :change-text="clearText6"
          :add-text="setRadius"
          sizing="w-25"
          @inputValue="(payload) => { payload.val !== '' ? radius = parseInt(payload.val, 10) : radius = '', clearText6 = false }"
        />
      </div>
      <div class="bt_wrap">
        <Buttons-component
          :name="'button-default'"
          :text="'清除全部'"
          @click="clearAllHandler"
        />
        &emsp;
        <Buttons-component
          :name="'button-primary'"
          :text="'查詢'"
          @click="searchHandler"
        />
      </div>
    </div>

    <!-- loading載入中視窗 -->
    <div
      v-if="loadModal === true"
      class="modal_wrapperChannel"
    >
      <div class="modalChannel" />
    </div>

    <!-- 彈窗lightbox -->
    <AlertBox-component
      v-if="alertBox === true"
      title="渠道位置僅供參考"
      text="查詢結果不得作證明文件使用"
      box-icon="warning"
      @close="alertBox = false"
      @confirm="alertBox = false"
    />
    <AlertBox-component
      v-if="alertBox2 === true"
      title="樁號定位輸入錯誤"
      text="您所輸入的樁號位置大於總長度"
      box-icon="warning"
      @close="alertBox2 = false"
      @confirm="alertBox2 = false"
    />
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import InputTool from '~/components/tools/InputTool.vue';
import Buttons from '~/components/tools/Buttons.vue';
import AlertBox from '~/components/tools/AlertBox.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'InputTool-component': InputTool,
    'Buttons-component': Buttons,
    'AlertBox-component': AlertBox
  },
  props: {
    // 管理處下拉選單
    allIaList: {
      type: Array
    }
  },
  data () {
    return {
      userId: '',
      alertBox: false,
      alertBox2: false,
      loadModal: false,
      allCanalList: [],
      canalList: [],
      clearText1: false,
      clearText2: false,
      clearText3: false,
      clearText4: false,
      clearText5: false,
      clearText6: false,
      sContent1: '',
      sContent2: '',
      // * 目前選擇的管理處
      nowIa: '',
      // * 目前渠道的FID值
      nowFid: '',
      // * 渠道總長
      canalLength: '',
      // * 點擊渠道 輸入框文字
      addCanalText: '',
      // * 反向
      isReverse: false,
      // * 渠道圖形
      canalGraphic: '',
      // * 樁號範圍
      range1: 0,
      range2: 0,
      // * icon
      iconStart: '',
      icon1: '',
      icon2: '',
      iconEnd: '',
      // * 環域
      infoList: [
        { title: '地段', value: 'Section' },
        { title: '地籍', value: 'Sec5cov' },
        { title: '管理處', value: 'Ia' },
        { title: '管理分處', value: 'Mng' },
        { title: '工作站', value: 'Stn' },
        { title: '小組', value: 'Grp' },
        { title: '輪區', value: 'Rot' },
        { title: '期作別', value: 'Period' },
        { title: '埤塘', value: 'Pool' }
      ],
      isCircle: false,
      radius: 0,
      // * 所選圖資
      nowLayer: '',
      engName: '',
      myTableData: {
        head: [],
        body: []
      },
      // * 預設半徑 = 10
      setRadius: '10',
      fnList: [],
      // * Buffer圖形
      bufferGraph: ''
    };
  },
  name: 'ChannelSearch',
  mounted () {
    this.userId = sessionStorage.getItem('loginUser');
    this.setRadius = '10';

    allMBTX.forEach((item) => {
      this.fnList.push(sg.events.on(item, 'click', (e) => {
        console.log(e);
        if (e.graphic.id[0].substring(3) === 'Canal' && e.graphic.attributes.Ia === this.nowIa) {
          console.log(e);

          this.addCanalText = e.graphic.attributes.Sys_cns;
          this.nowFid = parseInt(e.graphic.id[2], 10);
          // 渠道總長
          this.canalLength = e.graphic.geometry.length;
          // 樁號定位起點值自動代入最小值
          this.sContent1 = '0';
        }
      }));
    });
  },

  methods: {
    // * 清除全部
    clearAllHandler () {
      this.clearText1 = true;
      this.clearText2 = true;
      this.clearText3 = true;
      this.clearText4 = true;
      this.clearText5 = true;
      this.clearText6 = true;

      this.allCanalList = [];
      this.canalList = [];
      this.canalLength = '';
      this.isReverse = false;
      this.isCircle = false;

      // 清除圖形
      pMapBase.drawingGraphicsLayer.remove(this.canalGraphic);
      pMapBase.drawingGraphicsLayer.remove(this.iconStart);
      pMapBase.drawingGraphicsLayer.remove(this.icon1);
      pMapBase.drawingGraphicsLayer.remove(this.icon2);
      pMapBase.drawingGraphicsLayer.remove(this.iconEnd);
      pMapBase.drawingGraphicsLayer.remove(this.bufferGraph);

      this.$emit('clear');
    },
    // * 取得該管理處的所有渠道
    getCanalLists (payload) {
      this.clearText1 = false;
      this.nowIa = payload.Ia;

      fetch('/AERC/rest/Canal', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          Ia: payload.Ia
        })
      }).then((response) => {
        if (response.status === 403) {
          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);
        this.allCanalList = jsonData;

        const nameList = jsonData.map(item => item.Sys_cns);
        this.canalList = nameList;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 取得特定渠道之總長
    searchCanal (payload) {
      this.clearText2 = false;
      // 樁號定位起點值自動代入最小值
      this.sContent1 = '0';

      const myItem = this.allCanalList.filter(item => item.Sys_cns === payload.val);
      if (myItem.length < 1) {
        return;
      }

      // this.canalLength = myItem[0].Length;
      this.nowFid = myItem[0].FID;

      fetch('/AERC/rest/Canal', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          Ia: this.nowIa,
          FID: this.nowFid
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        const geoMetry = sg.geometry.Geometry.fromGeoJson(data[0].geometry);
        // 取得渠道總長
        this.canalLength = geoMetry.length.toFixed(2);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 查詢
    searchHandler () {
      if (this.range2 > this.canalLength) {
        this.alertBox2 = true;
        return;
      }
      this.alertBox = true;

      fetch('/AERC/rest/Canal', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          Ia: this.nowIa,
          FID: this.nowFid
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);

        // 先清除之前的
        pMapBase.drawingGraphicsLayer.remove(this.canalGraphic);
        pMapBase.drawingGraphicsLayer.remove(this.iconStart);
        pMapBase.drawingGraphicsLayer.remove(this.icon1);
        pMapBase.drawingGraphicsLayer.remove(this.icon2);
        pMapBase.drawingGraphicsLayer.remove(this.iconEnd);

        // 畫渠道圖
        const geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
        this.canalGraphic = sg.Graphic.createFromGeometry(geometry, { linewidth: 5, linecolor: new sg.Color(126, 255, 178, 1) });
        pMapBase.drawingGraphicsLayer.add(this.canalGraphic);

        console.log(887);
        console.log(geometry);

        // 定位
        let point1;
        let point2;
        let xMin;
        let xMax;
        let yMin;
        let yMax;

        if (this.isReverse === false) {
          // 沒勾反向
          point1 = geometry.getPoint(this.range1);
          point2 = geometry.getPoint(this.range2);
        } else {
          // 有勾反向
          point1 = geometry.getPoint(this.canalLength - this.range1);
          point2 = geometry.getPoint(this.canalLength - this.range2);
        }

        if (point1.x < point2.x) {
          xMin = point1.x;
          xMax = point2.x;
        } else {
          xMin = point2.x;
          xMax = point1.x;
        }

        if (point1.y < point2.y) {
          yMin = point1.y;
          yMax = point2.y;
        } else {
          yMin = point2.y;
          yMax = point1.y;
        }

        // 畫icon
        const start = geometry.getPoint(0);
        const end = geometry.getPoint(this.canalLength);

        if (this.range1 !== 0 && this.range2 !== this.canalLength) {
          this.iconStart = sg.Graphic.createFromGeometry(new sg.geometry.Point(start.x, start.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 25, markercolor: new sg.Color(25, 112, 93, 1), text: '起始點', textsize: 14, textoffset: [0, -10] });
          this.iconEnd = sg.Graphic.createFromGeometry(new sg.geometry.Point(end.x, end.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 25, markercolor: new sg.Color(25, 112, 93, 1), text: '結束點', textsize: 14, textoffset: [0, -10] });

          pMapBase.drawingGraphicsLayer.add(this.iconStart);
          pMapBase.drawingGraphicsLayer.add(this.iconEnd);
        }

        this.icon1 = sg.Graphic.createFromGeometry(new sg.geometry.Point(point1.x, point1.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 25, markercolor: new sg.Color(25, 112, 93, 1), text: `0K+${this.range1}`, textsize: 14, textoffset: [0, -10] });
        this.icon2 = sg.Graphic.createFromGeometry(new sg.geometry.Point(point2.x, point2.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 25, markercolor: new sg.Color(25, 112, 93, 1), text: `0K+${this.range2}`, textsize: 14, textoffset: [0, -12] });

        pMapBase.drawingGraphicsLayer.add(this.icon1);
        pMapBase.drawingGraphicsLayer.add(this.icon2);

        // let bufferGeom;

        // 有寫樁號定位範圍
        if (this.range1 !== '' && this.range2 !== '') {
          const extent = new sg.geometry.Extent();
          extent.xmax = xMax;
          extent.xmin = xMin;
          extent.ymax = yMax;
          extent.ymin = yMin;
          pMapBase.ZoomMapTo(extent);
          ZoomOut();
          pMapBase.getTransformation().FitLevel();
          pMapBase.RefreshMap(true);

          // if (this.range1 !== 0 && this.range2 !== this.canalLength) {
          //   bufferGeom = geometry.slice(this.range1, this.range2);
          // }
          // if (this.range1 === 0 && this.range2 === this.canalLength) {
          //   bufferGeom = geometry;
          // }
        }

        // 沒寫樁號定位範圍
        if (this.range1 === '' && this.range2 === '') {
          const extent = geometry.extent;
          pMapBase.ZoomMapTo(extent);
          ZoomOut();
          pMapBase.getTransformation().FitLevel();
          pMapBase.RefreshMap(true);

          // bufferGeom = geometry;
        }

        // 有勾環域
        if (this.isCircle === true) {
          this.loadModal = true;
          this.getBuffer(geometry);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 取得環域資料
    getBuffer (geoData) {
      let geoArr = '';
      if (this.range1 !== '' && this.range2 !== '' && this.range1 !== 0 && this.range2 !== this.canalLength) {
        geoArr = geoData.slice(this.range1, this.range2);
      } else {
        geoArr = geoData;
      }

      const newArr = [];
      // newArr = geoData.path.map(item => {
      //   return [[item.x, item.y]];
      // });
      console.log(geoData);
      console.log(geoArr);
      geoArr.path.forEach((item) => {
        console.log(item);
        newArr.push([item.x, item.y]);
      });
      const result = {
        type: 'LineString',
        coordinates: newArr
      };

      fetch('/AERC/rest/Buffer', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          geom: result,
          radius: this.radius
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.getBufferTable(jsonData[0].geometry);

        // 畫出Buffer環域圖形 (只有一個)
        // 先清除之前的
        pMapBase.drawingGraphicsLayer.remove(this.bufferGraph);
        // 畫圖
        const geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
        this.bufferGraph = sg.Graphic.createFromGeometry(geometry, { borderwidth: 0, fillcolor: new sg.Color(62, 159, 136, 1) });
        pMapBase.drawingGraphicsLayer.add(this.bufferGraph);
        // 定位
        const extent = geometry.extent;
        pMapBase.ZoomMapTo(extent);
        ZoomOut();
        pMapBase.getTransformation().FitLevel();
        pMapBase.RefreshMap(true);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 取得表格資料 emit上層
    getBufferTable (geoGraphic) {
      let result;
      let url;

      if (this.engName === 'Ia') {
        url = `/AERC/rest/${this.engName}/${this.userId}`;
        result = {
          Ia: this.nowIa,
          geom: geoGraphic
        };
      } else {
        url = `/AERC/rest/${this.engName}`;
        result = {
          Ia: this.nowIa,
          geom: geoGraphic
        };
      }

      if (this.engName === 'Sec5cov') {
        this.getCounty(geoGraphic);
        return;
      }

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(result)
      }).then((response) => {
        if (response.status === 403) {
          this.loadModal = false;
          this.$emit('channelSearch', '', 'none');
          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.myTableData.body = [];

        this.loadModal = false;
        if (this.engName === 'Section') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.City, item.City_no, item.Town, item.Town_no, item.Section, item.Sec_cns, item.Area, item.Ymd], info: item, type: 'Section' };
          });
        }

        if (this.engName === 'Ia') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.Ia, item.Ia_cns, item.Area, item.Ymd], info: item, type: 'Ia' };
          });
        }

        if (this.engName === 'Mng') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.Ia, item.Ia_cns, item.Mng, item.Mng_cns, item.Area, item.Ymd], info: item, type: 'Mng' };
          });
        }

        if (this.engName === 'Stn') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.Ia, item.Ia_cns, item.Mng, item.Mng_cns, item.Stn, item.Stn_cns, item.Area, item.Ymd], info: item, type: 'Stn' };
          });
        }

        if (this.engName === 'Grp') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.Ia, item.Ia_cns, item.Mng, item.Mng_cns, item.Stn, item.Stn_cns, item.Grp, item.Grp_cns, item.Area, item.Ymd], info: item, type: 'Grp' };
          });
        }

        if (this.engName === 'Rot') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.Ia, item.Ia_cns, item.Mng, item.Mng_cns, item.Stn, item.Stn_cns, item.Grp, item.Grp_cns, item.Rot, item.Rot_cns, item.Area, item.Ymd], info: item, type: 'Rot' };
          });
        }

        if (this.engName === 'Period') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.Ia, item.Ia_cns, item.Period, item.Period_cns, item.Mng, item.Mng_cns, item.Stn, item.Stn_cns, item.Grp, item.Grp_cns, item.Area, item.Ymd], info: item, type: 'Period' };
          });
        }

        if (this.engName === 'Pool') {
          this.myTableData.body = jsonData.map(item => {
            return { title: [item.Ia, item.Ia_cns, item.Mng, item.Mng_cns, item.Stn, item.Stn_cns, item.Grp, item.Grp_cns, item.Pool_cns, item.Ex_poolno, item.Area, item.Ymd], info: item, type: 'Pool' };
          });
        }

        this.$emit('channelSearch', this.myTableData, this.engName);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 查地籍 先call county api
    getCounty (geometry) {
      fetch('/AERC/rest/County', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          geom: geometry
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.getSec5ByGeom(jsonData[0].COUNTYID, geometry);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 查地籍資料
    getSec5ByGeom (countyId, geoData) {
      fetch('/AERC/rest/Sec5ByGeom', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          geom: geoData,
          CountyID: countyId
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.loadModal = false;

        jsonData.forEach((item) => {
          item.myCountyID = countyId;
        });

        this.myTableData.body = jsonData.map(item => {
          return { title: [item.Section_no, item.Land, item.Ltype_cns2, item.Section, item.Sec_cns, item.Land_no, item.Desc_area, item.Maparea, item.L_type, item.Ltype_cns, item.Town, item.Class, item.Class_cns, item.Use_dir, item.Use_dircns, item.Cur_price, item.Land_price, item.Dec_price, item.Ymd], info: item, type: 'Sec5cov' };
        });

        this.$emit('channelSearch', this.myTableData, this.engName);
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  watch: {
    // nowLayer (value) {
    //   if (value === '地段') {
    //     this.engName = 'Section';
    //   }
    //   if (value === '地籍') {
    //     this.engName = 'Sec5cov';
    //   }
    //   if (value === '管理處') {
    //     this.engName = 'Ia';
    //   }
    //   if (value === '管理分處') {
    //     this.engName = 'Mng';
    //   }
    //   if (value === '工作站') {
    //     this.engName = 'Stn';
    //   }
    //   if (value === '小組') {
    //     this.engName = 'Grp';
    //   }
    //   if (value === '輪區') {
    //     this.engName = 'Rot';
    //   }
    //   if (value === '期作別') {
    //     this.engName = 'Period';
    //   }
    //   if (value === '埤塘') {
    //     this.engName = 'Pool';
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>

  .modal_wrapperChannel {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000000000;
    cursor: default;
  }

  .modalChannel {
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

  .theme_checkbox {
    input {
    position: absolute; // take it out of document flow
    opacity: 0; // hide it

      & + label {
        position: relative;
        cursor: pointer;
        padding: 0;
      }

      // Box.
      & + label::before {
        content: '';
        margin-right: 7px;
        margin-bottom: -2px;
        display: inline-block;
        width: 13px;
        height: 13px;
        background: white;
        border: 1px solid #959595;
        border-radius: 3px;
      }

      // Box checked
      &:checked + label::before {
        content: '';
        background: url('~/assets/img/checkbox.svg') no-repeat right/contain;
        width: 15px;
        height: 15px;
        border: none;
      }

      &:disabled + label {
        color: #b8b8b8;
        cursor: auto;
      }

      &:disabled + label::before {
        box-shadow: none;
        background: #ddd;
      }

    }

    label {
      color: #494949;
      display: flex;
      align-items: center;
      @include noto-sans-tc-16-regular;
    }
  }

  .box_margin {
    margin: 3px 0;
  }

  .bt_wrap {
    padding: 8px 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .out_wrap {
    padding: 0 20px;
  }

  .input_wrap {
    padding: 7px 0;
    @include noto-sans-tc-16-regular;

    span {
      @include noto-sans-tc-16-medium-line19;

    }
  }

  .s1 {
    border-right: 1px solid #959595;
    padding-right: 10px;
    margin-right: 10px;
  }

  .wrap1 {
    display: flex;

    // input {
    //   width: 103px;
    // }
  }

  .wrap2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .meme {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>
