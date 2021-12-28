<template>
  <div class="container">
    <div class="title_wrap">
      <img
        v-show="indexNo!=='D'&&indexNo!=='E'"
        class="arrow"
        :src="picSrc2"
        @click="picToggler2(indexNo+'-'+sItem.no)"
      >
      <div class="theme_checkbox">
        <input
          :id="indexNo+'_'+sItem.no"
          v-model="isAll"
          type="checkbox"
          :indeterminate.prop="isIndeterminate"
          @change="$emit('changeMng', {isCheck:$event.target.checked,no:sItem.no,type:indexNo})"
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
            v-model="dataArr"
            :value="sItem.no+'_'+gItem.no"
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
    },
    checkObj: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      picSrc2: require('~/assets/img/up-arrow.svg'),
      isAll: false,
      isIndeterminate: false,
      dataArr: []
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
  },
  computed: {
  },
  watch: {
    isAll (n) {
      console.log(this.sItem);
      this.dataArr = [];
      if (n) {
        if (this.sItem.stn) {
          this.sItem.stn.forEach(gItem => {
            this.dataArr.push(this.sItem.no + '_' + gItem.no);
            this.$emit('changeStn', { isCheck: n, no: this.sItem.no + '_' + gItem.no, arr: [this.sItem.no, gItem.no], type: this.indexNo });
          });
        }
      } else {
        if (this.sItem.stn) {
          this.sItem.stn.forEach(gItem => {
            this.$emit('changeStn', { isCheck: n, no: this.sItem.no + '_' + gItem.no, arr: [this.sItem.no, gItem.no], type: this.indexNo });
          });
        }
      }
    },
    dataArr (e) {
      if (e) {
        if (this.sItem.stn.length > e.length && e.length !== 0) {
          this.isIndeterminate = true;
        } else if (e.length === this.sItem.stn.length) {
          this.isAll = true;
          this.isIndeterminate = false;
        } else if (e.length === 0) {
          this.isAll = false;
          this.isIndeterminate = false;
        } else {
          this.isIndeterminate = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>

  .theme_checkbox{
    input[type="checkbox"]:indeterminate + label
    {
      min-width: 150px;
    }
  }

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
