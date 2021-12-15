<template>
  <div class="inputBox">
    <InputVertical
      title="表單名稱"
      @inputValue="getFormName"
    />
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
        name: 'addTable',
        head: [
          { title: '檔案名稱' },
          { title: '檔案' }
        ],
        body: [
          { val: 'addTable0', title: [{ type: 'input', key: 'a0' }, { type: 'btn', key: 'b0' }] }
        ]
      },
      delBtn: false,
      num: 0,
      formName: ''
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
      this.tableList.body.push({ val: `addTable${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'btn', key: `b${this.num}` }] });
    },
    getFormName (e) {
      if (e) {
        this.formName = e;
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
