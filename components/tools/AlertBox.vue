<template>
  <div>
    <div class="modal">
      <img
        class="close"
        :src="require('~/assets/img/close-icon.svg')"
      >
      <img
        class="icon"
        :src="require('~/assets/img/alert-icon.svg')"
      >
      <p class="title">
        小標題文字文字文字
      </p>
      <p class="text">
        警示文字警示文字警示文字警示文字警示文字警示文字警示文字警示文字警示文字
      </p>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>

  .modal {
    width: 350px;
  }

</style>
