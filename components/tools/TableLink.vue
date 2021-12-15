<template>
  <div>
    <p
      v-for="(item,index) in link.data"
      :key="index"
    >
      <a
        :href="link.url[index]"
        target="_blank"
      >
        {{ item }}
      </a>
    </p>
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

  a {
    text-decoration: underline;
    color: #3e9f88;
    font-weight: bold;
  }

</style>
