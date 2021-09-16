<template>
  <div class="search_container">
    <div class="search_box">
      <NavTabs-component
        :type-list="barOptions.typeList"
        :selected="barOptions.current"
        @current="payload => barOptions.current = payload"
      />
      <component :is="componentInstance" />
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
      }
    };
  },
  name: 'MapSearchBox',
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

  .search_box {
    width: 350px;
    background-color: #EFF4F3;
    border-radius: 0 0 22px 0;
  }

</style>
