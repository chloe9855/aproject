<template>
  <div class="container">
    <div class="title_wrap">
      <img
        class="arrow"
        :src="picSrc2"
        @click="picToggler2(sItem.no)"
      >
      <div class="theme_checkbox">
        <input
          :id="sItem.no"
          type="checkbox"
        >
        <label
          class="title"
          :for="sItem.no"
        >
          {{ sItem.title }}
        </label>
      </div>
    </div>

    <div
      :class="`block22-${sItem.no}`"
      class="block2"
    >
      <div
        v-for="gItem in sItem.grp"
        :key="gItem.no"
        class="title_wrap"
      >
        <div class="theme_checkbox">
          <input
            :id="gItem.no"
            type="checkbox"
          >
          <label
            class="title"
            :for="gItem.no"
          >
            {{ gItem.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    sItem: {
      type: Object
    }
  },
  data () {
    return {
      picSrc2: require('~/assets/img/up-arrow.svg')

    };
  },
  methods: {
    picToggler2 (id) {
      if (this.picSrc2 === require('~/assets/img/up-arrow.svg')) {
        this.picSrc2 = require('~/assets/img/down-arrow.svg');
        document.querySelector(`.block22-${id}`).style.display = 'block';
      } else {
        this.picSrc2 = require('~/assets/img/up-arrow.svg');
        document.querySelector(`.block22-${id}`).style.display = 'none';
      }
    }
  }

};
</script>

<style lang="scss" scoped>

  .block11 {
    display: none;
  }

  .container {
    display: inline-block;
    color: $word-black;
    @include noto-sans-tc-16-regular-line16;

    .title_wrap {
      display: flex;
      align-items: center;
      width: 150px;

      .arrow {
      cursor: pointer;
    }

      .title {
        margin-left: 5px;
      }
    }

    .block1 {
      padding: 8px 0 8px 36px;
    }

    .block2 {
      padding: 8px 0 8px 36px;
      display: none;
      .title_wrap {
        padding-bottom: 8px;
      }
    }
  }

</style>
