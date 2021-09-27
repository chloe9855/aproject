<template>
  <li @click.stop="toggle">
    <div class="listItem">
      <div class="id">
        <div
          class="dropDownList"
          :class="{onDropDownArrow:isdropDownList}"
        />
        {{ tree.id }}
      </div>
      <div class="item">
        {{ tree.name }}
      </div>
      <div class="item">
        {{ tree.num }}
      </div>
      <div class="bar">
        <BarChart
          :setbar-length="tree.bar.barLength"
          :setbar-color="tree.bar.barColor"
          :setbar-width="tree.bar.barWidth"
        />
      </div>
    </div>
    <ul
      v-show="open"
      v-if="tree.node && tree.node.length > 0"
    >
      <BarList
        v-for="(node, index) in tree.node"
        :key="index"
        :tree="node"
      />
    </ul>
  </li>
</template>

<script>
import BarList from '~/components/model/BarList';
import BarChart from '~/components/tools/BarChart';
export default {
  components: {
    BarList,
    BarChart
  },
  props: {
    tree: {
      type: Object,
      default: () => {
        return {
          id: 1,
          name: '轄管地管理',
          num: 387,
          bar: { barLength: 0, barColor: 'blue', barWidth: 'bold' }

        };
      }
    }
  },
  data: () => {
    return {
      open: false
    };
  },
  name: 'BarList',
  methods: {
    toggle () {
      if (this.tree.node && this.tree.node.length > 0) {
        this.open = !this.open;
      }
    }
  },
  computed: {
    isdropDownList () {
      const tree = this.tree;
      if (tree.id && tree.node) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>
.listItem{
    display: flex;
    align-content: center;
    align-items: center;
    font-family: Noto Sans TC;
    font-size: 16px;
    color: #494949;
    .id{
        flex:1;
        position:relative;
    }
    .item{
        flex:2;
    }
    .bar{
        flex:15;
        display: flex;
        align-items: center;
    }
    div{
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .dropDownList{
        width: 0;
        height: 0;
        position: absolute;
        &.onDropDownArrow{
            border-style: solid;
            border-width: 4px 0 4px 6.9px;
            border-color: transparent transparent transparent #494949;
            top:1em;
            left:1em;
            cursor: pointer;
            &.active{
                border-width: 6.9px 4px 0 4px;
                border-color: #494949 transparent transparent transparent;
            }
        }
    }
}
</style>
