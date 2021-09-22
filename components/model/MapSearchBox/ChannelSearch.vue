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

      <label>
        <input type="checkbox">反向
      </label>

      <div class="meme">
        <span>椿號定位</span>
        <InputTool-component
          :input-text="'0'"
          sizing="w-30"
        />
        ~
        <InputTool-component
          :input-text="'0'"
          sizing="w-30"
        />
      </div>
      <label>
        <input type="checkbox">使用環域(公尺 : 最大200公尺)
      </label>
      <div class="wrap2">
        <Dropdown-component
          :bg-color="true"
        />
        <InputTool-component />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import InputTool from '~/components/tools/InputTool.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'InputTool-component': InputTool
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

  .out_wrap {
    padding: 0 20px;
  }

  .input_wrap {
    padding: 7px 0;

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
  }

  .meme {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>
