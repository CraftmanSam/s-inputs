<template>
  <input ref="input" :value="text" v-bind="$attrs" v-on="listeners" />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: String
  },
  data() {
    return {
      text: this.value
    };
  },
  watch: {
    value(newValue) {
      this.text = newValue;
    }
  },
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        input(event) {
          let value = event.target.value;

          vm.text = value;
          vm.$emit("input", value);
        }
      };
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    refresh() {
      this.text = this.value;
    }
  }
};
</script>
