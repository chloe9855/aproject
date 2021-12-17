<template>
  <div class="subTitleTool">
    <h3 :class="{small:isSmall}">
      {{ title }}
    </h3>
    <div
      v-show="isReport"
      class="flexBox w-50 reportBox"
    >
      <Dropdown
        :options="dataChange"
        @DropdownVal="getList"
      />
      <DatePicker
        class="datePickerBox"
        value-type="date"
        type="date"
        @DateValue="getTime"
      />
    </div>
    <div>
      <Buttons
        v-show="isBtn"
        :name="btnName"
        :text="btnText"
        :add="btnAdd"
        @click="getBtnStatus"
      />
      <Buttons
        v-show="isSecBtn"
        :name="btnSecName"
        :text="btnSecText"
        :add="btnSecAdd"
        @click="getSecBtnStatus"
      />
    </div>
  </div>
</template>

<script>
import Buttons from '~/components/tools/Buttons.vue';
import DatePicker from '~/components/tools/DatePicker';
import Dropdown from '~/components/tools/Dropdown';
import { getApplySetting } from '~/api/apply';
export default {
  components: {
    Buttons,
    DatePicker,
    Dropdown
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    isReport: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String,
      default: 'button-add'
    },
    btnText: {
      type: String,
      default: ''
    },
    btnAdd: {
      type: Boolean,
      default: false
    },
    btnSecName: {
      type: String,
      default: 'button-add'
    },
    btnSecText: {
      type: String,
      default: ''
    },
    btnSecAdd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      btnStatus: false,
      btnSecStatus: false,
      dataChange: []
    };
  },
  name: 'SubTitleTool',
  mounted () {
    if (this.isReport) {
      getApplySetting().then(r => {
        console.log('apply');
        console.log(r);
        r.data.forEach(element => {
          this.dataChange.push({ title: element.name, value: element.Apply_sno });
        });
      });
    }
  },
  methods: {
    getBtnStatus (e) {
      this.btnStatus = e;
      this.$emit('STbtnStatus', e);
    },
    getSecBtnStatus (e) {
      this.btnSecStatus = e;
      this.$emit('STbtnSecStatus', e);
    },
    getTime (e) {
      console.log(e);
      this.$emit('STDate', e);
    },
    getList (e) {
      console.log(e);
      this.$emit('STApplySno', e);
    }
  },
  computed: {
    isBtn () {
      const btnText = this.btnText;
      if (btnText !== '') {
        return true;
      } else {
        return false;
      }
    },
    isSecBtn () {
      const btnText = this.btnSecText;
      if (btnText !== '') {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.subTitleTool{
  display: flex;
  margin: 0.5em auto;
  justify-content: space-between;
  h3{
    color:$dark-green;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    display: flex;
    align-items: center;
    &.small{
      font-size: 16px;
      width:80%;
      word-wrap:break-word;
      align-items:start;
      @include pcm-width{
        height: 60px;
      }
      @include pcs-width{
        height: 60px;
      }
      @include pcxs-width{
        height: 60px;
      }
    }
  }
  .reportBox{
    div{
      margin: 0 0.25em;
    }
    .datePickerBox{
      padding: 0 5px;
    }
  }
}
</style>
