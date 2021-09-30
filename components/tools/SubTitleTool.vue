<template>
  <div class="subTitleTool">
    <h3 :class="{small:isSmall}">
      {{ title }}
    </h3>
    <div>
      <Buttons
        v-show="isBtn"
        :name="btnName"
        :text="btnText"
        :add="btnAdd"
        @click="getBtnStatus"
      />
      <Buttons
        v-show="isSecBtn"
        :name="btnSecName"
        :text="btnSecText"
        :add="btnSecAdd"
        @click="getSecBtnStatus"
      />
    </div>
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
    isSmall: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String,
      default: 'button-add'
    },
    btnText: {
      type: String,
      default: ''
    },
    btnAdd: {
      type: Boolean,
      default: false
    },
    btnSecName: {
      type: String,
      default: 'button-add'
    },
    btnSecText: {
      type: String,
      default: ''
    },
    btnSecAdd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      btnStatus: false,
      btnSecStatus: false
    };
  },
  name: 'SubTitleTool',
  methods: {
    getBtnStatus (e) {
      this.btnStatus = e;
    },
    getSecBtnStatus (e) {
      this.btnSecStatus = e;
    }
  },
  computed: {
    isBtn () {
      const btnText = this.btnText;
      if (btnText !== '') {
        return true;
      } else {
        return false;
      }
    },
    isSecBtn () {
      const btnText = this.btnSecText;
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
  margin: 1em auto !important;
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
    &.small{
      font-size: 16px;
    }
  }
}
</style>
