<template>
  <div class="datepicker">
    <date-picker
      v-model="time"
      class="datepickerTool"
      :value-type="valueType"
      :type="type"
      :range="isRange"
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
    type: {
      type: String,
      default: 'datetime'
    }
  },
  data () {
    return {
      time: null
    };
  },
  name: 'Datepicker'
};
</script>

<style lang="scss" scoped>
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
