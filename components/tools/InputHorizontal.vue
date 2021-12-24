<template>
  <div
    class="input-box"
    :class="sizing"
  >
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
      <p
        ref="inputTitle"
        class="input-title"
      >
        {{ title }}
      </p>
      <input
        v-model="message"
        class="inputType"
        :class="[{inputError:isError,isIcon:isAddIcon,verification:isVerification, hasIconRear: !!iconRear}]"
        :placeholder="inputText"
        :name="name"
        :type="passwordAsText ? 'text' : inputType"
        :disabled="isDisable === true"
      >
      <input
        v-show="isSecondInput"
        v-model="secondMessage"
        class="inputType secondInput"
        :class="[{inputError:isError,isIcon:isAddIcon,verification:isVerification}]"
        :placeholder="inputText"
        :name="name"
        :type="inputType"
        :disabled="isDisable === true"
      >
      <img
        v-show="isAddIcon"
        :src="iconImg"
        class="input-icon"
        :style="{ left : titleLength }"
      >
      <img
        v-show="isAddIcon && inputType === 'password'"
        :src="iconEye"
        class="input-icon input-eye"
        @click="toggleEye"
      >
      <button
        v-show="!!iconRear"
        type="button"
        class="input-icon-rear"
        @click="passwordAsText = !passwordAsText"
      >
        <img
          :src="iconRear"
          :alt="passwordAsText ? '不顯示密碼' : '顯示密碼'"
        >
      </button>
      <div
        v-show="filterBox"
        class="filterBox horizontal"
      >
        <ul>
          <li
            v-for="(item, index) in filterList"
            :key="index"
            @click="selectFilter(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import eyesFilled from '~/assets/img/ant-design_eye-filled.png';
import eyesInvisibleFilled from '~/assets/img/ant-design_eye-invisible-filled.png';

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
    changeText: {
      type: String,
      default: ''
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
    isVerification: {
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
    },
    isSecondInput: {
      type: Boolean,
      default: false
    },
    searchInput: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: () => {
    return {
      message: '',
      secondMessage: '',
      titleLength: '80px',
      RegExpType: {
        code8: '^.{8}$',
        userId: '^[A-Z]{1}.[0-9]{8}'
      },
      filterBox: false,
      filterList: [],
      isCloseFilter: false,
      passwordAsText: false
    };
  },
  name: 'InputHorizontal',
  mounted: function () {
    this.titleLength = (this.$refs.inputTitle.clientWidth + 30) + 'px';
  },
  methods: {
    selectFilter (item) {
      this.message = item;
      this.filterBox = false;
      this.isCloseFilter = true;
    },
    toggleEye () {
      this.eyeStatus = !this.eyeStatus;
    }
  },
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
    setInputType () {
      if (!this.eyeStatus) {
        return this.inputType;
      } else {
        return 'text';
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
    iconEye () {
      if (!this.eyeStatus) {
        return require('~/assets/img/ant-design_eye-filled.png');
      } else {
        return require('~/assets/img/ant-design_eye-invisible-filled.png');
      }
    },
    isAddIcon () {
      const icon = this.isIcon;
      if (icon !== '') {
        return true;
      } else {
        return false;
      }
    },
    iconRear () {
      return this.inputType !== 'password'
        ? ''
        : this.passwordAsText
          ? eyesInvisibleFilled
          : eyesFilled;
    }
  },
  watch: {
    message (n) {
      this.$emit('inputValue', n);
      const events = this.searchInput;
      const fileList = events.filter(function (event) {
        return event.startsWith(n) && n !== '';
      });
      this.filterList = fileList;
      this.filterBox = fileList.length > 0 && !this.isCloseFilter;
      this.isCloseFilter = false;
    },
    changeText (n) {
      this.message = n;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.error-hinit {
  margin-bottom: 2px;
  display: flex;
  // align-items: center;
  // justify-content: flex-end;
  position: absolute;
  right: 0;
  top: -20px;
}
.inputtitle-horizontal-error {
  display: flex;
  align-items: center;
  align-self: stretch;
}
.input-title {
  color: $header-black;
  margin-right: 10px;
  margin-left: 10px ;
  min-width: 110px;
  @include noto-sans-tc-16-medium;
}
.input-error {
  background-color: $white;
  border-radius: 5px;
  padding: 5px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $caution-red;
}
.input-eye{
  right: 10px !important;
  left: revert !important;
  cursor: pointer !important;
}
.verification{
  max-width: 105px;
}
.secondInput{
  width: 80px;
}
</style>
