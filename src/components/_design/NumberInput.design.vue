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
import { VisualTest, Section, Test } from "@solution5520/s-visual-test";
import { NumberInput } from "../../components";

export default {
  name: "NumberInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: NumberInput,
      defaultAttrs: {
        value: 14,
        class: "form-control"
      },
      events: ["input"],
      methods: ["focus"]
    };
  },
  computed: {
    props() {
      return [
        new Section("value", [
          new Test("positive",{
            value: 14
          }),
          new Test("large",{
            value: Number.MAX_VALUE
          }),
          new Test("infinity",{
            value: Number.POSITIVE_INFINITY
          }),
          new Test("negative",{
            value: -42
          }),
          new Test("with decimals",{
            value: Math.PI
          })
        ]),
        new Section("allowNegative", "don't allow negative", [
          {
            allowNegative: false,
            value: -42
          }
        ]),
        new Section("currency", [
          new Test("canadian dollar", {
            currency: "CAD"
          }),
          new Test("custom prefix and suffix", {
            currency: { prefix: "prefix", suffix: "suffix" }
          })
        ]),
        new Section("distractionFree","with distraction-free turned off", [
          {
            distractionFree: false
          }
        ]),
        new Section("autoDecimalMode","auto-decimal-mode", [
          {
            autoDecimalMode: true
          }
        ]),
        new Section("precision","decimal precision", [
          new Test("none", {
            precision: 0
          }),
          new Test("lot", {
            precision: 10
          })
        ]),
        "readonly",
        "disabled",
        "placeholder"
      ];
    }
  }
};
</script>
