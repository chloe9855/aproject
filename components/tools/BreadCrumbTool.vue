<template>
  <nav class="breadcrumb">
    <ol>
      <li>
        <nuxt-link
          class="crumbTitle"
          to="/"
        >
          首頁
        </nuxt-link>
        <span>
          <img
            :src="require('~/assets/img/arrow-right.svg')"
          >
        </span>
      </li>
      <li
        v-for="(item , index) in crumbTitleData.data"
        :key="index"
      >
        <nuxt-link
          class="crumbTitle"
          :to="item.path"
        >
          {{ item.name }}
        </nuxt-link>
        <span>
          <img
            v-if="index < crumbTitleData.data.length-1"
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
        return ['首頁'];
      }
    }
  },
  data () {
    return {
      routerData: []
    };
  },
  name: 'BreadCrumb',
  mounted () {
    this.routerData = this.$route.matched;
  },
  methods: {
    test (item) {
      return item.split('-');
    }
  },
  computed: {
    crumbTitleData: function () {
      const routerData = this.routerData;
      const nameData = this.options;
      const result = {};
      let pathArr = [];
      let i = 0;
      let path = '/';
      result.data = [];
      routerData.forEach(function (item) {
        pathArr = (item.path.split('/'));
        pathArr.shift();
      });
      while (i < pathArr.length) {
        path += pathArr[i] + '/';
        result.data.push({ name: nameData[i], path: path });
        i++;
      }
      return result;
    }
  },
  watch: {
    $route () {
      this.routerData = this.$route.matched;
    }
  }
};
</script>
<style lang="scss" scoped>
.breadcrumb{
  display: flex;
  margin: 1em auto;
  ol{
    li{
      line-height: 23px;
      align-items: center;
      text-align: center;
      display: inline-block;
      .crumbTitle{
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        color: #21705D;
      }
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
