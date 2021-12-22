<template>
  <div class="pos_wrap">
    <NavTabs-component
      :type-list="posOptions.typeList"
      :selected="posOptions.current"
      @current="payload => posOptions.current = payload"
    />
    <div class="pos_content">
      <div v-show="posOptions.current === 0">
        <DropdownVertical-component
          :options="allDropList.Ia"
          :title="'管理處'"
          :change-text="clearCanals1"
          @DropdownVal="(payload) => { nextListHandler(payload, 'Mng'), selectHandler(payload, 'Ia'), clearCanals1 = false }"
        />
        <DropdownVertical-component
          :options="allDropList.Mng"
          :title="'管理分處'"
          :change-text="clearCanals2"
          @DropdownVal="(payload) => { nextListHandler(payload, 'Stn'), selectHandler(payload, 'Mng'), clearCanals2 = false }"
        />
        <DropdownVertical-component
          :options="allDropList.Stn"
          :title="'工作站'"
          :change-text="clearCanals3"
          @DropdownVal="(payload) => { nextListHandler(payload, 'Grp'), selectHandler(payload, 'Stn'), clearCanals3 = false }"
        />
        <DropdownVertical-component
          :options="allDropList.Grp"
          :title="'水利小組'"
          :change-text="clearCanals4"
          @DropdownVal="(payload) => { nextListHandler(payload, 'Grp'), selectHandler(payload, 'Grp'), clearCanals4 = false, grpPosition = payload }"
        />
        <div class="bt_wrap">
          <Buttons-component
            :name="'button-default'"
            :text="'清除全部'"
            @click="clearCanalHandler"
          />
          <Buttons-component
            :text="'定位'"
            @click="selectHandler(grpPosition, 'Grp')"
          />
        </div>
      </div>

      <div v-show="posOptions.current === 1">
        <span class="sptitle">縣市</span>
        <Dropdown-component
          sizing="w-88"
          :options="countyList.County"
          :change-text="clearLand1"
          @DropdownVal="(payload) => { nextCountHandler(payload, 'Town'), positionCtrl(payload, 'County'), countyIdList.push(payload.COUNTYID), clearLand1 = false, payload !== '' ? counData.County = payload.COUNTYNAME : counData.County = '' }"
        />
        <span class="sptitle">鄉鎮市區</span>
        <Dropdown-component
          sizing="w-78"
          :options="countyList.Town"
          :change-text="clearLand2"
          @DropdownVal="(payload) => { nextCountHandler(payload, 'Section'), positionCtrl(payload, 'Town'), clearLand2 = false, payload !== '' ? counData.Town = payload.TOWNNAME : counData.Town = '' }"
        />
        <span class="sptitle">地段</span>
        <Dropdown-component
          sizing="w-88"
          :options="countyList.Section"
          :change-text="clearLand3"
          @DropdownVal="(payload) => { getLandnoList(payload), positionCtrl(payload, 'Section'), clearLand3 = false, payload !== '' ? counData.Section = payload.Section : counData.Section = '' }"
        />
        <DropdownVertical-component
          :options="countyList.Sec5cov"
          :title="'地號'"
          :change-text="clearLand4"
          @DropdownVal="(payload) => { landnoFidList.push(payload.FID), clearLand4 = false, payload !== '' ? counData.Sec5cov = payload.Land_no : counData.Sec5cov = '' }"
        />
        <div class="bt_wrap underline">
          <Buttons-component
            :name="'button-default'"
            :text="'清除全部'"
            @click="clearLandHandler"
          />
          <Buttons-component
            :text="'加入'"
            @click="addLandItem"
          />
        </div>
        <div
          v-if="landItemList.length >= 1"
          class="land_wrap theme_scrollbar"
        >
          <div
            v-for="(item, index) in landItemList"
            :key="item.id"
            class="land_item"
            :class="{ 'deep_bg': item.checked === true }"
            @click="drawLandHandler($event, item, index)"
          >
            {{ item.title }}
          </div>
        </div>
        <div
          v-if="landItemList.length < 1"
          class="no_file"
        >
          <img :src="require('~/assets/img/no-file.svg')">
          <p>尚未加入地號</p>
        </div>
      </div>

      <div v-if="posOptions.current === 2">
        <SwitchTabs-component
          :selected="twdOptions.current"
          :type-list="twdOptions.typeList"
          @current="payload => twdOptions.current = payload"
        />
        <div
          v-if="twdOptions.current === 0"
        >
          <div class="input_block">
            <InputTool-component
              v-model="locate.twdX"
              :input-text="'TWD97-X(ex:304253)'"
              :alter-coor="locate.twdX"
              @inputValue="payload => locate.twdX = payload.val"
            />
            <InputTool-component
              v-model="locate.twdY"
              :input-text="'TWD97-Y(ex:2761400)'"
              :alter-coor="locate.twdY"
              @inputValue="payload => locate.twdY = payload.val"
            />
          </div>
          <div class="bt_wrap underline">
            <Buttons-component
              :name="'button-default'"
              :text="'清除全部'"
              @click="clearAllHandler"
            />
            <Buttons-component
              :text="'定位'"
              @click="getPositionTwd"
            />
          </div>
          <div class="coor_block">
            <div class="tblock">
              WGS84
            </div>
            <div v-if="transCoor.wgsX !== ''">
              {{ transCoor.wgsX }},{{ transCoor.wgsY }}
            </div>
          </div>
        </div>

        <div
          v-if="twdOptions.current === 1"
        >
          <div class="input_block">
            <InputTool-component
              v-model="locate.wgsX"
              :input-text="'WGS84-經度(ex:121.5373)'"
              :alter-coor="locate.wgsX"
              @inputValue="payload => locate.wgsX = payload.val"
            />
            <InputTool-component
              v-model="locate.wgsY"
              :input-text="'WGS84-緯度(ex:24.9595)'"
              :alter-coor="locate.wgsY"
              @inputValue="payload => locate.wgsY = payload.val"
            />
          </div>
          <div class="bt_wrap underline">
            <Buttons-component
              :name="'button-default'"
              :text="'清除全部'"
              @click="clearAllHandler"
            />
            <Buttons-component
              :text="'定位'"
              @click="getPositionWgs"
            />
          </div>
          <div class="coor_block">
            <div class="tblock">
              TWD97
            </div>
            <div v-if="transCoor.twdX !== ''">
              {{ transCoor.twdX }},{{ transCoor.twdY }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import Buttons from '~/components/tools/Buttons.vue';
import SwitchTabs from '~/components/tools/SwitchTabs.vue';
import InputTool from '~/components/tools/InputTool.vue';
import Dropdown from '~/components/tools/Dropdown.vue';

export default {
  components: {
    'NavTabs-component': NavTabs,
    'DropdownVertical-component': DropdownVertical,
    'Buttons-component': Buttons,
    'SwitchTabs-component': SwitchTabs,
    'InputTool-component': InputTool,
    'Dropdown-component': Dropdown
  },
  props: {
    iaList: {
      type: Array
    }
  },
  data () {
    return {
      // * 坐標定位
      drawPoint: '',
      transCoor: {
        twdX: '',
        twdY: '',
        wgsX: '',
        wgsY: ''
      },
      locate: {
        twdX: '',
        twdY: '',
        wgsX: '',
        wgsY: ''
      },
      posOptions: {
        current: 0,
        typeList: [
          {
            name: '灌溉分區',
            id: 0
          },
          {
            name: '地籍',
            id: 1
          },
          {
            name: '坐標',
            id: 2
          }
        ]
      },
      twdOptions: {
        current: 0,
        typeList: [
          {
            name: 'TWD97',
            id: 0
          },
          {
            name: 'WGS84',
            id: 1
          }
        ]
      },
      // * 灌溉定位
      allDropList: {
        Ia: [],
        Mng: [],
        Stn: [],
        Grp: []
      },
      clearCanals1: false,
      clearCanals2: false,
      clearCanals3: false,
      clearCanals4: false,
      geoGraphic: '',
      grpPosition: '',
      // * 地籍定位
      countyList: {
        County: [],
        Town: [],
        Section: [],
        Sec5cov: []
      },
      myCountyId: '',
      landnoFidList: [],
      countyIdList: [],
      myLandGraphic: '',
      clearLand1: false,
      clearLand2: false,
      clearLand3: false,
      clearLand4: false,
      // * 地籍定位 : 各欄位的值
      counData: {
        County: '',
        Town: '',
        Section: '',
        Sec5cov: ''
      },
      // * 地籍定位 : 地號陣列
      landItemList: [],
      // * 地籍定位 : graphic圖形陣列
      allLandGraphic: [],
      allMetry: [],
      userId: '',
      cData: ''

    };
  },
  mounted () {
    // * 坐標系統
    proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
    proj4.defs('EPSG:3826', '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
    proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');

    this.userId = sessionStorage.getItem('loginUser');
    this.allDropList.Ia = this.iaList;

    this.getCountyData();
    // this.getIaList();
  },
  methods: {
    // * @ 坐標定位 : 清除全部
    clearAllHandler () {
      this.locate.twdX = '';
      this.locate.twdY = '';
      this.locate.wgsX = '';
      this.locate.wgsY = '';
      this.transCoor.wgsX = '';
      this.transCoor.wgsY = '';
      this.transCoor.twdX = '';
      this.transCoor.twdY = '';
      pMapBase.drawingGraphicsLayer.remove(this.drawPoint);
    },
    // * @ 坐標定位 : TWD97定位
    getPositionTwd () {
      this.locate.wgsX = '';
      this.locate.wgsY = '';
      this.transCoor.twdX = '';
      this.transCoor.twdY = '';
      pMapBase.drawingGraphicsLayer.remove(this.drawPoint);

      // const EPSG3857 = new proj4.Proj('EPSG:3857'); // 預設坐標
      const EPSG3826 = new proj4.Proj('EPSG:3826'); // TWD97
      const EPSG4326 = new proj4.Proj('EPSG:4326'); // WGS84
      // TWD97轉3857
      // const cData = proj4(EPSG3826, EPSG3857, [this.locate.twdX, this.locate.twdY]);
      const cData = SpatialReference.CoordinateTransform(EPSG.CreateSpatialReference(3826), EPSG.CreateSpatialReference(3857), null, { X: this.locate.twdX, Y: this.locate.twdY });

      // 定位
      pMapBase.ZoomMapTo(new sg.geometry.Point(cData.X, cData.Y));
      ZoomOut();
      pMapBase.getTransformation().FitLevel();
      pMapBase.RefreshMap(true);
      // 畫點
      this.drawPoint = sg.Graphic.createFromGeometry(new sg.geometry.Point(cData.X, cData.Y), { markerstyle: sg.symbols.SimpleMarkerSymbol.STYLE_CIRCLE, markersize: 30, markercolor: new sg.Color(25, 112, 93, 1), borderwidth: 0 });
      pMapBase.drawingGraphicsLayer.add(this.drawPoint);

      // 轉WGS84
      const tData = proj4(EPSG3826, EPSG4326, [this.locate.twdX, this.locate.twdY]);
      this.transCoor.wgsX = tData[0].toFixed(4);
      this.transCoor.wgsY = tData[1].toFixed(4);
    },
    // * @ 坐標定位 : WGS84定位
    getPositionWgs () {
      this.locate.twdX = '';
      this.locate.twdY = '';
      this.transCoor.wgsX = '';
      this.transCoor.wgsY = '';
      pMapBase.drawingGraphicsLayer.remove(this.drawPoint);

      // const EPSG3857 = new proj4.Proj('EPSG:3857'); // 預設坐標
      const EPSG4326 = new proj4.Proj('EPSG:4326'); // WGS84
      const EPSG3826 = new proj4.Proj('EPSG:3826'); // TWD97
      // WGS84轉3857
      // const cData = proj4(EPSG4326, EPSG3857, [this.locate.wgsX, this.locate.wgsY]);
      const cData = SpatialReference.CoordinateTransform(EPSG.CreateSpatialReference(4326), EPSG.CreateSpatialReference(3857), null, { X: this.locate.wgsX, Y: this.locate.wgsY });
      // 定位
      pMapBase.ZoomMapTo(new sg.geometry.Point(cData.X, cData.Y));
      ZoomOut();
      pMapBase.getTransformation().FitLevel();
      pMapBase.RefreshMap(true);
      // 畫點
      this.drawPoint = sg.Graphic.createFromGeometry(new sg.geometry.Point(cData.X, cData.Y), { markerstyle: sg.symbols.SimpleMarkerSymbol.STYLE_CIRCLE, markersize: 30, markercolor: new sg.Color(25, 112, 93, 1), borderwidth: 0 });
      pMapBase.drawingGraphicsLayer.add(this.drawPoint);

      // 轉TWD97
      const tData = proj4(EPSG4326, EPSG3826, [this.locate.wgsX, this.locate.wgsY]);
      this.transCoor.twdX = tData[0].toFixed(2);
      this.transCoor.twdY = tData[1].toFixed(2);
    },
    // * @ 地籍定位 : 取得縣市資料
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
        data.forEach((item) => {
          item.value = item.FID;
          item.title = item.COUNTYNAME;
        });
        this.countyList.County = data;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 地籍定位 : 取得鄉鎮市區 地段 資料
    nextCountHandler (payload, nextType) {
      if (payload === '') { return; }

      let myObj = {};
      if (nextType === 'Town') {
        myObj = { COUNTYID: payload.COUNTYID };
        this.myCountyId = payload.COUNTYID;
      }
      if (nextType === 'Section') {
        myObj = { CountyID: payload.COUNTYID, TownID: payload.TOWNID };
      }
      if (nextType === 'Sec5cov') {
        myObj = { CountyID: this.myCountyId };
      }

      let url = '';
      if (nextType !== 'Sec5cov') {
        url = `/AERC/rest/${nextType}`;
      } else {
        url = '/AERC/rest/Sec5cov?pageCnt=1&pageRows=5';
      }

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(myObj)
      }).then((response) => {
        if (response.status === 403) {
          this.countyList[nextType] = [{ title: '不拘', value: 'none' }];

          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);

        jsonData.forEach((item) => {
          item.value = item.FID;
          if (nextType === 'Town') { item.title = item.TOWNNAME; }
          if (nextType === 'Section') { item.title = `${item.Section}${item.Sec_cns}`; }
          // if (nextType === 'Sec5cov') { item.title = item.Land_no; }
        });

        if (nextType === 'Sec5cov') {
          const newData = jsonData[0].data;
          newData.forEach((item) => {
            item.title = item.Land_no;
          });

          this.countyList.Sec5cov = newData;
        }

        if (nextType !== 'Sec5cov') {
          this.countyList[nextType] = jsonData;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 地籍定位 : 取得地號清單
    getLandnoList (payload) {
      if (payload === '') { return; }

      fetch(`/aerc/rest/Sec5nos?CountyID=${this.myCountyId}&Section=${payload.Section}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);

        jsonData.forEach((item) => {
          item.title = item.Land_no;
          item.value = item.FID;
        });
        this.countyList.Sec5cov = jsonData;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 地籍定位 : 點選各dropdown的其中一筆 繪製圖形+定位過去
    positionCtrl (payload, myType) {
      if (payload === '') { return; }

      let myObj = {};
      if (myType === 'County') {
        myObj = { FID: payload.FID };
      }
      if (myType === 'Town') {
        myObj = { CountyID: payload.COUNTYID, FID: payload.FID };
      }
      if (myType === 'Section') {
        myObj = { CountyID: payload.City_no, TownID: payload.Town_no, FID: payload.FID };
      }

      fetch(`/AERC/rest/${myType}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(myObj)
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);

        // 先清除之前的
        pMapBase.drawingGraphicsLayer.remove(this.myLandGraphic);
        // 畫圖
        let geometry = '';
        if (myType === 'County' || myType === 'Town') {
          geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].GEOMETRY);
        } else {
          geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
        }

        this.myLandGraphic = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) });
        pMapBase.drawingGraphicsLayer.add(this.myLandGraphic);
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
    // * @ 地籍定位 : 按下加入 加入地號清單
    addLandItem () {
      const result = {
        id: Math.random(),
        title: `${this.counData.County} ${this.counData.Town} ${this.counData.Section} ${this.counData.Sec5cov}`,
        checked: false, // 選取變色
        fid: this.landnoFidList[this.landnoFidList.length - 1],
        countyId: this.countyIdList[this.countyIdList.length - 1]
      };
      this.landItemList.push(result);

      // 按下加入 就定位畫圖至那個圖形
      const index = this.landItemList.length - 1;
      fetch(`/AERC/rest/Sec5ByFID?CountyID=${result.countyId}&FID=${result.fid}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);

        // 先清除之前的
        pMapBase.drawingGraphicsLayer.remove(this.myLandGraphic);
        // 畫圖
        const geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
        this.allLandGraphic[index] = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5), text: this.counData.Sec5cov });
        pMapBase.drawingGraphicsLayer.add(this.allLandGraphic[index]);

        this.allMetry.push(geometry);
        // 定位至最大範圍
        const extent = sg.geometry.Extent.unionall(this.allMetry.map(function (geom) { return geom.extent; }));
        pMapBase.ZoomMapTo(extent);
        ZoomOut();
        pMapBase.getTransformation().FitLevel();
        pMapBase.RefreshMap(true);

        //
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 地籍定位 : 點擊清單中某筆 畫圖+定位過去
    drawLandHandler (e, landItem, index) {
      console.log(e);
      console.log(landItem);

      if (landItem.checked === true) { return; }

      // 沒按shift -> 單選
      if (e.shiftKey === false) {
        this.landItemList.forEach((item) => {
          item.checked = false;
        });
        landItem.checked = true;

        fetch(`/AERC/rest/Sec5ByFID?CountyID=${landItem.countyId}&FID=${landItem.fid}`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then((response) => {
          return response.json();
        }).then((jsonData) => {
          console.log(jsonData);

          // 先清除之前的
          // this.allMetry = [];
          // this.allLandGraphic.forEach((item) => {
          //   pMapBase.drawingGraphicsLayer.remove(item);
          // });
          // pMapBase.drawingGraphicsLayer.remove(this.myLandGraphic);

          // 畫圖
          const geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
          // this.allLandGraphic[index] = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) });
          // pMapBase.drawingGraphicsLayer.add(this.allLandGraphic[index]);

          // this.allMetry.push(geometry);
          // 定位
          const extent = geometry.extent;
          pMapBase.ZoomMapTo(extent);
          ZoomOut();
          pMapBase.getTransformation().FitLevel();
          pMapBase.RefreshMap(true);
        }).catch((err) => {
          console.log(err);
        });
      }

      // 按shift -> 多選
      if (e.shiftKey === true) {
        landItem.checked = true;

        fetch(`/AERC/rest/Sec5ByFID?CountyID=${landItem.countyId}&FID=${landItem.fid}`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then((response) => {
          return response.json();
        }).then((jsonData) => {
          console.log(jsonData);

          pMapBase.drawingGraphicsLayer.remove(this.myLandGraphic);
          // 畫圖
          // const geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
          // this.allLandGraphic[index] = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) });
          // pMapBase.drawingGraphicsLayer.add(this.allLandGraphic[index]);

          // this.allMetry.push(geometry);

          // 定位至最大範圍
          const extent = sg.geometry.Extent.unionall(this.allMetry.map(function (geom) { return geom.extent; }));
          pMapBase.ZoomMapTo(extent);
          ZoomOut();
          pMapBase.getTransformation().FitLevel();
          pMapBase.RefreshMap(true);

          console.log(extent);
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    // * @ 地籍定位 : 清除全部
    clearLandHandler () {
      this.clearLand1 = true;
      this.clearLand2 = true;
      this.clearLand3 = true;
      this.clearLand4 = true;
      this.countyList.Town = [];
      this.countyList.Section = [];
      this.countyList.Sec5cov = [];

      this.counData.County = '';
      this.counData.Town = '';
      this.counData.Section = '';
      this.counData.Sec5cov = '';

      this.countyIdList = [];
      this.landnoFidList = [];
      this.landItemList = [];

      pMapBase.drawingGraphicsLayer.remove(this.myLandGraphic);
      this.allLandGraphic.forEach((item) => {
        pMapBase.drawingGraphicsLayer.remove(item);
      });

      this.myLandGraphic = '';
      this.allLandGraphic = [];
      this.allMetry = [];
    },
    // * @ 灌溉定位 : 清除全部
    clearCanalHandler () {
      this.clearCanals1 = true;
      this.clearCanals2 = true;
      this.clearCanals3 = true;
      this.clearCanals4 = true;
      this.allDropList.Grp = [];
      // this.allDropList.Ia = [];
      this.allDropList.Mng = [];
      this.allDropList.Stn = [];
      pMapBase.drawingGraphicsLayer.remove(this.geoGraphic);
    },
    // * @ 灌溉定位 : 取得管理處資料
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
        console.log(data);

        data.forEach((item) => {
          item.value = item.FID;
          item.title = item.Ia_cns;
        });
        this.allDropList.Ia = data;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 灌溉定位 : 點擊選單 抓出下一排選項的所有清單
    nextListHandler (payload, nextType) {
      if (payload === '') { return; }

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
          this.allDropList[nextType] = [{ title: '不拘', value: 'none' }];
          if (nextType === 'Mng') {
            this.allDropList[nextType] = [{ title: '不拘', value: 'none', Mng: 0, Ia: payload.Ia }];
          }
          if (nextType === 'Stn') {
            this.allDropList[nextType] = [{ title: '不拘', value: 'none', Stn: 0 }];
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
        this.allDropList[nextType] = jsonData;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * @ 灌溉定位: 點選各dropdown中的其中一筆 繪製圖形+定位過去
    selectHandler (payload, myType) {
      if (payload.value === 'none') { return; }
      if (payload === '') { return; }

      let myObj = {};

      if (myType === 'Ia') {
        myObj = { Ia: payload.Ia, FID: payload.FID };
      }
      if (myType === 'Mng') {
        myObj = { Ia: payload.Ia, FID: payload.FID };
      }
      if (myType === 'Stn') {
        myObj = { Ia: payload.Ia, Mng: payload.Mng, FID: payload.FID };
      }
      if (myType === 'Grp') {
        myObj = { Ia: payload.Ia, Mng: payload.Mng, Stn: payload.Stn, FID: payload.FID };
      }

      let url = '';
      if (myType === 'Ia') {
        url = `/AERC/rest/${myType}/${this.userId}`;
      } else {
        url = `/AERC/rest/${myType}`;
      }

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(myObj)
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData[0].geometry);
        // 先清除之前的
        pMapBase.drawingGraphicsLayer.remove(this.geoGraphic);
        // 畫圖
        const geometry = sg.geometry.Geometry.fromGeoJson(jsonData[0].geometry);
        this.geoGraphic = sg.Graphic.createFromGeometry(geometry, { borderwidth: 1, fillcolor: new sg.Color(220, 105, 105, 0.5) });
        pMapBase.drawingGraphicsLayer.add(this.geoGraphic);
        // 定位
        const extent = geometry.extent;
        pMapBase.ZoomMapTo(extent);
        ZoomOut();
        pMapBase.getTransformation().FitLevel();
        pMapBase.RefreshMap(true);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>

  .sptitle {
    font-weight: bold;
  }

  .land_wrap{
    // max-height: 90px;
    max-height: 156px;
    overflow-y: scroll;
  }

  .land_item{
    padding: 12px 0;
    color: #494949;
    padding-left: 7px;
    cursor: pointer;
    @include noto-sans-tc-16-regular-line16;
  }

  .land_item:nth-child(odd) {
    background-color: #F5F5F5;
  }

  .deep_bg{
    background-color: $active-green !important;
  }

  .pos_wrap {
    width: 350px;
  }

  .pos_content {
    padding: 0 20px;
  }

  .bt_wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    div:nth-child(2) {
      margin-left: 10px;
    }
  }

  .underline {
    padding-bottom: 10px;
    border-bottom: 1px solid #959595;
    margin-bottom: 10px;
  }

  .no_file {
    background-color: #EFF4F3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #3E9F88;
    // padding: 4px 0;
    padding: 22px 0;
    @include noto-sans-tc-16-regular;
  }

  .input_block {
    height: 82px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 7px;
  }

  .tblock {
    border-right: 1px solid #959595;
    width: 72px;
    margin-right: 10px;
    @include noto-sans-tc-18-medium;
  }

  .coor_block {
    display: flex;
    @include noto-sans-tc-18-medium;
  }

</style>
