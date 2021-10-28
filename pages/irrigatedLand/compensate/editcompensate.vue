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
        icon="edit"
        title="編輯停灌補償申請單"
        btn-text="取消"
        btn-name="button-default"
        btn-sec-text="新增"
        btn-sec-name="button-primary"
        :btn-sec-add="false"
        :is-border="true"
        :is-bg="true"
        :is-sticky="true"
      />
        <SubTitleTool
          title="新增土地資料"
          class="w-90"
        />
        <component
          :is="componentInstance"
          class="w-90 openAddBox"
          :option="checkList"
          :class="[{isToggle:toggleStatus},test]"
          @clear="boxToggle"
        />
        <SubTitleTool
          title="土地資料(填寫單位:桃園管理處)"
          class="w-90"
          btn-text="新增土地資料"
          :btn-add="true"
          @STbtnStatus="boxToggle"
        />
        <TableTool
          :table-column="tableList"
          :is-paginate="false"
          class="w-90"
          :is-del="true"
          :is-scroll-table="true"
        />
        <SubTitleTool
          title="申請人資料"
          class="w-90"
        />
        <div
          class="w-90"
          style="margin:0 auto"
        >
          <input type="checkbox">確定為本人申請
        </div>
        <Requisition
        class="w-90"
          :class="[{isToggle:toggleStatus}]"
          :option="RequisitionDqata1"
        />
        <Requisition
        class="w-90"
          :class="[{isToggle:toggleStatus}]"
          :option="RequisitionDqata2"
        />
      </div>
  </div>
</template>

<script>
import TableTool from '~/components/model/Table.vue';
import Requisition from '~/components/model/editList/Requisition.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import SubTitleTool from '~/components/tools/SubTitleTool.vue';

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    SubTitleTool,
    Requisition
  },
  data () {
    return {
      tableList: {
        name:'editCompensate',
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
      boxToggleStatus: true,
      RequisitionDqata1: { data: [{ title: '姓名', name: '', isRequire: true }, { title: '身份證字號', name: '', isRequire: true }, { title: '出生日期', name: '', isRequire: true }, { title: '地址', name: '', isRequire: true }, { title: '連絡電話', name: '', isRequire: true }, { title: '匯款資訊', name: '', isRequire: true, isSecondInput: true }] },
      RequisitionDqata2: { data: [{ title: '代理人姓名', name: '', isRequire: true }, { title: '代理人身份證字號', name: '', isRequire: true }, { title: '代理人地址', name: '', isRequire: true }, { title: '代理人連絡電話', name: '', isRequire: true }] }
    };
  },
  name: 'EditCompensate',
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    boxToggle (e) {
      this.boxToggleStatus = e;
    }
  },
  computed: {
    componentInstance () {
      return () => import('~/components/model/editList/AddLand');
    },
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    },
    growDiv () {
      const setWidth = this.toggleStatus ? '' : 'grow';
      return setWidth;
    },
    test () {
      return this.boxToggleStatus ? '' : 'closeBox';
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
  margin: 0 5%;
  padding: 0.25em;
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
.content_block {
    width: calc(100% - 372px);
    transition: ease-in-out 0.4s;
    height: calc(100% + 50px);
    margin: 0 5%;
}
.grow {
  width: 90%;
}
.openAddBox{
  height: auto;
  display: block;
  padding: 0.5em 0.25em;
  transition: ease-in-out 0.4s;
}
.closeBox{
  height: 0;
  display: none;
}
.editcompensateContent{
  overflow:auto;
  height: calc( 100vh - 240px);
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
</style>
