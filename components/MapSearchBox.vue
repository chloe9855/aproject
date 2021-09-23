<template>
  <div class="search_container">
    <div
      class="search_box"
      :class="{'no_radius': columnList.length >= 1 }"
    >
      <NavTabs-component
        :type-list="barOptions.typeList"
        :selected="barOptions.current"
        @current="payload => barOptions.current = payload"
      />
      <component
        :is="componentInstance"
        @channelSearch="$emit('search')"
        @clear="$emit('clear')"
      />
    </div>
    <div
      v-if="columnList.length >= 1"
      class="content_block"
      :class="{'hide_block': hideResult, 'show_block': !hideResult}"
    >
      <p class="title">
        屬性表格
      </p>
      <div class="table_block_wrap">
        <div class="table_block theme_scrollbar">
          <table>
            <tbody>
              <tr
                v-for="item in columnList"
                :key="item.id"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="hide_button"
        @click="hideResult = !hideResult"
      >
        <p
          v-if="hideResult"
          :class="{'down_arrow': hideResult }"
        >
          顯示查詢結果
        </p>
        <p
          v-if="!hideResult"
          :class="{'down_arrow': hideResult }"
        >
          隱藏查詢結果
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';

export default {
  components: {
    'NavTabs-component': NavTabs
  },
  data () {
    return {
      hideResult: false,
      barOptions: {
        current: 0,
        typeList: [
          {
            name: '關鍵字查詢',
            id: 0
          },
          {
            name: '渠道查詢',
            id: 1
          },
          {
            name: '樁號查詢',
            id: 2
          },
          {
            name: '點擊查詢',
            id: 3
          }
        ]
      },
      searchResult: {
        channel: ''
      },
      columnList: []
    };
  },
  name: 'MapSearchBox',
  mounted () {
    const data = require('~/static/channel.json');
    this.searchResult.channel = data;
  },
  methods: {

  },
  computed: {
    searchType () {
      return (this.barOptions.current === 0) ? 'KeyWordSearch' : (this.barOptions.current === 1) ? 'ChannelSearch' : (this.barOptions.current === 2) ? 'StakeSearch' : (this.barOptions.current === 3) ? 'ClickSearch' : '';
    },
    componentInstance () {
      const myType = this.searchType;
      return () => import(`~/components/model/MapSearchBox/${myType}`);
    }
  }
};
</script>

<style lang="scss" scoped>

  .search_container {
    width: 350px;
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 7000;
  }

  .search_box {
    background-color: #EFF4F3;
    border-radius: 0 0 22px 0;
    z-index: 70000;
  }

  .content_block {
    z-index: 60000;
    background: white;
    color: #494949;
    text-align: left;
    padding: 8px 15px 0;
    position: relative;
    border-radius: 0 0 22px 0;
    overflow: hidden;
    flex-grow: 1;
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

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    @include noto-sans-tc-20-medium;
  }

   .title::before {
      content: '';
      width: 26px;
      height: 26px;
      background: url('~/assets/img/table-icon.svg') no-repeat right/contain;
      display: inline-block;
   }

  .table_block_wrap {
    width: 100%;
    height: 81%;
    position: relative;
  }

  .table_block {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .hide_button {
    background: $main-green;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 6px 0;
    color: white;
    cursor: pointer;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -7px;
    }

    p::before {
      content: '';
      width: 18px;
      height: 18px;
      background: url('~/assets/img/white-triangle.svg') no-repeat right/contain;
      display: inline-block;
      margin-right: 7px;
    }
  }

  .hide_block {
    transition: transform 0.4s;
    transform: translateY(-92.5%);
  }

  .show_block {
    transition: transform 0.4s;
    transform: translateY(0);
  }

  .no_radius {
    border-radius: 0;
  }

  .down_arrow::before {
    background: url('~/assets/img/down-white-triangle.svg') no-repeat right/contain !important;
  }

</style>
