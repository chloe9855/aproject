<template>
  <div>
    <footer>
      <div>
        版權所有：行政院農業委員會農田水利署、系統開發：財團法人農業工程研究中心
      </div>
      <div>
        WGS84：120.5887,24.29859 TWD97：208255.99,2688154.20
      </div>
    </footer>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>

  footer {
    background-color: $transparent-gainsboro;
    display: flex;
    justify-content: space-between;
    color: $header-black;
    @include noto-sans-tc-14-regular;

    padding: 0 18px;
  }

</style>
