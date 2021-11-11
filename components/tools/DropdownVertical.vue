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
        :options="optionData"
        :placeholder="placeholders"
        :class="{'add_bg': bgColor}"
        class="w-100 inputSelect"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    optionData: {
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
  },
  methods: {
  },
  watch: {
    selected (n, o) {
      this.$emit('DropdownVal', n);
    },
    defaultData (n, o) {
      this.selected = n;
    },
    defaultValue (n, o) {
      this.selectVal = n;
    },
    changeText (value) {
      if (value === true) {
        this.selected = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
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

</style>
