<template>
  <div
    class="dropCheckList input-box dropdown"
    :class="sizing"
  >
    <div
      v-show="isTitle"
      class="input-title-box"
    >
      <p class="input-title">
        {{ title }}
      </p>
    </div>
    <div
      class="dropItem w-100"
      :class="{listOpen:istoggle,isUp:getType}"
      @click="toggleList"
    >
      {{ options.option[0].title }}
    </div>
    <TreeSelect
      v-show="istoggle"
      class="dropList"
      :class="{up:getType,onTitle:isTitle}"
    />
  </div>
</template>

<script>
import TreeSelect from '~/components/tools/TreeSelect';
export default {
  components: {
    TreeSelect
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return { option: [{ title: '無清單資料1', value: '0' }, { title: '無清單資料2', value: '1' }] };
      }
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dropType: {
      type: String,
      default: 'down'
    },
    title: {
      type: String,
      default: ''
    },
    sizing: {
      type: String,
      default: 'w-100'
    }
  },
  data: () => {
    return {
      color: '#f00',
      istoggle: false,
      dataArr: []
    };
  },
  methods: {
    toggleList: function () {
      this.istoggle = !this.istoggle;
    }
  },
  computed: {
    getType: function () {
      const type = this.dropType;
      if (type === 'down') {
        return false;
      } else {
        return true;
      }
    },
    isTitle: function () {
      const title = this.title;
      if (title === '') {
        return false;
      } else {
        return true;
      }
    },
    setOption: function () {
      const data = this.option;
      data.forEach((element, i) => {
        console.log(element);
      });
      // [
      //     {
      //       id: 1,
      //       ia: '嘉南管理處',

      //       stn: [
      //         { title: '南基工作站', no: 555, grp: [{ name: '北北水利小組', no: 111, isChecked: false }, { name: 'uu水利小組', no: 541, isChecked: false }, { name: 'yy水利小組', no: 657, isChecked: false }] },
      //         { title: 'uu工作站', no: 475, grp: [{ name: 'ee水利小組', no: 888, isChecked: false }, { name: 'tt水利小組', no: 755, isChecked: false }, { name: 'll水利小組', no: 442, isChecked: false }] },
      //         { title: 'oo工作站', no: 588, grp: [{ name: 'ii水利小組', no: 463, isChecked: false }, { name: 'aa水利小組', no: 774, isChecked: false }, { name: 'fg水利小組', no: 521, isChecked: false }] }
      //       ]
      //     },
      // }
      return true;
    }
  },
  watch: {
    dataArr: function (n) {
      this.$emit('DropdownVal', n);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.input-title {
    color: $header-black;
    flex: 1;
    margin-right: 2px;
    @include noto-sans-tc-16-medium;
}
.dropCheckList{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .dropItem{
    position: absolute;
    background-color: white;
    border-radius: 5px;
    padding: 0 8px;
    flex: 1;
    border: 1px solid #cdcdcd;
    align-self: stretch;
    color: #cdcdcd;
    cursor: pointer;
    user-select:none;
    background-image: url("~/assets/img/dropdown.svg");
    background-repeat: no-repeat;
    background-position-x: 99%;
    background-position-y: center;
    &.isUp{
      background-image: url("~/assets/img/dropup.svg");
    }
    &:active,&:focus,&:visited{
      outline: none;
      border: 1px solid #3e9f88 !important;
      box-shadow: 0 0 4px 0 #8ecb9f;
      background-image: url("~/assets/img/onDropdown.svg");
      &.isUp{
        background-image: url("~/assets/img/dropup.svg");
      }
    }
    &.listOpen{
      background-image: url("~/assets/img/dropup.svg");
      &:active,&:focus,&:visited{
        background-image: url("~/assets/img/onDropup.svg");
      }
      &.isUp{
        background-image: url("~/assets/img/onDropdown.svg");
        &:active,&:focus,&:visited{
          background-image: url("~/assets/img/onDropdown.svg");
        }
      }
    }
  }
  .dropList{
    position: absolute;
    left: 0;
    border: 1px solid #959595;
    width: 100%;
    min-width: 200px;
    background-color: #FFF;
    top: 18px;
    z-index: 1000;
    padding-left: 10px;
    &.onTitle{
      top: calc( 24px + 38px );
    }
    &.up{
      bottom: 38px;
      top:unset;
    }
    li{
      height: 38px;
      line-height: 38px;
      user-select:none;
      input[type="checkbox"] {
        display:none;
      }
      input[type="checkbox"] + label
      {
        background: #999;
        height: 14px;
        width: 14px;
        display:inline-block;
        margin: 0 5px;
        cursor: pointer;
      }
      input[type="checkbox"]:checked + label
      {
        background: url("~/assets/img/check.svg");
        height: 14px;
        width: 14px;
        display:inline-block;
        margin: 0 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
