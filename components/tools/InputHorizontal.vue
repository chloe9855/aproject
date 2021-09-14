<template>
  <div class="input-box">
    <div
      v-show="isError"
      class="error-hinit"
    >
      <div class="error-circle">
        <img
          alt=""
          class="vector"
          src="https://static.overlay-tech.com/assets/865a3600-f89e-4d3d-b02a-cc77fa01eefb.svg"
        >
      </div>
      <p class="error-hint-text">
        {{ errorTip }}
      </p>
    </div>
    <div class="inputtitle-horizontal-error">
      <p class="input-title">
        {{ title }}
      </p>
      <input
        v-model="message"
        class="inputType"
        :class="{inputError:isError}"
        :placeholder="inputText"
        :name="name"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'test'
    },
    title: {
      type: String,
      default: '輸入框標題'
    },
    inputText: {
      type: String,
      default: '輸入文字'
    },
    errorTip: {
      type: String,
      default: '輸入文字格式錯誤'
    },
    isWarn: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      message: '',
      RegExpType: {
        code8: '^.{8}$'
      }
    };
  },
  name: 'InputHorizontal',
  computed: {
    isError: function () {
      const defaultStatus = this.isWarn;
      const regtype = this.RegExpType[defaultStatus];
      const rules = new RegExp(regtype);
      if (defaultStatus === '' || this.message === '' || !regtype) {
        return false;
      } else {
        return !rules.test(this.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.error-hinit {
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.inputtitle-horizontal-error {
  display: flex;
  align-items: center;
  align-self: stretch;
}
.input-title {
  color: $header-black;
  margin-right: 10px;
  @include noto-sans-tc-16-medium;
}
.input-error {
  background-color: $white;
  border-radius: 5px;
  padding: 5px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 1px solid $caution-red;
}
</style>
