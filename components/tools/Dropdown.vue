<template>
  <div class="dropdown">
    <select>
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
  name: 'Dropdown',
  props: {
    options: {
      type: Object,
      default: () => {
        return { option: [{ title: '選項1', value: '0' }, { title: '選項2', value: '1' }, { title: '選項3', value: '2' }] };
      }
    }
  },
  data: () => {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    select{
        background-color: white;
        border-radius: 5px;
        padding: 10px 9px;
        align-items: center;
        justify-content: center;
        border: 1px solid $input-gray;
        align-self: stretch;
        flex: 1;
        &:active,&:focus,&:visited {
            outline:none;
            border: 1px solid $main-green !important;
            box-shadow: 0 0 4px 0 $dark-sea-green;
        }
    }
}
</style>
