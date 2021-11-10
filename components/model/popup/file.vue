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
        @click="addFile"
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
        name: 'file',
        head: [
          { title: '檔案名稱' },
          { title: '檔案' }
        ],
        body: [
          { val: 'file0', title: [{ type: 'input' }, { type: 'btn' }] }
        ]
      },
      delBtn: false,
      num: 0
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
    },
    addFile () {
      this.num += 1;
      this.tableList.body.push({ val: `file${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'btn', key: `b${this.num}` }] });
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
  .button_wrap:first-child{
    margin: 0 0.25em;
  }
}
</style>
