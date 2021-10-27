<template>
  <div
    class="check-input-box flexBox"
    :class="sizing"
  >
    <div class="flex-1 flexCheckBox checkBoxOption">
      <input
        :id="name"
        v-model="isCheck"
        type="checkBox"
        :name="name"
      ><label :for="name" />
      {{ text }}<span>面積(㎡)</span>
    </div>

    <Input class="flex-1" />
  </div>
</template>

<script>
import Input from '~/components/tools/InputTool.vue';
export default {
  components: {
    Input
  },
  props: {
    text: {
      type: String,
      default: '態樣1(93000)'
    },
    sizing: {
      type: String,
      default: 'w-100'
    },
    name: {
      type: String,
      default: 'a0'
    }
  },
  data: () => {
    return {
      isCheck: false
    };
  },
  name: 'CheckInputTool',
  computed: {
  }
};
</script>

<style lang="scss" scoped>
.flexCheckBox{
  min-width: 180px;
}
.checkBoxOption{
  input[type="checkbox"] {
    display:none;
  }
  input[type="checkbox"] + label
  {
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
    @include checkbox;
  }
  input[type="checkbox"]:checked + label
  {
    background: url("~/assets/img/check.svg");
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
