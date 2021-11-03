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
          @click="init"
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
      title="忘記密碼怎麼辦?"
      box-icon="warning"
      text="寄送重設密碼於註冊信箱請前往信箱重設密碼"
    />
  </div>
</template>
<script crossorigin="anonymous">
import InputHorizontal from '~/components/tools/InputHorizontal.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
// import { loginReq } from '~/api/login';
import axios from 'axios';
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
      isforgetPassWord: false
    };
  },
  name: 'Login',
  layout: 'login',
  middleware: 'routerAuth',
  meta: {
    requiresAuth: true
  },
  mounted () {
    // this.Verify();
    this.init();
    this.$cookies.set('theme', '000');
  },
  methods: {
    Verify () {
      const userVerify = axios.create({
        baseURL: 'http://192.168.3.112'
      });
      userVerify.get('/AERC/rest/Verify').then((r) => {
        console.log(r.data);
        this.verifyImg = r.data;
      }).catch((e) => {
        console.log(e);
      });
    },
    init () {
      const url = 'http://192.168.3.112/aerc/rest/verify';
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', url, true);
      const $this = this;
      xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const data = xmlHttp.response;
          const dataTrim = data.replace(/["']/g, '');
          $this.verifyImg = dataTrim;
        }
      };
      xmlHttp.send();
    },
    login () {
      // const data = `account=${this.account}&password=${this.password}&captcha=${this.captcha}`;
      // loginReq(data).then((r) => {
      //   console.log(r);
      //   // this.$router.push('/');
      // }).catch((e) => {
      //   console.log(e);
      //   // this.$router.push('/');
      // });

      const acc = this.account;
      const psw = this.password;
      const code = this.captcha;

      const url = 'http://192.168.3.112/aerc/rest/login';
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('POST', url, true);
      xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xmlHttp.withCredentials = true;
      xmlHttp.onload = function () {
        console.log(this.responseText);
        // $this.$router.push('/');
      };
      xmlHttp.send('account=' + acc + '&password=' + psw + '&captcha=' + code);
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
  @include noto-sans-tc-16-medium;
}
</style>
