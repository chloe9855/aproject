<template>
  <div class="searchBox">
    <div class="switchTab">
      SWITCH
    </div>
    <div class="searchInput">
      INPUT
    </div>
    <div class="searchBtn">
      BUTTON
    </div>
    <div class="toggleSearch">
      TOGGLE
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableColumn: {
      type: Object,
      default: () => {
        return {
          searchData: {}
        };
      }
    }
  },
  computed: {},
  created: function () {

  }
};
</script>

<style lang="scss" scoped>

</style>
