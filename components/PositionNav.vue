<template>
  <div class="pos_wrap">
    <NavTabs-component
      :type-list="posOptions.typeList"
      :selected="posOptions.current"
      @current="payload => posOptions.current = payload"
    />
    <div class="pos_content">
      <Dropdown-component
        :options="dropListA1"
        :title="'管理處'"
      />
    </div>
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';
// import InputVertical from '~/components/tools/InputVertical.vue';
import Dropdown from '~/components/tools/Dropdown.vue';

export default {
  components: {
    'NavTabs-component': NavTabs,
    // 'InputVertical-component': InputVertical,
    'Dropdown-component': Dropdown
  },
  data () {
    return {
      posOptions: {
        current: 0,
        typeList: [
          {
            name: '灌溉分區',
            id: 0
          },
          {
            name: '地籍',
            id: 1
          },
          {
            name: '坐標',
            id: 2
          }
        ]
      },
      dropListA1: {
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
  }
};
</script>

<style lang="scss" scoped>

  .pos_wrap {
    width: 350px;
  }

  .pos_content {
    padding: 0 20px;
  }

</style>
