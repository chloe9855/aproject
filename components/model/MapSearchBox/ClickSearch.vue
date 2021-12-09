<template>
  <div class="out_wrap">
    <p>開啟圖層後，於圖面點選圖層進行查詢</p>
    <!-- <Dropdown-component
      :options="clickMapList"
      :placeholders="'請選擇圖層'"
      :add-text="myWord"
      @DropdownVal="selectLayer"
    /> -->

    <div class="bt_wrap">
      <Buttons-component
        :name="'button-default'"
        :text="'清除全部'"
        @click="$emit('clearCliSearch')"
      />
    </div>
  </div>
</template>

<script>
// import InputTool from '~/components/tools/InputTool.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    // 'InputTool-component': InputTool,
    'Buttons-component': Buttons
  },
  props: {
    clickMapList: {
      type: Array
    }
  },
  data () {
    return {
      dropList: [{ title: '01 宜蘭', value: '1' }],
      nowLayer: '',
      nowId: '',
      nowInfo: '',
      myWord: '',
      fnList: []
    };
  },
  name: 'ClickSearch',
  activated () {
    allMBT.forEach((item) => {
      this.fnList.push(sg.events.on(item, 'click', (e) => {
        // console.log(e.graphic.id);
        // console.log(e.graphic.attributes);

        this.nowId = e.graphic.id[0].substring(3);
        this.nowInfo = e.graphic.attributes;

        if (e.graphic.id.length >= 1) {
          if (this.nowId === 'Cons') {
            this.myWord = '水工構造物';
          }
          if (this.nowId === 'Canal') {
            this.myWord = '渠道';
          }
          if (this.nowId === 'Ia') {
            this.myWord = '管理處';
          }
          if (this.nowId === 'Stn') {
            this.myWord = '工作站';
          }
          if (this.nowId === 'Grp') {
            this.myWord = '小組';
          }
          if (this.nowId === 'Period') {
            this.myWord = '期作別';
          }
          if (this.nowId === 'Rot') {
            this.myWord = '輪區';
          }
          if (this.nowId === 'Pool') {
            this.myWord = '埤塘';
          }
          if (this.nowId === 'Mng') {
            this.myWord = '管理分處';
          }
          this.$emit('clickSearch', this.nowId, this.nowInfo, this.myWord);
        }
      }));
    });
  },
  deactivated () {
    this.fnList.forEach((item) => {
      item.remove();
    });
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>

  .out_wrap {
    padding: 0 20px;
  }
  .bt_wrap {
    padding: 8px 0 10px;
    display: flex;
    justify-content: flex-end;
  }

  p {
    color: #494949;
    @include noto-sans-tc-16-medium-line19;
  }

</style>
