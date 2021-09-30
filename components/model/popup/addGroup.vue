<template>
  <div class="inputBox theme_scrollbar">
    <InputVertical title="群組名稱" />
    <TreeSelect />
    <div class="buttonBox">
      <Button
        :name="'button-primary'"
        :text="'按鈕'"
      />
      <Button
        :name="'button-default-disable'"
        :text="'按鈕'"
      />
    </div>
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import TreeSelect from '~/components/tools/TreeSelect.vue';
import Button from '~/components/tools/Buttons.vue';
export default {
  components: {
    InputVertical,
    TreeSelect,
    Button
  },
  data: () => {
    return {
    };
  },
  name: 'AddGroup'
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
}
</style>
