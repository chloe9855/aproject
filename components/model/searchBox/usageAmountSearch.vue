<template>
  <div class="inputBox">
    <DropdownVertical
      title="管理處"
      :options="myIaList"
      @DropdownVal="searchAmount"
    />
  </div>
</template>

<script>
import DropdownVertical from '~/components/tools/DropdownVertical.vue';
export default {
  components: {
    DropdownVertical: DropdownVertical
  },
  props: {
    isClear: Boolean
  },
  data: () => {
    return {
      userId: '',
      myIaList: '',
      useAmountData: '',
      nowIa: ''
    };
  },
  name: 'UsageAmountSearch',
  mounted () {
    this.userId = sessionStorage.getItem('loginUser');
    this.getIaList();
  },
  methods: {
    // * @ 取得管理處資料
    getIaList () {
      fetch(`/AERC/rest/Ia/${this.userId}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({

        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        // console.log(data);

        data.forEach((item) => {
          item.value = item.Ia;
          item.title = item.Ia_cns;
        });
        this.myIaList = data;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 查各管理處統計量
    searchAmount (payload) {
      this.nowIa = payload.Ia;

      fetch(`/AERC/rest/UsageAmount?Ia=${payload.Ia}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);

        this.useAmountData = data;
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 按下查詢
    searchX () {
      this.$emit('useAmountSearch', this.useAmountData, this.nowIa);
    },
    // * 清除全部
    clearAllX () {
      this.$emit('clearUseAmount');
    }
  },
  watch: {
    // isClear (value) {
    //   this.$emit('clearUseAmount');
    // }
  }
};
</script>

<style lang="scss" scoped>
.inputBox{
  padding: 0 15px;
}
</style>
