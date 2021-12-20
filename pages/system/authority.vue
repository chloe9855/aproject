<template>
  <div class="mainContent">
    <div
      class="content_block"
      :class="[growDiv,boxWidth]"
    >
      <BreadCrumbTool
        :options="BreadCrumb"
      />
      <PageHeader
        icon="slider"
        title="群組權限管理"
        :btn-text="delBtn"
        :btn-add="false"
        btn-name="button-red"
        btn-sec-text="新增群組"
        :btn-sec-add="true"
        btn-sec-name="button-add"
        @PHSecBtnStatus="addGroup"
      />
      <div
        class="content_box"
      >
        <TableTool
          :table-column="tableList"
          :is-paginate="false"
          :is-edit="true"
          :is-del="true"
          @tableEvent="changeGroup"
        />
      </div>
    </div>
    <Search
      type="groupUserAcctSearch"
      @toggleStatus="getToggleStatus"
      @search="search"
      @clearSearch="onClear"
    >
      <GroupUserAcctSearch
        :search-obj-prop="searchObj"
        :groups="groups"
      />
    </Search>

    <AlertBox
      v-if="showCannotRemoveAlert"
      box-icon="error"
      title="此群組不可刪除"
      text="注意：群組刪除後不可復原"
      @close="showCannotRemoveAlert = false"
      @confirm="showCannotRemoveAlert = false"
    />

    <AlertBox
      v-if="singleRemoveId != null"
      box-icon="error"
      title="確定要刪除該群組?"
      text="注意：群組刪除後不可復原"
      cancel-button
      @close="singleRemoveId = null"
      @confirm="remove"
    />

    <AlertBox
      v-if="showSuccess"
      box-icon="success"
      title="刪除成功"
      text=""
      @close="removeConfirmed"
      @confirm="removeConfirmed"
    />

    <AlertBox
      v-if="showError"
      box-icon="error"
      title="刪除失敗"
      text=""
      @close="showError = false"
      @confirm="showError = false"
    />
  </div>
</template>

<script>
// @ts-check
import TableTool from '~/components/model/Table.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import BreadCrumbTool from '~/components/tools/BreadCrumbTool.vue';
import Search from '~/components/model/Search1.vue';
import { delGroup, getGroup } from '~/api/group';
import { groupData } from '~/publish/groupData';
import GroupUserAcctSearch from '~/components/model/searchBox/groupUserAcctSearch.vue';
import dayjs from 'dayjs';
import { getAccount } from '~/api/account';
import AlertBox from '~/components/tools/AlertBox.vue';

const getDefaultSearchObj = () => ({
  group: null,
  startTime: '',
  endTime: ''
});

