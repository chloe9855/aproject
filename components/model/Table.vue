<template>
  <div class="tableBox">
    <table
      :class="{isNoData:isShowBg}"
    >
      <thead>
        <tr>
          <th
            v-show="!isShowBg"
            class="checkBoxOption"
          >
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
            <div>
              <img
                alt=""
                class="vector"
                :src="require('~/assets/img/edit.svg')"
              >
            </div>
          </td>
          <td class="delOption">
            <div>
              <img
                alt=""
                class="vector"
                :src="require('~/assets/img/delete.svg')"
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableColumn: {
      type: Object,
      default: () => {
        return {
          head: [],
          body: []
        };
      }
    }
  },
  name: 'Table',
  computed: {
    isShowBg: function () {
      const data = this.tableColumn.body;
      if (data.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tableBox{
  display: flex;
  justify-content: center;
  align-items: center;
  table{
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
}
.vector {
  width: 100%;
  align-self: stretch;
  object-fit: cover;
  vertical-align: middle;
}
.isNoData{
  width: 100%;
  min-height: 300px;
  background-image: url("~/assets/img/table_null_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #eff3f2;
}

.isNoSearch{
  width: 100%;
  min-height: 300px;
  background-image: url("~/assets/img/table_start_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #eff3f2;
}
</style>
