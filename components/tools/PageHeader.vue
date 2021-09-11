<template>
  <div class="page-header">
    <div
      v-show="isActive"
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
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    icon: {
      type: String,
      default: 'file'
    }
  },
  data () {
    return {

    };
  },
  computed: {
    mainIcon () {
      const icon = this.icon;
      return require(`~/assets/img/pageHeader/${icon}.svg`);
    },
    mainTitle () {
      const icon = this.icon;
      let title = '';
      switch (icon) {
        case 'farmer':
          title = '使用者帳號管理';
          break;
        case 'land':
          title = '作業基金土地管理';
          break;
        case 'system':
          title = '系統使用量統計';
          break;
        case 'bungalow':
          title = '灌溉地管理';
          break;
        case 'edit':
          title = '灌溉地編輯';
          break;
        case 'layer':
          title = '案件審核';
          break;
        case 'download':
          title = '下載專區';
          break;
        case 'file':
          title = '統計報表';
          break;
        case 'password':
          title = '設定密碼';
          break;
        case 'news':
          title = '最新消息';
          break;
      }
      return title;
    },
    isActive () {
      const icon = this.icon;
      return !!(icon === 'edit' || icon === 'file');
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
  padding: 4.05px 8.1px;
  display: flex;
  align-items: center;
  width: 10.8px;
  height: 18.9px;
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
  width: 21px;
  height: 25px;
  position: relative;
}
</style>
