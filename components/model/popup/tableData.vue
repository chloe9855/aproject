<template>
  <div class="inputBox">
    <InputVertical title="表單名稱" />
    <Buttons-component
      :name="'button-round'"
      :text="'新增檔案'"
      :round="true"
    />
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
import Table from '~/components/tools/Table.vue';
export default {
  components: {
    InputVertical: InputVertical,
    Button: Button,
    Table: Table
  },
  data: () => {
    return {};
  },
  name: 'TableData',
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
