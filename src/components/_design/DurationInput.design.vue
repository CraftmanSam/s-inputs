<template>
  <VisualTest
    :component="component"
    :value="model"
    :defaultValue="defaultValue"
    :defaultClass="defaultClass"
    :props="props"
    :events="events"
    :methods="methods"
  ></VisualTest>
</template>

<script>
import { VisualTest, VisualTestPropHelper } from "@solution5520/s-visual-test";
import DurationInput from "@/components/DurationInput.vue";

export default {
  name: "DurationInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: DurationInput,
      model: {
        hours: 0,
        minutes: 5,
        seconds: 15
      },
      defaultValue: {
        hours: 1,
        minutes: 14,
        seconds: 42
      },
      defaultClass: "form-control",
      events: ["input",'blur'],
      methods: ["focus"],
      weirdValue: { // 1:02:01.5548
        hours: 0.5, // 30 minutes
        minutes: 31.5, // 31 minutes and 30 secondes
        seconds: 31.5548 // 31.5548 second, need to be rounded
      }
    };
  },
  computed: {
    props() {
      return [
        new VisualTestPropHelper("format", [
          {
            value: this.defaultValue,
            format: "h:mm"
          },
          {
            value: this.defaultValue,
            format: "h:mm:ss"
          },
          {
            value: this.defaultValue,
            format: "h:mm:ss.f"
          },
          {
            value: this.defaultValue,
            format: "h:mm:ss.ff"
          },
          {
            value: this.defaultValue,
            format: "h:mm:ss.fff"
          }
        ]),
        new VisualTestPropHelper("value with weird values", [
          {
            value: this.weirdValue,
            format: "h:mm" // 1:02
          },
          {
            value: this.weirdValue,
            format: "h:mm:ss" // 1:02:02
          },
          {
            value: this.weirdValue,
            format: "h:mm:ss.f" // 1:02:01.6
          },
          {
            value: this.weirdValue,
            format: "h:mm:ss.ff" // 1:02:01.55
          },
          {
            value: this.weirdValue,
            format: "h:mm:ss.fff" // 1:02:01.555
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
        ]),
        new VisualTestPropHelper("placeholder", [
          { placeholder: "somePlaceholder" }
        ])
      ];
    }
  }
};
</script>
