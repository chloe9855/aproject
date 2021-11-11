<template>
  <div>
    <div
      v-for="mItem in allOptions"
      :key="mItem.id"
    >
      <TreeSelect55
        :my-item="mItem"
        @changeIa="iaHandler"
        @changeStn="stnHandler"
        @changeGrp="grpHandler"
      />
    </div>
  </div>
</template>

<script>
import TreeSelect55 from '~/components/tools/TreeSelect55.vue';

export default {
  components: {
    TreeSelect55: TreeSelect55
  },
  props: {
    allOptions: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            ia: '嘉南管理處',

            stn: [
              { title: '南基工作站', no: 555, grp: [{ name: '北北水利小組', no: 111, isChecked: false }, { name: 'uu水利小組', no: 541, isChecked: false }, { name: 'yy水利小組', no: 657, isChecked: false }] },
              { title: 'uu工作站', no: 475, grp: [{ name: 'ee水利小組', no: 888, isChecked: false }, { name: 'tt水利小組', no: 755, isChecked: false }, { name: 'll水利小組', no: 442, isChecked: false }] },
              { title: 'oo工作站', no: 588, grp: [{ name: 'ii水利小組', no: 463, isChecked: false }, { name: 'aa水利小組', no: 774, isChecked: false }, { name: 'fg水利小組', no: 521, isChecked: false }] }
            ]
          },
          {
            id: 2,
            ia: '宜蘭管理處',

            stn: [
              { title: 'mm工作站', no: 86, grp: [{ name: 'tt水利小組', no: 45, isChecked: false }, { name: 'ui利小組', no: 466, isChecked: false }, { name: 'yy水利小組', no: 51, isChecked: false }] },
              { title: 'ii工作站', no: 76, grp: [{ name: 'ei水利小組', no: 12, isChecked: false }, { name: 'ti水利小組', no: 255, isChecked: false }, { name: 'lu水利小組', no: 88, isChecked: false }] },
              { title: 'pop工作站', no: 99, grp: [{ name: 'io水利小組', no: 13, isChecked: false }, { name: 'ao水利小組', no: 356, isChecked: false }, { name: 'fi水利小組', no: 100, isChecked: false }] }
            ]
          }
        ];
      }
    }
  },
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {
    iaHandler ($event, name) {
      this.$emit('select', $event, name);
    },
    stnHandler ($event, name) {
      this.$emit('select', $event, name);
    },
    grpHandler ($event, name) {
      this.$emit('select', $event, name);
    }
  }
};
</script>

<style lang="scss" scoped>

  .block11 {
    display: none;
  }

  .tree_wrap {
    display: inline-block;
    color: $word-black;
    width: 200px;
    @include noto-sans-tc-16-regular-line16;

    .title_wrap {
      display: flex;
      align-items: center;
      width: 150px;

      .arrow {
      cursor: pointer;
    }

      .title {
        margin-left: 5px;
      }
    }

    .block1 {
      padding: 8px 0 8px 36px;
    }

    .block2 {
      padding: 8px 0 8px 36px;
      display: none;
      .title_wrap {
        padding-bottom: 8px;
      }
    }
  }

</style>
