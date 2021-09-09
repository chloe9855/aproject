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
  name: 'Datepicker',
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
  }
};
</script>

<style lang="scss" scoped>
.datepicker {
  background-color: $white;
  border-radius: 5px;
  padding: 5px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  .datepickerTool{
    flex:1
  }
}
</style>
