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
import NumberInput from "@/components/NumberInput.vue";

export default {
  name: "NumberInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: NumberInput,
      model: 23,
      defaultValue: 14,
      defaultClass: "form-control",
      events: ["input"],
      methods: ["focus"]
    };
  },
  computed: {
    props() {
      return [
        new VisualTestPropHelper("value with decimals", [
          {
            value: Math.PI
          }
        ]),
        new VisualTestPropHelper("don't allowNegative", [
          {
            value: -42,
            allowNegative: false
          }
        ]),
        new VisualTestPropHelper("currency", [
          {
            value: this.defaultValue,
            currency: "CAD"
          },
          {
            value: this.defaultValue,
            currency: { prefix: "prefix", suffix: "suffix" }
          }
        ]),
        new VisualTestPropHelper("with distractionFree turned off", [
          {
            value: this.defaultValue,
            distractionFree: false
          }
        ]),
        new VisualTestPropHelper("autoDecimalMode", [
          {
            value: this.defaultValue,
            autoDecimalMode: true
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
