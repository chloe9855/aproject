<template>
  <div class="screen_wrap">
    <InputVertical-component
      name="請輸入地圖標題"
      title="地圖標題"
    />
    <div class="bt_wrap">
      <Buttons-component
        :name="'button-default'"
        :text="'清除全部'"
      />
      <Buttons-component
        :text="'PDF下載'"
      />
      <Buttons-component
        :text="'JPG下載'"
        @click="$emit('addJPG')"
      />
    </div>
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'InputVertical-component': InputVertical,
    'Buttons-component': Buttons
  }
};
</script>

<style lang="scss" scoped>

  .screen_wrap {
    width: 310px;
    padding: 10px 20px 0 20px;
  }

  .bt_wrap {
    display: flex;
    margin-top: 5px;
    justify-content: flex-end;

    div:nth-child(2) {
      margin: 0 5px;
    }
  }

</style>
