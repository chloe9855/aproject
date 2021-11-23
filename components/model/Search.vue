<template>
  <div
    class="searchBox"
    :class="toggleBox"
  >
    <PageHeader
      icon="slider"
      :title="searchTitle"
    />
    <component
      :is="componentInstance"
      ref="searchComp"
      :is-clear="isClearAll"
      @tabCurrent="current"
      @onsearch="onsearch"
    />
    <div class="buttonBox">
      <Button
        :name="'button-default'"
        :text="'清除全部'"
        @click="clearAll"
      />
      <Button
        :name="'button-primary'"
        :text="'查詢'"
        @click="search"
      />
    </div>
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
import Button from '~/components/tools/Buttons.vue';
import compensateSearch from '~/components/model/searchBox/compensateSearch';
import irrigatedLandSearch from '~/components/model/searchBox/irrigatedLandSearch';
import landSearch from '~/components/model/searchBox/landSearch';
import userAcctSearch from '~/components/model/searchBox/userAcctSearch';
import groupUserAcctSearch from '~/components/model/searchBox/groupUserAcctSearch';
import systemSearch from '~/components/model/searchBox/systemSearch';
import usageAmountSearch from '~/components/model/searchBox/usageAmountSearch';
export default {
  components: {
    PageHeader,
    Button,
    compensateSearch,
    irrigatedLandSearch,
    landSearch,
    userAcctSearch,
    systemSearch,
    usageAmountSearch,
    groupUserAcctSearch
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
      arrow: 'arrowLeft',
      isClearAll: false
    };
  },
  name: 'SearchBox',
  mounted () {
    this.toggleSearthBox();
  },
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
      this.$emit('toggleStatus', this.toggleState);
    },
    current (e) {
      this.$emit('toggleCurrent', e);
    },
    search () {
      if (this.$refs.searchComp && this.$refs.searchComp.search) {
        this.$refs.searchComp.search();
      }
    },
    onsearch (e) {
      this.$emit('onsearch', e);
    },
    clearAll (e) {
      if (e) {
        this.isClearAll = !this.isClearAll;
      }
    }
  },
  computed: {
    componentInstance () {
      const searchType = this.type;
      return searchType;
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
        case 'groupUserAcctSearch':
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
        case 'usageAmountSearch':
          title = '系統使用量查詢';
          break;
      }
      return title;
    }
  }
};
</script>

<style lang="scss" scoped>
.searchBox{
  position: absolute;
  width: 320px;
  height: calc( 100vh - 66px );
  top: 0px;
  left:-320px;
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
  left: 320px;
  width: 16px;
  padding: 30px 8px;
  height: 108px;
  cursor: pointer;
  top: 33vh;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  padding-right: 15px;
  .button_wrap{
    padding-left: 5px;
  }
}
.showBox{
  left:0;
  animation: on 0.5s
}
.hideBox{
  left:-320px;
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
  from{ left: -320px;}
  to{ left: 0;}
}
@keyframes off{
  from{ left: 0;}
  to{ left: -320px;}
}
</style>
