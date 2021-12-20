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
      <component
        :is="componentInstance"
        :is-submit="sumbitData"
        :origin-data="getOriginData"
        @submitSuccess="getSubmit"
      />
      <PopupSubmit
        v-if="$store.state.popupType.integrateSubmit"
        @submit="submit"
      />
    </div>
  </div>
</template>

<script>
import InputVertical from '~/components/tools/InputVertical';
import Button from '~/components/tools/Buttons.vue';

import addAccount from '~/components/model/popup/addAccount';
import addFile from '~/components/model/popup/addFile';
import addFileData from '~/components/model/popup/addFileData';
import addGroup from '~/components/model/popup/addGroup';
import addTableData from '~/components/model/popup/addTableData';
import edit from '~/components/model/popup/edit';
import editAccount from '~/components/model/popup/editAccount';
import editTableData from '~/components/model/popup/editTableData';
import file from '~/components/model/popup/file';
import group from '~/components/model/popup/group';
import news from '~/components/model/popup/news';
import tableData from '~/components/model/popup/tableData';
import PopupSubmit from '~/components/model/popup/PopupSubmit.vue';

export default {
  components: {
    InputVertical,
    Button,
    addAccount,
    addFile,
    addFileData,
    addGroup,
    addTableData,
    edit,
    editAccount,
    editTableData,
    file,
    group,
    news,
    tableData,
    PopupSubmit
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
    return {
      sumbitData: false
    };
  },
  name: 'Popup',
  methods: {
    toggleStatus () {
      this.$store.commit('TOGGLE_POPUP_STATUS');
      this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'addTableData', title: '編輯內容' });
    },
    sumbit () {
      this.sumbitData = true;
    },
    getSubmit () {
      this.toggleStatus();
    }
  },
  computed: {
    // componentInstance () {
    //   const popupType = this.$store.state.popupType.type;
    //   return () => import(`~/components/model/popup/${popupType}`);
    // },
    componentInstance () {
      const searchType = this.$store.state.popupType.type;
      return searchType;
    },
    iconUrl () {
      const popupIcon = this.icon;
      return require(`~/assets/img/${popupIcon}.svg`);
    },
    popTitle () {
      const popupTitle = this.$store.state.popupType.title;
      return popupTitle;
    },
    getOriginData () {
      return this.$store.state.oriFormData;
    }
  },
  watch: {
    isActive () {
      this.sumbitData = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.popupBox{
  // position: absolute;
  // top:5vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
