<template>
  <div
    class="tableFixHead theme_scrollbar"
    :class="{ 'hidee': hide }"
  >
    <table>
      <thead>
        <tr class="borderT">
          <th
            v-for="item in tableData.head"
            :key="item.index"
          />
          <th />
        </tr>

        <tr>
          <th
            v-for="item in tableData.head"
            :key="item.index"
          >
            {{ item.title }}
          </th>
          <th />
        </tr>

        <tr class="borderB">
          <th
            v-for="item in tableData.head"
            :key="item.index"
          />
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="bodyItem in tableData.body"
          :key="bodyItem.index"
        >
          <td
            v-for="content in bodyItem.title"
            :key="content.index"
          >
            {{ content }}
          </td>
          <td>
            <div>
              <img
                class="mapicon"
                :src="require('~/assets/img/map.svg')"
                @click="$emit('isMap', bodyItem.info, bodyItem.type)"
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
    tableData: Object,
    hide: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>

  .mapicon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .hidee {
    height: 143px !important;
  }

  .borderT {
    height: 1px;
    background: $light-green;
  }

  .borderB {
    height: 6px;
    background: #3e9f88;
  }

  .tableFixHead {
    overflow: auto;
    // height: 410px;

  }

  table{
    border:1px solid $light-green;
    border-top:none ;
    border-bottom: none;
    width:100%;
    text-align: center;
    //white-space: nowrap;
    thead{
        position: sticky;
        top: 0;
        z-index: 13;
        background: white;

        th{
            padding: 0 10px;
            line-height: 24px !important;
            @include noto-sans-tc-16-bold;

        }
    }
    tbody{
        text-align: center;
        color: #494949;
        @include noto-sans-tc-16-regular;
        tr{
          &:nth-child(odd){
            background: #F5F5F5;
          }
          &:nth-child(even){
            background: #FFF;
          }
        }
        td{
          line-height: 33px;
          height: 33px;
          padding: 2px 10px;
          vertical-align: middle;
        }
    }
  }

</style>
