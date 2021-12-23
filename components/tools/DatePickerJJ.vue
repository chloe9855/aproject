<template>
  <div
    class="input-box datepicker"
    :class="sizing"
  >
    <div
      v-show="isTitle"
      class="input-title-box"
    >
      <p class="input-title">
        {{ title }}
      </p>
    </div>
    <date-picker
      :value="timeInner"
      class="datepickerTool w-100"
      :value-type="valueType"
      :type="type"
      :range="isRange"
      :editable="false"
      :placeholder="placeholder"
      @input="onInput"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default Vue.extend({
  components: { DatePicker },
  props: {
    isRange: {
      type: Boolean,
      default: false
    },
    valueType: {
      type: String,
      default: 'format'
    },
    type: {
      type: String,
      default: 'datetime'
    },
    sizing: {
      type: String,
      default: 'w-100'
    },
    title: {
      type: String,
      default: ''
    },
    inputId: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'yyyy/mm/dd'
    },
    time: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      timeInner: this.time
    };
  },
  name: 'Datepicker',
  methods: {
    onInput (v) {
      const data = { val: v, id: this.inputId };
      this.timeInner = v;
      this.$emit('DateValue', data);
    }
  },
  computed: {
    /** @returns {boolean} */
    isTitle: function () {
      return this.title !== '';
    }
  },
  watch: {
    time () {
      this.timeInner = this.time;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/scss/input.scss';
.input-title {
    color: $header-black;
    flex: 1;
    margin-right: 2px;
    @include noto-sans-tc-16-medium;
}
.datepicker {
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  .datepickerTool{
    flex:1
  }
}
</style>
