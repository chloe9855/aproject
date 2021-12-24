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
// import { addBulletin } from '~/api/bulletin';
import { editBulletin, uploadBulletinFile } from '~/api/bulletin';
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
      originDataName: [],
      originDataData: [],
      delBtn: false,
      delList: [],
      num: 0,
      bulletinName: '',
      bulletinContent: '',
      InputData: [],
      data: [],
      isEdit: false,
      formName: '',
      param: null,
      formData: new FormData(),
      dataName: [],
      fileNum: 0
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
      } else if (e.event === 'isDel') {
        const num = 'tb' + e.myIndex;
        this.tableList.body = this.tableList.body.filter(item => item.val !== num);
        this.dataName = this.originDataName.filter((item, i) => i !== e.myIndex);
        this.originDataData = this.originDataData.filter((item, i) => i !== e.myIndex);
      }
    },
    getInputData (e) {
      e.forEach((item, i) => {
        this.dataName[i] = item.val;
      });
    },
    getBulletinName (e) {
      if (e) {
        this.bulletinName = e;
      }
    },
    getBulletinContent (e) {
      if (e) {
        console.log(e);
        this.bulletinContent = e;
      }
    },
    fileChange (e) {
      console.log(e);
      for (let i = 0; i < e.target.files.length; i++) {
        this.formData.append('file', e.target.files[i]); // 用迴圈抓出多少筆再append回來
        this.fileNum += i;
      }
      this.fileNum = e.target.files.length;
      console.log(this.formData);
    },
    getFormName (e) {
      if (e) {
        this.formName = e;
      }
    },
    delLink () {
      const delList = this.delList;
      const delListIndex = delList.map(x => x.split('b')[1]);
      this.originDataName = this.originDataName.filter(function (v, i) { return delListIndex.indexOf(i.toString()) === -1; });
      this.originDataData = this.originDataData.filter(function (v, i) { return delListIndex.indexOf(i.toString()) === -1; });
      this.tableList.body = this.tableList.body.filter(function (v) { return delList.indexOf(v.val) === -1; });
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
      const result = this.dataName.filter(item => this.originDataName.indexOf(item) === -1);
      const data = {
        bulletinsno: [this.originData.bulletinsno],
        name: this.bulletinName,
        content: this.bulletinContent,
        dataname: this.originDataName,
        data: this.originDataData,
        upload: {
          num: this.fileNum,
          newdataname: result
        }
      };
      console.log(data);
      if (e) {
        editBulletin(data).then(r => {
          console.log(this.fileNum);
          console.log(this.fileNum > 0);
          if (this.fileNum > 0) {
            uploadBulletinFile(r.data[0].bulletinsno, r.data[0].datasno, this.formData).then(r => {
              this.formData = new FormData();
              this.$store.commit('TOGGLE_POPUP_STATUS');
              this.$emit('popupEvent', { icon: 'success', title: '已成功編輯文件' });
            }).catch(e => {
              console.log(e);
            });
          } else {
            this.$store.commit('SET_POPUP_STATUS', { status: true });
          }
        }).catch(e => {
          console.log(e);
        });
      }
    },
    originData (e) {
      this.originDataLinkList = e.link;
      this.originDataSlogan = e.slogan;
      this.originDataContent = e.content;
      this.originDataName = e.name;
      this.originDataData = e.data;
      console.log(e);
      if (e.bulletinsno !== '') {
        this.isEdit = true;
      }
      console.log(e);
      e.rows.forEach((item) => {
        // console.log(item);
        // this.tableList.body.push({ val: `tb${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'text', key: `b${this.num}` }] });
        // this.num += 1;
        if (e.rows.length >= this.num) {
          this.tableList.body.push({ val: `tb${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'text', key: `b${this.num}` }] });
          this.num += 1;
        }
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
