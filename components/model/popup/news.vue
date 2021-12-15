<template>
  <div class="inputBox">
    <InputVertical
      title="公告名稱"
      @inputValue="getBulletinName"
    />
    <Textarea
      title="公告內容"
      @textContent="getBulletinContent"
    />
    <div class="buttonBox">
      <Button
        v-show="delBtn"
        :name="'button-red'"
        :text="'刪除所選'"
      />
      <Button
        :name="'button-add'"
        :text="'新增連結'"
        :add="true"
        @click="addLink"
      />
    </div>
    <Table
      :key="num"
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
      @inputData="getInputData"
      @checkList="getTableCheck"
    />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import Button from '~/components/tools/Buttons.vue';
import Table from '~/components/model/TableForJoy.vue';
import Textarea from '~/components/tools/Textarea.vue';
import { bulletinInputDataName, bulletinInputData } from '~/publish/bulletinData';
import { addBulletin } from '~/api/bulletin';

export default {
  components: {
    InputVertical,
    Button,
    Table,
    Textarea
  },
  props: {
    isSubmit: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      tableList: {
        name: 'addNews',
        head: [
          { title: '連結名稱' },
          { title: '連結網址' }
        ],
        body: [
          { val: 'news0', title: [{ type: 'input', key: 'a0' }, { type: 'input', key: 'b0' }] }
        ]
      },
      bulletinName: '',
      bulletinContent: '',
      InputData: [],
      dataname: [],
      data: [],
      delBtn: false,
      num: 0
    };
  },
  methods: {
    getInputData (e) {
      if (e) {
        this.InputData = e;
        this.dataname = bulletinInputData(e);
        this.data = bulletinInputDataName(e);
      }
    },
    getBulletinName (e) {
      if (e) {
        this.bulletinName = e;
      }
    },
    getBulletinContent (e) {
      if (e) {
        this.bulletinContent = e;
      }
    },
    getTableCheck (e) {
      if (e) {
        if (e.length > 1) {
          this.delBtn = true;
        } else {
          this.delBtn = false;
        };
      }
    },
    addLink () {
      this.num += 1;
      this.tableList.body.push({ val: `news${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'input', key: `b${this.num}` }] });
      console.log(this.tableList);
    }
  },
  computed: {},
  watch: {
    isSubmit (n) {
      if (n) {
        const data = `name=${this.bulletinName}&content=${this.bulletinContent}&data=${this.data}&dataname=${this.dataname}`;
        addBulletin(data).then(r => {
          console.log(r);
          this.$emit('submitSuccess', true);
        }).catch(e => {
          console.log(e);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 1em;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  .button_wrap:first-child{
    margin: 0 0.25em;
  }
}
</style>
