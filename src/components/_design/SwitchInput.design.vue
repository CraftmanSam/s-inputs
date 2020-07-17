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
import { SwitchInput } from "../../components";

export default {
  name: "SwitchInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: SwitchInput,
      defaultAttrs: {
        value: true
      },
      props: [
        new Section("typeBold", "not typeBold", [
          {
            typeBold: false
          }
        ]),
        new Section("theme", "theme and color", [
          new Test("bootstrap", {
            theme: "bootstrap",
            color: "warning"
          }),
          new Test("bulma", {
            theme: "bulma",
            color: "primary"
          })
        ]),
        new Section("textEnabled", [
          {
            textEnabled: "On"
          }
        ]),
        new Section("textDisabled", [
          {
            textDisabled: "Off"
          }
        ]),
        new Section("color", [
          new Test("success", {
            theme: "bootstrap",
            color: "success"
          }),
          new Test("warning", {
            theme: "bootstrap",
            color: "warning"
          }),
          new Test("danger", {
            theme: "bootstrap",
            color: "danger"
          })
        ]),
        new Section("emitOnMount", [
          {
            emitOnMount: true
          }
        ]),
        "readonly",
        "disabled"
      ],
      events: [
        new Section("input", [
          {},
          new Test("emitOnMount", {
            emitOnMount: true
          })
        ])
      ],
      methods: []
    };
  }
};
</script>
