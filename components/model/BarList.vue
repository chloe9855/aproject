<template>
  <ul>
    <li
      v-for="( item ) in listData.data"
      :key="item.id"
    >
      <div class="listItem">
        <div class="id">
          <div class="dropDownList" />
          {{ item.id }}
        </div>
        <div class="item">
          {{ item.title }}
        </div>
        <div class="item">
          {{ item.num }}
        </div>
        <div class="bar">
          <BarChart
            :setbar-length="item.bar.barLength"
            :setbar-color="item.bar.barColor"
            :setbar-width="item.bar.barWidth"
          />
        </div>
      </div>
      <ul
        v-show="open"
        v-if="item.childList && item.childList > 0"
      >
        <li
          v-for="( childItem,childIndex ) in item.childList"
          :key="childIndex"
        >
          <div class="listItem">
            <div class="id" />
            <div class="item">
              {{ childItem.title }}
            </div>
            <div class="item">
              {{ childItem.num }}
            </div>
            <div class="bar">
              <BarChart
                :setbar-length="childItem.bar.barLength"
                :setbar-color="childItem.bar.barColor"
                :setbar-width="childItem.bar.barWidth"
              />
            </div>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import BarChart from '~/components/tools/BarChart';
export default {
  components: {
    BarChart
  },
  props: {
    listData: {
      type: Object,
      default: () => {
        return {
          data: [
            { id: 1, title: '轄管地管理', num: '387', bar: { barLength: 50, barColor: 'green', barWidth: 'bold' }, childList: [] },
            {
              id: 2,
              title: 'GIS地圖',
              num: '201',
              bar: { barLength: 40, barColor: 'red', barWidth: 'bold' },
              childList: {
                data: [
                  { title: '圖層工具', num: 12, bar: { barLength: 20, barColor: 'red', barWidth: 'thin' } },
                  { title: '定位工具', num: 17, bar: { barLength: 30, barColor: 'red', barWidth: 'thin' } }
                ]
              }
            }
          ]
        };
      }
    }
  },
  data: () => {
    return {

    };
  },
  name: 'BarList',
  methods: {

  },
  computed: {

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
        border-style: solid;
        border-width: 4px 0 4px 6.9px;
        border-color: transparent transparent transparent #494949;
        position: absolute;
        top:1em;
        left:1em;
        &.active{
            border-width: 6.9px 4px 0 4px;
            border-color: #494949 transparent transparent transparent;
        }
    }
}
</style>
