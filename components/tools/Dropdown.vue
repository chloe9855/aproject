<template>
  <div class="input-box dropdown">
    <select v-model="selected">
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
    }
  },
  data: () => {
    return {
      selected: ''
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
</style>
