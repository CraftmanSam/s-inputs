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
import TextAreaInput from "@/components/TextAreaInput.vue";

export default {
  name: "TextAreaInputDesign",
  components: {
    VisualTest
  },
  data() {
    return {
      component: TextAreaInput,
      model: "some text in a variable",
      defaultValue:
        "some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer, some very long text value with extra words to make it longer,some very long text value with extra words to make it longer",
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
            value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque odio mauris, sagittis dignissim viverra sit amet, cursus sed ante. Proin ac elit vitae turpis finibus consequat. Sed vitae magna sit amet ipsum pellentesque egestas in ut purus. Sed ornare ornare sodales. Sed sit amet finibus sapien, sed tincidunt lectus. Morbi odio nisl, porttitor eu lacus eget, tempus posuere nulla. Suspendisse interdum lectus quis risus lacinia, at tempor enim interdum. Nulla facilisi. Pellentesque placerat molestie lectus at suscipit. Fusce ex nisi, rutrum a nisi et, molestie elementum lorem. Curabitur eget libero at ex pretium convallis. Etiam venenatis et ipsum at lacinia. Proin ultrices semper neque, eget pellentesque nisi. Donec elit ante, mattis vel neque sollicitudin, ultrices elementum arcu. Etiam fermentum nibh vitae enim gravida tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Donec risus ex, venenatis ac pulvinar at, euismod vitae nibh. Curabitur nec maximus nisl, nec maximus arcu. In tincidunt, turpis nec sollicitudin suscipit, nisi nisi ullamcorper felis, in vestibulum enim mi vitae magna. Maecenas suscipit nulla id risus aliquam, nec sollicitudin velit pharetra. In hac habitasse platea dictumst. Praesent mi odio, lobortis et congue sed, consectetur elementum leo. Vestibulum sodales urna quam, eget commodo arcu finibus eget. Praesent non scelerisque sapien, in suscipit tellus. Nulla viverra felis sit amet nisl vestibulum, sed congue sem lobortis. Nam vel eros enim. Sed imperdiet orci eget tellus tincidunt sodales. Nam viverra eros et mauris hendrerit, in suscipit massa rhoncus. Mauris scelerisque nisl quis sagittis tempus. Vestibulum orci diam, posuere at massa nec, venenatis vehicula tortor.`
          }
        ]),
        new VisualTestPropHelper("no autosize", [
          {
            value: this.defaultValue,
            autosize: false
          }
        ]),
        new VisualTestPropHelper("min-height", [
          {
            value: this.defaultValue,
            minHeight: 150
          }
        ]),
        new VisualTestPropHelper("max-height", [
          {
            value: this.defaultValue,
            maxHeight: 50
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
          {
            placeholder: "somePlaceholder"
          }
        ])
      ];
    }
  }
};
</script>
