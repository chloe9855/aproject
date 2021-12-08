<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="edit"
      title="停灌資料異動"
      :class="boxWidth"
    />
    <div
      class="content_box"
    >
      <SubTitleTool
        title="停灌補償申請事件設定"
        :class="boxWidth"
        btn-text="新增事件"
        :btn-add="true"
        btn-name="button-add"
        @STbtnStatus="toEditCompensateEvent"
      />
      <TableTool
        :table-column="tableList"
        :is-paginate="false"
        :is-edit="true"
        :class="boxWidth"
      />
    </div>
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';
import { getApplySetting } from '~/api/apply';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    SubTitleTool
  },
  data () {
    return {
      tableList: {
        head: [
          { title: '事件名稱' },
          { title: '開放申請起始日' },
          { title: '開放申請截止日' },
          { title: '開放申請區域' }
        ],
        body: []
      },
      BreadCrumb: ['灌溉地管理', '停灌資料異動'],
      toggleStatus: false
    };
  },
  name: 'DataChange',
  mounted () {
    getApplySetting().then(r => {
      r.data.forEach(element => {
        const result = {};
        let text = '';
        element.open.forEach(item => {
          text += `${item.Ia_cns}-${item.Mng_cns}-${item.Stn_cns}-${item.Grp_cns},`;
        });
        result.title = [element.name, element.start, element.end, text];
        this.tableList.body.push(result);
      });
    });
  },
  methods: {
    toEditCompensateEvent (e) {
      console.log(e);
      if (e) {
        this.$router.push({ path: '/irrigatedLand/compensate/editcompensateEvent' });
      }
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
<style lang="scss">
.content_box{
  padding-right: 0.5em;
  height: calc( 100vh - 190px );
  @include scrollBar;
}
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
