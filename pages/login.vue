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
      />
      <InputHorizontal
        title="密碼"
        is-icon="lock"
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
      <button class="loginBtn">
        登入
      </button>
    </div>
  </div>
</template>

<script>
import InputHorizontal from '~/components/tools/InputHorizontal.vue';
export default {
  components: {
    InputHorizontal
  },
  data () {
    return {
      title: '農田水利灌溉管理整合雲系統'
    };
  },
  name: 'Login',
  layout: 'login'
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
            width: 100%;
            background: #3E9F88;
            border-radius: 5px;
            color:#FFF;
            text-align: center;
            @include noto-sans-tc-18-medium;
        }
    }
}
</style>
