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
      v-model="time"
      :default-value="dateTime"
      :placeholder="time"
      class="datepickerTool w-100"
      :value-type="valueType"
      :type="type"
      :range="isRange"
      :editable="false"
    />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
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
    dateTime: {
      type: String,
      default: ''
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
    }
  },
  data () {
    return {
      time: null
    };
  },
  name: 'Datepicker',
  computed: {
    isTitle: function () {
      const title = this.title;
      if (title === '') {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    time (n, o) {
      const data = { val: n, id: this.inputId };
      this.$emit('DateValue', data);
    },
    dateTime (n) {
      if (n) {
        this.time = n;
      }
    }
  }
};
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
