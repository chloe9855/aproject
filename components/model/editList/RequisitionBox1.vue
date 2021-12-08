<template>
  <div class="requisitionBox">
    <div class="listBox flexBox">
      <InputHorizontal
        class="flex-3"
        title="姓名"
        input-text="請輸入姓名"
        @inputValue="getName"
      />
      <InputHorizontal
        class="flex-3"
        title="身份證字號"
        input-text="請輸入身分證字號"
        @inputValue="getID"
      />
      <DatePickerHorizontal
        class="flex-3"
        title="出生日期"
        @DateValue="getBirthDay"
      />
      <InputHorizontal
        class="flex-3"
        title="地址"
        input-text="請輸入地址"
        @inputValue="getAddress"
      />
      <InputHorizontal
        class="flex-3"
        title="請輸入連絡電話"
        input-text="請輸入姓名"
        @inputValue="getPhone"
      />
      <InputHorizontal
        title="匯款資訊"
        input-text="輸入金融帳戶"
        class="flex-2 transferInput"
        @inputValue="getTransfer"
      />
      <InputTool
        :search-input="bankList"
        class="flex-1 bankInput"
        filter-pos="right"
        :filter-w="500"
        :filter-h="80"
        @inputValue="getBank"
      />
    </div>
  </div>
</template>

<script>
import InputHorizontal from '~/components/tools/InputHorizontal';
import DatePickerHorizontal from '~/components/tools/DatePickerHorizontal';
import InputTool from '~/components/tools/InputTool';
export default {
  components: {
    InputHorizontal,
    DatePickerHorizontal,
    InputTool
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return { data: [{ title: '姓名', name: '', isRequire: true }, { title: '身份證字號', name: '', isRequire: true }, { title: '出生日期', name: '', isRequire: true }, { title: '地址', name: '', isRequire: true }, { title: '連絡電話', name: '', isRequire: true }, { title: '匯款資訊', name: '', isRequire: true, isSecondInput: true }] };
      }
    },
    bankList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: () => {
    return {
      member: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }],
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
  name: 'Requisition',
  methods: {
    getName (e) {
      if (e) {
        console.log(e);
      }
    },
    getID (e) {
      if (e) {
        console.log(e);
      }
    },
    getBirthDay (e) {
      if (e) {
        console.log(e);
      }
    },
    getAddress (e) {
      if (e) {
        console.log(e);
      }
    },
    getPhone (e) {
      if (e) {
        console.log(e);
      }
    },
    getTransfer (e) {
      if (e) {
        console.log(e);
      }
    },
    getBank (e) {
      if (e) {
        console.log(e);
      }
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
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
        margin-left: 10px;
    }
    div{
        line-height: 20px;
        text-align: left;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        align-items: center;
        color: #494949;
        margin: 1px 0;
    }
    .input-box{
      height: 40px;
    }
    .bankInput{
      height: 30px;
      padding: 5px 0;
      max-width: 108px;
    }
}
</style>
