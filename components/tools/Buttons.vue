<template>
  <div class="wrappp">
    <!--  button-round  -->
    <div class="button-round">
      <img
        class="arrow"
        :src="require('~/assets/img/up-icon.svg')"
      >
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-primary -->
    <div class="button-primary">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-primary-disable -->
    <div class="button-primary-disable">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-default -->
    <div class="button-default">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-default-disable -->
    <div class="button-default-disable">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-link -->
    <div class="button-link">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-link-disable -->
    <div class="button-link-disable">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-red -->
    <div class="button-red">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-red-disable -->
    <div class="button-red-disable">
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-add -->
    <div class="button-add">
      <div class="add">
        <div class="ellipse-9" />
        <img
          class="vector"
          :src="require('~/assets/img/add-icon.svg')"
        >
      </div>
      <p class="button-text">
        按鈕
      </p>
    </div>

    <!-- button-add-disable -->
    <div class="button-add-disable">
      <div class="add">
        <div class="ellipse-9" />
        <img
          class="vector"
          :src="require('~/assets/img/add-icon.svg')"
        >
      </div>
      <p class="button-text">
        按鈕
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .wrappp {
    display: flex;
    justify-content: space-evenly;
    border: 1px solid goldenrod;
    padding: 20px;
  }

</style>
