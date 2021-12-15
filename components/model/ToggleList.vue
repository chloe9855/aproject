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
        v-for="( item,index ) in allTreeData"
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
    },
    allTreeData: Array
  },
  data: () => {
    return {
      treeData: [
        {
          id: 1,
          name: '首頁',
          num: 387,
          bar: { barLength: 20, barColor: 'green', barWidth: 'bold' }
        },
        {
          id: 2,
          name: '灌溉地管理',
          num: 20387,
          bar: { barLength: 60, barColor: 'orange', barWidth: 'bold' },
          node: [
            {
              name: '灌溉地籍查詢',
              num: 15,
              bar: { barLength: 10, barColor: 'orange', barWidth: 'thin' }
            },
            {
              name: '停灌補償申報',
              num: 16,
              bar: { barLength: 50, barColor: 'orange', barWidth: 'thin' }
            },
            {
              name: '停灌資料異動',
              num: 15,
              bar: { barLength: 10, barColor: 'orange', barWidth: 'thin' }
            },
            {
              name: '統計報表',
              num: 16,
              bar: { barLength: 50, barColor: 'orange', barWidth: 'thin' }
            }
          ]
        },
        {
          id: 3,
          name: '地理資訊圖台',
          num: 201,
          bar: { barLength: 30, barColor: 'red', barWidth: 'bold' },
          node: [
            {
              name: '圖層工具',
              num: 12,
              bar: { barLength: 10, barColor: 'red', barWidth: 'thin' }
            },
            {
              name: '街景工具',
              num: 17,
              bar: { barLength: 50, barColor: 'red', barWidth: 'thin' }
            },
            {
              name: '測量工具',
              num: 12,
              bar: { barLength: 10, barColor: 'red', barWidth: 'thin' }
            },
            {
              name: '截圖工具',
              num: 17,
              bar: { barLength: 50, barColor: 'red', barWidth: 'thin' }
            },
            {
              name: '定位工具',
              num: 12,
              bar: { barLength: 10, barColor: 'red', barWidth: 'thin' }
            },
            {
              name: '查詢工具',
              num: 17,
              bar: { barLength: 50, barColor: 'red', barWidth: 'thin' }
            }
          ]
        },
        {
          id: 4,
          name: '作業基金地管理',
          num: 1000,
          bar: { barLength: 20, barColor: 'blue', barWidth: 'bold' }
        },
        {
          id: 5,
          name: '系統管理',
          num: 20387,
          bar: { barLength: 60, barColor: 'lightGreen', barWidth: 'bold' },
          node: [
            {
              name: '帳號管理',
              num: 15,
              bar: { barLength: 10, barColor: 'lightGreen', barWidth: 'thin' }
            },
            {
              name: '群組權限管理',
              num: 16,
              bar: { barLength: 50, barColor: 'lightGreen', barWidth: 'thin' }
            },
            {
              name: '首頁資料管理',
              num: 15,
              bar: { barLength: 10, barColor: 'lightGreen', barWidth: 'thin' }
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
