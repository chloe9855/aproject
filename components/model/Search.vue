<template>
  <div class="searchBox">
    <PageHeader
      icon="slider"
      :title="title"
    />
    <component :is="componentInstance" />
  </div>
</template>

<script>
import PageHeader from '~/components/tools/PageHeader';
export default {
  name: 'Table',
  components: {
    PageHeader: PageHeader
  },
  props: {
    tableColumn: {
      type: Object,
      default: () => {
        return {
          searchData: {}
        };
      }
    },
    type: {
      type: String,
      default: 'landSearchNum'
    },
    title: {
      type: String,
      default: '請設定查詢作業標題'
    }
  },
  data: () => {
    return {};
  },
  computed: {
    componentInstance () {
      const searchType = this.type;
      return () => import(`~/components/model/searchBox/${searchType}`);
    },
    searchTitle () {
      const searchType = this.type;
      let title = '';
      switch (searchType) {
        case 'landSearch':
          title = '作業基金土地查詢';
          break;
        case 'userSearchAcct':
          title = '使用者帳號查詢';
          break;
        case 'systemSearch':
          title = '系統使用量查詢';
          break;
        case 'irrigatedLandSearch':
          title = '灌溉地籍查詢';
          break;
        case 'compensateSearch':
          title = '停灌補償案件查詢';
          break;
      }
      return title;
    }
  },
  created: function () {

  }
};
</script>

<style lang="scss" scoped>
.searchBox{
  padding: 10px 15px 27px;
  position: absolute;
  width: 320px;
  height: 810px;
  left: 0;
  top: 0;
  background: #EFF4F3;
}
</style>
