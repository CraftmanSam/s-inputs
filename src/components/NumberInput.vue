<template>
  <currency-input
    ref="input"
    :value="value"
    :currency="currency"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    value: Number,
    currency: {
      type: [String, Object],
      default: null
    }
  },
  methods: {
    focus() {
      this.$refs.input.$el.focus();
    }
  }
};
</script>
