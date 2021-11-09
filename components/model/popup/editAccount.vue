<template>
  <div class="inputBox theme_scrollbar">
    {{ account }}
    <InputVertical
      :default-data="account.name"
      title="姓名"
    />
    <InputVertical
      title="帳號"
      :default-data="account.account"
    />
    <div
      v-show="!onPassword"
      class="box"
    >
      <span>密碼</span>
      <Button
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
    <DropdownVertical
      title="單位"
      :options="group"
    />
    <DropdownVertical
      title="工作站"
      :options="group"
    />
    <DropdownVertical
      title="小組別"
      :options="group"
    />
    <InputVertical
      title="信箱"
      :default-data="account.mail"
    />
    <InputVertical
      title="備註"
      :default-data="account.note"
    />
    <DropdownVertical title="群組" />
    <div class="box">
      <span>帳號啟用</span>
      <Tag text="驗證中" />
    </div>
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
import Button from '~/components/tools/Buttons.vue';
import Tag from '~/components/tools/Tag.vue';
import { getAccount } from '~/api/account';
import { getGroup } from '~/api/group';

export default {
  components: {
    InputVertical,
    DropdownVertical,
    Button,
    Tag
  },
  data: () => {
    return {
      onPassword: false,
      account: {},
      group: {}
    };
  },
  name: 'EditAccount',
  async asyncData () {
    return getAccount(this.$store.state.userInfo.id).then(({ data }) => ({
      account: data
    })).catch(e => {
      console.log(e);
    });
  },
  mounted () {
    // console.log(this.$store.state.popupType);
    getAccount(this.$store.state.userInfo.id).then(r => {
      this.account = r.data[0];
      getGroup(r.data[0].ia).then(r => {
        console.log(r);
        this.group = r;
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    });
  },
  methods: {
    restorePassword () {
      this.onPassword = !this.onPassword;
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
</style>
