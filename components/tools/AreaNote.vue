<template>
  <div style="display: inline-block;">
    <div class="important-note">
      地籍面積8000平方公尺
    </div>
  </div>
</template>

<script>
export default {

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
