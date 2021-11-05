<template>
  <div
    class="mainArea"
    @mouseover="listenEventLogout"
    @mouseout="listenEventLogout"
    @click="listenEventLogout"
  >
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
import { logout } from '~/api/login';
export default {
  components: {
    Header,
    Footer,
    Popup,
    MaskTool
  },
  data: () => {
    return {
      setMin: 0
    };
  },
  middleware: 'routerAuth',
  mounted () {
    console.log(this.$store.state.userInfo);
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
        if (this.setMin <= 1200000) {
          this.countDownLogout();
          // console.log(this.setMin);
        } else {
          logout().then((r) => {
            this.$router.push('/login');
          }).catch((e) => {
            console.log(e);
          });
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
