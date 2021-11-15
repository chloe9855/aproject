<template>
  <div
    class="loginBox"
    @keyup.enter="login"
  >
    <div
      class="mainLogo"
    >
      <img
        :src="require('~/assets/img/logo.svg')"
      >
    </div>
    <div class="mainTitle">
      {{ title }}
    </div>
    <div class="loginInput">
      <InputHorizontal
        title="帳號"
        is-icon="account"
        @inputValue="getAccount"
      />
      <InputHorizontal
        title="密碼"
        is-icon="lock"
        input-type="password"
        @inputValue="getPassword"
      />
      <div class="verification flexBox">
        <InputHorizontal
          title="驗證碼"
          class="flex-1"
          :is-verification="true"
          @inputValue="getCaptcha"
        />
        <img
          :src="verifyImg"
          class="flex-1"
          @click="Verify"
        >
      </div>
      <div
        class="loginBtn"
        @click="login"
      >
        登入
      </div>
      <div class="flexBox flex-right">
        <span
          class="forgetPassWord"
          @click="forgetPassWord"
        >忘記密碼</span>
      </div>
    </div>
    <AlertBox
      v-show="isforgetPassWord"
      :cancel-button="true"
      :add-input="true"
      title="忘記密碼怎麼辦?"
      box-icon="warning"
      text="寄送重設密碼於註冊信箱 請前往信箱重設密碼"
      :tips="forgetPasswordTips"
      :warn-rule="errRule"
      @confirm="sendForgetPassword"
      @close="closeForgetPassWord"
    />
    <AlertBox
      v-show="loginError"
      :title="loginErrorTitle"
      box-icon="warning"
      :text="loginErrorText"
      @confirm="closeAlert"
      @close="closeAlert"
    />
  </div>
</template>
<script crossorigin="anonymous">
import InputHorizontal from '~/components/tools/InputHorizontal.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
import { loginReq, getVerify, forgetPassword } from '~/api/login';
import { forgetPasswordErr } from '~/publish/apiErrorHandler';
import Vue from 'vue';
import VueCookies from 'vue-cookies';
Vue.prototype.$cookies = VueCookies;
export default {
  components: {
    InputHorizontal,
    AlertBox
  },
  data () {
    return {
      title: '農田水利灌溉管理整合雲系統',
      account: '',
      password: '',
      verifyImg: '',
      captcha: '',
      isforgetPassWord: false,
      loginError: false,
      loginErrorTitle: '',
      loginErrorText: '',
      forgetPasswordTips: '',
      errRule: ''
    };
  },
  name: 'Login',
  layout: 'login',
  middleware: 'routerAuth',
  mounted () {
    this.Verify();
  },
  methods: {
    Verify () {
      getVerify().then((r) => {
        this.verifyImg = r.data;
      }).catch((e) => {
        console.log(e);
      });
    },
    login () {
      const data = `account=${this.account}&password=${this.password}&captcha=${this.captcha}`;
      loginReq(data).then((r) => {
        if (r.data[0].status) {
          sessionStorage.setItem('loginStatus', r.data[0].status);
          this.$router.push('/');
        } else {
          console.log('驗證碼錯誤');
        }
      }).catch((e) => {
        console.log(e);
        this.loginErrorTitle = '登入錯誤';
        this.loginErrorText = '請確認帳號密碼是否正確';
        this.loginError = true;
      });
    },
    closeForgetPassWord (e) {
      if (e) {
        this.isforgetPassWord = false;
      };
    },
    closeAlert (e) {
      console.log(e);
      if (e) {
        this.loginError = false;
      };
    },
    forgetPassWord () {
      this.isforgetPassWord = true;
    },
    getAccount (e) {
      if (e) {
        this.account = e;
      }
    },
    getPassword (e) {
      if (e) {
        this.password = e;
      }
    },
    getCaptcha (e) {
      if (e) {
        this.captcha = e;
      }
    },
    sendForgetPassword (e) {
      if (e) {
        const data = `account=${e.value.val}`;
        forgetPassword(data).then(r => {
          console.log(r);
          this.isforgetPassWord = false;
          this.loginErrorTitle = '發送信件成功';
          this.loginErrorText = '請前往信箱重設密碼';
          this.loginError = true;
        }).catch(e => {
          this.forgetPasswordTips = forgetPasswordErr(e.response.status);
          this.errRule = 'code8';
          console.log(e);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.loginBox{
    display: flex;
    align-content: center;
    height: $vh-80;
    padding-top: calc( 20vh - 21px );
    align-items:center;
    flex-direction: column;
    .mainLogo{
        display: flex;
        align-items: center;
        text-align: center;
        margin-bottom: 2vh;
        img{
            width: 300px;
        }
    }
    .mainTitle{
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.09em;
        margin-bottom: 0.25vh;
        font-size: 28px !important;
        @include noto-sans-tc-24-medium;
    }
    .loginInput{
        width: 360px;
        .verification{
            display: flex;
            img{
                flex: 1;
                max-width: 100px;
                height: 40px;
                margin-left: 5px;
            }
            input{
              max-width: 100px;
            }
        }
        .input-box{
          margin: 0.5em 0;
        }
        .loginBtn{
            margin: 1vh 0;
            background: #3E9F88;
            border-radius: 5px;
            text-align: center;
            padding: 6px 15px;
            cursor: pointer;
            color: white;
            a{
              color:#FFF;
              padding: 6px 8em;
            }
            @include noto-sans-tc-18-medium;
            &:active,&:hover,&.focus{
              background-color: #21705d;
            }
        }
    }
}
.forgetPassWord{
  color: #3E9F88;
  cursor: pointer;
  @include noto-sans-tc-16-medium;
}
</style>
