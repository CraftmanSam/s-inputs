<template>
  <VisualTest
    :component="component"
    :defaultAttrs="defaultAttrs"
    :model="model"
    :props="props"
    :events="events"
    :methods="methods"
  ></VisualTest>
</template>

<script>
import { VisualTest, Section, Test } from "@solution5520/s-visual-test";
import { DateInput } from "../../components";

export default {
  name: "DateInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: DateInput,
      defaultAttrs: {
        value: new Date(),
        class: "form-control"
      },
      model: new Section("value", [
        {},
        new Test("with time", {
          withTime: true
        })
      ]),
      props: [
        new Section("value", "weird value", [
          new Test("small date",{
            value: new Date(new Date(0,0).setFullYear(100))
          })
        ]),
        new Section("withTime", "with-time", [
          {
            withTime: true
          }
        ]),
        "readonly",
        "disabled"
      ],
      events: [
        new Section("input", [
          {},
          new Test("with time", {
            withTime: true
          })
        ])
      ],
      methods: ["focus"]
    };
  }
};
</script>
