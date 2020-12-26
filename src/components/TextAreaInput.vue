<template>
  <textarea
    ref="input"
    :value="text"
    :autosize="autosize"
    :style="computedStyles"
    v-bind="$attrs"
    v-on="listeners"
  ></textarea>
</template>

<script>
export default {
  name: "TextAreaInput",
  props: {
    value: String,
    autosize: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [Number],
      default: null,
    },
    maxHeight: {
      type: [Number],
      default: null,
    },
    /*
     * Force !important for style properties
     */
    important: {
      type: [Boolean, Array],
      default: false,
    },
  },
  data() {
    return {
      text: this.value,
      resizeObserver: new ResizeObserver(() => {
        if (this.autosize) {
          this.resize();
        }
      }),
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      height: "auto",
    };
  },
  watch: {
    value(newValue) {
      this.text = newValue;
      this.$nextTick(this.resize);
    },
    minHeight() {
      this.$nextTick(this.resize);
    },
    maxHeight() {
      this.$nextTick(this.resize);
    },
    autosize(newValue) {
      if (newValue) this.resize();
    },
  },
  mounted() {
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.$el);
  },
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        focus(event) {
          vm.resize();
          
          vm.$emit("focus", event);
        },
        input(event) {
          const value = event.target.value;
          vm.text = value;
          vm.$emit("input", value);
        }
      };
    },
    computedStyles() {
      if (!this.autosize) return {};
      return {
        resize: !this.isResizeImportant ? "none" : "none !important",
        height: this.height,
        overflow: this.maxHeightScroll
          ? "auto"
          : !this.isOverflowImportant
          ? "hidden"
          : "hidden !important",
      };
    },
    isResizeImportant() {
      const imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes("resize"));
    },
    isOverflowImportant() {
      const imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes("overflow"));
    },
    isHeightImportant() {
      const imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes("height"));
    },
  },
  methods: {
    focus() {
      this.$el.focus()
    },
    // private
    resize() {
      const important = this.isHeightImportant ? "important" : "";
      this.height = `auto${important ? " !important" : ""}`;
      this.$nextTick(() => {
        let contentHeight = this.$el.scrollHeight + 1;

        if (this.minHeight) {
          contentHeight =
            contentHeight < this.minHeight ? this.minHeight : contentHeight;
        }

        if (this.maxHeight) {
          if (contentHeight > this.maxHeight) {
            contentHeight = this.maxHeight;
            this.maxHeightScroll = true;
          } else {
            this.maxHeightScroll = false;
          }
        }

        const heightVal = contentHeight + "px";
        this.height = `${heightVal}${important ? " !important" : ""}`;
      });

      return this;
    },
  }
};
</script>
