<template>
  <div class="inputBox">
    <InputVertical title="表單名稱" />
    <div class="buttonBox">
      <Button
        :name="'button-red'"
        :text="'刪除所選'"
      />
      <Button
        :name="'button-add'"
        :text="'新增檔案'"
        :add="true"
      />
    </div>
    <Table
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
    />
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
    return {
      tableList: {
        name: 'addTable',
        head: [
          { title: '檔案名稱' },
          { title: '檔案' }
        ],
        body: [
          { val: 'addTable1', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'addTable2', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'addTable3', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'addTable4', title: [{ type: 'input' }, { type: 'btn' }] }
        ]
      }
    };
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
