<template>
  <div
    :class="sizing"
    class="input-box dropdown"
  >
    <v-select
      v-model="selected"
      label="title"
      code="value"
      :options="option"
    />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return { option: [{ title: '選項1', value: '0' }, { title: '選項2', value: '1' }, { title: '選項3', value: '2' }] };
      }
    },
    sizing: {
      type: String,
      default: 'w-100'
    },
    bgColor: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      selected: '',
      option: [{ label: '選項1', code: '0' }, { label: '選項2', code: '1' }, { label: '選項3', code: '2' }]
    };
  },
  name: 'Dropdown',
  watch: {
    selected (n, o) {
      this.$emit('DropdownVal', n);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';

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
