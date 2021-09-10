<template>
  <div class="wrapper">
    <Header-component />
    <div class="main">
      <div class="side_bar">
        <Feature-component />
      </div>
      <DragBox-component
        :name="'圖層工具'"
        :icon-name="'icon-layer-ctrl'"
      >
        <template #content>
          <div class="navtabs__header">
            <div
              v-for="typeItem of layerOptions.typeList"
              :key="typeItem.id"
              class="navtabs__btn"
              :class="{ 'current': layerOptions.current === typeItem.id }"
              @click.stop="layerOptions.current = typeItem.id"
            >
              {{ typeItem.name }}
            </div>
          </div>
          <div class="navtabs__content">
            <div
              v-if="layerOptions.current === 1"
              class="layer__list"
            >
              <div
                v-for="item in layerOptions.surfaceList"
                :key="item.id"
                class="layer__item"
              >
                <LayerItem-component
                  :item="item"
                />
              </div>
            </div>
          </div>
        </template>
      </DragBox-component>
      <NavTabs-component />
    </div>
    <!-- <Footer-component /> -->
  </div>
</template>

<script>
import Header from '~/components/model/Header';
// import Footer from '~/components/model/Footer';
import NavTabs from '~/components/tools/NavTabs.vue';
import Feature from '~/components/Feature.vue';
import DragBox from '~/components/DragBox.vue';
import LayerItem from '~/components/LayerItem.vue';

export default {
  components: {
    'Header-component': Header,
    // 'Footer-component': Footer,
    'NavTabs-component': NavTabs,
    'Feature-component': Feature,
    'DragBox-component': DragBox,
    'LayerItem-component': LayerItem
  },
  data () {
    return {
      layerOptions: {
        current: 0,
        typeList: [
          {
            name: '點圖資',
            id: 0
          },
          {
            name: '線圖資',
            id: 1
          },
          {
            name: '面圖資',
            id: 2
          },
          {
            name: '底圖切換',
            id: 3
          },
          {
            name: '臨時展繪',
            id: 4
          },
          {
            name: 'OGC介接',
            id: 5
          }
        ],
        surfaceList: []
      }
    };
  },
  mounted () {
    const surface = require('~/static/surfaceLayer.json');
    this.layerOptions.surfaceList = [...surface.data];
  }
};
</script>

<style lang="scss" scoped>

  .main{
    position: relative;
    border: 1px solid red;
    // height: calc(100vw - 106px);
  }

  .side_bar {
    position: absolute;
    right: 10px;
    top: 12px;
  }

  .navtabs__header {
    width: 420px;
  }

  .layer__list {

    .layer__item:nth-child(odd) {
      background-color:#F5F5F5;
    }
  }

  .layer__item {
    @include noto-sans-tc-16-medium;
  }

</style>
