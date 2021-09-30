<template>
  <div class="tree_wrap">
    <div class="title_wrap">
      <img
        class="arrow"
        :src="arrowHandler1"
        @click="showBlock1 = !showBlock1"
      >

      <div class="theme_checkbox">
        <input
          id="ttt1"
          type="checkbox"
        >
        <label
          class="title"
          for="ttt1"
        >
          XXX管理處
        </label>
      </div>
    </div>

    <div
      v-if="showBlock1"
      class="block1"
    >
      <div class="title_wrap">
        <img
          class="arrow"
          :src="arrowHandler2"
          @click="showBlock2 = !showBlock2"
        >
        <div class="theme_checkbox">
          <input
            id="ttt2"
            type="checkbox"
          >
          <label
            class="title"
            for="ttt2"
          >
            XXX工作站
          </label>
        </div>
      </div>

      <div
        v-if="showBlock2"
        class="block2"
      >
        <div
          v-for="item in options"
          :key="item.id"
          class="title_wrap"
        >
          <div class="theme_checkbox">
            <input
              :id="item.id"
              type="checkbox"
            >
            <label
              class="title"
              :for="item.id"
            >
              {{ item.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showBlock1: false,
      showBlock2: false,
      options: [{ name: 'AA水利小組', id: '0' }, { name: 'BB水利小組', id: '1' }]
    };
  },
  methods: {

  },
  computed: {
    arrowHandler1 () {
      return (this.showBlock1 === false) ? require('~/assets/img/up-arrow.svg') : require('~/assets/img/down-arrow.svg');
    },
    arrowHandler2 () {
      return (this.showBlock2 === false) ? require('~/assets/img/up-arrow.svg') : require('~/assets/img/down-arrow.svg');
    }
  }
};
</script>

<style lang="scss" scoped>

  .tree_wrap {
    display: inline-block;
    color: $word-black;
    @include noto-sans-tc-16-regular-line16;

    .title_wrap {
      display: flex;
      align-items: center;

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
      .title_wrap {
        padding-bottom: 8px;
      }
    }
  }

</style>
