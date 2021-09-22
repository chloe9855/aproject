<template>
  <div
    v-show="isActive"
    class="mask w-100"
  />
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>

.mask {
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
}

</style>
