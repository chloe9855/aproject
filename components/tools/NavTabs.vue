<template>
  <div class="navtabs__header">
    <div
      v-for="typeItem of typeList"
      :key="typeItem.id"
      class="navtabs__btn"
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
