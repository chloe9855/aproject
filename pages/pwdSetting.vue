<template>
  <form @submit.prevent="setNewPassword">
    <PageHeader
      icon="password"
      class="w-90"
      :is-border="true"
    />

    <div class="pwdSetting">
      <InputVertical
        name="inputName"
        title="請輸入密碼"
        input-text="請輸入8-12碼英數組合，注意大小寫"
        error-tip="輸入文字格式錯誤"
        is-icon="lock"
        input-type="password"
        :external-error="passwordMessage"
        @inputValue="getPassword1"
      />

      <InputVertical
        name="inputName"
        title="請再次輸入密碼"
        input-text="請輸入8-12碼英數組合，注意大小寫"
        error-tip="輸入文字格式錯誤"
        :external-error="confirmingPasswordMessage"
        is-icon="lock"
        input-type="password"
        @inputValue="getConfirmingPassword"
      />

      <Button
        text="確定"
        @click="setNewPassword"
      />
    </div>

    <AlertBox
      v-if="showSuccessAlert"
      box-icon="success"
      title="修改成功"
      text=""
      @close="successConfirmed"
      @confirm="successConfirmed"
    />

    <AlertBox
      v-if="showErrorAlert"
      box-icon="error"
      :title="errorAlertTitle || '修改失敗'"
      :text="errorAlertMessage"
      @close="showErrorAlert = false"
      @confirm="showErrorAlert = false"
    />
  </form>
</template>

<script>
// @ts-check
import InputVertical from '~/components/tools/InputVertical.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import Button from '~/components/tools/Buttons.vue';
import { editAccount } from '~/api/account';
import AlertBox from '~/components/tools/AlertBox.vue';
import { validatePassword } from '~/publish/validatePassword';
import service from '~/service';

/**
 * @param {Record<string, string | string[]>} query
 */
function normalizeQuery (query) {
  const { a, t, d } = query;
  const [account, token, date] = [a, t, d].map((q) =>
    Array.isArray(q) ? q[0] : q
  );

  return {
    account,
    token,
    date
  };
}

export default {
  components: {
    PageHeader,
    InputVertical,
    Button,
    AlertBox
  },
  data () {
    return {
      password1: '',
      confirmingPassword: '',
      showErrorAlert: false,
      showSuccessAlert: false,
      errorAlertMessage: '',
      confirmingPasswordMessage: '',
      passwordMessage: '',
      errorAlertTitle: '',
      ...normalizeQuery(this.$route.query)
    };
  },
  name: 'PwdSetting',
  layout: 'main',
  validate (context) {
    const { account, token, date } = normalizeQuery(context.query);

    return !!(account && token && date);
  },
  methods: {
    getPassword1 (e) {
      if (e) {
        this.password1 = e;
      }
    },
    getConfirmingPassword (e) {
      if (e) {
        this.confirmingPassword = e;
      }
    },
    async validateParameters () {
      if (!this.account || !this.token || !this.date) {
        this.errorAlertTitle = '驗證錯誤，請重新點選信件連結';
        this.showErrorAlert = true;
        return;
      }

      const dateNum = parseFloat(this.date);
      const diff = Date.now() / 1000 - dateNum;

      if (diff > 60 * 60 * 24) {
        this.showErrorAlert = true;
        this.errorAlertTitle = '已超過驗證時間';
        return;
      }

      const { status, data } = await service.get(
        `/AERC/rest/GUIDVerify?uid=${this.account}&token=${this.token}`,
        {
          validateStatus: () => true
        }
      );

      this.showErrorAlert = status !== 200;
      if (status === 401) {
        this.errorAlertTitle = '驗證錯誤';
        this.errorAlertMessage = data;
      }
    },
    async setNewPassword () {
      this.errorAlertMessage =
        this.passwordMessage =
        this.errorAlertTitle =
        this.confirmingPasswordMessage =
          '';

      await this.validateParameters();

      if (this.showErrorAlert) {
        return;
      }

      if (!this.password1) {
        this.passwordMessage = '此欄必填';
        return;
      }

      this.passwordMessage = validatePassword(this.password1);

      if (this.passwordMessage) {
        return;
      }

      if (this.password1 !== this.confirmingPassword) {
        this.confirmingPasswordMessage = '您輸入的兩組密碼並不相符，請再試一次';
        return;
      }

      const { status, data } = await editAccount(
        {
          id: [this.account],
          password: this.password1,
          token: this.token,
          status: 1
        },
        {
          validateStatus: () => true
        }
      );

      this.showSuccessAlert = status < 300;
      this.showErrorAlert = !this.showSuccessAlert;

      if (status === 400) {
        this.errorAlertMessage = data;
        this.password1 = this.confirmingPassword = '';
      }
    },
    successConfirmed () {
      this.showSuccessAlert = false;
      this.$router.push('/login');
    }
  }
};
</script>
<style lang="scss">
.pwdSetting {
  display: flex;
  margin: 10vh auto;
  flex-direction: column;
  width: 30vw;
  .input-box {
    flex: 1;
  }
  .button_wrap {
    margin: 1em 0;
    justify-content: flex-end;
  }
}
</style>
