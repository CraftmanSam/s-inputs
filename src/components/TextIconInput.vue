<template>
  <div class="text-icon-input" :class="{'icon-left':prefixIcon, 'icon-right':suffixIcon}">
    <font-awesome-icon
      v-if="prefixIcon"
      class="prefix-icon"
      :style="{color:iconColor}"
      :icon="prefixIcon"
      @click="onPrefixIconClick"
    />
    <input
      ref="input"
      type="text"
      :class="inputClass"
      :value="value"
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
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        input(event) {
          vm.$emit("input", event.target.value);
        }
      };
    }
  },
  methods: {
    onPrefixIconClick(event) {
      event.preventDefault();
      this.focus();
      this.$refs.input.setSelectionRange(0, 0);
    },
    onSuffixIconClick(event) {
      event.preventDefault();
      this.focus();
      let lastIndex = this.$refs.input.value.length;
      this.$refs.input.setSelectionRange(lastIndex, lastIndex);
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
