<template>
  <input ref="input" :value="maskedText" v-bind="$attrs" v-on="listeners" />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: String,
    mask: {
      type: [String, Array],
      default: "",
    },
    masked: {
      // by default emits the value unformatted, change to true to format with the mask
      type: Boolean,
      default: false, // unformatted
    },
    tokens: {
      type: Object,
      default: () => ({
        "*": { pattern: /[\s\S]/ }, // Any character
        "#": { pattern: /\d/ }, // Number
        X: { pattern: /[0-9a-z]/i }, // Alphanumeric
        H: { pattern: /[0-9A-F]/i, transform: (v) => v.toLocaleUpperCase() }, // Hexadecimal
        S: { pattern: /[a-z]/i }, // Letter in any case
        A: { pattern: /[a-z]/i, transform: (v) => v.toLocaleUpperCase() }, // Letter in upper case
        a: { pattern: /[a-z]/i, transform: (v) => v.toLocaleLowerCase() }, // Letter in lower case
        "\\": { escape: true }, // Escape character
      }),
    },
  },
  data() {
    return {
      rawText: "",
      maskedText: "",
      lastValue: "", // avoid unecessary emit when has no change
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        const maskerData = this.refresh(newValue);
        this.lastValue = maskerData.maskedValue;
      },
    },
    mask() {
      this.refresh(this.rawText);
    },
    tokens() {
      this.refresh(this.rawText);
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        keydown: (event) => {
          let oldMaskerData = this.masker(this.rawText, this.mask, this.tokens);
          if (oldMaskerData.conversions) {
            if (event.key === "Backspace" || event.key === "Delete") {
              // Backspace and Delete

              // ab--|cd    masked value
              //     4      cursor index
              // a|b|cd      raw value cursor
              // a|cd       raw value after backspace
              // a|c--d     masked value after backspace
              //  1         cursor index after backspace

              // a|b-|-cd   masked value
              //  1  3      cursors indexes
              // a|b|cd     raw value cursors
              // a|cd       raw value after backspace
              // a|c--d     masked value after backspace
              //  1         cursor index after backspace

              // ab-|-c|d   masked value
              //    3  5    cursors indexes
              // ab|c|d     raw value cursors
              // ab|d       raw value after backspace
              // ab--|d     masked value after backspace
              //     4      cursor index after backspace

              // find cursors indexes
              const selectionStart = event.target.selectionStart;
              const selectionEnd = event.target.selectionEnd;
              // get raw value
              const oldRawValue = oldMaskerData.rawValue;
              // convert the masked indexes to the raw indexes
              const length = oldMaskerData.conversions.length;
              const startConversion = [...oldMaskerData.conversions]
                .reverse()
                .find(
                  (conversion, reverseIndex) =>
                    length - reverseIndex <= selectionStart && conversion.isRaw // the previous raw
                );
              let rawStartIndex = startConversion
                ? startConversion.inputIndex + 1
                : 0;
              const endConversion = oldMaskerData.conversions.find(
                (conversion, index) => index >= selectionEnd && conversion.isRaw // the next raw
              );
              let rawEndIndex = endConversion
                ? endConversion.inputIndex
                : oldRawValue.length;
              // if only one cursor
              if (rawStartIndex === rawEndIndex) {
                // if backspace
                if (event.key === "Backspace") {
                  // add a cursor before the previous character
                  rawStartIndex = rawStartIndex > 0 ? rawStartIndex - 1 : 0;
                  // if delete
                } else if (event.key === "Delete") {
                  // add a cursor after the character
                  rawEndIndex =
                    rawEndIndex < oldRawValue.length
                      ? rawEndIndex + 1
                      : oldRawValue.length;
                }
              }
              // if not edge case
              if (
                !(
                  (selectionStart === 0 && event.key === "Backspace") ||
                  (selectionEnd === length && event.key === "Delete")
                )
              ) {
                // set input value with raw value after backspace/delete
                event.target.value = oldRawValue;
                // set input cursor at the start cursor
                event.target.setSelectionRange(rawStartIndex, rawEndIndex);
              }
            }
          }
          this.$emit("keydown", event);
        },
        input: (event) => {
          let cursorIndex = event.target.selectionStart;
          // maskIt
          const maskerData = this.refresh(event.target.value);
          this.$refs.input.value = maskerData.maskedValue; // force display refresh
          this.updateCursor(event, maskerData, cursorIndex);

          console.log("masked value", maskerData.maskedValue);

          if (maskerData.maskedValue !== this.lastValue) {
            this.lastValue = maskerData.maskedValue;
            if (this.masked) {
              this.$emit("input", maskerData.maskedValue);
            } else {
              this.$emit("input", maskerData.rawValue);
            }
          }
        },
      };
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    refresh(rawValue) {
      const maskerData = this.masker(rawValue, this.mask, this.tokens);
      this.rawText = maskerData.rawValue;
      this.maskedText = maskerData.maskedValue;
      return maskerData;
    },
    updateCursor(event, maskerData, cursorIndex) {
      // if (event.inputType === "deleteContentBackward") {
      //   // backslash
      //   this.setCursor(cursorIndex);
      // } else if (event.inputType === "deleteContentForward") {
      //   // delete
      // } else {
      if (maskerData.conversions) {
        // find the first character after the cursor index
        const nextIndex = maskerData.conversions.findIndex(
          (conversion) => conversion.inputIndex >= cursorIndex
        );
        // if no character after nextIndex is equal to -1, so set the new cursor to the end of the string
        const newCursor =
          nextIndex >= 0 ? nextIndex : maskerData.conversions.length;
        this.setCursor(newCursor);
      }
      // }
    },
    async setCursor(index) {
      this.$refs.input.setSelectionRange(index, index);
      await this.$nextTick();
      this.$refs.input.setSelectionRange(index, index);
    },
    masker(value, mask, tokens) {
      const maskArray = mask ? (Array.isArray(mask) ? [...mask] : [mask]) : [];
      return this.dynamicMask(value, maskArray, tokens);
    },
    dynamicMask(value, masks, tokens) {
      if (!masks.length)
        return { input: value, rawValue: value, maskedValue: value };
      const orderedMasks = masks.sort((a, b) => a.length - b.length);
      const maskedValues = orderedMasks.map((mask) =>
        this.maskit(value, mask, tokens)
      );
      const selectedValue = maskedValues.sort(
        (a, b) => b.rawValue.length - a.rawValue.length
      )[0]; // select the larger one
      return selectedValue;
    },
    maskit(value = "", mask = "", tokens) {
      /**
       * masked data: {
       *   input: '#1asdfg23456',
       *   rawValue: '1ADF23',
       *   maskedValue: '#1ADF23',
       *   mask: '\#HHHHHH'
       *   conversions: [
       *     {value: '#', inputIndex: 0, isRaw: false},
       *     {value: '1', inputIndex: 1, isRaw: true},
       *     {value: 'A', inputIndex: 2, isRaw: true},
       *     {value: 'D', inputIndex: 4, isRaw: true},
       *     {value: 'F', inputIndex: 5, isRaw: true},
       *     {value: '2', inputIndex: 7, isRaw: true},
       *     {value: '3', inputIndex: 8, isRaw: true},
       *   ]
       * }
       */

      var maskIndex = 0;
      var valueIndex = 0;
      var conversions = [];
      while (maskIndex < mask.length && valueIndex < value.length) {
        var cMask = mask[maskIndex];
        var masker = tokens[cMask];
        var cValue = value[valueIndex];
        if (masker && !masker.escape) {
          if (masker.pattern.test(cValue)) {
            const transformedValue = masker.transform
              ? masker.transform(cValue)
              : cValue;
            conversions.push({
              value: transformedValue,
              inputIndex: valueIndex,
              maskIndex,
              isRaw: true,
            });
            maskIndex++;
          }
          valueIndex++;
        } else {
          if (masker && masker.escape) {
            maskIndex++; // take the next mask char and treat it as char
            cMask = mask[maskIndex] || ""; // if not char after the escape
          }
          let conversion = {
            value: cMask,
            inputIndex: undefined,
            maskIndex,
            isRaw: false,
          };
          if (cValue === cMask) {
            // user typed the same char
            conversion.inputIndex = valueIndex;
            valueIndex++;
          }
          conversions.push(conversion);
          maskIndex++;
        }
      }

      // fix mask that ends with a char: (#)
      let restConversions = [];
      while (maskIndex < mask.length) {
        var cMask2 = mask[maskIndex];
        let masker2 = tokens[cMask2];
        if (masker2 && !masker2.escape) {
          restConversions = [];
          break;
        } else {
          if (masker2 && masker2.escape) {
            maskIndex++; // take the next mask char and treat it as char
            cMask2 = mask[maskIndex] || ""; // if not char after the escape
          }
        }
        if (cMask2)
          restConversions.push({
            value: cMask2,
            inputIndex: undefined,
            maskIndex,
            isRaw: false,
          });
        maskIndex++;
      }
      conversions = [...conversions, ...restConversions];

      return {
        input: value,
        rawValue: conversions
          .filter((conversion) => conversion.isRaw)
          .reduce((output, conversion) => (output += conversion.value), ""),
        maskedValue: conversions.reduce(
          (output, conversion) => (output += conversion.value),
          ""
        ),
        mask,
        conversions,
      };
    },
  },
};
</script>
