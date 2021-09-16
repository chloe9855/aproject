<template>
  <div class="input-box dropdown">
    <select :class="{'add_bg': bgColor}">
      <option
        v-for="(item, index) in options.option"
        :key="index"
        :value="item.value"
      >
        {{ item.title }}
      </option>
    </select>
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
    bgColor: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {};
  },
  name: 'Dropdown'
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
