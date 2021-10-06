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
      @tabCurrent="current"
    />
    <div class="buttonBox">
      <Button
        :name="'button-default'"
        :text="'清除全部'"
      />
      <Button
        :name="'button-primary'"
        :text="'查詢'"
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
export default {
  components: {
    PageHeader,
    Button
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
  top: 66px;
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
  margin-top: 20px;
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
