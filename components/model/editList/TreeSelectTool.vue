<template>
  <div class="treeSelectBox flexBox">
    <img
      alt=""
      class="icon"
      :src="require('~/assets/img/print.svg')"
      @click="getFile"
    >
    <SubTitleTool
      :title="title"
      class="w-100"
      :is-small="true"
    />
    <TreeSelect
      class="treeSelect"
      :all-options="options"
      :index-no="indexNo"
      @getQuery="getQuery"
      @getMng="getMng"
    />
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
    },
    link: {
      type: String,
      default: ''
    },
    indexNo: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      query: [],
      queryA: [],
      queryB: [],
      queryD: [],
      queryE: []
    };
  },
  name: 'TreeSelectBox',
  methods: {
    select (e) {
      console.log(e);
    },
    getQuery (e) {
      console.log(e.no);
      if (e.isCheck) {
        this.query.push(e.no);
      } else {
        const a = this.query.indexOf(e.no);
        if (a > -1) {
          this.query.splice(a, 1);
        }
      }
      if (e.type === 'A') {
        this.queryA = this.query.map(x => x.split('_'));
        this.$emit('query', { data: this.queryA, type: 'A' });
      } else if (e.type === 'B') {
        this.queryB = this.query.map(x => x.split('_'));
        this.$emit('query', { data: this.queryB, type: 'B' });
      }

      console.log(this.query);
      console.log(this.queryA);
      console.log(this.queryB);
    },
    getMng (e) {
      console.log(e);
      if (e.type === 'D') {
        this.queryD = this.query.map(x => x.split('_'));
        this.$emit('query', { type: 'D', no: e.no });
      } else if (e.type === 'E') {
        this.queryE = this.query.map(x => x.split('_'));
        this.$emit('query', { type: 'E', no: e.no });
      }
    },
    getFile () {
      console.log(this.link);
      if (this.link !== '') {
        window.location = this.link;
      }
    }
  }
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
