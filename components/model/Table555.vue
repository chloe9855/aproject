<template>
  <div
    class="tableTool"
    :class="{isNoData:isShowBg}"
  >
    <div
      v-show="!isShowBg && isCheck && isScrollTable"
      class="tableBox tableCheck"
      :class="[!!tableColumn.topHead?'tableTopL':'tableTopS']"
    >
      <table>
        <thead>
          <tr>
            <th
              class="checkBoxOption"
            >
              <input
                :id="'s-'+checkAllId"
                v-model="isScrollCheckedAll"
                :name="'s-'+checkAllId"
                type="checkbox"
              >
              <label :for="'s-'+checkAllId" />
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
                :id="'s-'+item.val"
                v-model="checkScrollList"
                type="checkbox"
                :name="item.val"
                :value="item.val"
              ><label :for="'s-'+item.val" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      ref="tableContent"
      class="tableBox w-100 tableContent"
      :class="'minWidth'+columnMinWidth"
    >
      <table
        ref="tableContentTable"
        :class="{'noWrap': noWrap }"
      >
        <thead>
          <tr
            v-if="!!tableColumn.topHead"
            class="topHeadBox"
          >
            <th
              v-show="isCheck"
              class="checkColumn"
            />
            <th
              v-for="( item, index ) in tableColumn.topHead"
              :key="index"
              :colspan="item.col"
            >
              {{ item.title }}
            </th>
            <th
              v-if="optionLength>0"
              :colspan="optionLength"
              :style="{'min-width': (optionLength*35)+'px'}"
            />
          </tr>
          <tr>
            <th
              v-show="isCheck"
              class="checkColumn checkBoxOption"
            >
              <input
                :id="checkAllId"
                v-model="isCheckedAll"
                type="checkbox"
              ><label :for="checkAllId" />
            </th>
            <th
              v-for="( item, index ) in tableColumn.head"
              :key="index"
              :class="[{isRightBorder:setRightBorder(index)},item.setW]"
            >
              {{ item.title }}
            </th>
            <th
              v-if="optionLength>0"
              :colspan="optionLength"
              :style="{'min-width': (optionLength*25)+'px'}"
            />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="( item, index ) in tableColumnBody"
            :key="index"
          >
            <td
              v-show="isCheck"
              :style="{'width':'35px'}"
              class="checkBoxOption"
            >
              <input
                :id="item.val"
                v-model="checkList"
                type="checkbox"
                :name="item.val"
                :value="item.val"
              ><label :for="item.val" />
            </td>
            <td
              v-for="( text, textIndex ) in item.title"
              :key="textIndex"
              :class="{isRightBorder:setRightBorder(textIndex)}"
            >
              <Tag
                v-if="tagList.indexOf(text)>-1"
                :tag-list="tagList"
                :text="text"
              />
              <Button
                v-else-if="tableType(text)&&typeof text === 'object' && text.type === 'btn'"
                :name="'button-primary'"
                :text="text.title"
              />
              <Input
                v-else-if="tableType(text)&&typeof text === 'object' && text.type === 'input'"
                :input-id="text.key"
                :input-text="text.title"
                @inputValue="inputVal"
              />
              <Dropdown
                v-else-if="tableType(text)&&typeof text === 'object' && text.type === 'dropdown'"
                :key="textIndex"
                :input-id="textIndex"
                :input-text="text.title"
              />
              <DatePicker
                v-else-if="tableType(text)&&typeof text === 'object' && text.type === 'date'"
                :key="textIndex"
                :input-id="textIndex"
                :type="text.dateType"
                :value-type="text.valueType"
                @DateValue="dateVal"
              />
              <TableLink
                v-else-if="tableType(text)&&typeof text === 'object' && text.type === 'link'"
                :key="textIndex"
                :link="text"
              />
              <DropdownTreeList v-else-if="tableType(text)&&typeof text === 'object' && text.type === 'dropdownTreeList'" />
              <span v-else>{{ textIsNum(text) }}</span>
              <span v-if="tableType(text)&&isAttachText(text)">{{ text.attachText }}</span>
            </td>
            <!-- <td
              v-if="optionLength > 0 && isScrollTable"
              :colspan="optionLength"
              :style="{'min-width': (optionLength*35)+'px'}"
            /> -->
            <td
              v-show="isEdit && !isScrollTable"
              class="editOption"
            >
              <div @click="sendEvent('isEdit')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/edit.svg')"
                >
              </div>
            </td>
            <td
              v-show="isDel && !isScrollTable"
              class="delOption"
            >
              <div @click="sendEvent('isDel')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/delete.svg')"
                >
              </div>
            </td>
            <td
              v-show="isPrint && !isScrollTable"
              class="printOption"
            >
              <div @click="sendEvent('isPrint')">
                <img
                  alt=""
                  class="vector"
                  :src="require('~/assets/img/print.svg')"
                >
              </div>
            </td>
            <td
              v-show="isMap && !isScrollTable"
              class="mapOption"
            >
              <div @click="sendEvent('isMap', index)">
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
              <div @click="sendEvent('isSearch', item.title[3], index)">
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
    <div
      v-if="optionLength > 0 && isScrollTable"
      class="tableBox tableBtn"
      :class="[!!tableColumn.topHead?'tableTopL':'tableTopS']"
    >
      <table>
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
              <div @click="sendEvent('isEdit',item)">
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
              <div @click="sendEvent('isDel',item)">
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
              <div @click="sendEvent('isPrint',item)">
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
              <div @click="sendEvent('isMap',item)">
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
              <div @click="sendEvent('isSearch',item)">
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
import Tag from '~/components/tools/Tag';
import Button from '~/components/tools/Buttons';
import Input from '~/components/tools/InputTool';
import DatePicker from '~/components/tools/DatePicker';
import Dropdown from '~/components/tools/Dropdown';
import TableLink from '~/components/tools/TableLink';
import DropdownTreeList from '~/components/tools/DropdownTreeList.vue';
export default {
  components: {
    Paginate,
    Tag,
    Button,
    Input,
    DatePicker,
    Dropdown,
    TableLink,
    DropdownTreeList
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
          name: '',
          topHead: [],
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
    isScrollTable: {
      type: Boolean,
      default: false
    },
    isToggle: {
      type: Boolean,
      default: false
    },
    columnMinWidth: {
      type: Number,
      default: 80
    },
    columnLength: {
      type: Number,
      default: 10
    },
    noWrap: {
      type: Boolean,
      default: false
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
      checkScrollList: [],
      inputList: [],
      inputListId: [],
      dateList: [],
      dateListId: [],
      tableColumnBody: [],
      getPage: 1,
      isCheckedAll: false,
      isScrollCheckedAll: false
    };
  },
  name: 'TableTool',
  mounted: function () {
    this.getPageNum(1);
    console.log('table');
    console.log(this.tableColumn);
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
      this.$emit('inputData', arr);
    },
    getPageNum (e) { // 換頁取得DATA
      this.getPage = e;
      this.tableColumnBody = [];
      const page = this.getPage;
      const columnLength = this.columnLength;
      const startId = 1 + columnLength * (page - 1);
      const endId = startId + (columnLength - 1);
      const tableColumnBodyContent = this.tableColumnBody;
      this.tableColumn.body.forEach(function (v, i) {
        const num = i + 1;
        if (num >= startId && num <= endId) {
          tableColumnBodyContent.push(v);
        }
      });
    },
    sendEvent (e, item) {
      this.$emit('tableEvent', { event: e, item: item });
    },
    numfmt (n) {
      function chunk (a, s) {
        return Array.init(Math.ceil(a.length / s), n => a.slice(n * s, n * s + s));
      }
      const ns = n.toString().split('.');
      ns[0] = chunk(Array.from(ns[0]).reverse(), 3).map(x => x.reverse().join('')).reverse().join(',');
      if (ns.length >= 2) {
        ns[1] = chunk(Array.from(ns[1]), 3).map(x => x.join('')).join(',');
      }
      return ns.join('.');
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
    },
    setRightBorder () {
      return function (a) {
        const headTopList = this.tableColumn.topHead;
        let num = -1;
        let result;
        if (headTopList) {
          headTopList.forEach(function (item, i) {
            num += item.col;
            if (a === num) {
              result = true;
            }
          });
        }
        return result;
      };
    },
    checkAllId: function () {
      const name = this.tableColumn.name;
      return name ? name + 'All' : 'allchecked2';
    },
    tableType: function () {
      return function (text) {
        /** do something */
        let result;
        if (text === 'string' || text === null) {
          result = '';
        } else {
          result = true;
        }
        return result;
      };
    },
    isAttachText: function () {
      return function (text) {
        /** do something */
        if (text.attachText !== '') {
          return true;
        } else {
          return false;
        }
      };
    },
    textIsNum () {
      return function (t) {
        /** do something */
        let result = '';
        if (typeof t === 'number') {
          result = this.numfmt(t);
        } else {
          result = t;
        }
        return result;
      };
    }
  },
  watch: {
    checkList: function (n) {
      this.$emit('checkList', n);
    },
    checkScrollList: function (n) {
      this.$emit('checkScrollList', n);
    },
    inputList: function (n) {
      this.$emit('tableInput', n);
    },
    isCheckedAll: function (n) {
      const list = this.tableColumn;
      let allArr = [];
      if (n) {
        list.body.forEach(function (item) {
          allArr.push(item.val);
        });
      } else {
        allArr = [];
      }
      this.checkList = allArr;
    },
    isScrollCheckedAll: function (n) {
      const list = this.tableColumn;
      let allArr = [];
      if (n) {
        list.body.forEach(function (item) {
          allArr.push(item.val);
        });
      } else {
        allArr = [];
      }
      this.checkScrollList = allArr;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.noWrap {
  white-space: nowrap;
}

.tableTool{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  @include noto-sans-tc-16-regular;
}
.tableBox{
  flex:1;
  table{
    border:1px solid $light-green;
    display: inline-table;
    overflow:auto;
    width:100%;
    //white-space: nowrap;
    thead{
        border-bottom: 6px solid $main-green;
        th{
            padding: 0 10px;
            text-align:left;
            line-height: 24px !important;
            word-break: keep-all;
            @include noto-sans-tc-16-medium;
        }
        .topHeadBox{
          th{
            border-right:1px solid #c4ded8;
          }
        }
    }
    tbody{
        text-align: center;
        color: #494949;
        @include noto-sans-tc-16-regular;
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
          text-align: left;
        }
    }
  }
  &.tableCheck{
    width:50px;
    position:absolute;
    left:0;
    top:1px;
    background: #fff;
    border-left:1px solid $light-green;
    border-right:1px solid #C4DED8;
    padding-top:18px ;
    table{
      border:none;
      th{
        min-width: 30px;
      }
    }
    &.tableTopL{
      padding-top:24px;
    }
    &.tableTopS{
      padding-top:0;
    }
  }
  &.tableContent{
    overflow-x: scroll;
    table{
      width:100%;
      th{
        &.checkColumn{
          min-width: 30px;
        }
      }
    }
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
    background: #fff;
    border-right:1px solid $light-green;
    top:1px;
    padding-top:30px ;
    table{
      border:none;
    }
    &.tableTopL{
      padding-top:29px;
    }
    &.tableTopS{
      padding-top:5px;
    }
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

.minWidth80{
  th{
    min-width: 80px;
  }
}
.minWidth100{
  th{
    min-width: 100px;
  }
}
.minWidth120{
  th{
    min-width: 120px;
  }
}
.minWidth130{
  th{
    min-width: 130px;
  }
}
.minWidth150{
  th{
    min-width: 150px;
  }
}
.minWidth160{
  th{
    min-width: 160px;
  }
}
.minWidth170{
  th{
    min-width: 170px;
  }
}
.minWidth180{
  th{
    min-width: 180px;
  }
}
.setWidth200{
  min-width: 200px !important;
}
.isRightBorder{
  border-right:1px solid $light-green;
}
</style>
