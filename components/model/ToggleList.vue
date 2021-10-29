<template>
  <div
    class="toggleList"
  >
    <div
      class="listTitle"
    >
      <div
        v-for="( item,index ) in listHeader.data"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <ul id="root">
      <BarList
        v-for="( item,index ) in treeData"
        :key="index"
        :tree="item"
      />
    </ul>
  </div>
</template>

<script>
import BarList from '~/components/model/BarList';
export default {
  components: {
    BarList
  },
  props: {
    listHeader: {
      type: Object,
      default: () => {
        return {
          data: ['項目', '工具名稱', '已使用次數', '統計圖表']
        };
      }
    }
  },
  data: () => {
    return {
      treeData: [
        {
          id: 1,
          name: '轄管地管理',
          num: 387,
          bar: { barLength: 20, barColor: 'green', barWidth: 'bold' }
        },
        {
          id: 2,
          name: '灌溉地管理',
          num: 20387,
          bar: { barLength: 60, barColor: 'orange', barWidth: 'bold' }
        },
        {
          id: 3,
          name: '系統管理',
          num: 201,
          bar: { barLength: 30, barColor: 'blue', barWidth: 'bold' }
        },
        {
          id: 4,
          name: '地理資訊圖台',
          num: 1000,
          bar: { barLength: 20, barColor: 'red', barWidth: 'bold' },
          node: [
            {
              name: '圖層工具',
              num: 12,
              bar: { barLength: 10, barColor: 'red', barWidth: 'thin' }
            },
            {
              name: '地理資訊圖台',
              num: 17,
              bar: { barLength: 50, barColor: 'red', barWidth: 'thin' }
            }
          ]
        }
      ]
    };
  },
  name: 'ToggleList',
  methods: {

  },
  computed: {

  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>
.toggleList{
  border: 1px solid $light-green;
  margin: 0 auto;
}
.listTitle{
    display: flex;
    align-content: center;
    align-items: center;
    font-family: Noto Sans TC;
    color: #111;
    border-bottom: 5px solid #3e9f88;
    font-weight: 500;
    font-size: 16px;
    div{
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    div:nth-child(1){
        flex: 2;
    }
    div:nth-child(2){
        flex: 3;
    }
    div:nth-child(3){
        flex: 3;
    }
    div:nth-child(4){
        text-align: left;
        flex: 15;
    }
}
</style>
