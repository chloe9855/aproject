<template>
  <div class="out_wrap">
    <p>請選擇圖層後，於圖面點選圖層進行查詢</p>
    <Dropdown-component
      :options="dropList"
      :placeholders="'請選擇圖層'"
      @DropdownVal="goDropDown"
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
        { title: '渠道', value: 'Canal' },
        { title: '小組', value: 'Grp' },
        { title: '輪區', value: 'Rot' },
        { title: '期作別', value: 'Period' },
        { title: '埤塘', value: 'Pool' },
        { title: '水工構造物', value: 'Cons' }
      ],
      dropValue: '',
      dropTitle: '',
      myWord: '',
      nowId: '',
      nowInfo: '',
      fnList: [],
      listener: '',
      myGeoData: ''
    };
  },
  name: 'ClickSearch',
  activated () {
    this.userId = sessionStorage.getItem('loginUser');

    this.listener = sg.events.on(pMapBase, 'click', (e) => {
      const p = pMapBase.FromMapPoint(e.point.x, e.point.y);
      const cs = [[2, 2], [2, -2], [-2, -2], [-2, 2], [2, 2]]
        .map(function (d) { return pMapBase.ToMapPoint(p.X + d[0], p.Y + d[1]); })
        .map(function (p) { return [p.X, p.Y]; });
      // const g = sg.geometry.Geometry.fromGeoJson({ type: 'Polygon', coordinates: [cs] });
      const g = { type: 'Polygon', coordinates: [cs] };
      this.myGeoData = g;

      if (this.dropValue === 'Sec5cov') {
        this.getCounty(g);
      }
      if (this.dropValue === 'Section') {
        this.getData('', g);
      }
      if (this.dropValue !== 'Sec5cov' && this.dropValue !== 'Section' && this.dropValue !== '') {
        this.getMyIa(g);
      }
    });

    // allMBT.forEach((item) => {
    //   this.fnList.push(sg.events.on(item, 'click', (e) => {
    //     this.nowId = e.graphic.id[0].substring(3);
    //     this.nowInfo = e.graphic.attributes;

    //     if (e.graphic.id.length >= 1) {
    //       if (this.nowId === 'Ia') {
    //         this.myWord = '管理處';
    //       }
    //       if (this.nowId === 'Stn') {
    //         this.myWord = '工作站';
    //       }
    //       if (this.nowId === 'Period') {
    //         this.myWord = '期作別';
    //       }
    //       if (this.nowId === 'Pool') {
    //         this.myWord = '埤塘';
    //       }
    //       if (this.nowId === 'Mng') {
    //         this.myWord = '管理分處';
    //       }

    //       if (this.nowId === this.dropValue) {
    //         this.$emit('clickSearch', this.nowId, this.nowInfo, this.myWord);
    //       }
    //     }
    //   }));
    // });

    // allMBTX.forEach((item) => {
    //   this.fnList.push(sg.events.on(item, 'click', (e) => {
    //     this.nowId = e.graphic.id[0].substring(3);
    //     this.nowInfo = e.graphic.attributes;

    //     if (e.graphic.id.length >= 1) {
    //       if (this.nowId === 'Cons') {
    //         this.myWord = '水工構造物';
    //       }
    //       if (this.nowId === 'Canal') {
    //         this.myWord = '渠道';
    //       }
    //       if (this.nowId === 'Grp') {
    //         this.myWord = '小組';
    //       }
    //       if (this.nowId === 'Rot') {
    //         this.myWord = '輪區';
    //       }

    //       if (this.nowId === this.dropValue) {
    //         this.$emit('clickSearch', this.nowId, this.nowInfo, this.myWord);
    //       }
    //     }
    //   }));
    // });
  },
  deactivated () {
    this.listener.remove();
    // this.fnList.forEach((item) => {
    //   item.remove();
    // });
  },
  methods: {
    goDropDown (payload) {
      this.dropValue = payload.value;
      this.dropTitle = payload.title;
      if (this.myGeoData !== '' && this.dropValue === 'Sec5cov') {
        this.getCounty(this.myGeoData);
      }
      if (this.myGeoData !== '' && this.dropValue !== 'Sec5cov') {
        this.getMyIa(this.myGeoData);
      }
    },
    // * 其他 -> 先取得Ia
    getMyIa (geoData) {
      fetch(`/AERC/rest/Ia/${this.userId}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          geom: geoData
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);
        this.getData(jsonData[0].Ia, geoData);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 其他 -> 用 Ia 和 geom 去取得對應api資料 寫入table
    getData (myIa, geoData) {
      let url;
      if (this.dropValue === 'Ia') {
        url = `/AERC/rest/Ia/${this.userId}`;
      } else {
        url = `/AERC/rest/${this.dropValue}`;
      }

      let newObj = {};

      if (this.dropValue === 'Section') {
        newObj = {
          geom: geoData
        };
      } else {
        newObj = {
          Ia: myIa,
          geom: geoData
        };
      }

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newObj)
      }).then((response) => {
        if (response.status === 403) {
          this.$emit('clickSearch', this.dropValue, '', this.dropTitle);

          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);

        this.$emit('clickSearch', this.dropValue, jsonData[0], this.dropTitle);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 地籍 -> 先取得countyid
    getCounty (geoData) {
      fetch('/AERC/rest/County', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          geom: geoData
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);
        this.getSec5ByGeom(jsonData[0].COUNTYID, geoData);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 地籍 -> 用 countyId 和 geom 去call api取得資料 寫入table
    getSec5ByGeom (countyId, geoData) {
      fetch('/AERC/rest/Sec5ByGeom', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          geom: geoData,
          CountyID: countyId
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        // console.log(jsonData);

        this.$emit('clickSearch', this.dropValue, jsonData[0], this.dropTitle);
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
