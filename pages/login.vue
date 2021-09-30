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
      <div class="verification">
        <InputHorizontal
          title="驗證碼"
        />
        <img :src="require('~/assets/img/verification.jpg')">
      </div>
      <Button
        class="loginBtn"
        text="登入"
      />
    </div>
  </div>
</template>

<script>
import InputHorizontal from '~/components/tools/InputHorizontal.vue';
import Button from '~/components/tools/Buttons.vue';
export default {
  components: {
    InputHorizontal,
    Button
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
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 41px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.09em;
        margin-bottom: 2vh;
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
        }
        .loginBtn{
            display: flex;
            margin: 1vh 0;
        }
    }
}
</style>
