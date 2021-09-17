<template>
  <div class="tableBox">
    <table
      :class="{isNoData:isShowBg}"
    >
      <thead>
        <tr>
          <th
            v-show="!isShowBg&&isCheck"
            class="checkBoxOption"
          >
            <input
              id="all"
              type="checkBox"
              name="all"
              value="all"
            ><label for="all" />
          </th>
          <th
            v-for="( item, index ) in tableColumn.head"
            :key="index"
          >
            {{ item.title }}
          </th>
          <th
            v-if="optionLength>0"
            :colspan="optionLength"
          />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="( item, index ) in tableColumn.body"
          :key="index"
        >
          <td
            v-show="isCheck"
            class="checkBoxOption"
          >
            <input
              :id="'a'+index"
              v-model="dataList"
              type="checkbox"
              :name="'a'+index"
              :value="item.val"
            ><label :for="'a'+index" />
          </td>
          <td
            v-for="( text, textIndex ) in item.title"
            :key="textIndex"
          >
            <Tag
              v-if="tagList.indexOf(text)>-1"
              :tag-list="tagList"
              :text="text"
            />
            <span v-else>{{ text }}</span>
          </td>
          <td
            v-show="isEdit"
            class="editOption"
          >
            <div>
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
            <div>
              <img
                alt=""
                class="vector"
                :src="require('~/assets/img/delete.svg')"
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginate />
  </div>
</template>

<script>
import Paginate from '~/components/tools/Paginate';
import Tag from '~/components/tools/Tag.vue';
export default {
  components: {
    Paginate: Paginate,
    Tag: Tag
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
      default: true
    },
    isDel: {
      type: Boolean,
      default: true
    },
    isCheck: {
      type: Boolean,
      default: true
    },
    tagList: {
      type: Array,
      default: () => {
        return ['驗證中', '啟用中', '停用中', '無狀態'];
      }
    }
  },
  data: () => {
    return {
      dataList: []
    };
  },
  name: 'Table',
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
      let num;
      if (!edit && !del) {
        num = 0;
      } else if (edit && del) {
        num = 2;
      } else {
        num = 1;
      }
      return num;
    },
    dataLength: function () {
      const data = this.tableColumn.body;
      return data.length;
    }
  },
  watch: {
    dataList: function (n) {
      this.$emit('DropdownVal', n);
    }
  }
};
</script>

<style lang="scss" scoped>
.tableBox{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  table{
    //flex: 1;
    width: 100%;
    border:1px solid $light-green;
    thead{
        border-bottom: 5px solid $main-green;
        th{
            line-height: 33px;
            height: 33px;
            padding: 0 10px;
            //border: 1px solid $light-green;
            //font-family: Noto Sans TC;
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
          padding: 0 10px;
          //border: 1px solid $light-green;
        }
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
.checkBoxOption,.editOption,.delOption{
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
