<template>
  <div>
    <PageHeader
      icon="password"
      class="w-90"
    />
    <div class="pwdSetting">
      <InputVertical
        name="inputName"
        title="請輸入密碼"
        input-text="請輸入8-12碼英數組合，注意大小寫"
        error-tip="輸入文字格式錯誤"
        is-warn="code8"
        is-icon="lock"
      />
      <InputVertical
        name="inputName"
        title="請輸入密碼"
        input-text="請輸入8-12碼英數組合，注意大小寫"
        error-tip="輸入文字格式錯誤"
        is-warn="code8"
        is-icon="lock"
      />
      <Button />
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
    return {};
  },
  layout: 'main'
};
</script>
<style lang="scss">
.page-header{
  margin: 1em auto !important;
}
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
