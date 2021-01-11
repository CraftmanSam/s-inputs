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
            mask: "\\#HHHHHH"
          }),
          new Test("phone like text first choice", {
            mask: ["###-####", "(###) ###-####"],
            value: '2262170'
          }),
          new Test("phone like text second choice", {
            mask: ["###-####", "(###) ###-####"],
            value: '4502262170'
          }),
          new Test("with trailing mask", {
            mask: "A\\#(#)",
            value: 'h4'
          }),
          new Test("backspace and delete", {
            mask: "aa--aa",
            value: "abcd"
          })
        ]),
        new Section("masked", [
          new Test("on", {
            masked: true,
            mask: "(###) ###-####",
            value: '4502262170'
          }),
          new Test("off", {
            masked: false,
            mask: "(###) ###-####",
            value: '4502262170'
          })
        ]),
        new Section("type", {
          type: 'tel'
        }),
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
