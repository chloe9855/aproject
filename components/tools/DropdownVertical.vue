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
        label="title"
        code="value"
        :clearable="false"
        :options="option"
        :class="{'add_bg': bgColor}"
        class="w-100 inputSelect"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return { option: [{ label: '選項11', code: '0' }, { label: '選項2', code: '1' }, { label: '選項3', code: '2' }] };
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
    }
  },
  data: () => {
    return {
      selected: '',
      option: [{ title: '選項11', value: '0' }, { title: '選項2', value: '1' }, { title: '選項3', value: '2' }]
    };
  },
  name: 'DropdownVertical',
  watch: {
    selected (n, o) {
      this.$emit('DropdownVal', n.value);
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
