<template>
  <div style="display: inline-block;">
    <client-only>
      <paginate
        v-model="currentPage"
        :page-count="20"
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
  data () {
    return {
      currentPage: 1
    };
  },
  methods: {
    pageHandler (pageNum) {
      console.log(pageNum);
    }
  }
};
</script>

<style lang="scss">

  .pageWrap {
    display: flex;
    justify-content: space-between;
    width: 250px;
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
