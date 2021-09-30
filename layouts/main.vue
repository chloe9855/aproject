<template>
  <div class="mainArea">
    <Header />
    <nuxt />
    <Popup
      :is-active="togglePopup"
      title="編輯帳號"
      type="editAccount"
    />
    <MaskTool :is-active="togglePopup" />
    <Footer :set-position="true" />
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
    }
  }
};
</script>
<style lang="scss" scoped>
.mainArea{
    min-height: $vh-100;
    background: url('~/assets/img/mainBg.jpg') no-repeat center;
    background-size: cover;
}
</style>
