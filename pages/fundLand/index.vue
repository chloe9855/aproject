<template>
  <div class="main">
    <SearchFund
      type="landSearch"
      @hideSidebar="payload => growUp = payload"
    />

    <div
      class="content"
      :class="{ 'grow': !growUp }"
    >
      <div>
        <BreadCrumbTool />
        <PageHeader icon="land" />
        <Table
          v-if="searchResult.authority !== ''"
          :table-column="searchResult.authority"
          :is-map="true"
          :is-search="true"
          :is-check="false"
        />
        <div @click="showDetail = true">
          看詳細
        </div>
      </div>
      <div v-if="showDetail">
        <NavTabs
          :type-list="options.typeList"
          :selected="options.current"
          @current="payload => options.current = payload"
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
import NavTabs from '~/components/tools/NavTabs.vue';

export default {
  components: {
    SearchFund: SearchFund,
    BreadCrumbTool: BreadCrumbTool,
    PageHeader: PageHeader,
    Table: Table,
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
      }
    };
  },
  mounted () {
    const data = require('~/static/land.json');
    this.searchResult.authority = data;
  }
};
</script>

<style lang="scss" scoped>

  .main {
    position: relative;
    height: calc(100vh - 86px);
    display: flex;
  }

  .content {
    // border: 1px solid purple;
    width: calc(100% - 414px);
    position: absolute;
    right: 0;
    transition: ease-in-out 0.4s;
    padding: 13px;
    display: flex;
  }

  .grow {
    width: calc(100% - 67px);
  }

</style>
