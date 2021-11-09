<template>
  <div class="tree_wrap">
    <div class="title_wrap">
      <img
        class="arrow"
        :src="picSrc"
        @click="picToggler(myItem.id)"
      >

      <div class="theme_checkbox">
        <input
          :id="myItem.id"
          type="checkbox"
        >
        <label
          class="title"
          :for="myItem.id"
        >
          {{ myItem.ia }}
        </label>
      </div>
    </div>

    <div
      :class="`block-${myItem.id}`"
      class="block11"
    >
      <div
        v-for="sItem in myItem.stn"
        :key="sItem.no"
        class="block1"
      >
        <TreeSelect2
          :s-item="sItem"
        />
      </div>
      <!-- <div
        v-for="sItem in myItem.stn"
        :key="sItem.no"
        class="block1"
      >
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
      </div> -->
    </div>
  </div>
</template>

<script>
import TreeSelect2 from '~/components/tools/TreeSelect2.vue';

export default {
  components: {
    TreeSelect2: TreeSelect2
  },
  props: {
    myItem: {
      type: Object
    }
  },
  data () {
    return {
      picSrc: require('~/assets/img/up-arrow.svg')

    };
  },
  methods: {
    picToggler (id) {
      if (this.picSrc === require('~/assets/img/up-arrow.svg')) {
        this.picSrc = require('~/assets/img/down-arrow.svg');
        document.querySelector(`.block-${id}`).style.display = 'block';
      } else {
        this.picSrc = require('~/assets/img/up-arrow.svg');
        document.querySelector(`.block-${id}`).style.display = 'none';
      }
    }
  }
};
</script>

<style lang="scss" scoped>

  .block11 {
    display: none;
  }

  .tree_wrap {
    display: inline-block;
    color: $word-black;
    width: 200px;
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
