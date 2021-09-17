<template>
  <div class="view-checkbox">
    <input
      :id="`view-check_${id}`"
      :checked="visible"
      type="checkbox"
      @change="$emit('change', $event.target.checked, id)"
    >
    <label :for="`view-check_${id}`" />
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    visible: Boolean
  }
};
</script>

<style lang="scss" scoped>

// * 可見度 checkbox

.view-checkbox {
  label {
    width: 20px;
    height: 20px;
    margin: auto;
    display: block;
    background: url('~/assets/img/icon-view.svg') no-repeat center/contain;
    opacity: 0.5;
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    position: absolute;
    opacity: 0;
    z-index: -9999;

    &:checked + label {
      opacity: 1;
    }
  }
}

</style>
