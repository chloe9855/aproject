<template>
  <div class="flexBox">
    <div
      v-for="(item,index) in checkObject.obj"
      :key="index"
      class="check-input-box flexBox"
      :class="sizing"
    >
      <div class="flex-1 flexCheckBox checkBoxOption">
        <input
          :id="item.id"
          v-model="isCheck"
          type="radio"
          :name="name"
          :value="item.id"
        ><label :for="item.id" />
        {{ item.text }}<span>面積(㎡)</span>
      </div>
      <InputTool
        class="flex-1"
        :is-disable="setDisable(item.id)"
        @inputValue="checkText"
      />
    </div>
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
    }
  },
  data: () => {
    return {
      isCheck: '',
      checkObject: {
        obj: [{ id: 'category01', text: '態樣1(93000)' }, { id: 'category02', text: '態樣2(93000)' }, { id: 'category03', text: '態樣3(93000)' }]
      }
    };
  },
  name: 'CheckInputTool',
  methods: {
    checkText (e) {
      if (e) {
        this.$emit('checkInputVal', { ischeck: this.isCheck, text: e.val });
      }
    }
  },
  computed: {
    setDisable () {
      return function (e) {
        const isCheck = this.isCheck;
        if (isCheck === e) {
          return false;
        } else {
          return true;
        }
      };
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
