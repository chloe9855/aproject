<template>
  <div
    class="input-box textarea-box"
    :class="sizing"
  >
    <div
      v-show="isTitle"
      class="input-title-box"
    >
      <p class="input-title">
        {{ title }}
        <span
          v-show="isRequire"
          class="error-hint-text"
        >*</span>
      </p>
    </div>
    <textarea
      v-model="textContent"
      class="w-100"
      :class="inputHeight"
      @input="sendTextContent"
    />
  </div>
</template>

<script>
export default {
  props: {
    sizing: {
      type: String,
      default: 'w-100'
    },
    inputHeight: {
      type: String,
      default: 'vh-10'
    },
    title: {
      type: String,
      default: ''
    },
    isRequire: {
      type: Boolean,
      default: false
    },
    defaultText: {
      type: String,
      default: ''
    },
    addText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      textContent: ''
    };
  },
  name: 'Datepicker',
  mounted () {
    if (this.addText !== '') {
      this.textContent = this.addText;
    }
  },
  methods: {
    sendTextContent (e) {
      console.log(e);
      this.$emit('textContent', this.textContent);
    }
  },
  computed: {
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
    defaultText (n) {
      if (n) {
        this.textContent = n;
      }
    },
    addText (value) {
      if (value !== '') {
        this.textContent = value;
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
.textarea-box{
    margin: 0 auto;
    textarea{
        background: #FFF;
        border: 1px solid #959595;
        box-sizing: border-box;
        border-radius: 5px;
    }
}
</style>
