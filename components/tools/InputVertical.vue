<template>
  <div
    class="input-box"
    :class="sizing"
  >
    <div class="input-title-box">
      <p class="input-title">
        {{ title }}
      </p>
      <div
        v-show="isError"
        class="error-hinit"
      >
        <div class="error-circle">
          <img
            alt=""
            class="vector"
            src="https://static.overlay-tech.com/assets/83d47edd-b635-4a52-94a4-e0b98b92f97e.svg"
          >
        </div>
        <p class="error-hint-text">
          {{ errorTip }}
        </p>
      </div>
    </div>
    <input
      v-model="message"
      class="inputType"
      :class="{inputError:isError,isIcon:isAddIcon}"
      :placeholder="inputText"
      :name="name"
      :type="inputType"
      :disabled="isDisable === true"
    >
    <img
      v-show="isAddIcon"
      :src="iconImg"
      class="input-icon"
    >
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
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    sizing: {
      type: String,
      default: 'w-100'
    },
    isIcon: {
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
  name: 'InputVertical',
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
    },
    iconImg () {
      const icon = this.isIcon;
      if (icon !== '') {
        return require(`~/assets/img/${icon}.svg`);
      } else {
        return null;
      }
    },
    isAddIcon () {
      const icon = this.isIcon;
      if (icon !== '') {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    message (n, o) {
      this.$emit('inputValue', n);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.input-title-box {
  margin-bottom: 2px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-self: stretch;
}
.input-title {
  color: $header-black;
  flex: 1;
  margin-right: 2px;
  @include noto-sans-tc-16-medium;
}
.error-hinit {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.inputType{
  &.isIcon{
    padding-left: 28px !important;
  }
}
.input-icon{
  top: 35px !important;
}

</style>
