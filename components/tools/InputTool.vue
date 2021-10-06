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
          src="https://static.overlay-tech.com/assets/615453fc-d75a-48d3-b454-3dad2c87a1cc.svg"
        >
      </div>
      <p class="error-hint-text">
        {{ errorTip }}
      </p>
    </div>
    <input
      v-model="message"
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
    >
      <ul>
        <li
          v-for="(item, index) in searchInput"
          :key="index"
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
      default: '輸入文字格式錯誤'
    },
    isWarn: {
      type: String,
      default: ''
    },
    isDisable: {
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
    searchInput: {
      type: Object,
      default: () => {
        return {
          searchData: {}
        };
      }
    }
  },
  data: () => {
    return {
      message: '',
      RegExpType: {
        code8: '^.{8}$'
      },
      filterBox: false
    };
  },
  name: 'InputTool',
  methods: {
    filterData () {
<<<<<<< HEAD
=======
      this.filterBox = true;
>>>>>>> main
      this.$emit('inputValue', this.message);
    }
  },
  computed: {
    isError: function () {
      const defaultStatus = this.isWarn;
      const regtype = this.RegExpType[defaultStatus];
      const rules = new RegExp(regtype);
      if (defaultStatus === '' || this.message === '' || !regtype) {
        return false;
      } else {
        return !rules.test(this.message);
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
    }
  },
  watch: {
    message (n, o) {
      const data = { val: n, id: this.inputId };
      this.$emit('inputValue', data);
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
</style>
