<template>
  <div class="loginBox">
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
        />
        <img
          :src="require('~/assets/img/verification.jpg')"
          class="flex-1"
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
          @click="forgetPassWord"
        >忘記密碼</span>
      </div>
    </div>
  </div>
</template>

<script crossorigin="anonymous">
import InputHorizontal from '~/components/tools/InputHorizontal.vue';
import { loginReq } from '~/api/login';
// import axios from 'axios';
export default {
  components: {
    InputHorizontal
  },
  data () {
    return {
      title: '農田水利灌溉管理整合雲系統',
      account: '',
      password: ''
    };
  },
  name: 'Login',
  layout: 'login',
  middleware: 'routerAuth',
  meta: {
    requiresAuth: true
  },
  methods: {
    login () {
      const data = `account=${this.account}&password=${this.password}`;
      loginReq(data).then((r) => {
        console.log(r);
        this.$router.push('/');
      }).catch((e) => {
        console.log(e);
        this.$router.push('/');
      });
    },
    forgetPassWord () {
      console.log('test');
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
    }
  }
};
</script>
<style lang="scss" scoped>
.loginBox{
    display: flex;
    align-content: center;
    height: $vh-80;
    padding-top: $vh-20;
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
        margin-bottom: 2vh;
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
        .loginBtn{
            margin: 1vh 0;
            background: #3E9F88;
            border-radius: 5px;
            text-align: center;
            padding: 6px 15px;
            cursor: pointer;
            a{
              color:#FFF;
              padding: 6px 8em;
            }
            @include noto-sans-tc-18-medium;
            &:active,&:hover,&.focus{
              background-color: #21705d;
              color: white;
            }
        }
    }
}
</style>
