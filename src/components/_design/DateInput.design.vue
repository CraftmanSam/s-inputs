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
import DateInput from "@/components/DateInput.vue";

export default {
  name: "DateInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: DateInput,
      model: new Date(2000, 1, 1),
      defaultValue: new Date(),
      defaultClass: "form-control",
      events: ["input"],
      methods: ["focus"]
    };
  },
  computed: {
    props() {
      return [
        new VisualTestPropHelper("withTime", [
          {
            value: this.defaultValue,
            withTime: true
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
