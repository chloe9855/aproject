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
        <Dropdown
          :options="member"
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
      <div class="listTitle">
        土地所有權人
      </div>
      <div class="flexBox">
        <Button
          :name="'button-default'"
          :text="'選擇所有權人'"
          class="flex-2"
          @click="$emit('clear')"
        />
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
        <CheckInput text="態樣1(93000)" /><CheckInput text="態樣2(93000)" /><CheckInput text="態樣3(93000)" />
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
      <div class="flexBox">
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
        @click="$emit('clear')"
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
export default {
  components: {
    Dropdown,
    Button,
    CheckInput,
    InputTool
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return { data: [{ title: '無清單資料1', value: '0' }, { title: '無清單資料2', value: '1' }] };
      }
    }
  },
  data: () => {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
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
  computed: {
  }
};
</script>

<style lang="scss" scoped>
.editListBox{
  margin: 1em auto;
  background: #EFF4F3;
  padding: 10px;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.listBox{
    display: flex;
    margin: 5px 0;
    flex-wrap:initial;
    .listTitle{
        padding-right: 2em;
        min-width: 100px;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 40px;
        color: #111;
    }
    div{
        line-height: 40px;
        text-align: left;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        align-items: center;
        color: #494949;
        div{
            margin: 0 2.5px;
        }
    }
}
</style>
