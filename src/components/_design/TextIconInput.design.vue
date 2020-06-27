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
import TextIconInput from "@/components/TextIconInput.vue";

export default {
  name: "IconInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: TextIconInput,
      model: "some text in a variable",
      defaultValue: 
              "some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer,some very long text value with extra words to make it longer",
      defaultClass: "",
      events: ["input"],
      methods: ["focus"],
      icon: ["fas", "search"],
      inputClass: "form-control",
    };
  },
  computed: {
    props() {
      return [
        new VisualTestPropHelper("inputClass", [
          {
            value: this.defaultValue,
            inputClass: this.inputClass
          }
        ]),
        new VisualTestPropHelper("prefixIcon", [
          {
            inputClass: this.inputClass,
            prefixIcon: "search"
          },
          {
            value: this.defaultValue,
            inputClass: this.inputClass,
            prefixIcon: this.icon
          }
        ]),
        new VisualTestPropHelper("suffixIcon", [
          {
            inputClass: this.inputClass,
            suffixIcon: "search"
          },
          {
            value: this.defaultValue,
            inputClass: this.inputClass,
            suffixIcon: this.icon
          }
        ]),
        new VisualTestPropHelper("both icon", [
          {
            inputClass: this.inputClass,
            prefixIcon: "search",
            suffixIcon: "search"
          },
          {
            value: this.defaultValue,
            inputClass: this.inputClass,
            prefixIcon: this.icon,
            suffixIcon: this.icon
          }
        ]),
        new VisualTestPropHelper("iconColor", [
          {
            inputClass: this.inputClass,
            iconColor: "green",
            prefixIcon: "search",
            suffixIcon: "search"
          }
        ]),
        new VisualTestPropHelper("readonly", [
          {
            inputClass: this.inputClass,
            readonly: true
          },
          {
            value: this.defaultValue,
            inputClass: this.inputClass,
            readonly: true
          }
        ]),
        new VisualTestPropHelper("disabled", [
          {
            inputClass: this.inputClass,
            disabled: true
          },
          {
            value: this.defaultValue,
            inputClass: this.inputClass,
            disabled: true
          }
        ]),
        new VisualTestPropHelper("placeholder", [
          {
            inputClass: this.inputClass,
            placeholder: "somePlaceholder"
          }
        ])
      ];
    }
  }
};
</script>
