<template>
  <div class="loginArea">
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/model/Footer';

export default {
  components: {
    Footer
  },
  middleware: 'routerAuth'
};
</script>
<style lang="scss" scoped>
.loginArea{
    min-height: $vh-100;
    background: url('~/assets/img/mainBg.jpg') no-repeat center;
    background-size: cover;
}
</style>
