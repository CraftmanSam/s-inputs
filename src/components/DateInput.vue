<template>
  <input
    ref="input"
    :value="formatedValue"
    :type="type"
    v-bind="$attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  name: "DateInput",
  props: {
    value: Date,
    withTime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modifiedValue: this.value
    };
  },
  watch: {
    value(newValue){
      this.modifiedValue = newValue
    }
  },
  computed: {
    type() {
      return this.withTime ? "datetime-local" : "date";
    },
    listeners() {
      let vm = this;
      return {
        ...this.$listeners,
        input(event) {
          let value = event.target.value;
          let result = new Date();
          if (vm.withTime) {
            result = new Date(value);
          } else {
            let timeZone = vm.getTimezone(value);
            result = new Date(`${value}T00:00:00.000${timeZone}`);
          }

          vm.modifiedValue = result;

          if (vm.isValidDate) {
            vm.$emit("input", result);
          }
        }
      };
    },
    // Format
    formatedValue() {
      return this.getFormattedLocalDate(this.modifiedValue);
    },
    // Validation
    isValidDate() {
      return this.modifiedValue instanceof Date && !isNaN(this.modifiedValue);
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    // Helpers
    getFormattedLocalDate(date) {
      if (!date) {
        return;
      }

      let realDate = new Date(date);

      if (this.withTime) {
        return this.toDatetimeLocal(realDate);
      } else {
        return this.toDateLocal(realDate);
      }
    },
    toDatetimeLocal(date) {
      let hour = date
        .getHours()
        .toString()
        .padStart(2, "0");
      let minute = date
        .getMinutes()
        .toString()
        .padStart(2, "0");

      return `${this.toDateLocal(date)}T${hour}:${minute}`;
    },
    toDateLocal(date) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date
        .getDate()
        .toString()
        .padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    getTimezone(date) {
      let currentTime = new Date(date);
      let currentTimezone = currentTime.getTimezoneOffset();

      let hourTimeZone = Math.floor(currentTimezone / 60) * -1;
      let minuteTimeZone = currentTimezone % 60;

      let sign = hourTimeZone > 0 ? " +" : "-";
      let hour = Math.abs(hourTimeZone)
        .toString()
        .padStart(2, "0");
      let minute = minuteTimeZone.toString().padStart(2, "0");

      return `${sign}${hour}:${minute}`;
    }
  }
};
</script>
