<template>
  <div style="display: inline-block;">
    <div class="navtabs__header">
      <div
        v-for="typeItem of options.typeList"
        :key="typeItem.id"
        class="navtabs__btn"
        :class="{ 'current': options.current === typeItem.id }"
        @click.stop="options.current = typeItem.id"
      >
        {{ typeItem.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {
        current: 0,
        typeList: [
          {
            name: '關鍵字查詢',
            id: 0
          },
          {
            name: '渠道查詢',
            id: 1
          },
          {
            name: '樁號查詢',
            id: 2
          },
          {
            name: '點擊查詢',
            id: 3
          }
        ]
      }

    };
  }
};
</script>
