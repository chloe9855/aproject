<template>
  <div class="requisitionBox">
    <div class="listBox flexBox">
      <InputHorizontal
        v-for="(item , index) in option.data"
        :key="index"
        :class="{twoColume:item.isSecondInput}"
        class="flex-3"
        :title="item.title"
        :is-second-input="item.isSecondInput"
      />
    </div>
  </div>
</template>

<script>
import InputHorizontal from '~/components/tools/InputHorizontal';
export default {
  components: {
    InputHorizontal
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return { data: [{ title: '姓名', name: '', isRequire: true }, { title: '身份證字號', name: '', isRequire: true }, { title: '出生日期', name: '', isRequire: true }, { title: '地址', name: '', isRequire: true }, { title: '連絡電話', name: '', isRequire: true }, { title: '匯款資訊', name: '', isRequire: true, isSecondInput: true }] };
      }
    }
  },
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      options: {
        current: 0,
        typeList: [
          {
            name: '依管理單位',
            id: 0
          },
          {
            name: '依單筆地號',
            id: 1
          }
        ]
      },
      dataArr: []
    };
  },
  name: 'LandSearch',
  computed: {
  }
};
</script>

<style lang="scss">
.requisitionBox{
  margin: 1em auto;
  background: #EFF4F3;
  padding: 0;
}
.listBox{
    display: flex;
    margin: 5px 0;
    flex-wrap: wrap;
    .listTitle{
        padding-right: 2em;
        min-width: 100px;
    }
    div{
        line-height: 40px;
        text-align: left;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        align-items: center;
        color: #494949;
    }
}
</style>
