<template>
  <div
    class="table_block theme_scrollbar"
    :class="sizing"
  >
    <table>
      <tbody>
        <tr
          v-for="item in list"
          :key="item.id"
        >
          <td :class="{ 'set': shorten }">
            {{ item.name }}
          </td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    sizing: {
      type: String,
      default: 'h-480'
    },
    shorten: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>

  .set {
    width: 21%;
  }

  .table_block {
    // width: 512px;
    height: 480px;
    overflow-y: auto;
    overflow-x: hidden;
    color: #494949;
    background: white;
    @include noto-sans-tc-16-regular;

    table {
      text-align: left;
      margin: 0 auto;
      width: 100%;

      td {
        padding: 10px;
      }

      tr:nth-child(odd) {
        background-color: #F5F5F5;
      }
    }
  }

  .h-432{
    height: 432px !important;
  }

</style>
