<template>
  <TextInput ref="input" :value="displayedText" v-bind="$attrs" v-on="listeners" />
</template>

<script>
import TextInput from "./TextInput.vue";

export default {
  name: "DurationInput",
  model: {
    event: "blur"
  },
  props: {
    value: Object, // Object of {hours, minutes, seconds}
    format: {
      type: String,
      default: "h:mm"
    }
  },
  components: {
    TextInput
  },
  data() {
    return {
      totalSeconds: 0,
      displayedText: ""
    };
  },
  watch: {
    value(newValue) {
      this.displayedText = this.valueToString(newValue, this.format);
      this.totalSeconds = this.parseDuration(newValue, this.format);
    }
  },
  created() {
    this.displayedText = this.valueToString(this.value, this.format);
    this.totalSeconds = this.parseDuration(this.value, this.format);
  },
  computed: {
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        input(value) {
          vm.totalSeconds = vm.parseDuration(value, vm.format);
          vm.$emit("input", vm.emitValue);
        },
        blur() {
          vm.displayedText = vm.valueToString(vm.emitValue, vm.format);
          vm.$refs.input.refresh(); // force the input refresh

          vm.$emit("blur", vm.emitValue);
        }
      };
    },
    // values
    maskedValue() {
      return this.formatDuration(this.totalSeconds, this.format);
    },
    unmaskedValue() {
      return this.convertSecToHourMinSec(this.totalSeconds, this.precision);
    },
    precision() {
      return this.getPrecisionOfFormat(this.format);
    },
    emitValue() {
      return this.unmaskedValue;
    }
  },
  methods: {
    // events
    onBodyClick() {
      this.focus();
    },
    // public methods
    focus() {
      this.$refs.input.focus();
    },
    // helpers
    valueToString(value, format = "h:mm") {
      let totalSeconds = this.parseDuration(value, format);
      return this.formatDuration(totalSeconds, format);
    },
    formatDuration(totalSeconds = 0, format = "h:mm") {
      if (totalSeconds === 0) {
        return "";
      }

      let replaceFormat = format;
      replaceFormat = replaceFormat.replace(/h+/g, "{0}");
      replaceFormat = replaceFormat.replace(/mm+/g, "{1}");
      replaceFormat = replaceFormat.replace(/m/g, "{2}");
      replaceFormat = replaceFormat.replace(/ss+/g, "{3}");
      replaceFormat = replaceFormat.replace(/fff+/g, "{4}");
      replaceFormat = replaceFormat.replace(/ff/g, "{5}");
      replaceFormat = replaceFormat.replace(/f/g, "{6}");

      let precision = this.getPrecisionOfFormat(format);
      let hourMinSec = this.convertSecToHourMinSec(totalSeconds, precision);

      let minutes = hourMinSec.minutes;
      if (!/ss/.test(format)) {
        // if not showing seconds
        minutes += hourMinSec.seconds / 60;
      }

      let seconds = this.roundWithPrecision(hourMinSec.seconds, precision);

      return this.stringFormat(
        replaceFormat,
        hourMinSec.hours,
        Math.round(minutes)
          .toString()
          .padStart(2, 0),
        Math.round(minutes),
        Math.trunc(seconds)
          .toString()
          .padStart(2, 0),
        (seconds % 1).toFixed(3).substring(2),
        (seconds % 1).toFixed(2).substring(2),
        (seconds % 1).toFixed(1).substring(2)
      );
    },
    parseDuration(value = "", format = "h:mm") {
      // '' =>  placeholder

      // format='h:mm'
      // 0 => 0:00
      // 1 => 0:01
      // 1: =>  1:00
      // 0.4  =>  0:00  last digit is rounded
      // 0.5  =>  0:01
      // 1:60 => 2:00   minutes is cap at 60, excess go to hours
      // 0.5:00 => 0:30   hours decimal is transfered to minutes
      // 0.1:54 =>  1:00  combination of the two above (0.1 hours = 6 min)
      // 1:2:3  =>  62:03
      // 0.5:0:0  =>  30:00

      // format='h:mm:ss'
      // 0 => 0:00  'm:ss'
      // 1 => 0:01
      // 0.4  =>  0:00  last digit is rounded
      // 0.5  =>  0:01
      // 1:60 => 2:00   seconds are cap at 60, excess go to minutes
      // 0.5:00 => 0:30   hours decimal is transfered to minutes
      // 0.1:54 =>  1:00  combination of the two above (0.1 hours = 6 min)
      // 1:2:3  =>  1:02:03
      // 59:60  =>  1:00:00 seconds and minutes are cap at 60, excess go to hours

      if (value instanceof Object) {
        let hourMinSec = (({ hours, minutes, seconds }) => ({
          hours,
          minutes,
          seconds
        }))(value);
        let totalSeconds = this.getTotalSec(hourMinSec);
        return totalSeconds;
      } else {
        let text = (value || "").toString();
        let authorizedCharExp = /[\d':.]+/g;
        let matches = text.match(authorizedCharExp);
        if (!matches) {
          return 0;
        }
        let safeText = matches.join("");
        if (safeText === "") {
          return 0;
        }

        let values = this.extractValues(safeText);
        let precision = this.getPrecisionOfFormat(format);
        let hourMinSec = this.alignHourMinSec(values, format);
        let totalSeconds = this.getTotalSec(hourMinSec);
        return this.roundWithPrecision(totalSeconds, precision);
      }
    },
    extractValues(text = "") {
      let parts = text.split(":");

      return parts.map(value => {
        let result = parseFloat(value);
        return isNaN(result) ? 0 : result;
      });
    },
    getTotalSec(hourMinSec = {}) {
      let values = Object.values(hourMinSec).reverse();

      let seconds = new Array(3);
      const MULTIPLICATOR_BASE = 60;
      for (let i = 0; i < values.length; i++) {
        seconds[i] = values[i] * Math.pow(MULTIPLICATOR_BASE, i);
      }

      return seconds.reduce((total, value) => total + value); // sum
    },
    convertSecToHourMinSec(totalSeconds = 0, precision = 0) {
      return {
        hours: Math.trunc(totalSeconds / 3600),
        minutes: Math.trunc((totalSeconds / 60) % 60),
        seconds: this.roundWithPrecision(totalSeconds % 60, precision)
      };
    },
    alignHourMinSec(values = [], format = "h:mm") {
      let convertedValues = values
        .reverse()
        .slice(0, 3)
        .reverse();

      let formatParts = format.split(":");
      let formatIndexOffset = formatParts.length === 2 ? 1 : 0;
      let prefixOffset = Math.max(
        3 - convertedValues.length - formatIndexOffset,
        0
      );
      let suffixOffset = convertedValues.length >= 3 ? 0 : formatIndexOffset;

      let hourMinSec = [
        ...new Array(prefixOffset).fill(0),
        ...convertedValues,
        ...new Array(suffixOffset).fill(0)
      ];

      let result = {
        hours: hourMinSec[0],
        minutes: hourMinSec[1],
        seconds: hourMinSec[2]
      };

      return result;
    },
    calculateEmitValue(totalSeconds = 0, format = "h:mm") {
      let formatParts = format.split(":");
      let unitIsSeconds = formatParts.length > 2;
      let precision = this.getPrecisionOfFormat(format);

      return unitIsSeconds
        ? this.roundWithPrecision(totalSeconds, precision)
        : Math.trunc(totalSeconds / 60);
    },
    getPrecisionOfFormat(format = "") {
      let formatParts = format.split(":");
      return formatParts[formatParts.length - 1].split("f").length - 1;
    },
    roundWithPrecision(number = 0, precision = 0) {
      let precisionMultiplier = parseInt("1".padEnd(precision + 1, 0));
      return (
        Math.round((number + Number.EPSILON) * precisionMultiplier) /
        precisionMultiplier
      );
    },
    stringFormat(format = "", ...args) {
      return format.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    }
  }
};
</script>
