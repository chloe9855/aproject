<template>
  <div class="out_wrap">
    <p>請選擇管理處後，於圖面點選，顯示樁號</p>
    <Dropdown-component
      :options="dropList"
      :placeholders="'請選擇管理處'"
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
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'Buttons-component': Buttons
  },
  data () {
    return {
      dropList: [{ title: '01 宜蘭', value: '1' }]
    };
  },
  name: 'StakeSearch'
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

  p {
    color: #494949;
    @include noto-sans-tc-16-medium-line19;
  }

</style>
