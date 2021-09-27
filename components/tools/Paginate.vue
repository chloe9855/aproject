<template>
  <div class="page_container">
    <p>目前為{{ total }}項目中的{{ minData }} - {{ maxCount(total) }}筆</p>
    <client-only>
      <paginate
        v-model="currentPage"
        :page-count="allPageCount"
        :click-handler="pageHandler"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pageWrap'"
        :active-class="'activeee'"
        :page-class="'page-item'"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    perPage: Number
  },
  data () {
    return {
      currentPage: 1,
      maxData: '',
      pageNum: ''
    };
  },
  methods: {
    // * 傳回當前頁碼
    pageHandler (value) {
      this.$emit('nowPage', value);
    },
    maxCount (data) {
      if (this.currentPage === this.allPageCount) {
        this.maxData = this.total;
      } else {
        this.maxData = (this.currentPage * this.perPage);
      }

      if (data <= 9) {
        return this.total;
      } else {
        return this.maxData;
      }
    }
  },
  computed: {
    // * 計算總頁數
    allPageCount () {
      return Math.ceil(this.total / this.perPage);
    },
    minData () {
      return (this.currentPage * this.perPage) - this.perPage + 1;
    }
  }
};
</script>

<style lang="scss">

  .page_container {
    display: flex;
    align-items: center;

    p {
      @include noto-sans-tc-16-regular;
    }
  }

  .pageWrap {
    display: flex;
    justify-content: space-between;
    @include noto-sans-tc-14-regular;

    li {
      padding: 5px 10px;
    }
  }

  .activeee {
    background-color: #C4DED8;
    a{
      color:#21705D;
    }

  }

</style>
