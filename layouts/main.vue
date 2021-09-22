<template>
  <div class="mainArea">
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/model/Header';

export default {
  components: {
    Header
  }
};
</script>
<style lang="scss" scoped>
.mainArea{
    min-height: $vh-100;
    background: url('~/assets/img/mainBg.jpg') no-repeat center;
}
</style>
