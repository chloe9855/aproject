<template>
  <div>
    <p>我是首頁</p>
    <nuxt-link to="/map">
      去地圖頁
    </nuxt-link>
    <nuxt-link to="/allComponents">
      組件頁
    </nuxt-link>

    <InputTool />
    <InputHorizontal
      name="inputName"
      title="輸入框標題"
      error-text="錯誤文字"
      error-tip="輸入文字格式錯誤"
      is-warn="code8"
    />
    <InputVertical
      name="inputName"
      title="輸入框標題"
      error-text="錯誤文字"
      error-tip="輸入文字格式錯誤"
      is-warn="code8"
    />
    <Dropdown :options="member" />
    <DatePicker />
    <Tag
      type="Green"
      text="標籤1"
    />
    <Tag
      type="Red"
      text="標籤2"
    />
    <Tag
      type="Yellow"
      text="標籤3"
    />
    <Tag
      type="Gray"
      text="標籤4"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="true"
      :is-edit="true"
      :is-del="true"
    />
    <Pagination :table-count="count" />
    <PageHeader
      icon="edit"
      :is-arrow="true"
    />
    <Search
      type="landSearch"
    />
    <Bar
      setbar-color="blue"
      :setbar-length="20"
      setbar-width="thin"
    />
    <ToggleList />
  </div>
</template>

<script>
import InputHorizontal from '~/components/tools/InputHorizontal.vue';
import InputVertical from '~/components/tools/InputVertical.vue';
import InputTool from '~/components/tools/InputTool.vue';
import Dropdown from '~/components/tools/Dropdown.vue';
import DatePicker from '~/components/tools/DatePicker.vue';
import Tag from '~/components/tools/Tag.vue';
import TableTool from '~/components/model/Table.vue';
import Pagination from '~/components/tools/Pagination.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import Search from '~/components/model/Search.vue';
import Bar from '~/components/tools/BarChart.vue';
import ToggleList from '~/components/model/ToggleList.vue';

export default {
  components: {
    InputHorizontal: InputHorizontal,
    InputVertical: InputVertical,
    InputTool: InputTool,
    Dropdown: Dropdown,
    DatePicker: DatePicker,
    Tag: Tag,
    TableTool: TableTool,
    Pagination: Pagination,
    PageHeader: PageHeader,
    Search: Search,
    Bar: Bar,
    ToggleList: ToggleList
  },
  data () {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      tableList: {
        head: [
          { title: 'Runoob' },
          { title: 'Google' },
          { title: 'Taobao' },
          { title: 'Runoob' },
          { title: 'Google' },
          { title: 'Taobao' },
          { title: 'Runoob' },
          { title: 'Google' }
        ],
        body: [
          { title: ['Runoob1', 'Google1', 'Taobao', 'Runoob', 'Google', 'Taobao', '啟用中', { type: 'date' }], val: 0, id: 0 },
          { title: ['Runoob2', 'Google2', 'Taobao', 'Runoob', 'Google', 'Taobao', '啟用中', { type: 'input' }], val: 1, id: 1 },
          { title: ['Runoob3', 'Google3', 'Taobao', 'Runoob', 'Google', 'Taobao', '停用中', { type: 'date' }], val: 2, id: 2 },
          { title: ['Runoob4', 'Google4', 'Taobao', 'Runoob', 'Google', 'Taobao', '啟用中', { type: 'input' }], val: 3, id: 3 },
          { title: ['Runoob5', 'Google5', 'Taobao', 'Runoob', 'Google', 'Taobao', '啟用中', { type: 'date' }], val: 4, id: 4 },
          { title: ['Runoob6', 'Google6', 'Taobao', 'Runoob', 'Google', 'Taobao', '啟用中', { type: 'input' }], val: 5, id: 5 },
          { title: ['Runoob7', 'Google7', 'Taobao', 'Runoob', 'Google', 'Taobao', '停用中', { type: 'date' }], val: 6, id: 6 },
          { title: ['Runoob8', 'Google8', 'Taobao', 'Runoob', 'Google', 'Taobao', '無狀態', { type: 'input' }], val: 7, id: 7 },
          { title: ['Runoob9', 'Google9', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 8, id: 8 },
          { title: ['Runoob10', 'Google10', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 9, id: 9 },
          { title: ['Runoob11', 'Google11', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 10, id: 10 },
          { title: ['Runoob12', 'Google12', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 11, id: 11 },
          { title: ['Runoob13', 'Google13', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 12, id: 12 },
          { title: ['Runoob14', 'Google14', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 13, id: 13 },
          { title: ['Runoob15', 'Google15', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 14, id: 14 },
          { title: ['Runoob16', 'Google16', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 15, id: 15 },
          { title: ['Runoob17', 'Google17', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 16, id: 16 },
          { title: ['Runoob18', 'Google18', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 17, id: 17 },
          { title: ['Runoob19', 'Google19', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 18, id: 18 },
          { title: ['Runoob20', 'Google20', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 19, id: 19 },
          { title: ['Runoob21', 'Google21', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 20, id: 20 },
          { title: ['Runoob22', 'Google22', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 21, id: 21 },
          { title: ['Runoob23', 'Google23', 'Taobao', 'Runoob', 'Google', 'Taobao', '停用中', { type: 'date' }], val: 22, id: 22 },
          { title: ['Runoob24', 'Google24', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 23, id: 23 },
          { title: ['Runoob25', 'Google25', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 24, id: 24 },
          { title: ['Runoob26', 'Google26', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 25, id: 25 },
          { title: ['Runoob27', 'Google27', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 26, id: 26 },
          { title: ['Runoob28', 'Google28', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 27, id: 27 },
          { title: ['Runoob29', 'Google29', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 28, id: 28 },
          { title: ['Runoob30', 'Google30', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 29, id: 29 },
          { title: ['Runoob31', 'Google31', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 30, id: 30 },
          { title: ['Runoob32', 'Google32', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 31, id: 31 },
          { title: ['Runoob33', 'Google33', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 32, id: 32 },
          { title: ['Runoob34', 'Google34', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 33, id: 33 },
          { title: ['Runoob35', 'Google35', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'date' }], val: 34, id: 34 },
          { title: ['Runoob36', 'Google36', 'Taobao', 'Runoob', 'Google', 'Taobao', '驗證中', { type: 'input' }], val: 35, id: 35 }
        ]
      },
      count: 15
    };
  }
};
</script>
