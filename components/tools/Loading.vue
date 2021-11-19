<template>
  <div
    v-show="isActive"
    class="loadingBox"
  >
    <img
      alt=""
      class="vector loadingImg"
      :src="require('~/assets/img/loading.svg')"
    >
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
  .loadingBox{
    position: absolute;
    top: calc( 50vh - 50px );
    left: calc( 50vw - 50px );
    .loadingImg{
        width: 100px;
        height: 100px;
    }
  }
</style>
