<template>
  <div class="flexBox">
    <div class="flex-1 flexCheckBox checkBoxOption">
      <input
        :id="val"
        v-model="isCheck"
        type="checkbox"
        :name="name"
        :value="val"
      ><label :for="val" />
      {{ text }}<span>面積(㎡)</span>
    </div>
    <InputTool
      class="flex-1"
      :change-text="!isCheck"
      @inputValue="checkText"
    />
  </div>
</template>

<script>
import InputTool from '~/components/tools/InputTool.vue';
export default {
  components: {
    InputTool
  },
  props: {
    text: {
      type: String,
      default: '態樣1(93000)'
    },
    val: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    money: {
      type: Number,
      default: 0
    },
    num: {
      type: Number,
      default: 0
    },
    sizing: {
      type: String,
      default: 'w-100'
    },
    name: {
      type: String,
      default: 'category'
    },
    value: {
      type: String,
      default: ''
    },
    setCheck: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      isCheck: false,
      checkObject: {
        id: 'category01', text: '態樣1(93000)'
      }
    };
  },
  name: 'CheckInputTool',
  methods: {
    checkText (e) {
      if (e) {
        this.$emit('checkInputVal', { isCheck: this.isCheck, category: this.type, money: this.money, text: e.val, num: this.num });
      }
    }
  },
  computed: {
  },
  watch: {
    setCheck (n) {
      this.isCheck = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.flexCheckBox{
  min-width: 180px;
}
.checkBoxOption{
  input[type="checkbox"] {
    display:none;
  }
  input[type="checkbox"] + label
  {
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
    @include checkbox;
  }
  input[type="checkbox"]:checked + label
  {
    background: url("~/assets/img/check.svg");
    height: 14px;
    width: 14px;
    display:inline-block;
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
