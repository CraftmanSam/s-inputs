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
import TextInput from "@/components/TextInput.vue";

export default {
  name: "TextInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: TextInput,
      model: "some text in a variable",
      defaultValue: "some text",
      defaultClass: "form-control",
      events: ["input"],
      methods: ["focus"]
    };
  },
  computed: {
    props() {
      return [
        new VisualTestPropHelper("value with long text", [
          {
            value:
              "some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer,some very long text value with extra words to make it longer"
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
