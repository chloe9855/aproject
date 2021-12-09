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
        v-model="selected"
        :value="selectVal"
        label="title"
        code="value"
        :clearable="false"
        :options="options"
        :placeholder="placeholders"
        :class="{'add_bg': bgColor}"
        class="w-100 inputSelect getMargin"
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
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [{ title: '選項1', value: '0' }, { title: '選項2', value: '1' }, { title: '選項3', value: '2' }];
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
    defaultData: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: String,
      default: ''
    },
    changeText: {
      type: Boolean,
      default: false
    },
    // 為空值跳錯誤
    showError: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      selected: '',
      selectVal: '',
      option: [{ title: '選項11', value: '0' }, { title: '選項2', value: '1' }, { title: '選項3', value: '2' }]
    };
  },
  name: 'DropdownVertical',
  mounted () {
    this.setDefault();
  },
  methods: {
    setDefault () {
      if (this.defaultData !== '' && this.defaultValue !== '') {
        this.selected = this.defaultData;
        this.selectVal = this.defaultValue;
      }
    }
  },
  watch: {
    selected (n, o) {
      if (n !== '') {
        this.$emit('DropdownVal', n);
      }
    },
    defaultData (n, o) {
      this.selected = n;
    },
    defaultValue (n, o) {
      this.selectVal = n;
    },
    changeText (value) {
      console.log(value);
      if (value === true) {
        this.selected = '';
      }
    },
    options (value) {
      if (value.length === 1 && !this.changeText) {
        this.selected = this.options[0];
      }
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
