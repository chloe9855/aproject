<template>
  <div
    :class="{ 'hide': $store.state.hideFooter === true }"
    class="foot_wrap"
  >
    <footer v-if="$route.name === 'map'">
      <div>
        版權所有：行政院農業委員會農田水利署、系統開發：財團法人農業工程研究中心
      </div>
      <div>
        WGS84：<span id="coorWGS84">0,0</span> &emsp;
        TWD97：<span id="coorTWD97">0,0</span>
      </div>
    </footer>

    <footer v-else>
      <div>
        本系統網站建議以Google Chrome, Edge, Firefox等瀏覽器進行最佳瀏覽使用，不建議使用IE
      </div>
      <div>
        版權所有：行政院農業委員會農田水利署、系統開發：財團法人農業工程研究中心
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    setPosition: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>

  footer {
    background-color: $transparent-gainsboro;
    display: flex;
    justify-content: space-between;
    color: $header-black;
    @include noto-sans-tc-14-regular;

    padding: 0 18px;
  }

  .hide {
    display: none;
  }

  .foot_wrap {
    //position: absolute;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

</style>
