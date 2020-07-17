<template>
  <VisualTest
    :component="component"
    :defaultAttrs="defaultAttrs"
    :props="props"
    :events="events"
    :methods="methods"
  ></VisualTest>
</template>

<script>
import Heart from "vue-rate-it/glyphs/heart";

import { VisualTest, Section, Test } from "@solution5520/s-visual-test";
import { RatingInput } from "../../components";

export default {
  name: "RatingInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: RatingInput,
      defaultAttrs: {
        value: 3.3
      },
      props: [
        new Section("resetable", "not resetable", [
          {
            resetable: false
          }
        ]),
        new Section("glyph", [
          {
            glyph: Heart
          }
        ]),
        new Section("activeColor", "active-color", "s-test--color_type"),
        new Section("inactiveColor", "inactive-color", "s-test--color_type"),
        new Section("itemSize", "item-size", [
          new Test("small", {
            itemSize: 20
          }),
          new Test("large", {
            itemSize: 50
          })
        ]),
        new Section("borderWidth", "border-width", [
          new Test("small", {
            borderWidth: 2
          }),
          new Test("large", {
            borderWidth: 10
          })
        ]),
        new Section("increment", [
          new Test("half", {
            increment: 0.5
          }),
          new Test("continuous", {
            increment: 0.01
          })
        ]),
        new Section("showRating", "show-rating", [
          {
            showRating: true
          },
          new Test("continuous", {
            showRating: true,
            increment: 0.01
          })
        ]),
        new Section("maxRating", "max-rating", [
          new Test("only 2", {
            maxRating: 2
          }),
          new Test("with 10", {
            maxRating: 10
          })
        ]),
        new Section("textClass", "text-class", [
          {
            textClass: "text-success",
            showRating: true
          }
        ]),
        new Section("fixedPoints", "fixed-points", [
          {
            fixedPoints: 3,
            showRating: true
          },
          new Test("continuous", {
            fixedPoints: 4,
            showRating: true,
            increment: 0.01
          })
        ]),
        new Section("borderColor", "border-color", [
          {
            borderColor: "red",
            borderWidth: 2
          }
        ]),
        new Section("spacing", [
          new Test("negative", {
            spacing: -10
          }),
          new Test("none", {
            spacing: 0
          }),
          new Test("large", {
            spacing: 10
          }),
          new Test("huge", {
            spacing: 50
          })
        ]),
        new Section("rtl", "right to left", [
          {
            rtl: true
          }
        ]),
        "readonly",
        "disabled"
      ],
      events: ["input", "current-rating"],
      methods: []
    };
  }
};
</script>

<style>
.text-success {
  color: #28a745 !important;
}
</style>