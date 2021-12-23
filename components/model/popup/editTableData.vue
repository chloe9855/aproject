<template>
  <div class="inputBox theme_scrollbar">
    <InputVertical title="表單名稱" />
    {{ isSubmit }}
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
// import { bulletinInputDataName, bulletinInputData } from '~/publish/bulletinData';
// import { addBulletin, editBulletin, uploadBulletinFile } from '~/api/bulletin';
import { addBulletin } from '~/api/bulletin';
export default {
  components: {
    InputVertical,
    Button,
    Table
  },
  props: {
    isSubmit: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      tableList: {
        head: [
          { title: '檔案名稱' },
          { title: '檔案' }
        ],
        body: [
          { val: 'tableData0', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'tableData1', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'tableData2', title: [{ type: 'input' }, { type: 'btn' }] },
          { val: 'tableData3', title: [{ type: 'input' }, { type: 'btn' }] }
        ]
      }
    };
  },
  name: 'EditTableData',
  watch: {
    isSubmit: function (e) {
      console.log(e);
      data = {
        name: '公告1221',
        content: '',
        dataname: ['檔案A', '檔案B']
      };
      addBulletin(data).then(r => {
        console.log(r);
        // uploadBulletinFile(){

        // }
      }).catch(n => {
        console.log(e);
      });
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
}
</style>
