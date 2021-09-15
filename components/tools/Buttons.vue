<template>
  <div :class="name">
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
    }
  }
};
</script>
