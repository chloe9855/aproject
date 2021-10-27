<template>
  <div class="inputBox">
    <InputVertical title="公告名稱" />
    <Textarea title="公告內容" />
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
import Textarea from '~/components/tools/Textarea.vue';

export default {
  components: {
    InputVertical,
    Button,
    Table,
    Textarea
  },
  data: () => {
    return {
      tableList: {
        name: 'addNews',
        head: [
          { title: '連結名稱' },
          { title: '連結網址' }
        ],
        body: [
          { val: 'news1', title: [{ type: 'input' }, { type: 'input' }] },
          { val: 'news2', title: [{ type: 'input' }, { type: 'input' }] },
          { val: 'news3', title: [{ type: 'input' }, { type: 'input' }] },
          { val: 'news4', title: [{ type: 'input' }, { type: 'input' }] }
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
  .button_wrap:first-child{
    margin: 0 0.25em;
  }
}
</style>
