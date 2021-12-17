<template>
  <EditAccount
    is-add
    :is-submit="isSubmit"
  />
</template>

<script>
import EditAccount from '~/components/model/popup/editAccount.vue';
export default {
  components: {
    EditAccount
  },
  props: {
    isSubmit: Boolean
  }
};
</script>
