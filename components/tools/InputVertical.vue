<template>
  <div
    class="input-box"
    :class="sizing"
  >
    <div
      class="input-title-box"
    >
      <p class="input-title">
        {{ title }}
        <span class="starSign">
          {{ starSign }}
        </span>
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
      <div
        class="green_hint_text"
        :class="{ 'add_margin': unfillError === true }"
      >
        {{ greenHint }}
      </div>
    </div>
    <input
      v-model="message"
      autocomplete="off"
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
    <div
      v-show="filterBox"
      class="filterBox vertical"
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

    <div
      v-if="unfillError === true && message === ''"
      class="error_wrap"
    >
      <div class="img_wrap">
        <img
          :src="require('~/assets/img/error_icon.svg')"
        >
        <p class="tip">
          必填
        </p>
      </div>

      <div class="error_box" />
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
    },
    greenHint: {
      type: String,
      default: ''
    },
    starSign: {
      type: String,
      default: ''
    },
    changeText: {
      type: Boolean,
      default: false
    },
    searchInput: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultData: {
      type: String,
      default: ''
    },
    unfillError: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      message: '',
      RegExpType: {
        code8: '^.{8}$'
      },
      filterBox: false,
      filterList: [],
      isCloseFilter: false
    };
  },
  name: 'InputVertical',
  methods: {
    selectFilter (item) {
      this.message = item;
      this.filterBox = false;
      this.isCloseFilter = true;
      // this.$emit('inputValue', this.message);
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
    message (n) {
      this.$emit('inputValue', n);
      const events = this.searchInput;
      const fileList = events.filter(function (event) {
        return event.indexOf(n) > -1 && n !== '';
      });
      this.filterList = fileList;
      this.filterBox = fileList.length > 0 && !this.isCloseFilter;
      this.isCloseFilter = false;
    },
    defaultData (n) {
      if (n !== '') {
        this.message = n;
      }
    },
    changeText: {
      handler (value) {
        if (value) {
          this.message = '';
        }
      },
      deep: true
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
  z-index: 555;
  &.isIcon{
    padding-left: 28px !important;
  }
}
.input-icon{
  top: 35px !important;
}

.green_hint_text {
  color: #21705D;
  @include noto-sans-tc-14-medium;
}

.starSign {
  color: red;
}

.add_margin {
  margin-right: 46px
}

.error_wrap {
  position: absolute;
  bottom: 0;
  text-align: right;
  z-index: 20;
  // display: none;

  p {
    color: $caution-red;
    @include noto-sans-tc-12-regular;
  }

  .img_wrap {
    display: flex;
    justify-content: flex-end;
  }

  .error_box {
    border: 1px solid red;
    width: 284px;
    height: 34px;
    border-radius: 6px;
    margin-top: 2px;
    margin-right: 2px;
    margin-bottom: -1px;;
  }
}

</style>
