<template>
  <div style="display: inline-block;">
    <div class="marker_wrap">
      <span class="mytext">{{ spanText }}</span>
      <img :src="imgLocate">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgLocate: require('~/assets/img/marker-big.svg'),
      imgDot: require('~/assets/img/marker-dot.svg'),
      spanText: '60K+000'
    };
  }
};
</script>

<style lang="scss" scoped>

  .mytext {
    background-color: $linen;
    border-radius: 2px;
    padding: 0 1px;
    display: flex;
    align-items: flex-start;
    border: 1px solid $caution-red;
    color: $word-black;
    text-align: center;
    margin-bottom: 3px;
    @include noto-sans-tc-16-bold;
  }

</style>
