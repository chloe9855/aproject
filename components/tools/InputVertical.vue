<template>
  <div class="input-error-two">
    <div class="input-title-and-error-hint">
      <p class="input-title">
        {{ title }}
      </p>
      <div
        v-show="isError"
        class="error-hinit"
      >
        <div class="error-circle">
          <img
            alt=""
            class="vector"
            src="https://static.overlay-tech.com/assets/83d47edd-b635-4a52-94a4-e0b98b92f97e.svg"
          >
        </div>
        <p class="error-hint-text">
          {{ errorTip }}
        </p>
      </div>
    </div>
    <input
      v-model="message"
      class="inputType"
      :class="{inputError:isError}"
      placeholder="錯誤文字"
    >
  </div>
</template>

<script>
export default {
  name: 'InputVertical',
  props: {
    name: {
      type: String,
      default: 'test'
    },
    title: {
      type: String,
      default: '輸入框標題'
    },
    errorText: {
      type: String,
      default: '錯誤文字'
    },
    errorTip: {
      type: String,
      default: '輸入文字格式錯誤'
    },
    inputError: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      message: '',
      isError: true
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.input-title-and-error-hint {
    margin-bottom: 2px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    align-self: stretch;
}
.input-title {
    color: $header-black;
    flex: 1;
    margin-right: 2px;
    @include noto-sans-tc-16-medium;
}
.error-hinit {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
