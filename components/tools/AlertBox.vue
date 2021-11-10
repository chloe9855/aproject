<template>
  <div class="maskk">
    <div class="modal">
      <img
        class="close"
        :src="require('~/assets/img/close-icon.svg')"
        @click="$emit('close',true)"
      >
      <div
        class="icon"
        :class="`icon_${boxIcon}`"
      />
      <p class="title">
        {{ title }}
      </p>

      <div class="input_wrap">
        <InputTool-component
          v-if="addInput === true"
          sizing="w-310"
          input-text="請輸入帳號"
          error-tip="無此帳號，請重新輸入"
          is-warn="code8"
          @inputValue="getInputValue"
        />
      </div>

      <p class="text">
        {{ text }}
      </p>
      <div class="button-group">
        <div
          v-if="cancelButton === true"
          class="msg-btn cancel"
          @click="$emit('close',true)"
        >
          取消
        </div>
        <div
          class="msg-btn"
          @click="$emit('confirm',{status:true,value:inputValue})"
        >
          確定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputTool from '~/components/tools/InputTool.vue';

export default {
  components: {
    'InputTool-component': InputTool
  },
  props: {
    cancelButton: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '我是標題'
    },
    text: {
      type: String,
      default: '我是警示文字'
    },
    boxIcon: {
      type: String,
      default: 'warning'
      // warning, error, success
    },
    addInput: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputValue: ''
    };
  },
  methods: {
    getInputValue (e) {
      if (e) {
        this.inputValue = e;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

  .modal {
    width: 350px;
    background-color: $white;
    border-radius: 5px;
    padding: 10px 10px 20px;
    box-shadow: 0 0 14px 0 rgba(137, 137, 137, 0.19);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .maskk {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close {
    width: 21px;
    height: 21px;
    position: absolute;
    right: 10px;
    top: 6.5px;
    cursor: pointer;
  }

  .icon {
    margin: 25px 0 16px;
  }

  .icon_warning {
    width: 30px;
    height: 30px;
    background: url('~/assets/img/warning_icon.svg') no-repeat center/contain;
  }

  .icon_error {
    width: 30px;
    height: 30px;
    background: url('~/assets/img/alert-icon.svg') no-repeat center/contain;
  }

  .icon_success {
    width: 30px;
    height: 30px;
    background: url('~/assets/img/success_icon.svg') no-repeat center/contain;
  }

  .title {
    color: $header-black;
    text-align: center;
    margin-bottom: 10px;
    @include noto-sans-tc-20-medium;
  }

  .text {
    color: $word-black;
    align-self: stretch;
    text-align: center;
    margin-bottom: 10px;
    @include noto-sans-tc-16-regular;
  }

  .button-group {
    display: flex;
    justify-content: space-evenly;
    width: 161px;
  }

  .msg-btn {
    border-radius: 5px;
    padding: 6px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: $main-green;
    color: $white;
    cursor: pointer;
    @include noto-sans-tc-16-medium;

    &:hover {
      background-color: $dark-green;
      color: $white;
    }
  }

  .cancel {
    background-color: $light-green;
    color: $dark-green;
    border-radius: 5px;
    padding: 6px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    @include noto-sans-tc-16-medium;
  }

  .input_wrap {
    margin: 12px 0;
  }

</style>
