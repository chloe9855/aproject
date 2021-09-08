<template>
  <div>
    <client-only>
      <vue-slider
        v-model="value"
        v-bind="options"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 50,
      options: {
        dotSize: 14,
        width: '74px',
        height: 7,
        min: 0,
        max: 100,
        interval: 10,
        processStyle: {
          backgroundColor: '#3E9F88'
        },
        tooltip: 'none'
      }
    };
  }
};
</script>

<style lang="scss" scoped>

  .vue-slider-process {
    background-color: #3E9F88;
  }

</style>
