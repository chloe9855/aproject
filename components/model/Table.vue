<template>
  <div
    class="tableTool"
    :class="{isNoData:isShowBg}"
  >
    <div
      v-show="!isShowBg && isCheck"
      class="tableBox tableCheck"
    >
      <table :style="{'height':tableColumnH+'px'}">
        <thead>
          <tr>
            <th
              class="checkBoxOption"
            >
              <input
                id="all"
                type="checkBox"
                name="all"
                value="all"
              ><label for="all" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="( item, index ) in tableColumnBody"
            :key="index"
          >
            <td
              v-show="isCheck"
              class="checkBoxOption"
            >
              <input
                :id="'a'+index"
                v-model="checkList"
                type="checkbox"
                :name="'a'+index"
                :value="item.val"
              ><label :for="'a'+index" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tableBox w-100 tableContent">
      <table
        ref="tableContent"
        class="w-100"
      >
        <thead>
          <tr>
            <th v-show="isCheck" />
            <th
              v-for="( item, index ) in tableColumn.head"
              :key="index"
            >
              {{ item.title }}
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="( item, index ) in tableColumnBody"
            :key="index"
          >
            <td
              v-show="isCheck"
              :style="{'min-width':'35px'}"
            />
            <td
              v-for="( text, textIndex ) in item.title"
              :key="textIndex"
            >
              <Tag
                v-if="tagList.indexOf(text)>-1"
                :tag-list="tagList"
                :text="text"
              />
              <Button
                v-else-if="typeof text === 'object' && text.type === 'btn'"
                :name="'button-primary'"
                :text="text.title"
              />
              <Input
                v-else-if="typeof text === 'object' && text.type === 'input'"
                :key="item.id"
                :input-id="item.id"
                :input-text="text.title"
                @inputValue="inputVal"
              />
              <DatePicker
                v-else-if="typeof text === 'object' && text.type === 'date'"
                :key="item.id"
                :input-id="item.id"
                :type="text.dateType"
                :value-type="text.valueType"
                @DateValue="dateVal"
              />
              <span v-else>{{ text }}</span>
            </td>
            <td
              v-if="optionLength>0"
              :colspan="optionLength"
              :style="{'min-width': (optionLength*35)+'px'}"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="optionLength>0"
      class="tableBox tableBtn"
    >
      <table :style="{'height':tableColumnH+'px'}">
        <thead>
          <tr>
            <th
              :colspan="optionLength"
            />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="( item, index ) in tableColumnBody"
            :key="index"
          >
            <td
              v-show="isEdit"
              class="editOption"
            >
              <div @click="$emit('clickIcon', 'isEdit')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/edit.svg')"
                >
              </div>
            </td>
            <td
              v-show="isDel"
              class="delOption"
            >
              <div @click="$emit('clickIcon', 'isDel')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/delete.svg')"
                >
              </div>
            </td>
            <td
              v-show="isPrint"
              class="printOption"
            >
              <div @click="$emit('clickIcon', 'isPrint')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/print.svg')"
                >
              </div>
            </td>
            <td
              v-show="isMap"
              class="mapOption"
            >
              <div @click="$emit('clickIcon', 'isMap')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/map.svg')"
                >
              </div>
            </td>
            <td
              v-show="isSearch"
              class="searchOption"
            >
              <div @click="$emit('clickIcon', 'isSearch')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/search.svg')"
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginate
      v-show="isPaginate"
      :total="dataNum"
      :per-page="10"
      @nowPage="getPageNum"
    />
  </div>
</template>

