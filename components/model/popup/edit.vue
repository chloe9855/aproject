<template>
  <div class="inputBox">
    <InputVertical title="輸入框標題1" />
    <InputVertical title="輸入框標題1" />
    <InputVertical title="輸入框標題1" />
    <InputVertical title="輸入框標題1" />
    <InputVertical title="輸入框標題1" />
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
import Button from '~/components/tools/Buttons.vue';
export default {
  components: {
    InputVertical: InputVertical,
    Button: Button
  },
  data: () => {
    return {};
  },
  name: 'LandSearch',
  computed: {}
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
</style>
