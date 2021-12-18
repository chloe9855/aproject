<template>
  <div class="theme_checkbox">
    <input
      :id="id"
      :value="value"
      :checked="group != null ? group.includes(value) : checked"
      :indeterminate.prop="indeterminate"
      type="checkbox"
      @input="onInput"
    >
    <label
      :for="id"
      class="title"
    >
      <slot />
    </label>
  </div>
</template>

<script>
// @ts-check
export default {
  props: {
    value: String,
    group: Array,
    checked: Boolean,
    indeterminate: Boolean
  },
  data () {
    return {
      id: 'ccs-' + Math.random().toString(36)
    };
  },
  methods: {
    /** @param {InputEvent} e */
    onInput (e) {
      this.$emit('input', e);
      const input = /** @type {HTMLInputElement} */ (e.target);
      this.updateGroup(input);
    },
    /** @param {HTMLInputElement} input */
    updateGroup (input) {
      if (!this.group) {
        return;
      }

      const group = new Set(this.group);

      if (input.checked) {
        group.add(this.value);
      } else {
        group.delete(this.value);
      }

      this.$emit('update:group', Array.from(group));
    }
  }
};
</script>
