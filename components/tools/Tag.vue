<template>
  <span
    :class="tagColor"
    class="tag"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'Fragment',
  props: {
    type: {
      type: String,
      default: 'Green'
    },
    text: {
      type: String,
      default: '啟用中'
    }
  },
  computed: {
    tagColor: function () {
      const propsType = this.type;
      let type = '';
      switch (propsType) {
        case 'Green':
          type = 'tag-green';
          break;
        case 'Red':
          type = 'tag-red';
          break;
        case 'Yellow':
          type = 'tag-yellow';
          break;
        case 'Gray':
          type = 'tag-gray';
          break;
        default:
          type = 'tag-green';
      }
      return type;
    }
  }
};
</script>

<style lang="scss" scoped>
.tag{
  border-radius: 3px;
  padding: 0 9px;
  display: inline-block;
  align-items: center;
  justify-content: center;
}
.tag-green {
  background-color: $tag-bg-green;
  border: 1px solid $tag-border-green;
  color: $tag-color-green;
  text-align: center;
  @include noto-sans-tc-14-medium;
}
.tag-red {
  background-color: $linen;
  border: 1px solid $tag-border-red;
  color: $tag-color-red;
  text-align: center;
  @include noto-sans-tc-14-medium;
}
.tag-yellow {
  background-color: $tag-bg-yellow;
  border: 1px solid $tag-border-yellow;
  color: rgba(222, 167, 79, 1);
  text-align: center;
  @include noto-sans-tc-14-medium;
}
.tag-gray {
  background-color: $tag-bg-gray;
  border: 1px solid $tag-border-gray;
  color: $input-gray;
  text-align: center;
  @include noto-sans-tc-14-medium;
}
</style>
