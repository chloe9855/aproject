<template>
  <div style="display: inline-block;">
    <div class="container">
      <div class="feature__btn">
        <div class="icon_layer" />
        <span>圖層</span>
      </div>
      <div class="feature__btn">
        <div class="icon_streetview" />
        <span>街景</span>
      </div>
      <div class="feature__btn">
        <div class="icon_location" />
        <span>定位</span>
      </div>
      <div class="feature__btn">
        <div class="icon_measure" />
        <span>測量</span>
      </div>
      <div class="feature__btn">
        <div class="icon_print" />
        <span>截圖</span>
      </div>
      <div class="feature__btn">
        <div class="icon_home" />
        <span>全圖</span>
      </div>
      <div class="feature__btn">
        <div class="icon_zoomin" />
        <span>放大</span>
      </div>
      <div class="feature__btn">
        <div class="icon_zoomout" />
        <span>縮小</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>

  .container {
    background-color: $main-green;
    border-radius: 5px;
    // padding: 5px 0;
    box-shadow: 0 0 14px 0 rgba(137, 137, 137, 0.19);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 58px;
    overflow: hidden;

    .feature__btn {
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-self: stretch;
      cursor: pointer;

      &:hover {
        background-color: $dark-green;
      }

      span {
        color: $white;
        text-align: center;
        margin-top: 3px;
        @include noto-sans-tc-17-medium;
      }

      .icon_layer {
        background: url('~/assets/img/layer-icon.svg') no-repeat center/contain;
        height: 22px;
        width: 26.51px;
        align-items: center;
      }

      .icon_streetview {
        background: url('~/assets/img/streetview.svg') no-repeat center/contain;
        height: 27px;
        width: 26.51px;
        align-items: center;
      }

      .icon_location {
        background: url('~/assets/img/location.svg') no-repeat center/contain;
        height: 22px;
        width: 26.51px;
        align-items: center;
      }

      .icon_measure {
        background: url('~/assets/img/mea-icon.svg') no-repeat center/contain;
        height: 22px;
        width: 26.51px;
        align-items: center;
      }

      .icon_print {
        background: url('~/assets/img/print-screen.svg') no-repeat center/contain;
        height: 22px;
        width: 26.51px;
        align-items: center;
      }

      .icon_zoomin {
        background: url('~/assets/img/zoom-in.svg') no-repeat center/contain;
        height: 22px;
        width: 26.51px;
        align-items: center;
      }

      .icon_home {
        background: url('~/assets/img/home.svg') no-repeat center/contain;
        height: 22px;
        width: 26.51px;
        align-items: center;
      }

      .icon_zoomout {
        background: url('~/assets/img/zoom-out.svg') no-repeat center/contain;
        height: 22px;
        width: 26.51px;
        align-items: center;
      }

    }
  }

  .feature__btn:nth-child(1) {
    padding-top: 10px;
  }

  .feature__btn:nth-child(8) {
    padding-bottom: 6px;
  }

</style>
