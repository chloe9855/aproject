<template>
  <div class="wrapper">
    <div class="main">
      <NavTabs-component
        :type-list="options.typeList"
        @current="payload => options.current = payload"
      />
      <br>
      <br>
      <Feature-component />
      <br>
      <br>
      <SwitchTabs-component
        :type-list="options2.typeList"
        @current="payload => options2.current = payload"
      />
      <br>
      <br>
      <SliderBar-component />
      <br>
      <br>
      <Marker-component />
      <br>
      <br>
      <AlertBox-component
        v-if="modal1"
        title="gooddddddddddddddd"
        text="寄送重設密碼於註冊信箱"
        box-icon="success"
        :cancel-button="true"
        :add-input="true"
        @close="modal1 = false"
        @confirm="modal1 = false"
      />
      <br>
      <br>
      <Buttons-component />
      <Buttons-component
        :name="'button-primary-disable'"
        :text="'新增圖層'"
      />
      <Buttons-component
        :name="'button-default'"
        :text="'新增圖層'"
      />
      <Buttons-component
        :name="'button-default-disable'"
        :text="'新增圖層'"
      />
      <Buttons-component
        :name="'button-link'"
        :text="'新增圖層'"
      />
      <Buttons-component
        :name="'button-link-disable'"
        :text="'新增圖層'"
      />
      <Buttons-component
        :name="'button-red'"
        :text="'開啟AlertBox'"
        @click="modal1 = true"
      />
      <Buttons-component
        :name="'button-red-disable'"
        :text="'新增圖層'"
      />
      <Buttons-component
        :name="'button-add'"
        :text="'新增圖層'"
        :add="true"
      />
      <Buttons-component
        :name="'button-add-disable'"
        :text="'新增圖層'"
        :add="true"
      />
      <Buttons-component
        :name="'button-round'"
        :text="'canvas'"
        :round="true"
        @click="addJPG"
      />
      <Buttons-component
        :name="'button-primary'"
        :text="'選擇檔案1'"
        :hover="true"
      />
      <Buttons-component
        :name="'button-primary'"
        :text="'選擇檔案2'"
        :hover="true"
        note="請選擇要上傳的檔案"
      />
      <br>
      <br>
      <Paginate-component
        :total="255"
        :per-page="13"
        @nowPage="payload => currentPage = payload"
      />
      <br>

      <br>
      <SwitchOn-component />
      <br>
      <br>
      <AreaNote-component />
      <br>
      <br>
      <CalNote-component :date-note="true" />
      <br>
      <br>

      <TreeSelect-component
        :all-options="iaOptions"
      />

      <br>
      <div
        ref="capture"
        style="padding: 10px; background: #f5da55"
      >
        <h4 style="color: #000; ">
          Hello world!
        </h4>
      </div>

      <div
        ref="element2"
        style="display: none; padding: 10px; background: #FFC0CB"
      >
        你看不到我
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '~/components/tools/NavTabs.vue';
import Feature from '~/components/Feature.vue';
import SwitchTabs from '~/components/tools/SwitchTabs.vue';
import SliderBar from '~/components/tools/SliderBar.vue';
import Marker from '~/components/tools/Marker.vue';
import AlertBox from '~/components/tools/AlertBox.vue';
import Buttons from '~/components/tools/Buttons.vue';
import Paginate from '~/components/tools/Paginate.vue';
import SwitchOn from '~/components/tools/SwitchOn.vue';
import AreaNote from '~/components/tools/AreaNote.vue';
import CalNote from '~/components/tools/CalNote.vue';
import TreeSelect from '~/components/tools/TreeSelect.vue';

export default {
  components: {
    'NavTabs-component': NavTabs,
    'Feature-component': Feature,
    'SwitchTabs-component': SwitchTabs,
    'SliderBar-component': SliderBar,
    'Marker-component': Marker,
    'AlertBox-component': AlertBox,
    'Buttons-component': Buttons,
    'Paginate-component': Paginate,
    'SwitchOn-component': SwitchOn,
    'AreaNote-component': AreaNote,
    'CalNote-component': CalNote,
    'TreeSelect-component': TreeSelect
  },
  data () {
    return {
      modal1: false,
      options: {
        current: 0,
        typeList: [
          {
            name: '關鍵字查詢',
            id: 0
          },
          {
            name: '渠道查詢',
            id: 1
          },
          {
            name: '樁號查詢',
            id: 2
          },
          {
            name: '點擊查詢',
            id: 3
          }
        ]
      },
      options2: {
        current: 0,
        typeList: [
          {
            name: 'wms',
            id: 0
          },
          {
            name: 'wmts',
            id: 1
          }
        ]
      },
      currentPage: 1,
      iaOptions: [
        {
          id: 1,
          ia: '嘉南管理處',
          stn: [
            { title: '南基工作站', no: 555, grp: [{ name: '北北水利小組', no: 111 }, { name: 'uu水利小組', no: 5414 }, { name: 'yy水利小組', no: 657 }] },
            { title: 'uu工作站', no: 475, grp: [{ name: 'ee水利小組', no: 888 }, { name: 'tt水利小組', no: 755 }, { name: 'll水利小組', no: 442 }] },
            { title: 'oo工作站', no: 588, grp: [{ name: 'ii水利小組', no: 463 }, { name: 'aa水利小組', no: 774 }, { name: 'fg水利小組', no: 521 }] }
          ]
        },
        {
          id: 2,
          ia: '宜蘭管理處',
          stn: [
            { title: 'mm工作站', no: 86, grp: [{ name: 'tt水利小組', no: 45 }, { name: 'ui利小組', no: 466 }, { name: 'yy水利小組', no: 51 }] },
            { title: 'ii工作站', no: 76, grp: [{ name: 'ei水利小組', no: 12 }, { name: 'ti水利小組', no: 255 }, { name: 'lu水利小組', no: 88 }] },
            { title: 'pop工作站', no: 99, grp: [{ name: 'io水利小組', no: 13 }, { name: 'ao水利小組', no: 356 }, { name: 'fi水利小組', no: 100 }] }
          ]
        }
      ]
    };
  },
  methods: {
    addJPG () {
      const node = this.$refs.capture;
      console.log(node);

      const node2 = this.$refs.element2;
      console.log(node2);

      // html2canvas(node, { async: true, useCORS: true, allowTaint: false }).then(canvas => {
      //   document.body.appendChild(canvas);
      // });

      // domtoimage.toPng(node)
      //   .then(function (dataUrl) {
      //     const img = new Image();
      //     img.src = dataUrl;
      //     document.body.appendChild(img);
      //   })
      //   .catch(function (error) {
      //     console.error('oops, something went wrong!', error);
      //   });

      // domtoimage.toJpeg(node2, { quality: 0.95 })
      //   .then(function (dataUrl) {
      //     const link = document.createElement('a');
      //     link.download = 'my-image.jpg';
      //     link.href = dataUrl;
      //     link.click();
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
  .main{
    margin: 50px 30px;
    text-align: center;
  }
</style>
