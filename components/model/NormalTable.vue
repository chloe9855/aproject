<template>
  <div
    class="table_block theme_scrollbar"
  >
    <table>
      <tbody>
        <tr
          v-for="item in list"
          :key="item.index"
        >
          <td :class="{ 'set': shorten }">
            {{ item.name }}
          </td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="list.length < 1 && noResult === true"
      class="no_file"
    >
      <img :src="require('~/assets/img/no_data.svg')">
      <p>查無資料</p>
    </div>

    <div
      v-if="list.length < 1 && noResult === false"
      class="no_file"
    >
      <img :src="require('~/assets/img/no_file.svg')">
      <p>請設定查詢條件</p>
      <p>並開始查詢 !</p>
    </div>
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
    },
    noResult: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    };
  },
  watch: {
    // list (value) {
    //   if (value.length >= 1) {
    //     this.noResult = true;
    //   }
    // }
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
    max-height: calc( 100vh - 200px );
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

  .no_file{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #EFF4F3;
    color: #3E9F88;
    height: 450px;
    @include noto-sans-tc-16-regular;
  }

</style>
