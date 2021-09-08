<template>
  <div class="wrapper">
    <Header-component />
    <div class="main">
      <NavTabs-component />
      <br>
      <br>
      <Feature-component />
      <br>
      <br>
      <SwitchTabs-component />
      <br>
      <br>
      <SliderBar-component />
      <br>
      <br>
      <Marker-component />
      <br>
      <br>
      <AlertBox-component />
      <br>
      <br>
      <Buttons-component />
    </div>
    <Footer-component />
  </div>
</template>

<script>
import Header from '~/components/model/Header';
import Footer from '~/components/model/Footer';
import NavTabs from '~/components/tools/NavTabs.vue';
import Feature from '~/components/Feature.vue';
import SwitchTabs from '~/components/tools/SwitchTabs.vue';
import SliderBar from '~/components/tools/SliderBar.vue';
import Marker from '~/components/tools/Marker.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'Header-component': Header,
    'Footer-component': Footer,
    'NavTabs-component': NavTabs,
    'Feature-component': Feature,
    'SwitchTabs-component': SwitchTabs,
    'SliderBar-component': SliderBar,
    'Marker-component': Marker,
    'AlertBox-component': AlertBox,
    'Buttons-component': Buttons
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
  .main{
    margin: 50px 30px;
    text-align: center;
  }
</style>
