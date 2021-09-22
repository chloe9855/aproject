<template>
  <div class="mainArea">
    <Header />
    <nuxt />
    <FooterMap />
  </div>
</template>

<script>
import Header from '~/components/model/Header';
import FooterMap from '~/components/model/FooterMap';

export default {
  components: {
    Header,
    FooterMap
  }
};
</script>