<script>
import Paginate from '~/components/tools/Paginate';
import Tag from '~/components/tools/Tag.vue';
import Button from '~/components/tools/Buttons.vue';
import Input from '~/components/tools/InputTool.vue';
import DatePicker from '~/components/tools/DatePicker';
export default {
  components: {
    Paginate,
    Tag,
    Button,
    Input,
    DatePicker
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return { option: [{ title: '無清單資料1', value: '0' }, { title: '無清單資料2', value: '1' }] };
      }
    },
    tableColumn: {
      type: Object,
      default: () => {
        return {
          head: [],
          body: []
        };
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isDel: {
      type: Boolean,
      default: false
    },
    isPrint: {
      type: Boolean,
      default: false
    },
    isMap: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    isPaginate: {
      type: Boolean,
      default: true
    },
    tagList: {
      type: Array,
      default: () => {
        return ['啟用中', '停用中', '驗證中', '無狀態'];
      }
    }
  },
  data: () => {
    return {
      checkList: [],
      inputList: [],
      inputListId: [],
      dateList: [],
      dateListId: [],
      tableColumnH: '',
      tableColumnBody: [],
      getPage: 1
    };
  },
  name: 'Table',
  mounted: function () {
    this.getPageNum(1);
  },
  updated: function () {
    this.tableColumnH = this.$refs.tableContent.clientHeight;
  },
  methods: {
    inputVal (e) { // 取得INPUT內容
      const arr = this.inputList;
      const arrId = this.inputListId;
      this.setDataArr(e, arr, arrId);
    },
    dateVal (e) { // 取得DATE內容
      const arr = this.dateList;
      const arrId = this.dateListId;
      this.setDataArr(e, arr, arrId);
    },
    setDataArr (e, arr, arrId) {
      if (arr.length < 1) {
        arr.push(e);
        arrId.push(e.id);
      } else {
        arr.forEach(function (v, i) {
          if (e.id === v.id) {
            arr[i].val = e.val;
          } else if (arrId.indexOf(e.id) < 0) {
            arr.push(e);
            arrId.push(e.id);
          }
        });
      }
    },
    getPageNum (e) { // 換頁取得DATA
      this.getPage = e;
      this.tableColumnBody = [];
      const page = this.getPage;
      const startId = 1 + 10 * (page - 1);
      const endId = startId + (10 - 1);
      const tableColumnBodyContent = this.tableColumnBody;
      this.tableColumn.body.forEach(function (v, i) {
        const num = i + 1;
        if (num >= startId && num <= endId) {
          tableColumnBodyContent.push(v);
        }
      });
    }
  },
  computed: {
    isShowBg: function () {
      const data = this.tableColumn.body;
      if (data.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    optionLength: function () {
      const edit = this.isEdit;
      const del = this.isDel;
      const print = this.isPrint;
      const search = this.isSearch;
      const map = this.isMap;
      const arr = [edit, del, print, search, map];
      let num = 0;
      arr.forEach(function (i) {
        if (i) {
          num += 1;
        }
      });
      return num;
    },
    dataLength: function () {
      const data = this.tableColumn.body;
      return data.length;
    },
    isCheck: function () {
      const data = this.tableColumn.body;
      let result = false;
      data.forEach(function (v) {
        if (v.val) {
          result = true;
        } else {
          result = false;
        }
      });
      return result;
    },
    dataNum: function () {
      const data = this.tableColumn.body;
      return data.length;
    }
  },
  watch: {
    checkList: function (n) {
      this.$emit('DropdownVal', n);
    },
    inputList: function (n) {
      this.$emit('tableInput', n);
    }
  }
};
</script>

<style lang="scss" scoped>
.tableTool{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.tableBox{
  flex:1;
  background: #FFF;
  table{
    border:1px solid $light-green;
    white-space: nowrap;
    thead{
        border-bottom: 5px solid $main-green;
        th{
            line-height: 33px;
            height: 33px;
            padding: 0 10px;
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
        }
    }
    tbody{
        text-align: center;
        tr{
          &:nth-child(odd){
            background: #F5F5F5;
          }
          &:nth-child(even){
            background: #FFF;
          }
        }
        td{
          line-height: 33px;
          height: 33px;
          padding: 2px 10px;
        }
    }
  }
  &.tableCheck{
    width:50px;
    position:absolute;
    left:0;
    top:0;
  }
  &.tableContent{
    overflow-x: scroll;
    &::-webkit-scrollbar{
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track{
      background: #FFF;
    }
    &::-webkit-scrollbar-thumb{
      background: #A1BFB8;
    }
  }
  &.tableBtn{
    position:absolute;
    right:0;
    top:0;
  }
}
.vector {
  align-self: stretch;
  object-fit: cover;
  vertical-align: middle;
  cursor: pointer;
}
.isNoData{
  width: 100%;
  min-height: 300px;
  background-image: url("~/assets/img/table_null_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #eff3f2;
}

.isNoSearch{
  width: 100%;
  min-height: 300px;
  background-image: url("~/assets/img/table_start_bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #eff3f2;
}
.checkBoxOption,.editOption,.delOption,.printOption,.mapOption,.searchOption{
  width: 30px;
}
.checkBoxOption{
  input[type="checkbox"] {
    display:none;
  }
  input[type="checkbox"] + label
  {
    background: #999;
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label
  {
    background: url("~/assets/img/check.svg");
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
