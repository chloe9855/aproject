<template>
  <client-only>
    <vue-draggable-resizable
      :resizable="false"
      :drag-handle="'.drag-handle'"
    >
      <div class="dragbox">
        <div class="drag_header drag-handle">
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
    </vue-draggable-resizable>
  </client-only>
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

  .draggable {
    position: absolute;
    top: 14px;
    right: 81px;
  }

  .dragbox {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    border-radius: 5px;
    padding: 0 0 10px;
    box-shadow: 0 0 14px 0 rgba(137, 137, 137, 0.19);
    max-height: 526px;
    // overflow: hidden;
  }

  .drag_header {
    cursor: grab;
    padding: 1px 7px 5px;
    background-color: $bg-green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
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

  .icon-geo-measure::before {
    background: url('~/assets/img/icon-geo-measure.svg') no-repeat right/contain;
  }

  .icon-screen-shot::before {
    background: url('~/assets/img/icon-screen-shot.svg') no-repeat right/contain;
  }

  .icon-street-map::before {
    background: url('~/assets/img/icon-street-map.svg') no-repeat right/contain;
  }

</style>
