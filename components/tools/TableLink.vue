<template>
  <span>
    <nuxt-link
      v-for="{item,index} in link"
      :key="index"
      :to="item"
    >
      連結{{ index }}
    </nuxt-link>
  </span>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      value: {}
    }
  },
  data () {
    return {
      // current: 0
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
