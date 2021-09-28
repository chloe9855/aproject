<template>
  <div class="page-header">
    <div
      v-show="isArrow"
      class="arrow"
    >
      <img
        alt=""
        class="vector"
        :src="require('~/assets/img/pageHeader/arrow-left.svg')"
      >
    </div>
    <div class="title-icon">
      <img
        alt=""
        class="vector"
        :src="mainIcon"
      >
    </div>
    <h3 class="title">
      {{ mainTitle }}
    </h3>
    <Buttons
      v-show="isBtn"
      :name="btnName"
      :text="btnText"
      :add="btnAdd"
      @click="getBtnStatus"
    />
  </div>
</template>

<script>
import Buttons from '~/components/tools/Buttons.vue';
export default {
  components: {
    Buttons
  },
  props: {
    icon: {
      type: String,
      default: 'file'
    },
    title: {
      type: String,
      default: ''
    },
    isArrow: {
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
    }
  },
  data () {
    return {
      titleList: {
        farmer: '使用者帳號管理',
        land: '作業基金土地管理',
        system: '系統使用量統計',
        bungalow: '灌溉地管理',
        edit: '灌溉地編輯',
        layer: '案件審核',
        download: '下載專區',
        file: '統計報表',
        password: '設定密碼',
        news: '最新消息'
      },
      btnStatus: false
    };
  },
  name: 'PageHeader',
  methods: {
    getBtnStatus (e) {
      this.btnStatus = e;
    }
  },
  computed: {
    mainIcon () {
      const icon = this.icon;
      return require(`~/assets/img/pageHeader/${icon}.svg`);
    },
    mainTitle () {
      const icon = this.icon;
      let title;
      if (icon === 'slider' || this.title !== '') {
        title = this.title;
      } else {
        title = this.titleList[icon];
      }
      return title;
    },
    isBtn () {
      const btnText = this.btnText;
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
.page-header {
  display: flex;
  align-items: center;
}
.arrow {
  margin-right: 5px;
  margin-top: 8px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  width: 12px;
  height: 21px;
}
.vector {
  width: 100%;
  align-self: stretch;
  object-fit: cover;
}
.title {
  color: $header-black;
  flex: 1;
  display: flex;
  align-items: center;
  @include noto-sans-tc-24-medium;
}
.title-icon {
  margin-right: 5px;
  padding: 2.59px 4.83px 0 2.31px;
  width: 24px;
  height: 24px;
  position: relative;
}
</style>
