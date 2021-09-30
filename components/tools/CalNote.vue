<template>
  <div style="display: inline-block;">
    <div class="statistic">
      <div v-if="areaNote === true && dateNote === false">
        <p class="title">
          {{ name }}<br>
          {{ area }}
        </p>
        <p class="statistic-content">
          {{ areaNum }}
        </p>
      </div>
      <div v-if="dateNote === true">
        <p class="title">
          {{ dateTitle }}
        </p>
        <p class="statistic-content">
          {{ date1 }}
        </p>
        <p class="title">
          {{ dateTitle2 }}
        </p>
        <p class="statistic-content">
          {{ date2 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '水利小組'
    },
    area: {
      type: String,
      default: '面積總計㎡'
    },
    areaNum: {
      type: String,
      default: '2,050,000'
    },
    areaNote: {
      type: Boolean,
      default: true
    },
    dateNote: {
      type: Boolean,
      default: false
    },
    dateTitle: {
      type: String,
      default: '停灌事件'
    },
    date1: {
      type: String,
      default: '109年第1期'
    },
    dateTitle2: {
      type: String,
      default: '停灌申請開放時間'
    },
    date2: {
      type: String,
      default: '110/3/10~110/4/10'
    }
  }
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
