<template>
  <div class="inputBox theme_scrollbar">
    <InputVertical
      title="文件名稱"
      :add-text="originDataSlogan"
      @inputValue="getBulletinName"
    />
    <div class="buttonBox">
      <Button
        v-show="delBtn"
        :name="'button-red'"
        :text="'刪除所選'"
        @click="delLink"
      />
      <Button
        :name="'button-add'"
        :text="'新增檔案'"
        :add="true"
        @click="addFile"
      />
      <input
        v-show="false"
        ref="file"
        multiple
        type="file"

        @change="fileChange"
      >
    </div>
    <Table
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
      :origin-input="originDataLinkList"
      :is-no-data-bg="true"
      @checkList="getTableCheck"
      @tableEvent="getTableEvent"
      @inputData="getInputData"
    />
    <!-- <div class="buttonBox">
      <Button
        :name="'button-default-disable'"
        :text="'取消'"
      />
      <Button
        :name="'button-primary'"
        :text="'新增'"
      />
    </div> -->
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import Button from '~/components/tools/Buttons.vue';
import Table from '~/components/model/TableForBulletin.vue';
// import { bulletinInputDataName, bulletinInputData } from '~/publish/bulletinData';
// import { addBulletin, editBulletin, uploadBulletinFile } from '~/api/bulletin';
import { addBulletin } from '~/api/bulletin';
export default {
  components: {
    InputVertical,
    Button,
    Table
  },
  props: {
    isSubmit: {
      type: Boolean,
      default: false
    },
    originData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data: () => {
    return {
      tableList: {
        head: [
          { title: '文件名稱' },
          { title: '文件' }
        ],
        body: []
      },
      originDataLinkList: {},
      originDataSlogan: '',
      originDataContent: '',
      delBtn: false,
      delList: [],
      num: 0
    };
  },
  name: 'EditFileData',
  mounted () {
    console.log(this.originData);
  },
  methods: {
    getTableCheck (e) {
      this.delList = e;
      if (e) {
        if (e.length > 0) {
          this.delBtn = true;
          e.forEach((item, i) => {
            this.dataName[i] = item.val;
          });
        } else {
          this.delBtn = false;
        };
      }
    },
    getTableEvent (e) {
      console.log(e);
      if (e.event === 'btnEvent') {
        this.$refs.file.click();
      } else if (e === 'isDel') {
        console.log(e);
        console.log(this.tableList.body);
      }
    },
    getInputData (e) {
      e.forEach((item, i) => {
        this.dataName[i] = item.val;
      });
    },
    fileChange (e) {
      console.log(e);
      for (let i = 0; i < e.target.files.length; i++) {
        this.formData.append('file', e.target.files[i]); // 用迴圈抓出多少筆再append回來
      }
      console.log(this.formData);
    },
    getFormName (e) {
      if (e) {
        this.formName = e;
      }
    },
    delLink () {
      const delList = this.delList;
      console.log(this.tableList.body);
      console.log(delList);
      this.tableList.body = this.tableList.body.filter(function (v) { return delList.indexOf(v.val) === -1; });
      console.log(this.tableList.body);
      this.delBtn = false;
    },
    addFile () {
      this.num += 1;
      this.tableList.body.push({ val: `addTable${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'btn', key: `b${this.num}` }] });
    }
  },
  watch: {
    isSubmit: function (e) {
      console.log(e);
      data = {
        name: '公告1221',
        content: '',
        dataname: ['檔案A', '檔案B']
      };
      addBulletin(data).then(r => {
        console.log(r);
        // uploadBulletinFile(){

        // }
      }).catch(n => {
        console.log(e);
      });
    },
    originData (e) {
      console.log('originData');
      console.log(this.originData);
      this.originDataLinkList = e.link;
      this.originDataSlogan = e.slogan;
      this.originDataContent = e.content;
      console.log(e);
      if (e.ID !== '') {
        this.isEdit = true;
      }
      console.log(e);
      e.rows.forEach((item) => {
        console.log(item);
        this.tableList.body.push({ val: `tb${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'text', key: `b${this.num}` }] });
        this.num += 1;
      });
      console.log(this.tableList.body);
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
  margin-top: 20px;
}
.box{
  margin: 0.5em auto;
}
</style>
