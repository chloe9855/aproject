<template>
  <div class="out_wrap">
    <Dropdown-component
      :options="dropList"
    />
    <InputTool-component
      :input-text="'輸入渠道關鍵字或是點擊地圖'"
    />
    <div class="input_wrap">
      <div>
        <span class="s1">渠道總長度(公尺)</span>
        <span>0</span>
      </div>

      <div class="theme_checkbox">
        <input
          id="check1"
          type="checkbox"
        >
        <label
          for="check1"
        >
          反向
        </label>
      </div>

      <div class="meme">
        <span>椿號定位</span>
        <InputTool-component
          :input-text="'0'"
          sizing="w-30"
        />
        ~
        <InputTool-component
          :input-text="'800'"
          sizing="w-30"
        />
      </div>
      <div class="theme_checkbox box_margin">
        <input
          id="check2"
          type="checkbox"
        >
        <label
          for="check2"
        >
          使用環域(公尺 : 最大200公尺)
        </label>
      </div>
      <div class="wrap2">
        <InputTool-component
          :input-text="'地籍資料'"
          sizing="w-70"
        />
        <InputTool-component
          :input-text="'10'"
          sizing="w-25"
        />
      </div>
      <div class="bt_wrap">
        <Buttons-component
          :name="'button-default'"
          :text="'清除全部'"
          @click="$emit('clear')"
        />
        &emsp;
        <Buttons-component
          :name="'button-primary'"
          :text="'查詢'"
          @click="$emit('channelSearch', 'CHANNEL')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import InputTool from '~/components/tools/InputTool.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'InputTool-component': InputTool,
    'Buttons-component': Buttons
  },
  data () {
    return {
      dropList: {
        option: [
          {
            title: '請選擇管理處',
            value: 0
          },
          {
            title: '選項1',
            value: 1
          },
          {
            title: '選項2',
            value: 2
          }
        ]
      }
    };
  },
  name: 'ChannelSearch'
};
</script>

<style lang="scss" scoped>

  .theme_checkbox {
    input {
    position: absolute; // take it out of document flow
    opacity: 0; // hide it

      & + label {
        position: relative;
        cursor: pointer;
        padding: 0;
      }

      // Box.
      & + label::before {
        content: '';
        margin-right: 7px;
        margin-bottom: -2px;
        display: inline-block;
        width: 13px;
        height: 13px;
        background: white;
        border: 1px solid #959595;
        border-radius: 3px;
      }

      // Box checked
      &:checked + label::before {
        content: '';
        background: url('~/assets/img/checkbox.svg') no-repeat right/contain;
        width: 15px;
        height: 15px;
        border: none;
      }

      &:disabled + label {
        color: #b8b8b8;
        cursor: auto;
      }

      &:disabled + label::before {
        box-shadow: none;
        background: #ddd;
      }

    }

    label {
      color: #494949;
      display: flex;
      align-items: center;
      @include noto-sans-tc-16-regular;
    }
  }

  .box_margin {
    margin: 3px 0;
  }

  .bt_wrap {
    padding: 8px 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .out_wrap {
    padding: 0 20px;
  }

  .input_wrap {
    padding: 7px 0;
    @include noto-sans-tc-16-regular;

    span {
      @include noto-sans-tc-16-medium-line19;

    }
  }

  .s1 {
    border-right: 1px solid #959595;
    padding-right: 10px;
    margin-right: 10px;
  }

  .wrap1 {
    display: flex;

    // input {
    //   width: 103px;
    // }
  }

  .wrap2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .meme {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>
