<template>
  <div class="dragbox">
    <div class="drag_header">
      <div class="content">
        <slot name="header">
          <label
            class="title"
            :class="iconName ? `box-icon ${iconName}` : ''"
          >{{ name }}</label>
        </slot>
      </div>
      <div
        class="close_icon"
        @click="$emit('close')"
      />
    </div>

    <div class="drag_content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    iconName: String
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>

  .dragbox {
    border: 1px solid blue;
    display: inline-block;
    position: absolute;
    top: 14px;
    right: 77px;
    background-color: white;
    border-radius: 5px;
    padding: 0 0 20px;
    box-shadow: 0 0 14px 0 rgba(137, 137, 137, 0.19);
    overflow: hidden;
  }

  .drag_header {
    padding: 1px 7px 5px;
    background-color: $bg-green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include noto-sans-tc-20-medium;

    .content {
      display: flex;
      align-items: center;

      label {
        display: flex;
        align-items: center;
      }
    }

    .close_icon {
        background: url('~/assets/img/close-icon.svg') no-repeat right/contain;
        width: 23px;
        height: 23px;
        cursor: pointer;
    }
  }

  .box-icon::before {
    content: '';
    width: 21px;
    height: 21px;
    display: inline-block;
    margin: 2px 5px 0 0;
  }

  .icon-layer-ctrl::before {
    background: url('~/assets/img/icon-layer-ctrl.svg') no-repeat right/contain;
  }

  .icon-set-position::before {
    background: url('~/assets/img/icon-set-position.svg') no-repeat right/contain;
  }

</style>
