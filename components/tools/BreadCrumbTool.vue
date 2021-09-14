<template>
  <nav class="breadcrumb">
    <ol>
      <li
        v-for="(item , index) in options"
        :key="index"
      >
        {{ item }}
        <span>
          <img
            alt=""
            :src="require('~/assets/img/arrow-right.svg')"
          >
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return ['首頁', '系統管理', '群組權限管理'];
      }
    }
  },
  data () {
    return {};
  },
  name: 'BreadCrumb'
};
</script>
<style lang="scss" scoped>
.breadcrumb{
  display: flex;
  ol{
    li{
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      align-items: center;
      text-align: center;
      display: inline-block;

      /* dark-green */
      color: #21705D;
      span{
        margin: 2px;
        img{
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}
</style>
