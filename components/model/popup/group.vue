<template>
  <div class="inputBox">
    <InputVertical title="群組名稱" />
    <TreeSelect />
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical.vue';
import TreeSelect from '~/components/tools/TreeSelect.vue';
export default {
  components: {
    InputVertical,
    TreeSelect
  },
  data: () => {
    return {
    };
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 1em;
}
.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
