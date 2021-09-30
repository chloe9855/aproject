<template>
  <div class="mainArea">
    <Header />
    <nuxt />
    <Footer />
    <Popup
      :is-active="togglePopup"
      type="editAccount"
    />
    <MaskTool :is-active="togglePopup" />
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
  data () {
    return {
      onPopup: false
    };
  },
  computed: {
    togglePopup () {
      return this.$store.state.popupState;
    }
  }
};
</script>

<style lang="scss" scoped>

 .mainArea {
   min-height: 100vh;
   position: relative;
 }

</style>
