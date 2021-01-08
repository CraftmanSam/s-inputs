<template>
  <div>
      <TextInput @input="handlingInput" class="form-control mt-2" mask="##.##.## Aaa" v-model="text"/>
      <input @input="handlingInput" class="form-control mt-2" v-model="text"/>
      <div class="mt-2">Value: {{ events.input.value }}</div>
      <div class="mt-1" @click="text='dd'">Count: {{ events.input.count }}</div>
  </div>
</template>

<script>
import { TextInput } from "../../components";

export default {
  name: "VueInputFacadeDesign",
  components: {
      TextInput,
  },
  data() {
      return {
          events: {
              input:{count:0,value:''}
          },
          text: 'd'
      }
  },
  watch: {
      $route : {
          immediate: true,
          handler() {
              console.log(this.$route.params.id);
              this.text = new Date().toTimeString()
          }
      }
  },
  methods: {
      handlingInput(event) {
          this.events.input = {count:this.events.input.count + 1, value: event}
      },
  }
};
</script>
