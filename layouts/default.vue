<template>
  <div
    class="mainArea"
    @mouseover="listenEventLogout"
    @mouseout="listenEventLogout"
    @click="listenEventLogout"
  >
    <Header />
    <nuxt />
    <Footer />
    <Popup
      :is-active="togglePopup"
      :type="popupType"
    />
    <MaskTool :is-active="togglePopup" />
    <MaskTool :is-active="isLoading" />
    <Loading :is-active="isLoading" />
  </div>
</template>

<script>
import Header from '~/components/model/Header';
import Footer from '~/components/model/Footer';
import Popup from '~/components/model/Popup.vue';
import MaskTool from '~/components/tools/Mask.vue';
import Loading from '~/components/tools/Loading.vue';
import { getLogout } from '~/publish/getLogout';

export default {
  components: {
    Header,
    Footer,
    Popup,
    MaskTool,
    Loading
  },
  data () {
    return {
      onPopup: false,
      setMin: 0
    };
  },
  middleware: 'routerAuth',
  mounted () {
    this.countDownLogout();
  },
  methods: {
    listenEventLogout (e) {
      this.$store.commit('SET_LOUOUT_COUNTDOWN', { min: 0 });
      this.setMin = 0;
    },
    countDownLogout () {
      setTimeout(() => {
        this.setMin += 1000;
        this.$store.commit('SET_LOUOUT_COUNTDOWN', { min: this.setMin });
        if (this.$store.state.mouseEventMin <= 1199000) {
          this.countDownLogout();
        } else {
          this.setMin = 0;
          getLogout(this);
        }
      }, 1000);
    }
  },
  computed: {
    togglePopup () {
      return this.$store.state.popupState;
    },
    popupType () {
      return this.$store.state.popupType;
    },
    isLoading () {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style lang="scss" scoped>

 .mainArea {
   min-height: 100vh;
   position: relative;
 }
 .loadingImg{
   width: 100px;
   height: 100px;
   position: absolute;
   top: calc( 50vh - 50px );
   left: calc( 50vw - 50px);
 }

</style>
