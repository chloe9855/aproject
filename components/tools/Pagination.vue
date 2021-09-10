<template>
  <div class="pagination">
    <div
      class="previous-button"
      @click="changePage(0)"
    >
      <img
        alt=""
        class="vector"
        src="https://static.overlay-tech.com/assets/3c9f5b83-e5f6-411f-be8f-6fbb68063809.svg"
      >
    </div>
    <div class="page-selector">
      <ul>
        <li
          :class="isActive(page[0])"
          @click="selectPage(page[0])"
        >
          {{ page[0] }}
        </li>
        <li
          :class="isActive(page[1])"
          @click="selectPage(page[1])"
        >
          {{ page[1] }}
        </li>
        <li
          :class="isActive(page[2])"
          @click="selectPage(page[2])"
        >
          {{ page[2] }}
        </li>
        <li
          :class="isActive(page[3])"
          @click="selectPage(page[3])"
        >
          {{ page[3] }}
        </li>
        <li
          v-show="isDot"
          class="dot"
        >
          ...
        </li>
        <li
          :class="isActive(tableCount)"
          @click="selectPage(tableCount)"
        >
          {{ tableCount }}
        </li>
      </ul>
    </div>
    <div
      class="next-button"
      @click="changePage(1)"
    >
      <img
        alt=""
        class="vector"
        src="https://static.overlay-tech.com/assets/cf30e7d1-7b94-4616-a449-521f637676d1.svg"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    tableCount: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      page: [1, 2, 3, 4],
      pageNum: 1
    };
  },
  computed: {
    isDot () {
      const a = this.tableCount;
      const b = this.page[3];
      let result;
      if (a - b <= 1) {
        result = false;
      } else {
        result = true;
      }
      return result;
    },
    isActive () {
      return function (o) {
        const num = this.pageNum;
        const obj = o;
        const result = num === obj ? 'active' : '';
        return result;
      };
    }
  },
  methods: {
    changePage (evt) {
      let arr;
      if (evt === 0) {
        if (this.page[0] <= this.pageNum - 1) {
          this.pageNum--;
        } else {
          if (this.pageNum > 1) {
            arr = this.page.map(x => x - 1);
            this.pageNum--;
            this.page = arr;
          } else {
            alert('已是第一頁');
          }
        }
      } else {
        if (!this.isDot) {
          if (this.tableCount > this.pageNum) {
            this.pageNum++;
          } else {
            alert('已是最後一頁');
          }
        } else {
          arr = this.page.map(x => x + 1);
          this.pageNum++;
          this.page = arr;
        }
      }
    },
    selectPage (o) {
      this.pageNum = o;
      let arr;
      if (o === this.tableCount) {
        const a = this.tableCount - this.page[0] - 4;
        arr = this.page.map(x => x + a);
        this.page = arr;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.previous-button {
  padding: 6.92px 9.16px 6.93px 8.46px;
  display: flex;
  align-items: center;
  width: 6.38px;
  height: 10.15px;
  cursor: pointer;
}
.page-selector{
  display: flex;
  align-items: center;
  ul{
    display: flex;
    li{
        padding: 0 10px;
        cursor: pointer;
    }
  }
}
.vector {
  width: 100%;
  align-self: stretch;
  object-fit: cover;
}
.page-button {
  width: 31px;
  height: 31px;
  position: relative;
}
.next-button {
  padding: 6.92px 8.43px 6.93px 9.19px;
  display: flex;
  align-items: center;
  width: 6.38px;
  height: 10.15px;
  cursor: pointer;
}
.active{
    border: 1px solid #000
}
</style>
