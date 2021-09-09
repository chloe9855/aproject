<template>
  <table class="tableBox">
    <thead>
      <tr>
        <th class="checkBoxOption">
          <input type="checkBox">
        </th>
        <th
          v-for="( item, index ) in tableColumn.head"
          :key="index"
        >
          {{ item.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="( item, index ) in tableColumn.body"
        :key="index"
      >
        <td class="checkBoxOption">
          <input
            type="checkBox"
            :value="index"
          >
        </td>
        <td
          v-for="( text, textIndex ) in item.title"
          :key="textIndex"
        >
          {{ text }}
        </td>
        <td class="editOption">
          <i>EDIT</i>
        </td>
        <td class="delOption">
          <i>DELETE</i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableColumn: {
      type: Object,
      default: () => {
        return {
          head: [
            { title: '預設欄位1' },
            { title: '預設欄位2' },
            { title: '預設欄位3' }
          ],
          body: [
            { title: ['預設內容1', '預設內容2', '預設內容3'] }
          ]
        };
      }
    }
  },
  computed: {},
  created: function () {
    // `this` 指向 vm 例項
  }
};
</script>

<style lang="scss" scoped>
.tableBox{
    thead{
        border-bottom: 5px solid $main-green;
        th{
            line-height: 33px;
            height: 33px;
            padding: 0 10px;
        }
    }
    tbody{
        td{
            line-height: 33px;
            height: 33px;
            padding: 0 10px;
        }
    }
}
</style>
