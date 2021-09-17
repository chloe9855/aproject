<template>
  <div class="btn_group">
    <div
      v-for="typeItem of typeList"
      :key="typeItem.id"
      class="btn"
      :class="{ 'current': current === typeItem.id }"
      @click.stop="current = typeItem.id, $emit('current',typeItem.id)"
    >
      {{ typeItem.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeList: Array,
    selected: Number
  },
  data () {
    return {
      current: 0

    };
  },
  created () {
    this.current = this.selected;
  }
};
</script>

<style lang="scss" scoped>

  .btn_group {
    display: flex;
    border-radius: 5px;
  }

  .btn {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 13px;
    font-family: "Noto Sans TC";
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    color: rgba(73, 73, 73, 1);
    text-align: center;
    background-color: rgba(226, 228, 228, 1);
    border: 2px solid #e2e4e4;
    cursor: pointer;
  }

  .current {
    background-color: rgba(255, 224, 177, 1);
    border: 2px solid rgba(234, 181, 101, 1);
  }

  .btn:nth-child(1) {
    border-radius: 5px 0 0 5px;
  }

  .btn:nth-child(2) {
    border-radius: 0 5px 5px 0;
  }

</style>
