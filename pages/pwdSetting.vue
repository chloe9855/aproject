<template>
  <div>
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
        is-warn="code8"
        is-icon="lock"
        @inputValue="getPassword1"
      />
      <InputVertical
        name="inputName"
        title="請再次輸入密碼"
        input-text="請輸入8-12碼英數組合，注意大小寫"
        error-tip="輸入文字格式錯誤"
        is-warn="code8"
        is-icon="lock"
        @inputValue="getPassword2"
      />
      <Button
        text="確定"
        @click="setNewPassword"
      />
    </div>
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import PageHeader from '~/components/tools/PageHeader.vue';
import Button from '~/components/tools/Buttons.vue';

export default {
  components: {
    PageHeader,
    InputVertical,
    Button
  },
  data () {
    return {
      password1: '',
      password2: ''
    };
  },
  name: 'PwdSetting',
  layout: 'main',
  methods: {
    getPassword1 (e) {
      if (e) {
        this.password1 = e;
      }
    },
    getPassword2 (e) {
      if (e) {
        this.password2 = e;
      }
    },
    setNewPassword () {
      // const data = `account=${e.value.val}`;
    }
  }
};
</script>
<style lang="scss">
.pwdSetting{
  display: flex;
  margin: 10vh auto;
  flex-direction: column;
  width: 30vw;
  .input-box{
    flex:1
  }
  .button_wrap{
    margin: 1em 0;
    justify-content:flex-end;
  }
}

</style>
