<template>
  <div
    class="input-box"
    :class="sizing"
  >
    <div
      v-show="isError"
      class="error-hinit"
    >
      <div class="error-circle">
        <img
          alt=""
          class="vector"
          :src="require('~/assets/img/error_icon.svg')"
        >
      </div>
      <p class="error-hint-text">
        {{ errorTip }}
      </p>
    </div>
    <input
      v-model="message"
      autocomplete="off"
      class="inputType"
      :class="{inputError:isError,isIcon:isAddIcon}"
      :placeholder="inputText"
      :name="name"
      :type="inputType"
      :disabled="isDisable === true"
    >
    <img
      v-show="isAddIcon"
      :src="iconImg"
      class="input-icon"
    >
    <div
      v-show="filterBox"
      class="filterBox"
      :class="setFilterPos"
      :style="{width:setFilterW,height:setFilterH}"
    >
      <ul>
        <li
          v-for="(item, index) in filterList"
          :key="index"
          @click="selectFilter(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'test'
    },
    inputText: {
      type: String,
      default: '輸入文字'
    },
    errorTip: {
      type: String,
      default: ''
    },
    isWarn: {
      type: String,
      default: ''
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    setError: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    sizing: {
      type: String,
      default: 'w-100'
    },
    isIcon: {
      type: String,
      default: ''
    },
    inputId: {
      type: Number,
      default: 0
    },
    inputNum: {
      type: Number,
      default: 0
    },
    searchInput: {
      type: Array,
      default: () => {
        return [];
      }
    },
    changeText: {
      type: Boolean,
      default: false
    },
    alterCoor: {
      type: String,
      default: ''
    },
    filterPos: {
      type: String,
      default: ''
    },
    filterW: {
      type: String,
      default: ''
    },
    filterH: {
      type: String,
      default: ''
    },
    addText: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      message: '',
      RegExpType: {
        code8: '^.{8}$',
        userId: '^[A-Z]{1}.[0-9]{8}'
      },
      filterBox: false,
      filterList: [],
      isCloseFilter: false
    };
  },
  name: 'InputTool',
  mounted () {
    if (this.addText !== '') {
      this.message = this.addText;
    }
  },
  methods: {
    filterData () {
      this.filterBox = true;
      this.$emit('inputValue', this.message);
    },
    selectFilter (item) {
      this.message = item;
      this.filterBox = false;
      this.isCloseFilter = true;
    }
  },
  computed: {
    isError: function () {
      const defaultStatus = this.isWarn;
      const regtype = this.RegExpType[defaultStatus];
      const rules = new RegExp(regtype);
      if (this.errorTip !== '' && this.setError) {
        return true;
      } else {
        if (defaultStatus === '' || this.message === '' || !regtype) {
          return false;
        } else {
          return !rules.test(this.message);
        }
      }
    },
    iconImg () {
      const icon = this.isIcon;
      if (icon !== '') {
        return require(`~/assets/img/${icon}.svg`);
      } else {
        return null;
      }
    },
    isAddIcon () {
      const icon = this.isIcon;
      if (icon !== '') {
        return true;
      } else {
        return false;
      }
    },
    setFilterW () {
      let result = '';
      if (this.filterW !== '') {
        result = this.filterW + 'px';
      }
      return result;
    },
    setFilterH () {
      let result = '';
      if (this.filterH !== '') {
        result = this.filterH + 'px';
      }
      return result;
    },
    setFilterPos () {
      let result = '';
      if (this.filterPos !== '') {
        if (this.filterPos === 'right') {
          result = 'filterRight';
        } else if (this.filterPos === 'left') {
          result = 'filterLeft';
        }
      }
      return result;
    }
  },
  watch: {
    message (n) {
      const data = { val: n, id: this.inputId, num: this.inputNum };
      this.$emit('inputValue', data);
      const events = this.searchInput;
      const fileList = events.filter(function (event) {
        return event.indexOf(n) > -1 && n !== '';
      });
      this.filterList = fileList;
      this.filterBox = fileList.length > 0 && !this.isCloseFilter;
      this.isCloseFilter = false;
    },
    changeText (value) {
      if (value === true) {
        this.message = '';
      }
    },
    alterCoor (value) {
      this.message = value;
    },
    addText (value) {
      if (value !== '') {
        this.message = value;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.error-hinit {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.filterBox{
  ul{
    li{
      padding-bottom: 2px;
    }
    li:hover{
      cursor: pointer;
      background-color: #007bff;
      color:white;
    }
  }
}
</style>
