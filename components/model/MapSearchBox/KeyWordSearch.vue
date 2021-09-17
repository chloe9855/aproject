<template>
  <div class="out_wrap">
    <Dropdown-component
      :options="dropList"
    />
    <InputTool-component
      :input-text="'輸入渠道關鍵字'"
    />
    <div class="bt_wrap">
      <Buttons-component
        :name="'button-default'"
        :text="'清除全部'"
      />
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import InputTool from '~/components/tools/InputTool.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'InputTool-component': InputTool,
    'Buttons-component': Buttons
  },
  data () {
    return {
      dropList: {
        option: [
          {
            title: '請選擇管理處',
            value: 0
          },
          {
            title: '選項1',
            value: 1
          },
          {
            title: '選項2',
            value: 2
          }
        ]
      }
    };
  },
  name: 'KeyWordSearch'
};
</script>

<style lang="scss" scoped>

  .out_wrap {
    padding: 0 20px;
  }
  .bt_wrap {
    padding: 8px 0 10px;
    display: flex;
    justify-content: flex-end;
  }

</style>
