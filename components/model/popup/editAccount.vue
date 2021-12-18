<template>
  <div class="inputBox theme_scrollbar">
    <InputVertical
      :default-data="account.name"
      title="姓名"
      @inputValue="account.name = $event"
    />
    <InputVertical
      title="帳號"
      :is-disable="!isAdd"
      :external-error="accountMessage"
      :default-data="account.account"
      @inputValue="account.account = $event"
    />
    <template v-if="!isAdd">
      <div
        v-show="!onPassword"
        class="box"
      >
        <span>密碼</span>
        <Button
          v-if="account.status !== 0"
          text="重設密碼"
          name="button-red"
          @click="restorePassword"
        />
      </div>
      <InputVertical
        v-show="onPassword"
        is-icon="lock"
        title="請輸入密碼"
      />
      <InputVertical
        v-show="onPassword"
        is-icon="lock"
        title="請再次輸入密碼"
      />
    </template>
    <DropdownVertical2
      v-model="account.ia"
      title="單位"
      :options="iaList"
      @input="fetchStn"
    />
    <DropdownVertical2
      v-model="account.stn"
      title="工作站"
      :options="stnList"
      @input="fetchGrp"
    />
    <DropdownVertical2
      v-model="account.grp"
      title="小組別"
      :options="grpList"
    />
    <InputVertical
      :external-error="mailMessage"
      title="信箱"
      :default-data="account.mail"
      @inputValue="account.mail = $event"
    />
    <InputVertical
      title="備註"
      :default-data="account.note"
      @inputValue="account.note = $event"
    />
    <DropdownVertical2
      v-model="account.groupsno"
      :options="groupList"
      title="群組"
    />
    <div
      v-if="!isAdd"
      class="box"
    >
      <span>帳號啟用</span>
      <Tag
        v-if="account.status === AccountStatus.Verifying"
        text="驗證中"
      />

      <SwitchOn
        class="inline-block"
        :checked="account.status != AccountStatus.Disable"
        @input="account.status = $event ? AccountStatus.Enable : AccountStatus.Disable"
      />
    </div>

    <AlertBox
      v-if="showSuccess"
      :title="isAdd ? '新增成功' : '修改成功'"
      :cancel-button="false"
      box-icon="success"
      text=""
      @close="successConfirm"
      @confirm="successConfirm"
    />

    <AlertBox
      v-if="showError"
      :title="isAdd ? '新增失敗' : '修改失敗'"
      :cancel-button="false"
      box-icon="error"
      text=""
      @close="showError = false"
      @confirm="showError = false"
    />

    <PopupSubmit @submit="submit" />
  </div>
</template>

<script>
// @ts-check
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical2 from '~/components/tools/DropdownVertical2.vue';
import Button from '~/components/tools/Buttons.vue';
import Tag from '~/components/tools/Tag.vue';
import { addAccount, editAccount, getAccount } from '~/api/account';
import { getGroup } from '~/api/group';
import { groupListData, iaListData, stnListData } from '~/publish/groupListData';
import { getGrps, getStns } from '~/publish/Irrigation';
import AlertBox from '~/components/tools/AlertBox.vue';
import { AccountStatus } from '~/publish/accountStatusTag';
import SwitchOn from '~/components/tools/SwitchOn.vue';
import PopupSubmit from '~/components/model/popup/PopupSubmit.vue';
import { SET_RE_FETCH_DATA, TOGGLE_POPUP_STATUS } from '~/store';

// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
/**
 * @param {string} email
 */
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default {
  components: {
    InputVertical,
    DropdownVertical2,
    Button,
    Tag,
    AlertBox,
    SwitchOn,
    PopupSubmit
  },
  props: {
    id: {
      type: String
    },
    isAdd: {
      type: Boolean
    }
  },
  data: () => {
    return {
      onPassword: false,
      account: /** @type import('types/Account').Account */({}),
      group: {},
      iaList: [],
      groupList: [],
      stnList: [],
      grpList: [],
      test: '',
      accountMessage: '',
      mailMessage: '',
      showSuccess: false,
      AccountStatus,
      showError: false
    };
  },
  name: 'EditAccount',
  created () {
    this.getOptions();
  },
  methods: {
    restorePassword () {
      this.onPassword = !this.onPassword;
    },
    getEditId () {
      return this.$store.state.popupType.editId;
    },
    async getOptions () {
      if (!this.isAdd) {
        const editId = this.getEditId();
        const { data: [account] } = await getAccount(editId);
        this.account = account;
      }

      const g = await getGroup();
      this.iaList = iaListData(g);
      this.groupList = groupListData(g);
      this.test = this.account.groupname;

      await this.fetchStn();
      await this.fetchGrp();
    },
    async fetchStn () {
      if (!this.account.ia) {
        this.stnList = [];
        return;
      }

      this.stnList = stnListData(await getStns(this.account.ia));
    },
    async fetchGrp () {
      if (!this.account.ia || !this.account.stn) {
        this.grpList = [];
        return;
      }

      const res = await getGrps(this.account.ia, '', this.account.stn);
      this.grpList = res.data.map(item => ({ value: item.Grp, title: item.Grp_cns }));
    },
    submit () {
      if (this.isAdd) {
        this.addSubmit();
        return;
      }

      this.editSubmit();
    },
    successConfirm () {
      this.$store.commit(SET_RE_FETCH_DATA);
      this.$store.commit(TOGGLE_POPUP_STATUS);
    },
    async editSubmit () {
      const editId = this.getEditId();
      const { status } = await editAccount({
        ...this.account,
        id: editId
      });

      this.showSuccess = status < 300;
      this.showError = !this.showSuccess;
    },
    async addSubmit () {
      this.accountMessage = '';
      this.mailMessage = '';

      if (!this.account.account) {
        this.accountMessage = '此欄必填';
        return;
      }

      const { data: account } = await getAccount(this.account.account);

      if (account.length) {
        this.accountMessage = '此帳號已被使用';
        return;
      }

      if (!this.validateEmail()) {
        return;
      };

      const { status } = await addAccount({
        ...this.account
      });

      this.showSuccess = status < 300;
      this.showError = !this.showSuccess;
    },
    validateEmail () {
      this.mailMessage = '';
      if (!this.account.mail) {
        this.mailMessage = '此欄必填';
        return;
      }

      if (!validateEmail(this.account.mail)) {
        this.mailMessage = '信箱格式錯誤';
        return;
      }

      return !this.mailMessage;
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
.inline-block {
  display: inline-block;
}
</style>
