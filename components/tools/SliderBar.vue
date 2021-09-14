<template>
  <div class="sliderbar">
    <client-only>
      <vue-slider
        v-model="opacity"
        v-bind="options"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    value: Number
  },
  data () {
    return {
      opacity: 0,
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
  },
  created () {
    this.opacity = this.value;
  },
  watch: {
    opacity (value) {
      this.$emit('update', this.id, value);
    }
  }
};
</script>

<style lang="scss" scoped>

  .vue-slider-process {
    background-color: #3E9F88;
  }

</style>
