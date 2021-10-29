<template>
  <div>
    <div
      class="content_block"
      :class="[growDiv,boxWidth]"
    >
      <BreadCrumbTool
        :options="BreadCrumb"
      />
      <PageHeader
        icon="bungalow"
        title="灌溉地籍查詢與統計"
      />
      <div
        v-if=" toggleCurrent === 0 "
        class="content_box"
      >
        <TableTool
          :table-column="tableList"
          :is-paginate="true"
          :column-min-width="150"
        />
        <div
          class="calNoteBox w-90"
        >
          <CalNote />
          <CalNote />
          <CalNote />
        </div>
      </div>
      <div
        v-else-if="toggleCurrent === 1"
        class="irrigatedLand content_box"
      >
        <NormalTable
          v-if="columnList.length >= 1"
          :list="columnList"
          class="listTable"
        />
      </div>
    </div>

    <Search
      type="irrigatedLandSearch"
      @toggleStatus="getToggleStatus"
      @toggleCurrent="getToggleCurrent"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import NormalTable from '~/components/model/NormalTable.vue';
import Search from '~/components/model/Search.vue';
import CalNote from '~/components/tools/CalNote.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    NormalTable,
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
      columnList: [
        {
          name: '流水編號',
          value: '851705',
          id: 0
        },
        {
          name: '管理處代碼',
          value: '09',
          id: 1
        },
        {
          name: '管理處名稱',
          value: '851705',
          id: 2
        },
        {
          name: '管理分分處名稱',
          value: '09',
          id: 3
        },
        {
          name: '工作站代碼',
          value: '851705',
          id: 4
        },
        {
          name: '工作站名稱',
          value: '09',
          id: 5
        },
        {
          name: '水利小組代碼',
          value: '851705',
          id: 6
        },
        {
          name: '水利小組名稱',
          value: '泉厝支線小組',
          id: 7
        },
        {
          name: '輪區代碼',
          value: '851705',
          id: 8
        },
        {
          name: '輪區名稱',
          value: '09',
          id: 57
        },
        {
          name: '長度',
          value: '09',
          id: 66
        },
        {
          name: '渠道名稱',
          value: '851705',
          id: 62
        },
        {
          name: '渠道等級代碼',
          value: '09',
          id: 58
        },
        {
          name: '渠道等級名稱',
          value: '851705',
          id: 52
        }
      ],
      BreadCrumb: ['灌溉地管理', '灌溉地籍查詢'],
      toggleStatus: false,
      toggleCurrent: 0
    };
  },
  name: 'IrrigatedLand',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    getToggleCurrent (e) {
      this.toggleCurrent = e;
    }
  },
  computed: {
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    },
    growDiv () {
      const setWidth = this.toggleStatus ? '' : 'grow';
      return setWidth;
    },
    accountToggle () {
      return this.$store.state.settingAccount;
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
.listTable{
  margin: 0 auto;
}
.content_block {
  width: calc(100% - 372px);
  transition: ease-in-out 0.4s;
  height:100%;
  margin : 0 5%;
}
.content_box{
  padding-right: 0.5em;
  height: calc( 100vh - 175px );
  @include scrollBar;
}
.grow {
  width: 90%;
}
</style>
