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
    />
    <Pagination :table-count="count" />
    <PageHeader icon="edit" />
    <Search
      type="landSearch"
    />
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
    Search: Search
  },
  data () {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      tableList: {
        head: [
          { title: 'Runoob' },
          { title: 'Google' },
          { title: 'Taobao' }
        ],
        body: [
          { title: ['Runoob1', 'Google1', 'Taobao1'] },
          { title: ['Runoob2', 'Google2', 'Taobao2'] },
          { title: ['Runoob3', 'Google3', 'Taobao3'] },
          { title: ['Runoob1', 'Google1', 'Taobao1'] },
          { title: ['Runoob2', 'Google2', 'Taobao2'] },
          { title: ['Runoob3', 'Google3', 'Taobao3'] }
        ]
      },
      count: 15
    };
  }
};
</script>
