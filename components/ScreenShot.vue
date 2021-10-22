<template>
  <div class="screen_wrap">
    <InputVertical-component
      v-model="titleValue"
      name="請輸入地圖標題"
      title="地圖標題"
      :change-text="titleValue"
    />
    <div class="bt_wrap">
      <Buttons-component
        :name="'button-default'"
        :text="'清除全部'"
        @click="clearAll"
      />
      <Buttons-component
        :text="'PDF下載'"
        @click="$emit('addPDF')"
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
  },
  data () {
    return {
      titleValue: ''
    };
  },
  methods: {
    clearAll () {
      this.titleValue = '';
    }
  },
  watch: {
    titleValue: {
      handler (value) {
        this.$emit('update', value);
      }
    }
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
