<template>
  <div
    class="searchBox"
    :class="toggleBox"
  >
    <PageHeader
      icon="slider"
      :title="searchTitle"
    />
    <component :is="componentInstance" />
    <div
      class="toggleBtn"
      @click="toggleSearthBox"
    >
      收合查詢列
      <span :class="arrow" />
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/tools/PageHeader';
export default {
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
    return {
      toggleState: false,
      toggleBox: '',
      arrow: 'arrowLeft'
    };
  },
  name: 'SearchBox',
  methods: {
    toggleSearthBox () {
      const isOpen = this.toggleState;
      if (isOpen) {
        this.toggleBox = 'hideBox';
        this.arrow = 'arrowLeft';
        this.toggleState = false;
      } else {
        this.toggleBox = 'showBox';
        this.arrow = 'arrowRight';
        this.toggleState = true;
      }
    }
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
        case 'userAcctSearch':
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
  }
};
</script>

<style lang="scss" scoped>
.searchBox{
  padding: 0 15px;
  position: absolute;
  width: 320px;
  height: $vh-100;
  top: 0;
  left:-350px;
  background: #EFF4F3;
}
.page-header{
  margin: 10px 0;
}
.toggleBtn{
  position: absolute;
  background: #3E9F88;
  border-radius: 0 22px 22px 0;
  line-height: 20px;
  color: white;
  left: 350px;
  width: 16px;
  padding: 30px 8px;
  height: 108px;
  cursor: pointer;
  top: 33vh;
}
.showBox{
  left:0;
  animation: on 0.5s
}
.hideBox{
  left:-350px;
  animation: off 0.5s
}
.arrowLeft{
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 8.7px;
  border-color: transparent transparent transparent #fff;
  position: absolute;
  bottom: 20px;
  right: 12px;
}
.arrowRight{
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 8.7px 5px 0;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  bottom: 20px;
  right: 12px;
}
@keyframes on{
  from{ left: -350px;}
  to{ left: 0;}
}
@keyframes off{
  from{ left: 0;}
  to{ left: -350px;}
}
</style>
