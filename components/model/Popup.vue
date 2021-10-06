<template>
  <div
    v-show="isActive"
    class="popupBox w-100"
  >
    <div class="popupContent">
      <div class="popupTitle">
        <img
          :src="iconUrl"
          class="mainIcon"
        >
        <span>{{ popTitle }}</span>
        <img
          :src="require('~/assets/img/close-icon.svg')"
          class="closeIcon"
          @click="toggleStatus"
        >
      </div>
      <component :is="componentInstance" />
      <div class="buttonBox">
        <Button
          :name="'button-primary'"
          :text="'確認'"
        />
        <Button
          :name="'button-default-disable'"
          :text="'取消'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical';
import Button from '~/components/tools/Buttons.vue';
export default {
  components: {
    InputVertical,
    Button
  },
  props: {
    icon: {
      type: String,
      default: 'edit'
    },
    title: {
      type: String,
      default: '請設定查詢作業標題'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {};
  },
  name: 'Popup',
  methods: {
    toggleStatus () {
      this.$store.commit('TOGGLE_POPUP_STATUS');
      this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'addTableData', title: '編輯內容' });
    }
  },
  computed: {
    componentInstance () {
      const popupType = this.$store.state.popupType.type;
      return () => import(`~/components/model/popup/${popupType}`);
    },
    iconUrl () {
      const popupIcon = this.icon;
      return require(`~/assets/img/${popupIcon}.svg`);
    },
    popTitle () {
      const popupTitle = this.$store.state.popupType.title;
      return popupTitle;
    }
  }
};
</script>

<style lang="scss" scoped>
.popupBox{
  position: absolute;
  top:5vh;
  display: flex;
  justify-content: center;
  z-index:1000;
  .popupContent{
    background: #FFF;
    border-radius:5px 5px 0 0;
    min-width: 350px;
    .popupTitle{
      position: relative;
      height: 40px;
      background: #EFF4F3;
      border-radius:5px 5px 0 0;
      padding: 0.5em 0 0 0.5em;
      img{
        position: absolute;
        top: 10px;
      }
      .closeIcon{
        right: 10px;
        cursor: pointer;
      }
      span{
        position: absolute;
        top: 8px;
        left: 36px;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 29px;
      }
    }
  }
}
.inputBox{
  overflow: auto;
  max-height: $vh-70;
}

.buttonBox{
  display: flex;
  justify-content: flex-end;
  margin: 10px 5px;
}
</style>
