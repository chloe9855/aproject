<template>
  <div
    class="barChart"
    :class="[barColor,barWidth]"
    :style="`width: ${getbarLength};`"
  />
</template>

<script>
export default {
  props: {
    setbarLength: {
      type: Number,
      default: 0
    },
    setbarColor: {
      type: String,
      default: 'green'
    },
    setbarWidth: {
      type: String,
      default: 'bold'
    }
  },
  name: 'Fragment',
  computed: {
    barLength () {
      return 'w-' + this.setbarLength;
    },
    barColor () {
      return this.setbarColor + 'Bar';
    },
    barWidth () {
      return this.setbarWidth + 'Bar';
    },
    getbarLength () {
      return this.setbarLength >= 1 ? `${this.setbarLength}%` : `${this.setbarLength}px`;
    }
  }
};
</script>

<style lang="scss" scoped>
.barChart{
    border-radius: 2px;
    &.boldBar{
        height:24px;
    }
    &.thinBar{
        height:14px;
    }
}
.greenBar{background-color: $main-green}
.blueBar{background-color: #5CA6BD}
.redBar{background-color: #E06C6C}
.orangeBar{background-color: #EAB565}
.lightGreenBar{background-color: #79DBC9}

</style>
