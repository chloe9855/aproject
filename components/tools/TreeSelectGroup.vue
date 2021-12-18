<template>
  <div class="tree_wrap">
    <div class="title_wrap">
      <button
        class="arrow"
        @click="toggle"
      >
        <img
          :alt="showSub ? '收合' : '展開'"
          :src="arrow"
        >
      </button>
      <TreeSelectCheckbox
        class="title"
        :checked="checked"
        :indeterminate="indeterminate"
        @input="onCheckAll"
      >
        {{ groupName }}
      </TreeSelectCheckbox>
    </div>

    <transition name="slide">
      <div
        v-if="showSub"
        class="block1"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// @ts-check
import upArrow from '~/assets/img/up-arrow.svg';
import downArrow from '~/assets/img/down-arrow.svg';
import TreeSelectCheckbox from '~/components/tools/TreeSelectCheckbox.vue';

export default {
  components: {
    TreeSelectCheckbox
  },
  props: {
    groupName: String,
    ids: Array,
    allSelected: Array
  },
  data () {
    return {
      showSub: false
    };
  },
  methods: {
    toggle () {
      this.showSub = !this.showSub;
    },
    getAllCheckedBesideThisGroup () {
      return this.allSelected.filter(id => !this.ids.includes(id));
    },
    /** @param {InputEvent} e */
    onCheckAll (e) {
      const evtName = 'update:allSelected';
      const input = /** @type { HTMLInputElement} */(e.target);

      if (this.indeterminate) {
        input.checked = false;
        this.$emit(evtName, this.getAllCheckedBesideThisGroup());
        return;
      }

      if (input.checked) {
        const newValue = new Set(this.allSelected.concat(this.ids));
        this.$emit(evtName, Array.from(newValue));
      } else {
        this.$emit(evtName, this.getAllCheckedBesideThisGroup());
      }
    }
  },
  computed: {
    /** @returns {string} */
    arrow () {
      return this.showSub ? downArrow : upArrow;
    },
    /** @returns {boolean} */
    checked () {
      return this.ids && this.ids.every(id => this.allSelected.includes(id));
    },
    /** @returns {boolean} */
    indeterminate () {
      return this.ids && (this.ids.some(id => this.allSelected.includes(id)) && !this.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes slideInDown {
  from {
    transform: translate3d(0, -20%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideOutDown {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 20%, 0);
  }
}

.slide-enter-active {
  animation: slideInDown 0.2s;
}
.slide-leave-active {
  animation: slideOutDown 0.2s;
}
.tree_wrap {
  display: inline-block;
  color: $word-black;
  width: 200px;
  @include noto-sans-tc-16-regular-line16;

  .title_wrap {
    display: flex;
    align-items: center;
    width: 150px;

    .arrow {
      cursor: pointer;
      background: transparent;
      border: none;
    }

    .title {
      margin-left: 5px;
    }
  }

  .block1 {
    padding: 8px 0 8px 36px;
  }

  .block2 {
    padding: 8px 0 8px 36px;
    display: none;
    .title_wrap {
      padding-bottom: 8px;
    }
  }
}
</style>
