<template>
  <div>
    <img
      :src="imgSrc"
      class="mystyle"
    >
  </div>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      imgSrc: ''
    };
  },
  mounted () {
    this.getLocalStorage();
  },
  methods: {
    // * 監測是否有localStorage傳來 有->接值進行繪圖
    getLocalStorage () {
      if (localStorage.getItem('picData') !== null) {
        this.imgSrc = localStorage.getItem('picData');

        // 清空localStorage
        // localStorage.clear();
      }
    }
  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>

  .mystyle {
    width: 97%;
  }

</style>
