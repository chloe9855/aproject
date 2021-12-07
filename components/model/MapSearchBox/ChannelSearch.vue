<template>
  <div class="out_wrap">
    <Dropdown-component
      :options="allIaList"
      :placeholders="'請選擇管理處'"
      :change-text="clearText"
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
          :input-text="'0'"
          sizing="w-30"
          @inputValue="(payload) => { range1 = parseInt(payload.val, 10) }"
        />
        ~
        <InputTool-component
          :input-text="'800'"
          sizing="w-30"
          @inputValue="(payload) => { range2 = parseInt(payload.val, 10) }"
        />
      </div>
      <div class="theme_checkbox box_margin">
        <input
          id="check2"
          type="checkbox"
        >
        <label
          for="check2"
        >
          使用環域(公尺 : 最大200公尺)
        </label>
      </div>
      <div class="wrap2">
        <InputTool-component
          :input-text="'地籍資料'"
          sizing="w-70"
        />
        <InputTool-component
          :input-text="'10'"
          sizing="w-25"
        />
      </div>
      <div class="bt_wrap">
        <Buttons-component
          :name="'button-default'"
          :text="'清除全部'"
          @click="$emit('clear')"
        />
        &emsp;
        <Buttons-component
          :name="'button-primary'"
          :text="'查詢'"
          @click="searchHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import InputTool from '~/components/tools/InputTool.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'InputTool-component': InputTool,
    'Buttons-component': Buttons
  },
  props: {
    // 管理處下拉選單
    allIaList: {
      type: Array
    }
  },
  data () {
    return {
      allCanalList: [],
      canalList: [],
      clearText: false,
      clearText2: false,
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
      iconEnd: ''
    };
  },
  name: 'ChannelSearch',
  mounted () {
    //

    allMBT.forEach((item) => {
      sg.events.on(item, 'click', (e) => {
        if (e.graphic.id[0].substring(3) === 'Canal' && e.graphic.attributes.Ia === this.nowIa) {
          console.log(e);

          this.addCanalText = e.graphic.attributes.Sys_cns;
          this.nowFid = parseInt(e.graphic.id[2], 10);
          // 渠道總長
          this.canalLength = e.graphic.attributes.Length;
        }
      });
    });
  },
  methods: {
    // * 取得該管理處的所有渠道
    getCanalLists (payload) {
      this.clearText = false;
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
          this.countyList[nextType] = [{ title: '不拘', value: 'none' }];
          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
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

      const myItem = this.allCanalList.filter(item => item.Sys_cns === payload.val);
      if (myItem.length < 1) {
        return;
      }

      this.canalLength = myItem[0].Length;
      this.nowFid = myItem[0].FID;
    },
    // * 查詢
    searchHandler () {
      // this.$emit('channelSearch', 'CHANNEL');

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

        const extent = new sg.geometry.Extent();
        extent.xmax = xMax;
        extent.xmin = xMin;
        extent.ymax = yMax;
        extent.ymin = yMin;
        pMapBase.ZoomMapTo(extent);
        pMapBase.RefreshMap(true);

        // 畫icon
        const start = geometry.getPoint(0);
        const end = geometry.getPoint(this.canalLength);

        this.icon1 = sg.Graphic.createFromGeometry(new sg.geometry.Point(point1.x, point1.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 50, markercolor: new sg.Color(25, 112, 93, 1), text: `0K+${this.range1}`, textsize: 20 });

        this.icon2 = sg.Graphic.createFromGeometry(new sg.geometry.Point(point2.x, point2.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 50, markercolor: new sg.Color(25, 112, 93, 1), text: `0K+${this.range2}`, textsize: 20 });

        this.iconStart = sg.Graphic.createFromGeometry(new sg.geometry.Point(start.x, start.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 50, markercolor: new sg.Color(25, 112, 93, 1), text: '起始點', textsize: 20 });

        this.iconEnd = sg.Graphic.createFromGeometry(new sg.geometry.Point(end.x, end.y), { markerurl: require('~/assets/img/marker-big.svg'), markersize: 50, markercolor: new sg.Color(25, 112, 93, 1), text: '結束點', textsize: 20 });

        pMapBase.drawingGraphicsLayer.add(this.icon1);
        pMapBase.drawingGraphicsLayer.add(this.icon2);
        pMapBase.drawingGraphicsLayer.add(this.iconStart);
        pMapBase.drawingGraphicsLayer.add(this.iconEnd);

        //
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>

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
