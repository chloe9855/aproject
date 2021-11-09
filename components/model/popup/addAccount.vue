<template>
  <div class="inputBox theme_scrollbar">
    <InputVertical
      title="姓名"
      @inputValue="setName"
    />
    <InputVertical
      title="帳號"
      @inputValue="setAccount"
    />
    <DropdownVertical
      title="單位"
      @DropdownVal="setUnit"
    />
    <DropdownVertical
      title="工作站"
      @DropdownVal="setSite"
    />
    <DropdownVertical
      title="小組別"
      @DropdownVal="setGrp"
    />
    <InputVertical
      title="信箱"
      @inputValue="setEmail"
    />
    <InputVertical
      title="備註"
      @inputValue="setText"
    />
    <DropdownVertical
      title="群組"
      :option-data="groupList"
      @DropdownVal="setGroup"
    />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import { groupListData, iaListData, stnListData } from '~/publish/groupListData';
import { getAccount } from '~/api/account';
import { getGroup } from '~/api/group';
export default {
  components: {
    InputVertical,
    DropdownVertical
  },
  data: () => {
    return {
      onPassword: false,
      accountData: {
        name: '',
        account: '',
        unit: '',
        site: '',
        grp: '',
        email: '',
        text: '',
        group: ''
      },
      iaList: [],
      groupList: [],
      stnList: []
    };
  },
  name: 'AddAccount',
  mounted () {
    getAccount(this.$store.state.userInfo.id).then(r => {
      this.account = r.data[0];
      getGroup(r.data[0].ia).then(g => {
        this.iaList = iaListData(g);
        this.groupList = groupListData(g);
        this.stnList = stnListData(g);
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    restorePassword () {
      this.onPassword = !this.onPassword;
    },
    setName (e) {
      if (e) {
        this.accountData.name = e;
      }
    },
    setAccount (e) {
      if (e) {
        this.accountData.account = e;
      }
    },
    setUnit (e) {
      if (e) {
        this.accountData.unit = e;
      }
    },
    setSite (e) {
      if (e) {
        this.accountData.site = e;
      }
    },
    setGrp (e) {
      if (e) {
        this.accountData.grp = e;
      }
    },
    setEmail (e) {
      if (e) {
        this.accountData.email = e;
      }
    },
    setGroup (e) {
      if (e) {
        this.accountData.group = e;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 1em;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.box{
  margin: 0.5em auto;
  @include noto-sans-tc-16-medium;
}
</style>
