<template>
  <div class="out_wrap">
    <p>請開啟渠道圖資，並於圖面點選渠道，顯示樁號</p>
  </div>
</template>

<script>

export default {

  data () {
    return {
      dropList: [],
      title: '',
      nowInfo: '',
      geoData: '',
      totalLength: '',
      startLength: '',
      endLength: '',
      canalName: '',
      fnList: [],
      listenerG: ''
    };
  },
  name: 'StakeSearch',
  activated () {
    //

    allMBTX.forEach((item) => {
      this.fnList.push(sg.events.on(item, 'click', (e) => {
        if (e.graphic.id[0].substring(3) === 'Canal') {
          this.title = e.graphic.id[0];
          this.nowFid = parseInt(e.graphic.id[2], 10);
          this.nowInfo = e.graphic.attributes;
          this.geoData = e.graphic.geometry;
          this.canalName = e.graphic.attributes.Sys_cns;

          // 渠道總長
          this.totalLength = this.geoData.getLength().toFixed(2);
          // 起點至點擊位置的距離
          this.startLength = this.geoData.getValue(new sg.geometry.Point(e.point.x, e.point.y)).toFixed(2);
          // 終點至點擊位置的距離
          this.endLength = this.totalLength - this.startLength;

          const start1 = parseInt(this.startLength / 1000);
          const start2 = (this.startLength % 1000).toFixed(2);
          const end1 = parseInt(this.endLength / 1000);
          const end2 = (this.endLength % 1000).toFixed(2);

          pMapBase.infoWindow.setContent(`${this.canalName}<br />${start1}K+${start2}<br />(末端起算: ${end1}K+${end2})`);
          pMapBase.infoWindow.setTitle('');
          pMapBase.infoWindow.show(new sg.geometry.Point(e.point.x, e.point.y));
        }
      }));
    });

    this.listenerG = sg.events.on(pMapBase.drawingGraphicsLayer, 'click', (e) => {
      if (e.graphic.geometry.length !== undefined) {
        const cpos = pMapBase.getCursorPosition(e);
        const pos = pMapBase.ToMapPoint(cpos.X, cpos.Y);

        this.geoData = e.graphic.geometry;
        this.canalName = this.$store.state.myCanalInfo;

        // 渠道總長
        this.totalLength = e.graphic.geometry.length.toFixed(2);
        // 起點至點擊位置的距離
        this.startLength = this.geoData.getValue(new sg.geometry.Point(pos.X, pos.Y)).toFixed(2);
        // 終點至點擊位置的距離
        this.endLength = this.totalLength - this.startLength;

        const start1 = parseInt(this.startLength / 1000);
        const start2 = (this.startLength % 1000).toFixed(2);
        const end1 = parseInt(this.endLength / 1000);
        const end2 = (this.endLength % 1000).toFixed(2);

        pMapBase.infoWindow.setContent(`${this.canalName}<br />${start1}K+${start2}<br />(末端起算: ${end1}K+${end2})`);
        pMapBase.infoWindow.setTitle('');
        pMapBase.infoWindow.show(new sg.geometry.Point(pos.X, pos.Y));
      }
    });
  },
  deactivated () {
    this.fnList.forEach((item) => {
      item.remove();
    });

    this.listenerG.remove();
  },
  methods: {
    getCanalGeo () {
      fetch('/AERC/rest/Canal', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          Ia: this.nowInfo.Ia,
          FID: this.nowFid
        })
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
    margin-bottom: 20px;
    @include noto-sans-tc-16-medium-line19;
  }

</style>
