<template>
  <div class="mainArea">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/model/Header';
import Footer from '~/components/model/Footer';

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>

 .mainArea {
   height: 100vh;
 }

</style>
