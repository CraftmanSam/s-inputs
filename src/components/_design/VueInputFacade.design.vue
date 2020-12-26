<template>
  <div>
      <VueInputFacade @input="handlingInput" class="form-control" mask="Aaa" value="d"/>
      <div class="mt-2">Value: {{ events.input.value }}</div>
      <div class="mt-1">Count: {{ events.input.count }}</div>
  </div>
</template>

<script>
import VueInputFacade from "../vue-input-facade/component";

export default {
  name: "VueInputFacadeDesign",
  components: {
      VueInputFacade
  },
  data() {
      return {
          events: {
              input:{count:0,value:''}
          },
          text: 'd'
      }
  },
  methods: {
      handlingInput(event) {
          this.events.input = {count:this.events.input.count + 1, value: event}
      },
  }
};
</script>
