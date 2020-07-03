<template>
  <input-facade ref="input" :value="text" v-bind="$attrs" v-on="listeners" />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: String,
    emitInputOnCreated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: this.value,
      preventInputEmit: !this.emitInputOnCreated
    };
  },
  watch: {
    value(newValue) {
      this.text = newValue;
    }
  },
  mounted() {
    this.preventInputEmit = false;
  },
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        input(value) {
          vm.text = value;

          if (!vm.preventInputEmit) {
            vm.$emit("input", value);
          }
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
