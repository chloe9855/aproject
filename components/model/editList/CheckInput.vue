<template>
  <div
    class="check-input-box flexBox"
    :class="sizing"
  >
    <div class="flex-1 flexCheckBox">
      <input
        v-model="isCheck"
        type="checkBox"
      >
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
.check-input-box{
    div{
        span{
            //margin: 0 1em;
        }
    }
}
.flexCheckBox{
  min-width: 180px;
}
</style>
