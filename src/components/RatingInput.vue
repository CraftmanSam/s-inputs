<template>
  <fa-rating
    class="rating-input"
    :rating="rating"
    :glyph="glyph"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    :item-size="itemSize"
    :border-width="borderWidth"
    :show-rating="showRating"
    :read-only="readonly || disabled"
    v-bind="$attrs"
    v-on="listeners"
  ></fa-rating>
</template>

<script>
import { FaRating } from "vue-rate-it";
import Star from "vue-rate-it/glyphs/star";

export default {
  name: "RatingInput",
  props: {
    value: Number,
    resetable: {
      type: Boolean,
      default: true
    },
    glyph: {
      type: String,
      default: Star
    },
    activeColor: {
      type: String,
      default: "#FCB400"
    },
    inactiveColor: {
      type: String,
      default: "#C4C4C4"
    },
    itemSize: {
      type: Number,
      default: 30
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    showRating: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    FaRating
  },
  data() {
    return {
      rating: this.value
    };
  },
  watch: {
    value(newValue) {
      this.rating = newValue;
    }
  },
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        ["rating-selected"](value) {
          if (vm.resetable && vm.rating === value) {
            // reset
            value = 0;
          }

          vm.rating = value;
          vm.$emit("input", value);
        }
      };
    }
  }
};
</script>

<style>
.rating-input {
  user-select: none;
}
</style>
