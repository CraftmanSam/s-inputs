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
      events: [
        new Section("input", [
          {},
          new Test("emit input on created", {
            emitInputOnCreated: true
          })
        ]),
        "change"
      ],
      methods: ["focus"],
      hexTokens: {
        F: {
          pattern: /[0-9A-F]/i,
          transform: v => v.toLocaleUpperCase()
        }
      }
    };
  },
  computed: {
    props() {
      return [
        new Section("value", "s-test--text"),
        new Section("emitInputOnCreated", "emit input on created"),
        new Section("mask", [
          {
            mask: "aAaA aAaa"
          }
        ]),
        new Section("token", "color mask: '#FFFFFF'", [
          {
            mask: "\\#FFFFFF",
            tokens: this.hexTokens
          }
        ]),
        "readonly",
        "disabled",
        "placeholder"
      ];
    }
  }
};
</script>
