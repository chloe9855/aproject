<template>
  <div class="treeSelectBox flexBox">
    <img
      alt=""
      class="icon"
      :src="require('~/assets/img/print.svg')"
    >
    <SubTitleTool
      :title="title"
      class="w-100"
      :is-small="true"
    />
    <TreeSelect />
  </div>
</template>

<script>
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import TreeSelect from '~/components/tools/TreeSelect.vue';
export default {
  components: {
    SubTitleTool,
    TreeSelect
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  name: 'TreeSelectBox'
};
</script>

<style lang="scss">
.treeSelectBox{
  margin: 1em auto;
  background: #EFF4F3;
  flex-direction: column;
  position: relative;
  min-height: 200px;
  .subTitleTool{
    margin: 0.5em 5px;
  }
  .tree_wrap{
    margin: 0.5em 5px;
  }
  .icon{
    width: 16px;
    height: 16px;
    position:absolute;
    top: 1em;
    right: 0.5em;
    cursor: pointer;
  }
}
</style>
