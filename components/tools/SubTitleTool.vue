<template>
  <div class="subTitleTool">
    <h3>
      {{ title }}
    </h3>
    <Buttons
      v-show="isBtn"
      :name="'button-add'"
      :text="btnText"
      :add="true"
    />
  </div>
</template>

<script>
import Buttons from '~/components/tools/Buttons.vue';
export default {
  components: {
    Buttons
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {};
  },
  name: 'SubTitleTool',
  computed: {
    isBtn () {
      const btnText = this.btnText;
      if (btnText !== '') {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.subTitleTool{
  display: flex;
  justify-content: space-between;
  h3{
    color:$dark-green;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    display: flex;
    align-items: center;
  }
}
</style>
