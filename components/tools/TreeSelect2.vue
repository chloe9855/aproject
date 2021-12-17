<template>
  <div class="container">
    <div class="title_wrap">
      <img
        class="arrow"
        :src="picSrc2"
        @click="picToggler2(indexNo+'-'+sItem.no)"
      >
      <div class="theme_checkbox">
        <input
          :id="indexNo+'_'+sItem.no"
          type="checkbox"
          @change="$emit('changeMng', {isCheck:$event.target.checked,no:sItem.no})"
        >
        <label
          class="title"
          :for="indexNo+'_'+sItem.no"
        >
          {{ sItem.title }}
        </label>
      </div>
    </div>

    <div
      :class="`block22-${indexNo}-${sItem.no}`"
      class="block2"
    >
      <div
        v-for="gItem in sItem.stn"
        :key="gItem.no"
        class="title_wrap"
      >
        <div class="theme_checkbox">
          <input
            :id="indexNo+'_'+sItem.no+gItem.no"
            type="checkbox"
            @change="$emit('changeStn', {isCheck:$event.target.checked,no:sItem.no+'_'+gItem.no,arr:[sItem.no,gItem.no],type:indexNo})"
          >
          <label
            class="title"
            :for="indexNo+'_'+sItem.no+gItem.no"
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
    },
    indexNo: {
      type: String,
      default: ''
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
