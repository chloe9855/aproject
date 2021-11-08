<template>
  <div class="out_wrap">
    <Dropdown-component
      :options="member"
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
      member: [{ title: '01 宜蘭', value: '1' }, { title: '02 宜蘭', value: '2' }, { title: '03 宜蘭', value: '3' }, { title: '04 宜蘭', value: '4' }]
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
