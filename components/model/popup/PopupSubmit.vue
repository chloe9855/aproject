<template>
  <div class="buttonBox">
    <Button
      name="button-default"
      text="取消"
      @click="toggleStatus"
    />
    <Button
      name="button-primary"
      text="確認"
      @click="$emit('submit',true)"
    />
  </div>
</template>

<script>
import Button from '~/components/tools/Buttons.vue';
export default {
  components: {
    Button
  },
  methods: {
    toggleStatus () {
      this.$store.commit('TOGGLE_POPUP_STATUS');
      this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'addTableData', title: '編輯內容' });
    }
  }
};
</script>

<style scoped lang="scss">
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin: 10px 5px;
  .button_wrap{
    margin-left: 5px;
  }
}
</style>
