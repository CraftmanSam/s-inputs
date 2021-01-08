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
        '*': {pattern: /[\s\S]/ }, // Any character
        '#': { pattern: /\d/ }, // Number
        X: { pattern: /[0-9a-z]/i }, // Alphanumeric
        H: { pattern: /[0-9A-F]/i, transform: v => v.toLocaleUpperCase() }, // Hexadecimal
        S: { pattern: /[a-z]/i }, // Letter in any case
        A: { pattern: /[a-z]/i, transform: v => v.toLocaleUpperCase() }, // Letter in upper case
        a: { pattern: /[a-z]/i, transform: v => v.toLocaleLowerCase() }, // Letter in lower case
        '\\': { escape: true } // Escape character
      }),
    },
  },
  data() {
    return {
      rawText: "",
      maskedText: "",
      lastValue: "" // avoid unecessary emit when has no change
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        const maskerData = this.refresh(newValue)
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
        input: (event) => {
          const cursorIndex = event.target.selectionStart
          const maskerData = this.refresh(event.target.value)
          this.$refs.input.value = maskerData.maskedValue // force display refresh
          this.updateCursor(maskerData, cursorIndex);

          if (this.maskedText !== this.lastValue) {
            this.lastValue = this.maskedText;
            if (this.masked) {
              this.$emit("input", this.maskedText);
            } else {
              this.$emit("input", this.rawText);
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
      const maskerData = this.masker(rawValue, this.mask, this.tokens)
      this.rawText = maskerData.rawValue
      this.maskedText = maskerData.maskedValue
      return maskerData
    },
    updateCursor(maskerData, cursorIndex) {      
      if (maskerData.conversions){
        // find the first character after the cursor index
        const nextIndex = maskerData.conversions.findIndex(conversion => conversion.inputIndex >= cursorIndex)
        // if no character after nextIndex is equal to -1, so set the new cursor to the end of the string
        const newCursor = nextIndex >= 0 ? nextIndex : maskerData.conversions.length
        this.setCursor(newCursor);
      }
    },
    async setCursor(index) {
      this.$refs.input.setSelectionRange(index, index);
      await this.$nextTick();
      this.$refs.input.setSelectionRange(index, index);
    },
    masker(value, mask, tokens) {
      const maskArray = mask ? Array.isArray(mask) ? [...mask] : [mask] : []
      return this.dynamicMask(value, maskArray, tokens)
    },
    dynamicMask(value, masks, tokens) {
      if (!masks.length) return {input: value, rawValue: value, maskedValue: value}
      const orderedMasks = masks.sort((a, b) => a.length - b.length);
      const maskedValues = orderedMasks.map(mask => this.maskit(value, mask, tokens))
      const selectedValue = maskedValues.sort((a,b) => b.rawValue.length - a.rawValue.length)[0] // select the larger one
      return selectedValue
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
      var conversions = []
      while (maskIndex < mask.length && valueIndex < value.length) {
        var cMask = mask[maskIndex];
        var masker = tokens[cMask];
        var cValue = value[valueIndex];
        if (masker && !masker.escape) {
          if (masker.pattern.test(cValue)) {
            const transformedValue = masker.transform ? masker.transform(cValue) : cValue;
            conversions.push({value: transformedValue, inputIndex: valueIndex, maskIndex, isRaw: true})
            maskIndex++;
          }
          valueIndex++;
        } else {
          if (masker && masker.escape) {
            maskIndex++; // take the next mask char and treat it as char
            cMask = mask[maskIndex] || ""; // if not char after the escape
          }
          let conversion = {value: cMask, inputIndex: undefined, maskIndex, isRaw: false}
          if (cValue === cMask) {
            // user typed the same char
            conversion.inputIndex = valueIndex
            valueIndex++
          }
          conversions.push(conversion)
          maskIndex++;
        }
      }

      // fix mask that ends with a char: (#)
      let restConversions = []
      while (maskIndex < mask.length) {
        var cMask2 = mask[maskIndex];
        let masker2 = tokens[cMask2];
        if (masker2 && !masker2.escape) {
          restConversions = []
          break;
        } else {
          if (masker2 && masker2.escape) {
            maskIndex++; // take the next mask char and treat it as char
            cMask2 = mask[maskIndex] || ""; // if not char after the escape
          }
        }
        if (cMask2) restConversions.push({value: cMask2, inputIndex: undefined, maskIndex, isRaw: false })
        maskIndex++;
      }
      conversions = [...conversions, ...restConversions]
      
      return {
        input: value,
        rawValue: conversions.filter(conversion => conversion.isRaw).reduce((output, conversion) => output += conversion.value, ""),
        maskedValue: conversions.reduce((output, conversion) => output += conversion.value, ""),
        mask,
        conversions
      }
    },
  },
};
</script>
