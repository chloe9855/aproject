<template>
  <div class="input-error-two">
    <div
      v-show="isError"
      class="error-hinit"
    >
      <div class="error-circle">
        <img
          alt=""
          class="vector"
          src="https://static.overlay-tech.com/assets/615453fc-d75a-48d3-b454-3dad2c87a1cc.svg"
        >
      </div>
      <p class="error-hint-text">
        輸入文字格式錯誤
      </p>
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
  name: 'InputTool',
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
    isWarn: {
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
.error-hinit {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
