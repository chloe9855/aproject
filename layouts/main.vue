<template>
  <div class="mainArea">
    <Header />
    <nuxt />
    <Popup
      :is-active="togglePopup"
      :type="popupType"
    />
    <MaskTool :is-active="togglePopup" />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/model/Header';
import Footer from '~/components/model/Footer';
import Popup from '~/components/model/Popup.vue';
import MaskTool from '~/components/tools/Mask.vue';

export default {
  components: {
    Header,
    Footer,
    Popup,
    MaskTool
  },
  computed: {
    togglePopup () {
      return this.$store.state.popupState;
    },
    popupType () {
      return this.$store.state.popupType;
    }
  }
};
</script>
<style lang="scss" scoped>
.mainArea{
    min-height: $vh-100;
    background: url('~/assets/img/mainBg.jpg') no-repeat center;
    background-size: cover;
    position: relative;
}
</style>
