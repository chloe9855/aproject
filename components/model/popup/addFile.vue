<template>
  <div class="inputBox">
    <InputVertical title="文件名稱" />
    <div class="buttonBox">
      <Button
        v-show="delBtn"
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
      :key="num"
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
      @checkList="getTableCheck"
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
        head: [
          { title: '檔案名稱' },
          { title: '檔案' }
        ],
        body: [
          { val: 'file1', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'file2', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'file3', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'file4', title: [{ type: 'input' }, { type: 'btn' }] }
        ]
      }
    };
  },
  methods: {
    getTableCheck (e) {
      if (e) {
        if (e.length > 1) {
          this.delBtn = true;
        } else {
          this.delBtn = false;
        };
      }
    }
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
