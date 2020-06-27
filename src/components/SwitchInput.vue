<template>
  <switches
    :value="checked"
    :type-bold="typeBold"
    :theme="theme"
    :color="color"
    :emit-on-mount="emitOnMount"
    v-bind="$attrs"
    v-on="listeners"
  ></switches>
</template>

<script>
import Switches from "vue-switches";

export default {
  name: "SwitchInput",
  props: {
    value: Boolean,
    typeBold: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: "custom"
    },
    color: {
      type: String,
      default: "green"
    },
    emitOnMount: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Switches
  },
  data() {
    return {
      checked: this.value
    };
  },
  watch: {
    value(newValue) {
      this.checked = newValue;
    }
  },
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        input(value) {
          const oldValue = vm.checked;
          vm.checked = value;

          if (vm.readonly) {
            vm.checked = oldValue;
          } else {
            vm.$emit("input", value);
          }
        }
      };
    }
  }
};
</script>

<style>
/* vue-switcher */
/* size in rem + custom style*/

.vue-switcher div {
  /* fix alignment */
  top: 0.5rem !important;
}

.vue-switcher-theme--custom.vue-switcher--bold div {
  /* custom size */
  height: 1.75rem;
  width: 3rem;
  border-radius: 1.875rem;
}

.vue-switcher-theme--custom.vue-switcher--bold div:after {
  /* for the circle on the switch */
  /* custom position and size */
  margin-left: -1.5625rem;
  top: 0.1875rem;
  height: 1.375rem;
  width: 1.375rem;
}

.vue-switcher-theme--custom.vue-switcher--bold--unchecked div:after {
  /* for the circle on the switch */
  left: 1.75rem;
}

.vue-switcher-theme--custom.vue-switcher-color--green div {
  background-color: #6fbb62;
}

.vue-switcher-theme--custom.vue-switcher-color--green div:after {
  /* for the circle on the switch */
  background-color: #ffffff;
}

.vue-switcher-theme--custom.vue-switcher-color--green.vue-switcher--unchecked
  div {
  background-color: #c4c4c4;
}

.vue-switcher-theme--custom.vue-switcher-color--green.vue-switcher--unchecked
  div:after {
  /* for the circle on the switch */
  background-color: #ffffff;
}
</style>