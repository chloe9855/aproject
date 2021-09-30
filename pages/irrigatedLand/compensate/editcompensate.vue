<template>
  <div>
    <BreadCrumbTool
      :class="boxWidth"
      :options="BreadCrumb"
    />
    <PageHeader
      icon="edit"
      title="編輯停灌補償申請單"
      :class="boxWidth"
      btn-text="停灌補償申報"
      :btn-add="true"
      btn-name="button-add"
    />
    <SubTitleTool
      title="新增土地資料"
      class="w-90"
      :class="boxWidth"
    />
    <component
      :is="componentInstance"
      class="w-90"
      :option="checkList"
      :class="[{isToggle:toggleStatus},boxWidth]"
    />
    <SubTitleTool
      title="土地資料(填寫單位:桃園管理處)"
      class="w-90"
      :class="boxWidth"
      btn-text="新增土地資料"
    />
    <TableTool
      :table-column="tableList"
      :is-paginate="false"
      :is-del="true"
      :class="boxWidth"
    />
    <Search
      type="irrigatedLandSearch"
      @toggleStatus="getToggleStatus"
    />
    <SubTitleTool
      title="申請人資料"
      class="w-90"
      :class="boxWidth"
    />
    <div
      class="w-90"
      :class="boxWidth"
      style="margin:0 auto"
    >
      <input type="checkbox">確定為本人申請
    </div>
    <Requisition
      class="w-90"
      :class="[{isToggle:toggleStatus},boxWidth]"
      :option="RequisitionDqata1"
    />
    <Requisition
      class="w-90"
      :class="[{isToggle:toggleStatus},boxWidth]"
      :option="RequisitionDqata2"
    />
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import Requisition from '~/components/model/editList/Requisition.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    Search,
    SubTitleTool,
    Requisition
  },
  data () {
    return {
      tableList: {
        topHead: [
          { title: '土地資料', col: 4 },
          { title: '農田水利資料', col: 2 },
          { title: '土地所有權人', col: 3 },
          { title: '農民類別', col: 1 },
          { title: '申請項目', col: 4 }
        ],
        head: [
          { title: '縣市' },
          { title: '鄉鎮' },
          { title: '地段' },
          { title: '地籍面積㎡' },
          { title: '工作站' },
          { title: '灌溉面積㎡' },
          { title: '姓名' },
          { title: '權利範圍' },
          { title: '權利類別' },
          { title: '申請人類別' },
          { title: '申請類別' },
          { title: '申請面積㎡' },
          { title: '作物備註' },
          { title: '檢附資料' }
        ],
        body: [
          { val: 0, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3,4'] },
          { val: 1, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3'] },
          { val: 2, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2'] },
          { val: 3, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3,4'] },
          { val: 4, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1'] },
          { val: 5, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3'] },
          { val: 6, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2'] },
          { val: 7, title: ['XX縣', 'XX鄉', 'XX段', '2,503,882', 'xx工作站', '2,506,555', '陳XX', '1/3', '公同共有', '小大', 'XX', '2,506', 'XXXXXX', '1,2,3,4'] }
        ]
      },
      checkList: { data: [{ title: '全選', value: 'all' }, { title: '1.身分證(正反)影本', value: 0 }, { title: '2.金融帳戶影本', value: 1 }, { title: '3.附件一:切結書', value: 2 }, { title: '4.附件二:實耕者證明文件', value: 3 }, { title: '5.代理委任書:(授權書或同意書)', value: 4 }] },
      BreadCrumb: ['灌溉地管理', '停灌補償申報', '編輯停灌補償申請單'],
      toggleStatus: false,
      RequisitionDqata1: { data: [{ title: '姓名', name: '', isRequire: true }, { title: '身份證字號', name: '', isRequire: true }, { title: '出生日期', name: '', isRequire: true }, { title: '地址', name: '', isRequire: true }, { title: '連絡電話', name: '', isRequire: true }, { title: '匯款資訊', name: '', isRequire: true, isSecondInput: true }] },
      RequisitionDqata2: { data: [{ title: '代理人姓名', name: '', isRequire: true }, { title: '代理人身份證字號', name: '', isRequire: true }, { title: '代理人地址', name: '', isRequire: true }, { title: '代理人連絡電話', name: '', isRequire: true }] }
    };
  },
  name: 'EditCompensate',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    }
  },
  computed: {
    componentInstance () {
      return () => import('~/components/model/editList/AddLand');
    },
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    }
  }
};
</script>
<style lang="scss">
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
.editListBox{
  .Box4{
    .flexBox{
      @include pcm-width{
        flex-wrap: wrap;
      }
    }
  }
  .Box2{
    .button_wrap{
      min-width: 130px;
    }
  }
  .Box6{
    .flexBox{
      flex-wrap: wrap;
    }
  }
}
.requisitionBox{
  background: #EFF4F3;
  padding: 10px;
  .flex-3{
    margin: 2px 0;
    .input-title{
      padding-left: 10px;
    }
    &.twoColume{
      input{
        @include pc-width{
          max-width:144px;
        }
        @include pcm-width{
          max-width:120px;
        }
        @include pcs-width{
          max-width:100px;
        }
        @include pcxs-width{
          max-width:80px;
        }
      }
      .input-box{
        input{
          margin-left: 6px;
          @include pcxs-width{
            margin-left: 1px;
          }
        }
      }
    }
  }
  &.isToggle{
    .flex-3{
      &.twoColume{
        input{
          @include pcxl-width{
            max-width:148px;
          }
          @include pcl-width{
            max-width:132px;
          }
          @include pc-width{
            max-width:108px;
          }
          @include pcm-width{
            max-width:88px;
          }
          @include pcs-width{
            max-width:72px;
          }
          @include pcxs-width{
            max-width:70px;
          }
        }
      }
      .input-box{
        input{
          margin-left: 3px;
          @include pcxl-width{
            margin-left: 2px;
          }
          @include pcxs-width{
            margin-left: 2px;
          }
        }
      }
    }
  }
}
</style>
