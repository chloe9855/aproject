<template>
  <div class="out_wrap">
    <Dropdown-component
      :options="member"
      :placeholders="'請選擇管理處'"
      :change-text="clearText"
      @DropdownVal="getCanalLists"
    />
    <InputTool-component
      :input-text="'輸入渠道關鍵字'"
      :search-input="canalList"
      :change-text="clearKeyText"
      @inputValue="searchCanal"
    />
    <div class="bt_wrap">
      <Buttons-component
        :name="'button-default'"
        :text="'清除全部'"
        @click="clearAllHandler"
      />
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/tools/Dropdown.vue';
import InputTool from '~/components/tools/InputTool.vue';
import Buttons from '~/components/tools/Buttons.vue';

export default {
  components: {
    'Dropdown-component': Dropdown,
    'InputTool-component': InputTool,
    'Buttons-component': Buttons
  },
  data () {
    return {
      member: [{ title: '01 宜蘭', value: '1' }],
      allCanalList: [],
      canalList: [],
      clearText: false,
      clearKeyText: false
    };
  },
  name: 'KeyWordSearch',
  methods: {
    clearAllHandler () {
      this.clearText = true;
      this.clearKeyText = true;
      this.$emit('clearKeyword');
    },
    // * 取得該管理處的所有渠道
    getCanalLists (payload) {
      this.clearText = false;

      fetch('http://192.168.3.112/AERC/rest/Canal/admin5', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          Ia: '01'
        })
      }).then((response) => {
        if (response.status === 403) {
          this.countyList[nextType] = [{ title: '不拘', value: 'none' }];
          return Promise.reject(response);
        }
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.allCanalList = jsonData;

        const nameList = jsonData.map(item => item.Sys_cns);
        this.canalList = nameList;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 取得特定渠道之資料+圖形
    searchCanal (payload) {
      this.clearKeyText = false;

      const myItem = this.allCanalList.filter(item => item.Sys_cns === payload.val);
      if (myItem.length < 1) {
        return;
      }
      console.log(myItem);

      fetch('http://192.168.3.112/AERC/rest/Canal/admin5', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          Ia: '01',
          FID: myItem[0].FID
        })
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.$emit('keywordSearch', jsonData);
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

</style>
