<template>
  <div class="inputBox theme_scrollbar">
    <InputVertical title="姓名" />
    <InputVertical title="帳號" />
    <DropdownVertical title="單位" />
    <DropdownVertical title="工作站" />
    <DropdownVertical title="小組別" />
    <InputVertical title="信箱" />
    <InputVertical title="備註" />
    <DropdownVertical title="群組" />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
export default {
  components: {
    InputVertical,
    DropdownVertical
  },
  data: () => {
    return {
      onPassword: false
    };
  },
  name: 'AddAccount',
  methods: {
    restorePassword () {
      this.onPassword = !this.onPassword;
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 1em;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.box{
  margin: 0.5em auto;
  @include noto-sans-tc-16-medium;
}
</style>
