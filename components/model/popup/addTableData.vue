<template>
  <div class="inputBox theme_scrollbar">
    <InputVertical title="表單名稱" />
    <div
      class="box"
    >
      <Button
        text="新增檔案"
        name="button-red"
        :add="true"
      />
    </div>
    <Table
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
    />
    <div class="buttonBox">
      <Button
        :name="'button-default-disable'"
        :text="'取消'"
      />
      <Button
        :name="'button-primary'"
        :text="'新增'"
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
    InputVertical,
    Button,
    Table
  },
  data: () => {
    return {
      tableList: {
        head: [
          { title: '檔案名稱' },
          { title: '檔案' }
        ],
        body: [
          { val: 0, title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 1, title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 2, title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 3, title: [{ type: 'input' }, { type: 'btn' }] }
        ]
      }
    };
  },
  name: 'AddTableData'
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
