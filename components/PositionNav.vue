<template>
  <div class="pos_wrap">
    <NavTabs-component
      :type-list="posOptions.typeList"
      :selected="posOptions.current"
      @current="payload => posOptions.current = payload"
    />
    <div class="pos_content">
      <div v-if="posOptions.current === 0">
        <DropdownVertical-component
          :options="dropListA1"
          :title="'管理處'"
        />
        <DropdownVertical-component
          :options="dropListA1"
          :title="'管理分處'"
          :bg-color="true"
        />
        <DropdownVertical-component
          :options="dropListA1"
          :title="'工作站'"
          :bg-color="true"
        />
        <DropdownVertical-component
          :options="dropListA1"
          :title="'水利小組'"
          :bg-color="true"
        />
        <div class="bt_wrap">
          <Buttons-component
            :name="'button-default'"
            :text="'清除全部'"
          />
          <Buttons-component
            :text="'定位'"
          />
        </div>
      </div>

      <div v-if="posOptions.current === 1">
        <DropdownVertical-component
          :options="dropListA1"
          :title="'縣市'"
        />
        <DropdownVertical-component
          :options="dropListA1"
          :title="'鄉鎮市區'"
          :bg-color="true"
        />
        <DropdownVertical-component
          :options="dropListA1"
          :title="'地段'"
          :bg-color="true"
        />
        <DropdownVertical-component
          :options="dropListA1"
          :title="'地號'"
          :bg-color="true"
        />
        <div class="bt_wrap underline">
          <Buttons-component
            :name="'button-default'"
            :text="'清除全部'"
          />
          <Buttons-component
            :text="'加入'"
          />
        </div>
        <div
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
              :change-text="locate.twdX"
            />
            <InputTool-component
              v-model="locate.twdY"
              :input-text="'TWD97-Y(ex:2761400)'"
              :change-text="locate.twdY"
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
            />
          </div>
          <div class="tblock">
            TWD97
          </div>
        </div>

        <div
          v-if="twdOptions.current === 1"
        >
          <div class="input_block">
            <InputTool-component
              v-model="locate.wgsX"
              :input-text="'WGS84-經度(ex:121.5373)'"
              :change-text="locate.wgsX"
            />
            <InputTool-component
              v-model="locate.wgsY"
              :input-text="'WGS84-緯度(ex:24.9595)'"
              :change-text="locate.wgsY"
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
            />
          </div>
          <div class="tblock">
            WGS84
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

export default {
  components: {
    'NavTabs-component': NavTabs,
    'DropdownVertical-component': DropdownVertical,
    'Buttons-component': Buttons,
    'SwitchTabs-component': SwitchTabs,
    'InputTool-component': InputTool
  },
  data () {
    return {
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
      dropListA1: {
        option: [
          {
            title: '請選擇管理處',
            value: 0
          },
          {
            title: '選項1',
            value: 1
          },
          {
            title: '選項2',
            value: 2
          }
        ]
      }
    };
  },
  mounted () {
    // * 坐標系統
    proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
    proj4.defs('EPSG:3826', '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
    proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');
  },
  methods: {
    clearAllHandler () {
      this.locate.twdX = '';
      this.locate.twdY = '';
      this.locate.wgsX = '';
      this.locate.wgsY = '';
    }
  }
};
</script>

<style lang="scss" scoped>

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
    padding: 4px 0;
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
    @include noto-sans-tc-18-medium;
  }

</style>
