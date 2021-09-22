<template>
  <div class="inputBox">
    <InputVertical title="文件名稱" />
    <div class="buttonBox">
      <Button
        :name="'button-add'"
        :text="'新增檔案'"
        :add="true"
      />
    </div>
    <Table />
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
import Table from '~/components/model/Table.vue';
export default {
  components: {
    InputVertical: InputVertical,
    Button: Button,
    Table: Table
  },
  data: () => {
    return {};
  },
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
  margin: 10px 0;
}
</style>
