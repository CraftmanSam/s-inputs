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
import { TextAreaInput } from "../../components";

export default {
  name: "TextAreaInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: TextAreaInput,
      defaultAttrs: {
        value:
          "some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer,some very long text value with extra words to make it longer",
        class: "form-control"
      },
      props: [
        new Section("value", "s-test--text"),
        new Section("autosize", "no autosize", [
          {
            autosize: false
          }
        ]),
        new Section("minHeight", [
          {
            minHeight: 150
          }
        ]),
        new Section("maxHeight", [
          {
            maxHeight: 50
          }
        ]),
        new Section("important", [
          {
            important: true
          }
        ]),
        "readonly",
        "disabled",
        "placeholder"
      ],
      events: ["input", "focus"],
      methods: ["focus"]
    };
  }
};
</script>
