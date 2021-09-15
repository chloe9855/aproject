<template>
  <div class="map_search_wrap">
    <NavTabs-component
      :type-list="barOptions.typeList"
      :selected="barOptions.current"
      @current="payload => barOptions.current = payload"
    />
    <component :is="componentInstance" />
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
  computed: {
    searchType () {
      return (this.barOptions.current === 0) ? 'KeyWordSearch' : (this.barOptions.current === 1) ? 'ChannelSearch' : (this.barOptions.current === 2) ? 'StakeSearch' : (this.barOptions.current === 3) ? 'ClickSearch' : '';
    },
    componentInstance () {
      return () => import(`~/components/model/MapSearchBox/${this.searchType}`);
    }
  }
};
</script>
