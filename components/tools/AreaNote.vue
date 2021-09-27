<template>
  <div style="display: inline-block;">
    <div class="important-note">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '檔案支援格式: *.pdf、*.doc，大小以5MB為限'
    }
  }
};
</script>

<style lang="scss">

  .important-note {
    background-color: $active-green;
    padding: 4px 9px;
    display: flex;
    align-items: center;
    border: 1px solid $dark-green;
    color: $dark-green;
    @include noto-sans-tc-14-medium;
  }

</style>
