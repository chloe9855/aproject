<template>
  <div class="shp__item">
    <div class="wrap1">
      {{ item.name }}
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
      <img
        class="street_map"
        :src="require('~/assets/img/street-map.svg')"
      >
      <img
        class="delete_icon"
        :src="require('~/assets/img/garbage.svg')"
        @click="$emit('delete')"
      >
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

    };
  }
};
</script>

<style lang="scss" scoped>

  .shp__item {
    background-color: #F5F5F5;
    display: flex;
    height: 40px;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;

    .wrap2 {
      display: flex;
      width: 200px;
      justify-content: space-evenly;
    }
  }

  .street_map , .delete_icon {
    cursor: pointer;
  }

</style>
