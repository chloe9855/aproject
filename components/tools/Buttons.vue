<template>
  <div
    class="button_wrap hide"
    :data-title="isNote"
  >
    <div
      :class="name"
      @click="$emit('click', true)"
    >
      <img
        v-if="round"
        class="arrow"
        :src="require('~/assets/img/up-icon.svg')"
      >
      <div
        v-if="add"
        class="add"
      >
        <div class="ellipse-9" />
        <img
          class="vector"
          :src="require('~/assets/img/add-icon.svg')"
        >
      </div>
      <p class="button-text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      default: 'button-primary'
    },
    text: {
      type: String,
      default: '按鈕'
    },
    round: {
      type: Boolean,
      default: false
    },
    add: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    note: {
      type: String,
      default: '檔案支援格式: *.pdf、*.doc，大小以5MB為限'
    }
  },
  data () {
    return {
      isNote: '',
      isHover: ''
    };
  },
  created () {
    this.isNote = this.note;
    this.isHover = this.hover;
  },
  watch: {
    isHover (value) {
      if (value === false) {
        this.isNote = '';
      }
    }
  }

};
</script>

<style lang="scss">

  .button_wrap{
    display: inline-flex;
    position: relative;
  }

  [data-title=""]:hover::after {
    display: none;
  }

  [data-title]:hover::after {
    opacity: 1;
    transition: all 0.1s ease 0.5s;
    visibility: visible;
  }

  [data-title]::after {
    content: attr(data-title);
    background-color: $active-green;
    border: 1px solid $dark-green;
    color: $dark-green;
    font-size: 150%;
    position: absolute;
    padding: 4px 9px;
    top: 18px;
    left: 65%;
    white-space: nowrap;
    opacity: 0;
    z-index: 99999;
    visibility: hidden;
     @include noto-sans-tc-14-medium;
}

[data-title] {
    position: relative;
}

</style>
