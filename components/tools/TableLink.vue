<template>
  <div>
    <span
      v-for="(item,index) in link.data"
      :key="index"
    >
      <nuxt-link :to="item">連結{{ index }}</nuxt-link>
    </span>
  </div>
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
