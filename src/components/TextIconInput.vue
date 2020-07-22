<template>
  <div class="text-icon-input" :class="{'icon-left':prefixIcon, 'icon-right':suffixIcon}">
    <font-awesome-icon
      v-if="prefixIcon"
      class="prefix-icon"
      :style="{color:iconColor}"
      :icon="prefixIcon"
      @click="onPrefixIconClick"
    />
    <TextInput
      ref="input"
      :class="inputClass"
      :value="text"
      v-bind="$attrs"
      v-on="listeners"
    />
    <font-awesome-icon
      v-if="suffixIcon"
      class="suffix-icon"
      :style="{color:iconColor}"
      :icon="suffixIcon"
      @click="onSuffixIconClick"
    />
  </div>
</template>

<script>
import TextInput from "./TextInput.vue";

export default {
  name: "TextIconInput",
  props: {
    value: String,
    inputClass: {
      type: [String, Array, Object],
      default: ""
    },
    prefixIcon: {
      type: [String, Array],
      default: ""
    },
    suffixIcon: {
      type: [String, Array],
      default: ""
    },
    iconColor: {
      type: String,
      default: undefined
    }
  },
  components: {
    TextInput
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
        input(value) {
          vm.text = value;
          vm.$emit("input", value);
        }
      };
    }
  },
  methods: {
    onPrefixIconClick(event) {
      event.preventDefault();
      this.focus();
      this.$refs.input.$el.setSelectionRange(0, 0);
      this.$emit("prefixIconClick", event);
      this.$emit("click", event);
    },
    onSuffixIconClick(event) {
      event.preventDefault();
      this.focus();
      let lastIndex = this.$refs.input.value.length;
      this.$refs.input.$el.setSelectionRange(lastIndex, lastIndex);
      this.$emit("suffixIconClick", event);
      this.$emit("click", event);
    },
    focus() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped>
.text-icon-input {
  position: relative;
  font-size: 1rem;
}

.icon-left > input {
  padding-left: 2rem;
}

.icon-right > input {
  padding-right: 2rem;
}

.prefix-icon {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  user-select: none;
}

.suffix-icon {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  user-select: none;
}
</style>
