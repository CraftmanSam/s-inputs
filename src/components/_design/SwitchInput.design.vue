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
import { VisualTest, VisualTestPropHelper } from "@solution5520/s-visual-test";
import SwitchInput from "@/components/SwitchInput.vue";

export default {
  name: "SwitchInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: SwitchInput,
      model: true,
      defaultValue: true,
      events: ["input"],
      methods: []
    };
  },
  computed: {
    props() {
      return [
        new VisualTestPropHelper("not typeBold", [
          {
            typeBold: false
          }
        ]),
        new VisualTestPropHelper("theme and color", [
          {
            theme: "bootstrap",
            color: "warning"
          }
        ]),
        new VisualTestPropHelper("textEnabled", [
          {
            textEnabled: "On"
          }
        ]),
        new VisualTestPropHelper("textDisabled", [
          {
            textDisabled  : "Off"
          }
        ]),
        new VisualTestPropHelper("color", [
          {
            color  : "red"
          }
        ]),
        new VisualTestPropHelper("emitOnMount", [
          {
            emitOnMount  : true
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
