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
      {{ options.option[0].title }}
    </div>
    <ul
      v-show="istoggle"
      class="dropList"
      :class="{up:getType,onTitle:isTitle}"
    >
      <li
        v-for="(item , index) in options.option"
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
      type: Object,
      default: () => {
        return { option: [{ title: '無清單資料1', value: '0' }, { title: '無清單資料2', value: '1' }] };
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
    }
  }
}
</style>
