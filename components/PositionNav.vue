<template>
  <div class="pos_wrap">
    <NavTabs-component
      :type-list="posOptions.typeList"
      @current="payload => posOptions.current = payload"
    />
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';

export default {
  components: {
    'NavTabs-component': NavTabs
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
      }
    };
  }
};
</script>

<style lang="scss" scoped>

  .pos_wrap {
    width: 350px;
  }

</style>