export default {
  components: {
    PageHeader,
    TableTool,
    BreadCrumbTool,
    Search,
    GroupUserAcctSearch,
    AlertBox
  },
  data () {
    return {
      tableList: {
        head: [
          { title: '群組名稱' },
          { title: '最後變更日期' }
        ],
        body: [
          { val: 0, title: ['XX工作站', '2012/12/17'] },
          { val: 1, title: ['XX工作站', '2012/12/17'] },
          { val: 2, title: ['OX工作站', '2012/12/17'] },
          { val: 3, title: ['OO工作站', '2012/12/17'] },
          { val: 4, title: ['XX工作站', '2012/12/17'] },
          { val: 5, title: ['XX工作站', '2012/12/17'] },
          { val: 6, title: ['OX工作站', '2012/12/17'] },
          { val: 7, title: ['OO工作站', '2012/12/17'] }
        ]
      },
      BreadCrumb: ['系統管理', '群組權限管理'],
      toggleStatus: false,
      delBtn: '',
      /** @type {Array<import('types/Group').Group>} */
      groups: [],
      searchObj: getDefaultSearchObj(),
      showCannotRemoveAlert: false,
      singleRemoveId: null,
      showSuccess: false,
      showError: false
    };
  },
  name: 'Authority',
  async asyncData () {
    const group = await getGroup();

    return {
      tableList: {
        head: [
          { title: '群組名稱' },
          { title: '最後變更日期' }
        ],
        body: groupData(group.data)
      },
      groups: group.data
    };
  },
  mounted: () => {
    getGroup().then(r => {
      console.log(r.data);
      groupData(r.data);
    });
  },
  methods: {
    getToggleStatus (e) {
      this.toggleStatus = e;
    },
    addGroup (e) {
      if (e) {
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', {
          type: 'group',
          title: '新增群組',
          integrateSubmit: false
        });
      }
    },
    changeGroup (e) {
      if (e.event === 'isEdit') {
        console.log(e.item);
        this.$store.commit('TOGGLE_POPUP_STATUS');
        this.$store.commit('TOGGLE_POPUP_TYPE', {
          type: 'group',
          title: '編輯群組',
          editId: e.item.groupsno,
          integrateSubmit: false
        });
      } else if (e.event === 'isDel') {
        console.log(e);
        this.checkAndShowRemove(e.item.val);
      }
    },
    // getTableCheck (e) {
    //   if (e) {
    //     if (e.length > 1) {
    //       this.delBtn = '多筆刪除';
    //     } else {
    //       this.delBtn = '';
    //     };
    //   }
    // },
    async search () {
      const { data } = await getGroup();
      this.groups = data;
      let filtered = this.groups;

      if (this.searchObj.group) {
        filtered = filtered.filter(g => g.groupsno === this.searchObj.group);
      }

      if (this.searchObj.startTime) {
        const startTime = dayjs(this.searchObj.startTime);

        filtered = filtered.filter(g => dayjs(g.updatetime) >= startTime);
      }

      if (this.searchObj.startTime) {
        const endTime = dayjs(this.searchObj.endTime);

        filtered = filtered.filter(g => dayjs(g.updatetime) >= endTime);
      }

      this.tableList.body = groupData(filtered);
    },
    onClear () {
      this.searchObj = getDefaultSearchObj();
      this.tableList.body = groupData(this.groups);
    },
    /**
     * @param {number} id
     */
    async checkAndShowRemove (id) {
      const { data: accounts } = await getAccount();

      if (accounts.find(a => a.groupsno === id)) {
        this.showCannotRemoveAlert = true;
        return;
      }

      this.singleRemoveId = id;
    },
    async remove () {
      if (this.singleRemoveId == null) {
        return;
      }

      const { status } = await delGroup(this.singleRemoveId);

      this.singleRemoveId = null;
      this.showSuccess = status < 300;
      this.showError = !this.showSuccess;
    },
    removeConfirmed () {
      this.showSuccess = false;
      this.search();
    }
  },
  computed: {
    /** @returns {string} */
    boxWidth () {
      const setWidth = this.toggleStatus ? 'tg-75' : 'w-90';
      return setWidth;
    },
    /** @returns {string} */
    growDiv () {
      const setWidth = this.toggleStatus ? '' : 'grow';
      return setWidth;
    },
    /** @returns {number} */
    refetchCounter () {
      return this.$store.state.refetchCounter;
    }
  },
  watch: {
    refetchCounter () {
      this.search();
    }
  }
};
</script>
<style lang="scss" scoped>
.mainContent{
  position: relative;
}
.tableTool{
  .tableContent{
    table{
      tbody{
        text-align: left !important;
        tr{
          td:nth-child(2){
            width: 120px;
          }
        }
      }
    }
  }
}
.downloadArea{
  display: flex;
  margin: 0 auto;
  .tableTool{
    flex:1;
  }
  .tableTool:nth-child(1){
    margin-right: 1em !important;
  }
}
.downloadTitle{
  display: flex;
  margin: 0 auto;
  .subTitleTool{
    flex:1;
  }
  .subTitleTool:nth-child(1){
    margin-right: 1em !important;
  }
}
.content_block {
    width: calc(100% - 372px);
    transition: ease-in-out 0.4s;
    height:100%;
    margin : 0 5%;
}
.content_box{
  height: calc( 100vh - 190px );
  padding-right: 0.5em;
  @include scrollBar;
}
.grow {
  width: 90%;
}
</style>
