<template>
  <div class="main">
    <SearchFund
      ref="searchFund"
      type="landSearch"
      @showSidebar="payload => growUp = payload"
    />

    <div
      class="content_block"
      :class="{ 'grow': !growUp }"
    >
      <div class="left_content">
        <BreadCrumbTool />
        <PageHeader icon="land" />
        <Table
          v-if="searchResult.authority !== ''"
          :table-column="searchResult.authority"
          :is-map="true"
          :is-search="true"
          :is-check="false"
        />
        <div @click="addDetail(true)">
          看詳細
        </div>
      </div>
      <div
        v-if="showDetail"
        class="right_content"
      >
        <div
          class="close_icon"
          @click="addDetail(false)"
        />
        <NavTabs
          :type-list="options.typeList"
          :selected="options.current"
          @current="payload => options.current = payload"
        />
        <NormalTable
          v-if="columnList.length >= 1"
          :list="columnList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchFund from '~/components/model/SearchFund';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool';
import PageHeader from '~/components/tools/PageHeader.vue';
import Table from '~/components/model/Table.vue';
import NormalTable from '~/components/model/NormalTable.vue';
import NavTabs from '~/components/tools/NavTabs.vue';

export default {
  components: {
    SearchFund: SearchFund,
    BreadCrumbTool: BreadCrumbTool,
    PageHeader: PageHeader,
    Table: Table,
    NormalTable: NormalTable,
    NavTabs: NavTabs
  },
  data () {
    return {
      growUp: true,
      showDetail: false,
      searchResult: {
        authority: ''
      },
      options: {
        current: 0,
        typeList: [
          {
            name: '標示部',
            id: 0
          },
          {
            name: '所有權部',
            id: 1
          },
          {
            name: '土地參考',
            id: 2
          },
          {
            name: '作業基金土地資訊',
            id: 3
          }
        ]
      },
      columnList: [
        {
          name: '流水編號',
          value: '851705',
          id: 0
        },
        {
          name: '管理處代碼',
          value: '09',
          id: 1
        },
        {
          name: '管理處名稱',
          value: '851705',
          id: 2
        },
        {
          name: '管理分分處名稱',
          value: '09',
          id: 3
        },
        {
          name: '工作站代碼',
          value: '851705',
          id: 4
        },
        {
          name: '工作站名稱',
          value: '09',
          id: 5
        },
        {
          name: '水利小組代碼',
          value: '851705',
          id: 6
        },
        {
          name: '水利小組名稱',
          value: '泉厝支線小組',
          id: 7
        },
        {
          name: '輪區代碼',
          value: '851705',
          id: 8
        },
        {
          name: '輪區名稱',
          value: '09',
          id: 57
        },
        {
          name: '長度',
          value: '09',
          id: 66
        },
        {
          name: '渠道名稱',
          value: '851705',
          id: 62
        },
        {
          name: '渠道等級代碼',
          value: '09',
          id: 58
        },
        {
          name: '渠道等級名稱',
          value: '851705',
          id: 52
        }
      ]
    };
  },
  mounted () {
    const data = require('~/static/land.json');
    this.searchResult.authority = data;
  },
  methods: {
    addDetail (payload) {
      this.showDetail = payload;
      const _searchFund = this.$refs.searchFund;
      if (payload === true) {
        _searchFund.closeBar();
      } else {
        _searchFund.showBar();
      }
    }
  },
  watch: {
    growUp (value) {
      if (value === true) {
        this.showDetail = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

  .main {
    position: relative;
    height: calc(100vh - 86px);
    display: flex;
  }

  .content_block {
    // border: 1px solid purple;
    width: calc(100% - 414px);
    position: absolute;
    right: 0;
    transition: ease-in-out 0.4s;
    display: flex;
    height:100%;
  }

  .left_content {
    width: 100%;
    padding: 13px;
  }

  .right_content {
    // width: 516px;
    box-shadow: -1px 0 5px rgba(135, 135, 135, 0.28);
    padding: 40px 10px 10px;
    position: relative;
  }

  .table_block {
    width: 512px;
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

  .grow {
    width: calc(100% - 67px);
  }

  .close_icon {
    background: url('~/assets/img/close-icon.svg') no-repeat right/contain;
    width: 23px;
    height: 23px;
    cursor: pointer;
    position: absolute;
    top: 10px;
  }

</style>
