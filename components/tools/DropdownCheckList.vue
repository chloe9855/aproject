<template>
  <div class="dropCheckList">
    <div
      class="dropItem"
      :class="{listOpen:istoggle}"
      @click="toggleList"
    >
      {{ options.option[0].title }}
    </div>
    <ul
      class="dropList"
      :class="toggle"
    >
      <li
        v-for="(item , index) in options.option"
        :key="index"
      >
        <input
          :id="index"
          type="checkbox"
          :name="index"
          :value="item.value"
        ><label :for="index" /><span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return { option: [{ title: '無清單資料1', value: '0' }] };
      }
    }
  },
  data: () => {
    return {
      color: '#f00',
      istoggle: false
    };
  },
  name: 'DropdownCheckList',
  methods: {
    toggleList: function () {
      this.istoggle = !this.istoggle;
    }
  },
  computed: {
    toggle: function () {
      const status = this.istoggle;
      if (status) {
        return 'showBox';
      } else {
        return 'hideBox';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dropCheckList{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .dropItem{
        background-color: white;
        border-radius: 5px;
        padding: 10px 9px;
        flex: 1;
        border: 1px solid #959595;
        align-self: stretch;
        color: #959595;
        cursor: pointer;
        user-select:none;
        background-image: url("~/assets/img/dropdown.svg");
        background-repeat: no-repeat;
        background-position-x: 99%;
        background-position-y: center;
        &:active,&:focus,&:visited{
            outline: none;
            border: 1px solid #3e9f88 !important;
            box-shadow: 0 0 4px 0 #8ecb9f;
            background-image: url("~/assets/img/onDropdown.svg");
        }
        &.listOpen{
            background-image: url("~/assets/img/dropup.svg");
            &:active,&:focus,&:visited{
                background-image: url("~/assets/img/onDropup.svg");
            }
        }
    }
    .dropList{
        position: absolute;
        top: 38px;
        left: 0;
        border: 1px solid #959595;
        width: 100%;
        display: none;
        li{
            height: 38px;
            line-height: 38px;
            user-select:none;
            input[type="checkbox"] {
                display:none;
            }
            input[type="checkbox"] + label
            {
                background: #999;
                height: 14px;
                width: 14px;
                display:inline-block;
                margin: 0 5px;
                cursor: pointer;
            }
            input[type="checkbox"]:checked + label
            {
                background: url("~/assets/img/check.svg");
                height: 14px;
                width: 14px;
                display:inline-block;
                margin: 0 5px;
                cursor: pointer;
            }
        }
    }
}
.showBox{
  display: block !important;
}
.hideBox{
  display: none !important;
}
</style>
