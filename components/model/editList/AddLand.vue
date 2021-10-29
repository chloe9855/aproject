<template>
  <div class="editListBox">
    <div class="listBox Box1">
      <div class="listTitle">
        申請土地位置
      </div>
      <div class="flexBox">
        <Dropdown
          :options="member"
          class="flex-4"
        />
        <Dropdown
          :options="member"
          class="flex-4"
        />
        <Dropdown
          :options="member"
          class="flex-4"
        />
        <InputTool
          class="flex-4"
        />
        <Button
          :name="'button-default'"
          :text="'查詢'"
          @click="$emit('clear')"
        />
        <div>
          <img
            alt=""
            class="vector"
            :src="require('~/assets/img/delete.svg')"
          >
        </div>
        <div>
          <img
            alt=""
            class="vector"
            :src="require('~/assets/img/map.svg')"
          >
        </div>
      </div>
    </div>
    <div class="listBox Box2">
      <div class="listTitle" />
      <AreaNote />
    </div>
    <div class="listBox Box2">
      <div class="listTitle">
        土地所有權人
      </div>
      <div class="flexBox ownerBox">
        <Button
          :name="'button-default'"
          :text="'選擇所有權人'"
          class="flex-2"
          @click="toggleOwnerList"
        />
        <div
          v-show="statusOwnerList"
          class="ownerList"
        >
          <TableTool
            :table-column="ownerList"
            :is-paginate="false"
          />
          <div class="flexBox ownerBtnBox">
            <Button
              :name="'button-default'"
              :text="'取消'"
              @click="toggleOwnerList"
            />
            <Button
              :name="'button-primary'"
              :text="'確定'"
              @click="toggleOwnerList"
            />
          </div>
        </div>
        <div class="tips flex-16">
          <span>已選擇2位所有權人</span>
        </div>
      </div>
    </div>
    <div class="listBox Box3">
      <div class="listTitle">
        農民類別
      </div>
      <div>
        <Dropdown
          :options="member"
        />
        <div />
      </div>
    </div>
    <div class="listBox Box4">
      <div class="listTitle">
        申請類別
      </div>
      <div class="flexBox">
        <CheckInput
          name="a1"
          text="態樣1(93000)"
        /><CheckInput
          name="a2"
          text="態樣2(93000)"
        /><CheckInput
          name="a3"
          text="態樣3(93000)"
        />
      </div>
    </div>
    <div class="listBox Box5">
      <div class="listTitle">
        作物備註
      </div>
      <div class="flexBox">
        <InputTool />
      </div>
    </div>
    <div class="listBox Box6">
      <div class="listTitle">
        檢附資料
      </div>
      <div class="flexBox checkBoxOption">
        <span
          v-for="(item , index) in option.data"
          :key="index"
        >
          <input
            :id="index"
            v-model="dataArr"
            type="checkbox"
            :name="index"
            :value="item.value"
          ><label :for="index" /><span>{{ item.title }}</span>
        </span>
      </div>
    </div>
    <div class="buttonBox">
      <Button
        :name="'button-default'"
        :text="'收合新增視窗'"
        @click="$emit('clear',false)"
      />
      &emsp;
      <Button
        :name="'button-primary'"
        :text="'確認新增'"
        @click="$emit('search', options.current)"
      />
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import Button from '~/components/tools/Buttons';
import InputTool from '~/components/tools/InputTool';
import CheckInput from '~/components/model/editList/CheckInput';
import AreaNote from '~/components/tools/AreaNote.vue';
import TableTool from '~/components/model/Table';
export default {
  components: {
    Dropdown,
    Button,
    CheckInput,
    InputTool,
    AreaNote,
    TableTool
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return { data: [{ title: '無清單資料1', value: '0' }, { title: '無清單資料2', value: '1' }] };
      }
    },
    ownerList: {
      type: Object,
      default: () => {
        return {
          head: [
            { title: '所有權人' },
            { title: '權力範圍' },
            { title: '權力類別' }
          ],
          body: [
            { val: 0, title: ['陳旺旺', '1/3', '公同共有'] },
            { val: 1, title: ['張旺旺', '1/3', '公同共有'] },
            { val: 2, title: ['鄧旺旺', '1/3', '公同共有'] }
          ]
        };
      }
    }
  },
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      statusOwnerList: false,
      owner: '',
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
  methods: {
    getOwner (item) {
      this.owner = item;
    },
    toggleOwnerList () {
      console.log(this.statusOwnerList);
      this.statusOwnerList = !this.statusOwnerList;
      console.log(this.statusOwnerList);
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
.editListBox{
  margin: 1em auto;
  background: #EFF4F3;
  //padding: 10px;
}
.button_wrap{
  min-width: 130px;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .button_wrap{
    min-width: none;
  }
}
.listBox{
    display: flex;
    margin: 5px 0;
    flex-wrap:initial;
    .listTitle{
        padding-right: 1em;
        min-width: 100px;
        padding-left: 1em;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        height: 20px;
        color: #111;
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
        div{
            margin: 0 5px 0 0;
        }
        @include pc-width{
          flex-wrap: wrap;
        }
        @include pcm-width{
          flex-wrap: wrap;
        }
        @include pcs-width{
          flex-wrap: wrap;
        }
        @include pcxs-width{
          flex-wrap: wrap;
        }
        .check-input-box{
          margin: 2.5px 0;
        }
    }
}
.checkBoxOption{
  input[type="checkbox"] {
    display:none;
  }
  input[type="checkbox"] + label
  {
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
    @include checkbox;
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
.ownerList{
  position: absolute;
  top: 32px;
  z-index: 1000;
  min-width: 120px;
  background: white;
  min-height: 30px;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
}
.ownerBox{
  position: relative;
}
.ownerBtnBox{
  justify-content: flex-end;
  .button_wrap{
    min-width: auto;
  }
}
</style>
