<template>
  <div
    :class="sizing"
    class="input-box dropdown"
  >
    <client-only>
      <v-select
        v-model="selected"
        label="title"
        code="value"
        :clearable="false"
        :options="options"
        :placeholder="placeholders"
        :class="{'add_bg': bgColor}"
        class="w-100 inputSelect getMargin"
      />
    </client-only>
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
    sizing: {
      type: String,
      default: 'w-100'
    },
    bgColor: {
      type: Boolean,
      default: false
    },
    placeholders: {
      type: String,
      default: '請選擇'
    },
    changeText: {
      type: Boolean,
      default: false
    },
    addText: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      selected: '',
      option: []
    };
  },
  name: 'Dropdown',
  watch: {
    selected (n, o) {
      // console.log(n);
      // this.$emit('DropdownVal', n);
      if (n !== '') {
        this.$emit('DropdownVal', n);
      }
    },
    changeText (value) {
      if (value === true) {
        this.selected = '';
      }
    },
    addText (value) {
      if (value !== '') {
        this.selected = value;
      }
    },
    options (value) {
      if (value.length === 1) {
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

</style>
