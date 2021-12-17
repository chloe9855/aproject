<template>
  <div
    class="input-box dropdown"
    :class="sizing"
  >
    <div class="input-title-box">
      <p class="input-title">
        {{ title }}
        <span class="starSign">
          {{ starSign }}
        </span>
      </p>
    </div>
    <client-only>
      <v-select
        :value="selectedOpt"
        label="title"
        code="value"
        :clearable="false"
        :options="options"
        :placeholder="placeholders"
        :class="{'add_bg': bgColor}"
        class="w-100 inputSelect getMargin"
        @input="onInput"
      />
    </client-only>

    <div
      v-if="showError === true && selected === ''"
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
// @ts-check
export default {
  props: {
    /** @type {import('types/DropdownVerticalOption').DropdownVerticalOptionPropOption} */
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: '輸入框標題'
    },
    bgColor: {
      type: Boolean,
      default: false
    },
    sizing: {
      type: String,
      default: 'w-100'
    },
    starSign: {
      type: String,
      default: ''
    },
    placeholders: {
      type: String,
      default: '請選擇'
    },
    // 為空值跳錯誤
    showError: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    }
  },
  data: () => {
    return {
      selected: /** @type {string | number} */('')
    };
  },
  methods: {
    /** @param {import('types/DropdownVerticalOption').DropdownVerticalOptionUnion} v  */
    onInput (v) {
      this.$emit('input', v.value);
    }
  },
  computed: {
    /** @returns {import('types/DropdownVerticalOption').DropdownVerticalOptionUnion} */
    selectedOpt () {
      return (this.options && this.options.find(o => o.value === this.selected)) || null;
    }
  },
  watch: {
    /** @param {import('types/DropdownVerticalOption').DropdownVerticalOptionUnion[]} value  */
    options (value) {
      if (value.length === 1) {
        const [opt] = value;
        this.selected = opt.value;
        this.onInput(opt);
      }
    },
    value (value) {
      this.selected = value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';

.getMargin {
  margin: 3px 0;
}

.inputSelect{
  background-color: white;
}

.input-title {
    color: $header-black;
    flex: 1;
    margin-right: 2px;
    @include noto-sans-tc-16-medium;
}

.add_bg {
  background-color: #DBE4E2;
  border: none !important;
}

.starSign {
  color: red;
}

.error_wrap {
  position: absolute;
  bottom: 2px;
  text-align: right;
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
    width: 289px;
    height: 33px;
    border-radius: 4px;
    margin-top: 5px;
  }
}

</style>
