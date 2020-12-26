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
import { VisualTest, Section } from "@solution5520/s-visual-test";
import { TextIconInput } from "../../components";

export default {
  name: "IconInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: TextIconInput,
      defaultAttrs: {
        value: "some text",
        inputClass: "form-control"
      },
      props: [
        new Section("value", "s-test--text"),
        new Section("inputClass", [
          {
            inputClass: "form-control"
          }
        ]),
        new Section("prefixIcon", "s-test--fa_icon"),
        new Section("suffixIcon", "s-test--fa_icon"),
        new Section("both icon", [
          {
            prefixIcon: "search",
            suffixIcon: "search"
          }
        ]),
        new Section("iconColor", [
          {
            iconColor: "green",
            prefixIcon: "search",
            suffixIcon: "search"
          }
        ]),
        "readonly",
        "disabled",
        "placeholder"
      ],
      events: [
        "input",
        new Section("click", {
          prefixIcon: "search",
          suffixIcon: "search"
        }),
        new Section("prefixIconClick", {
          prefixIcon: "search"
        }),
        new Section("suffixIconClick", {
          suffixIcon: "search"
        }),
        "keypress"
      ],
      methods: ["focus"]
    };
  }
};
</script>
