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
      class="dropItem"
      :class="{listOpen:istoggle,isUp:getType}"
      @click="toggleList"
    >
      {{ setDefaultData }}
    </div>
    <ul
      v-show="istoggle"
      class="dropList"
      :class="{up:getType,onTitle:isTitle}"
    >
      <li v-show="options.length>0">
        <input
          id="all"
          v-model="dataAll"
          type="checkbox"
          name="all"
          value="all"
          :indeterminate.prop="isIndeterminate"
        ><label for="all" /><span>全選</span>
      </li>
      <li
        v-for="(item , index) in options"
        :key="index"
      >
        <input
          :id="index"
          v-model="dataArr"
          type="checkbox"
          :name="index"
          :value="item.value"
        ><label :for="index" /><span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [{ title: '無清單資料1', value: '0' }, { title: '無清單資料2', value: '1' }];
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
    },
    changeText: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      color: '#f00',
      istoggle: false,
      dataAll: false,
      dataArr: [],
      isIndeterminate: false
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
    setDefaultData () {
      const result = this.dataArr.length > 0 ? `已選擇${this.dataArr.length}個小組` : '請選擇';
      return result;
    }
  },
  watch: {
    dataArr: function (n) {
      if (this.options.length > n.length && n.length > 0) {
        this.isIndeterminate = true;
      } else {
        this.isIndeterminate = false;
      };
      const a = this.options.filter(item => n.indexOf(item.value) > -1);
      this.$emit('DropdownObj', a);
      this.$emit('DropdownVal', n);
    },
    changeText: function (n) {
      if (n) {
        this.dataArr = [];
      }
    },
    options: function (n) {
      if (n.length === 0) {
        this.dataArr = [];
      }
    },
    dataAll: function (n) {
      if (n) {
        const arr = [];
        this.options.forEach(element => {
          arr.push(element.value);
        });
        this.dataArr = arr;
      } else {
        this.dataArr = [];
      }
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
    background-color: white;
    border-radius: 5px;
    padding: 10px 9px;
    flex: 1;
    border: 1px solid #959595;
    align-self: stretch;
    color: #959595;
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
    background-color: #FFF;
    top: 38px;
    z-index: 1000;
    height: 150px;
    overflow:auto;
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
        height: 14px;
        width: 14px;
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;
        @include checkbox;
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
      input[type="checkbox"]:indeterminate + label
      {
        background: url('~/assets/img/checkbox-Indeterminate.png');
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
