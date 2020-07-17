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
import { DurationInput } from "../../components";

export default {
  name: "DurationInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: DurationInput,
      defaultAttrs: {
        value: {
          hours: 1,
          minutes: 14,
          seconds: 42
        },
        class: "form-control"
      },
      events: ["input", "blur"],
      methods: ["focus"],
      weirdValue: {
        // 1:02:01.5548
        hours: 0.5, // 30 minutes
        minutes: 31.5, // 31 minutes and 30 secondes
        seconds: 31.5548 // 31.5548 second, need to be rounded
      }
    };
  },
  computed: {
    props() {
      return [
        new Section("format", [
          new Test("h:mm", {
            format: "h:mm"
          }),
          new Test("h:mm:ss", {
            format: "h:mm:ss"
          }),
          new Test("h:mm:ss.f", {
            format: "h:mm:ss.f"
          }),
          new Test("h:mm:ss.ff", {
            format: "h:mm:ss.ff"
          }),
          new Test("h:mm:ss.fff", {
            format: "h:mm:ss.fff"
          })
        ]),
        new Section("value with weird values", [
          new Test("h:mm (1:02)", {
            value: this.weirdValue,
            format: "h:mm" // 1:02
          }),
          new Test("h:mm:ss (1:02:02)", {
            value: this.weirdValue,
            format: "h:mm:ss" // 1:02:02
          }),
          new Test("h:mm:ss.f (1:02:01.6)", {
            value: this.weirdValue,
            format: "h:mm:ss.f" // 1:02:01.6
          }),
          new Test("h:mm:ss.ff (1:02:01.55)", {
            value: this.weirdValue,
            format: "h:mm:ss.ff" // 1:02:01.55
          }),
          new Test("h:mm:ss.fff (1:02:01.555)", {
            value: this.weirdValue,
            format: "h:mm:ss.fff" // 1:02:01.555
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
