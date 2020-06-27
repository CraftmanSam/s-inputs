<template>
  <VisualTest
    :component="component"
    :value="model"
    :defaultValue="defaultValue"
    :props="props"
    :events="events"
    :methods="methods"
  ></VisualTest>
</template>

<script>
import Heart from "vue-rate-it/glyphs/heart";

import { VisualTest, VisualTestPropHelper } from "@solution5520/s-visual-test";
import RatingInput from "@/components/RatingInput.vue";

export default {
  name: "RatingInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: RatingInput,
      model: 4,
      defaultValue: 3.3,
      events: ["input", "current-rating"],
      methods: [],
      glyph: Heart
    };
  },
  computed: {
    props() {
      return [
        new VisualTestPropHelper("not resetable", [
          {
            value: this.defaultValue,
            resetable: false
          }
        ]),
        new VisualTestPropHelper("glyph", [
          {
            value: this.defaultValue,
            glyph: this.glyph
          }
        ]),
        new VisualTestPropHelper("active-color", [
          {
            value: this.defaultValue,
            activeColor: "green"
          }
        ]),
        new VisualTestPropHelper("inactive-color", [
          {
            value: this.defaultValue,
            inactiveColor: "red"
          }
        ]),
        new VisualTestPropHelper("item-size", [
          {
            value: this.defaultValue,
            itemSize: 20
          },
          {
            value: this.defaultValue,
            itemSize: 50
          }
        ]),
        new VisualTestPropHelper("border-width", [
          {
            value: this.defaultValue,
            borderWidth: 2
          },
          {
            value: this.defaultValue,
            borderWidth: 10
          }
        ]),
        new VisualTestPropHelper("small increment", [
          {
            value: this.defaultValue,
            increment: 0.5
          },
          {
            value: this.defaultValue,
            increment: 0.01
          }
        ]),
        new VisualTestPropHelper("show-rating", [
          {
            value: this.defaultValue,
            showRating: true
          },
          {
            value: this.defaultValue,
            showRating: true,
            increment: 0.01
          }
        ]),
        new VisualTestPropHelper("max-rating", [
          {
            value: this.defaultValue,
            maxRating: 2
          },
          {
            value: this.defaultValue,
            maxRating: 10
          }
        ]),
        new VisualTestPropHelper("text-class", [
          {
            value: this.defaultValue,
            textClass: "text-success",
            showRating: true
          }
        ]),
        new VisualTestPropHelper("fixed-points", [
          {
            value: this.defaultValue,
            fixedPoints: 3,
            showRating: true
          },
          {
            value: this.defaultValue,
            fixedPoints: 4,
            showRating: true,
            increment: 0.01
          }
        ]),
        new VisualTestPropHelper("border-color", [
          {
            value: this.defaultValue,
            borderColor: "red",
            borderWidth: 2
          }
        ]),
        new VisualTestPropHelper("spacing", [
          {
            value: this.defaultValue,
            spacing: -10
          },
          {
            value: this.defaultValue,
            spacing: 0
          },
          {
            value: this.defaultValue,
            spacing: 10
          },
          {
            value: this.defaultValue,
            spacing: 50
          }
        ]),
        new VisualTestPropHelper("rtl", [
          {
            value: this.defaultValue,
            rtl: true
          }
        ]),
        new VisualTestPropHelper("readonly", [
          { readonly: true },
          {
            value: this.defaultValue,
            readonly: true
          }
        ]),
        new VisualTestPropHelper("disabled", [
          { disabled: true },
          {
            value: this.defaultValue,
            disabled: true
          }
        ])
      ];
    }
  }
};
</script>

<style>
.text-success {
  color: #28a745 !important;
}
</style>