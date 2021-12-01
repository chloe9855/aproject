<template>
  <div>
    <div class="title_wrap">
      <div class="wrap1">
        <img
          v-if="dropDown === true"
          :id="`pic-${item.id}`"
          :src="arrowPicHandler"
          class="arrow_pic"
          @click="showBlock = !showBlock"
        >
        <span>{{ item.LayerTitle }}</span>
      </div>
      <div class="wrap2">
        <ViewCheckBox-component
          :id="item.id"
          :visible="item.visible"
          @change="($event, id) => { $emit('changeVisible', $event, id, category, item.LayerName) }"
        />
        <SliderBar-component
          :id="item.id"
          :value="item.opacity"
          @update="(id, value) => { $emit('updateOpacity', id, value, category, item.LayerName) }"
        />
      </div>
    </div>

    <div
      v-if="showBlock === true"
      class="info_block"
    >
      <div v-if="item.type.length === 1">
        <img :src="require(`~/assets/img/${item.pic[0]}.svg`)">
      </div>

      <div v-if="item.type.length > 1">
        <div class="allshow">
          <span>全部顯示</span>
          <ViewCheckBox-component
            :id="`all-${item.id}`"
            :visible="item.allShow"
            @change="($event, id) => { $emit('setAllVisible', $event, id, item.LayerName) }"
          />
        </div>
        <div class="branch_block">
          <div
            v-for="typeItem in item.type"
            :key="typeItem.id"
            class="branch_item"
          >
            <div class="twrap">
              <span>{{ typeItem.name }}</span>
              <!-- <img :src="require(`~/assets/img/water-${typeItem.pic}.svg`)"> -->
            </div>

            <ViewCheckBox-component
              :id="typeItem.id"
              :visible="typeItem.visible"
              @change="($event, id) => { $emit('changeBranchVisible', $event, id, category, item.id, item.LayerName, typeItem.name, typeItem.subId) }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewCheckBox from '~/components/tools/ViewCheckBox.vue';
import SliderBar from '~/components/tools/SliderBar.vue';

export default {
  components: {
    'ViewCheckBox-component': ViewCheckBox,
    'SliderBar-component': SliderBar
  },
  props: {
    item: Object,
    dropDown: Boolean,
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showBlock: false
    };
  },
  methods: {

  },
  computed: {
    arrowPicHandler () {
      return (this.showBlock === false) ? require('~/assets/img/up-arrow.svg') : require('~/assets/img/down-arrow.svg');
    }
  }
};
</script>

<style lang="scss" scoped>

  .title_wrap {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
  }

  .wrap2 {
    display: flex;
  }

  .arrow_pic {
    margin-right: 8px;
    cursor: pointer;
  }

  .sliderbar {
    margin-left: 11px;
  }

  .info_block {
    padding: 8px 75px;
    background-color: #EFF4F3;

    .allshow {
      display: flex;
      justify-content: space-between;
      margin-left: -23px;
      padding: 10px 0;
      padding-right: 22px;
    }

    .branch_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      .view-checkbox {
        margin-right: 21px;
      }

      .twrap {
        display: flex;
        align-items: center;
        img {
          margin-left: 10px;
        }
      }
    }
  }

</style>
