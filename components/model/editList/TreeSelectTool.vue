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
    <TreeSelect class="treeSelect" />
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
  height: 400px;
  border: 1px solid #C4DED8 !important;
  .treeSelect{
    overflow: auto;
    max-height: 300px;
    &::-webkit-scrollbar{
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track{
      background: #FFF;
    }
    &::-webkit-scrollbar-thumb{
      background: #A1BFB8;
    }
  }
  .subTitleTool{
    margin: 0.5em 5px;
  }
  .tree_wrap{
    margin: 0.5em 5px;
  }
  .icon{
    width: 25px;
    height: 25px;
    position:absolute;
    top: 0.75em;
    right: 0.5em;
    cursor: pointer;
  }
}
</style>
