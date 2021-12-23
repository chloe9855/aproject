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
        input-type="password"
        is-icon="lock"
        title="請輸入密碼"
        :input-text="passwordPlaceholder"
        :external-error="passwordErrorMessage"
        @inputValue="password = $event"
      />
      <InputVertical
        v-show="onPassword"
        input-type="password"
        is-icon="lock"
        title="請再次輸入密碼"
        :input-text="passwordPlaceholder"
        :external-error="
          !passwordConfirm || passwordConfirmIsTheSame ? '' : '確認密碼不符'
        "
        @inputValue="passwordConfirm = $event"
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
        @input="
          account.status = $event ? AccountStatus.Enable : AccountStatus.Disable
        "
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
      :text="errorMessage"
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
import { getGrps, getIas, getStns } from '~/publish/Irrigation1';
import AlertBox from '~/components/tools/AlertBox.vue';
import { AccountStatus } from '~/publish/accountStatusTag';
import SwitchOn from '~/components/tools/SwitchOn.vue';
import PopupSubmit from '~/components/model/popup/PopupSubmit.vue';
import { SET_RE_FETCH_DATA, TOGGLE_POPUP_STATUS } from '~/store';
import { validatePassword } from '~/publish/validatePassword';

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
      account: /** @type import('types/Account').Account */ ({}),
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
      showError: false,
      password: '',
      passwordConfirm: '',
      passwordPlaceholder: '請輸入8-30碼英數組合，注意大小寫',
      passwordErrorMessage: '',
      errorMessage: ''
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
        const {
          data: [account]
        } = await getAccount(editId);
        this.account = account;
        this.iaList = iaListData(await getIas(undefined, this.editId));
      }

      const g = await getGroup();
      this.iaList = iaListData(await getIas(undefined, this.$store.state.userInfo.account));
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
      this.grpList = res.data.map((item) => ({
        value: item.Grp,
        title: item.Grp_cns
      }));
    },
    submit () {
      this.errorMessage = '';
      if (this.isAdd) {
        this.addSubmit();
        return;
      }

      this.editSubmit();
    },
    successConfirm () {
      this.$store.commit(SET_RE_FETCH_DATA);
      this.$store.commit(TOGGLE_POPUP_STATUS);

      this.showSuccess = false;
      this.account = /** @type {import('types/Account').Account} */({});
    },
    async editSubmit () {
      const editId = this.getEditId();

      if (!this.validateEmail() || !this.validatePassword()) {
        return;
      }

      /** @type {Parameters<typeof editAccount>[0]} */
      const data = {
        ...this.account,
        id: [editId]
      };

      if (this.onPassword && this.password) {
        data.password = this.password;
      }

      const { status } = await editAccount(data, {
        validateStatus: status => status < 500
      });

      this.checkIfRequestIsSuccess(status, data);
    },
    async addSubmit () {
      this.accountMessage = '';
      this.mailMessage = '';

      if (!this.account.account) {
        this.accountMessage = '此欄必填';
        return;
      }

      let account;
      try {
        ({ data: account } = await getAccount(this.account.account));
      } catch (error) {
        account = [];
      }

      if (account.length) {
        this.accountMessage = '此帳號已被使用';
        return;
      }

      if (!this.validateEmail()) {
        return;
      }

      const { status, data } = await addAccount({
        ...this.account
      }, {
        validateStatus: status => status < 500
      });

      this.checkIfRequestIsSuccess(status, data);
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
    },
    validatePassword () {
      this.passwordErrorMessage = '';
      if (!this.onPassword) {
        return true;
      }

      if (!this.passwordConfirmIsTheSame) {
        return false;
      }

      this.passwordErrorMessage = validatePassword(this.password);

      return !this.passwordErrorMessage;
    },
    /**
     * @param {number} status
     * @param {any} data
     */
    checkIfRequestIsSuccess (status, data) {
      this.showSuccess = status < 300;
      this.showError = !this.showSuccess;

      if (status === 400) {
        this.errorMessage = data;
      }
    }
  },
  computed: {
    /** @returns {boolean} */
    passwordConfirmIsTheSame () {
      return this.password === this.passwordConfirm;
    },
    /** @returns {string} */
    editId () {
      return this.$store.state.popupType.editId;
    }
  },
  watch: {
    editId () {
      this.getOptions();
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox {
  padding: 1em;
}
.buttonBox {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.box {
  margin: 0.5em auto;
  @include noto-sans-tc-16-medium;
}
.inline-block {
  display: inline-block;
}
</style>
