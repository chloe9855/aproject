<template>
  <div>
    <div class="title_wrap">
      <div class="wrap1">
        <img
          :id="`pic-${item.id}`"
          :src="arrowPicHandler"
          class="arrow_pic"
          @click="showBlock = !showBlock"
        >
        <span>{{ item.name }}</span>
      </div>
      <div class="wrap2">
        <ViewCheckBox-component
          :id="item.id"
          :visible="item.visible"
          @change="($event, id) => { $emit('changeVisible', $event, id) }"
        />
        <SliderBar-component
          :id="item.id"
          :value="item.opacity"
          @update="(id, value) => { $emit('updateOpacity', id, value) }"
        />
      </div>
    </div>

    <div
      v-if="showBlock === true"
      class="info_block"
    >
      <div v-if="item.type.length === 1">
        <img :src="require('~/assets/img/yellow-block.svg')">
      </div>

      <div v-if="item.type.length > 1">
        <div class="allshow">
          <span>全部顯示</span>
          <!-- <ViewCheckBox-component
            :visible="true"
            @change="($event) => { $emit('setAllVisible', $event) }"
          /> -->
        </div>
        <div class="branch_block">
          <div
            v-for="lis in item.type"
            :key="lis.id"
            class="branch_item"
          >
            <span>{{ lis.name }}</span>
            <ViewCheckBox-component
              :id="lis.id"
              :visible="lis.visible"
              @change="($event) => { $emit('changeVisible', $event, id) }"
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
    item: Object
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
    }
  }

</style>
