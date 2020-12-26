<template>
  <input-facade ref="input" :mask="mask" :value="text" v-bind="$attrs" v-on="listeners"/>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: String,
    mask: {
      type: [String, Array],
      default: ''
    }
  },
  data() {
    return {
      text: this.value,
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
        input(value) {
          // const value = event.target.value;
          vm.text = value;

          vm.$emit("input", value);
        }
      };
    }
  },
  methods: {
    focus() {
      this.$refs.input.$el.focus();
    },
    refresh() {
      this.text = this.value;
    }
  }
};
</script>
