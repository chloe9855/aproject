<template>
  <div class="inputBox">
    <InputVertical
      title="文件名稱"
      @inputValue="getFormName"
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
      :key="num"
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
      @checkList="getTableCheck"
      @tableEvent="getTableEvent"
      @inputData="getInputData"
    />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import Button from '~/components/tools/Buttons.vue';
import Table from '~/components/model/Table.vue';
// import { bulletinInputDataName, bulletinInputData } from '~/publish/bulletinData';
// import { addBulletin, editBulletin, uploadBulletinFile } from '~/api/bulletin';
import { addBulletin, uploadBulletinFile } from '~/api/bulletin';
// import { uploadBulletinFile } from '~/api/bulletin';
export default {
  components: {
    InputVertical: InputVertical,
    Button: Button,
    Table: Table
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
        name: 'addTable',
        head: [
          { title: '文件名稱' },
          { title: '文件' }
        ],
        body: [
          { val: 'addTable0', title: [{ type: 'input', key: 'a0' }, { type: 'btn', key: 'b0' }] }
        ]
      },
      delBtn: false,
      num: 0,
      formName: '',
      param: null,
      formData: new FormData(),
      dataName: [],
      delList: []
    };
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
      }
    },
    getInputData (e) {
      e.forEach((item, i) => {
        this.dataName[i] = item.val;
      });
    },
    addFile () {
      this.num += 1;
      this.tableList.body.push({ val: `addTable${this.num}`, title: [{ type: 'input', key: `a${this.num}` }, { type: 'btn', key: `b${this.num}` }] });
    },
    getFormName (e) {
      if (e) {
        this.formName = e;
      }
    },
    update (e) {
      console.log(e);
      const file = e.target.files[0];
      const param = new FormData(); // 建立form物件
      param.append('file', file);// 通過append向form物件新增資料
      console.log(param);
      this.param = param;
      console.log(this.param);
    },
    fileChange (e) {
      console.log(e);
      for (let i = 0; i < e.target.files.length; i++) {
        this.formData.append('file', e.target.files[i]); // 用迴圈抓出多少筆再append回來
      }
      console.log(this.formData);
    },
    upload () {
      // axios.post('http://localhost:11084/api/value/', this.formData);
      uploadBulletinFile(this.formData).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      });
    },
    delLink () {
      const delList = this.delList;
      console.log(this.tableList.body);
      console.log(delList);
      this.tableList.body = this.tableList.body.filter(function (v) { return delList.indexOf(v.val) === -1; });
      console.log(this.tableList.body);
      this.delBtn = false;
    }
  },
  computed: {},
  watch: {
    isSubmit: function (e) {
      const data = {
        name: this.formName,
        content: '',
        dataname: this.dataName,
        category: 2
      };
      if (e) {
        addBulletin(data).then(r => {
          uploadBulletinFile(r.data[0].bulletinsno, r.data[0].datasno, this.formData).then(r => {
            this.formData = new FormData();
            this.$store.commit('SET_POPUP_STATUS', { status: true });
            this.$emit('popupEvent', { icon: 'success', title: '已成功新增文件' });
          }).catch(e => {
            console.log(e);
          });
        }).catch(e => {
          console.log(e);
        });
      };
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
}
</style>
