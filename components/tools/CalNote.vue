<template>
  <div style="display: inline-block;">
    <div class="statistic">
      <p class="title">
        水利小組<br>
        面積總計㎡
      </p>
      <p class="statistic-content">
        2,050,000
      </p>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">

  .statistic {
    background-color: $bg-green;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
      color: $header-black;
      flex: 1;
      align-self: stretch;
      display: flex;
      align-items: center;
      @include noto-sans-tc-16-medium;
    }
    .statistic-content {
      color: $main-green;
      flex: 1;
      align-self: stretch;
      display: flex;
      align-items: center;
      @include noto-sans-tc-24-bold;
    }
  }

</style>
