<template>
  <div class="requisitionBox">
    <div class="listBox flexBox">
      <InputHorizontal
        class="flex-3"
        title="代理人姓名"
        input-text="請輸入代理人姓名"
        @inputValue="getAgentName"
      />
      <InputHorizontal
        class="flex-3"
        title="代理人身分證字號"
        input-text="請輸入代理人身分證字號"
        @inputValue="getAgentID"
      />
      <InputHorizontal
        class="flex-3"
        title="代理人地址"
        input-text="請輸入代理人地址"
        @inputValue="getAgentAddress"
      />
      <InputHorizontal
        class="flex-3"
        title="代理人連絡電話"
        input-text="請輸入代理人連絡電話"
        @inputValue="getAgentPhone"
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
      agentInfo: {
        name: '',
        id: '',
        address: '',
        phone: ''
      },
      dataArr: []
    };
  },
  name: 'Requisition',
  methods: {
    getAgentName (e) {
      this.agentInfo.name = e;
      this.$emit('agentInfo', this.agentInfo);
    },
    getAgentID (e) {
      this.agentInfo.id = e;
      this.$emit('agentInfo', this.agentInfo);
    },
    getAgentAddress (e) {
      this.agentInfo.address = e;
      this.$emit('agentInfo', this.agentInfo);
    },
    getAgentPhone (e) {
      this.agentInfo.phone = e;
      this.$emit('agentInfo', this.agentInfo);
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
