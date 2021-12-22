<template>
  <div class="out_wrap">
    <p>請選擇圖層後，於圖面點選圖層進行查詢</p>
    <Dropdown-component
      :options="dropList"
      :placeholders="'請選擇圖層'"
      @DropdownVal="(payload) => { dropValue = payload.value, dropTitle = payload.title }"
    />

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
import Dropdown from '~/components/tools/Dropdown.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'Buttons-component': Buttons
  },
  props: {
    clickMapList: {
      type: Array
    }
  },
  data () {
    return {
      userId: '',
      dropList: [
        { title: '地段', value: 'Section' },
        { title: '地籍', value: 'Sec5cov' },
        { title: '管理處', value: 'Ia' },
        { title: '管理分處', value: 'Mng' },
        { title: '工作站', value: 'Stn' },
        { title: '小組', value: 'Grp' },
        { title: '輪區', value: 'Rot' },
        { title: '期作別', value: 'Period' },
        { title: '埤塘', value: 'Pool' }
      ],
      dropValue: '',
      dropTitle: '',
      myWord: '',
      nowId: '',
      nowInfo: '',
      fnList: [],
      listener: ''
    };
  },
  name: 'ClickSearch',
  activated () {
    this.userId = sessionStorage.getItem('loginUser');

    this.listener = sg.events.on(pMapBase.drawingGraphicsLayer, 'click', (e) => {
      console.log('graphiclayer');
      console.log(e);
      this.getData(e);
    });

    allMBT.forEach((item) => {
      this.fnList.push(sg.events.on(item, 'click', (e) => {
        this.nowId = e.graphic.id[0].substring(3);
        this.nowInfo = e.graphic.attributes;

        if (e.graphic.id.length >= 1) {
          if (this.nowId === 'Ia') {
            this.myWord = '管理處';
          }
          if (this.nowId === 'Stn') {
            this.myWord = '工作站';
          }
          if (this.nowId === 'Period') {
            this.myWord = '期作別';
          }
          if (this.nowId === 'Pool') {
            this.myWord = '埤塘';
          }
          if (this.nowId === 'Mng') {
            this.myWord = '管理分處';
          }

          if (this.nowId === this.dropValue) {
            this.$emit('clickSearch', this.nowId, this.nowInfo, this.myWord);
          }
        }
      }));
    });

    allMBTX.forEach((item) => {
      this.fnList.push(sg.events.on(item, 'click', (e) => {
        this.nowId = e.graphic.id[0].substring(3);
        this.nowInfo = e.graphic.attributes;

        if (e.graphic.id.length >= 1) {
          if (this.nowId === 'Cons') {
            this.myWord = '水工構造物';
          }
          if (this.nowId === 'Canal') {
            this.myWord = '渠道';
          }
          if (this.nowId === 'Grp') {
            this.myWord = '小組';
          }
          if (this.nowId === 'Rot') {
            this.myWord = '輪區';
          }

          if (this.nowId === this.dropValue) {
            this.$emit('clickSearch', this.nowId, this.nowInfo, this.myWord);
          }
        }
      }));
    });
  },
  deactivated () {
    this.listener.remove();
    this.fnList.forEach((item) => {
      item.remove();
    });
  },
  methods: {
    getData (e) {
      let url;
      if (this.dropValue === '') {
        this.dropValue = 'Sec5cov';
      }

      if (this.dropValue === 'Sec5cov') {
        this.getSec5(e);
      } else if (this.dropValue === 'Ia') {
        url = `/AERC/rest/Ia/${this.userId}`;
      } else {
        url = `/AERC/rest/${this.dropValue}`;
      }

      let newObj = {};

      if (this.dropValue === 'Section') {
        newObj = {
          geom: {
            type: 'Point',
            coordinates: [[e.point.x, e.point.y]]
          }
        };
      } else {
        newObj = {
          Ia: '代填',
          geom: {
            type: 'Point',
            coordinates: [[e.point.x, e.point.y]]
          }
        };
      }

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newObj)
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
      }).catch((err) => {
        console.log(err);
      });
    }
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
