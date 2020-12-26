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
import { TextInput } from "../../components";

export default {
  name: "TextInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: TextInput,
      defaultAttrs: {
        value: "some text",
        class: "form-control"
      },
      props: [
        new Section("value", "s-test--text"),
        new Section("mask", [
          new Test("letter casing", {
            mask: "aAaA aAaa"
          }),
          new Test("color like text", {
            mask: "\\#FFFFFF"
          })
        ]),
        "readonly",
        "disabled",
        "placeholder"
      ],
      events: [
        "input",
        "change"
      ],
      methods: ["focus"]
    };
  }
};
</script>
