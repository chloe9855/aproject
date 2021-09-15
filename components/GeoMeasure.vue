<template>
  <div class="geo_wrap">
    <NavTabs-component
      :type-list="geoOptions.typeList"
      :selected="geoOptions.current"
      @current="payload => geoOptions.current = payload"
    />
    <div class="geo_content">
      <div v-if="geoOptions.current === 0">
        <p class="ptitle">
          請以滑鼠點擊地圖至少兩點，以測量距離，滑鼠雙擊即可結束。
        </p>
        <div class="mea_block">
          <div class="tblock">
            測量距離
          </div>
          <div class="nblock">
            <p>0.00公尺</p>
            <p>0.00公里</p>
          </div>
        </div>
      </div>
      <div v-if="geoOptions.current === 1">
        <p class="ptitle">
          請以滑鼠點擊地圖至少三點，以測量面積，滑鼠雙擊即可結束。
        </p>
        <div class="mea_block">
          <div class="tblock">
            測量面積
          </div>
          <div class="nblock">
            <p>700,132.13平方公尺</p>
            <p>70.01公頃</p>
          </div>
        </div>
      </div>
      <div class="bt_wrap">
        <Buttons-component
          :name="'button-default'"
          :text="'清除全部'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'NavTabs-component': NavTabs,
    'Buttons-component': Buttons
  },
  data () {
    return {
      geoOptions: {
        current: 0,
        typeList: [
          {
            name: '長度測量',
            id: 0
          },
          {
            name: '面積測量',
            id: 1
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>

 .geo_wrap {
   width: 350px;

   .ptitle {
     color: #494949;
     @include noto-sans-tc-16-medium-line19;
   }
 }

 .geo_content {
    padding: 0 20px;
  }

  .mea_block {
    display: flex;
    margin: 10px 0 5px;
    height: 51px;
    @include noto-sans-tc-16-medium-line19;
  }

  .tblock {
    border-right: 1px solid #959595;
    padding-right: 10px;
    margin-right: 10px;
  }

  .nblock{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bt_wrap {
    display: flex;
    justify-content: flex-end;
  }

</style>
