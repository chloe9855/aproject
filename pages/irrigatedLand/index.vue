<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="bungalow"
      title="灌溉地籍查詢與統計"
      :class="boxWidth"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="true"
      :class="boxWidth"
    />
    <div
      class="calNoteBox w-90"
      :class="boxWidth"
    >
      <CalNote />
      <CalNote />
      <CalNote />
    </div>
    <Search
      type="irrigatedLandSearch"
      @toggleStatus="getToggleStatus"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';
import CalNote from '~/components/tools/CalNote.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    Search,
    CalNote
  },
  data () {
    return {
      member: { option: [{ title: '預設選項', value: '0' }, { title: '工作站人員', value: '1' }, { title: '管理人員', value: '2' }, { title: '民眾', value: '3' }] },
      tableList: {
        head: [
          { title: '管理處' },
          { title: '管理分處' },
          { title: '工作站' },
          { title: '水利小組' },
          { title: '水利小組面積㎡' },
          { title: '水利小組轄區 農地地籍面積㎡' },
          { title: '水利小組轄區 農地灌溉面積㎡' }
        ],
        body: [
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] },
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] },
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] },
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] },
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] },
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] },
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] },
          { title: ['XX分處鹿草工作站', '山子腳', '山子腳-山腳', 'XXX小組', '2,050', '2,050', '2,050'] }
        ]
      },
      BreadCrumb: ['灌溉地管理', '灌溉地籍查詢'],
      toggleStatus: false
    };
  },
  name: 'IrrigatedLand',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    }
  },
  computed: {
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    }
  }
};
</script>
<style lang="scss" scoped>
.calNoteBox{
    display: flex;
    justify-content:flex-end;
    margin: 0 auto;
    div{
        margin: 0 2.5px;
    }
}
.tableTool{
  .tableContent{
    table{
      tbody{
        text-align: left !important;
      }
    }
  }
}
</style>
