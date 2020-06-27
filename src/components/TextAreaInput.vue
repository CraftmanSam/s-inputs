<template>
  <textarea-autosize
    ref="input"
    :value="text"
    :autosize="autosize"
    v-bind="$attrs"
    v-on="listeners"
  ></textarea-autosize>
</template>

<script>
export default {
  name: "TextAreaInput",
  props: {
    value: String,
    autosize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      text: this.value,
      resizeObserver: new ResizeObserver(() => {
        if (this.autosize) {
          this.resize();
        }
      }),
      onCreatedInputEventPrevented: false // textarea-autosize emit an input event when created and i don't want it
    };
  },
  watch: {
    value(newValue) {
      this.text = newValue;
    }
  },
  mounted() {
    this.resizeObserver.observe(this.$refs.input.$el);
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$refs.input.$el);
  },
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        input(value) {
          if (vm.onCreatedInputEventPrevented) {
            vm.text = value;
            vm.$emit("input", value);
          } else {
            vm.onCreatedInputEventPrevented = true;
          }
        }
      };
    }
  },
  methods: {
    focus() {
      this.$refs.input.$el.focus();
    },
    resize() {
      this.$refs.input.resize();
    }
  }
};
</script>
