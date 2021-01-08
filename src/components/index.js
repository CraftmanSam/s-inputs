import Vue from 'vue'

// Dependencies
import VueCurrencyInput from 'vue-currency-input'

// Inputs
import DateInput from './DateInput.vue'
import DurationInput from './DurationInput.vue'
import NumberInput from './NumberInput.vue'
import RatingInput from './RatingInput.vue'
import SwitchInput from './SwitchInput.vue'
import TextAreaInput from './TextAreaInput.vue'
import TextIconInput from './TextIconInput.vue'
import TextInput from './TextInput.vue'

Vue.use(VueCurrencyInput)

const Components = {
    DateInput,
    DurationInput,
    NumberInput,
    RatingInput,
    SwitchInput,
    TextAreaInput,
    TextIconInput,
    TextInput
}

export default Components

export {
    DateInput,
    DurationInput,
    NumberInput,
    RatingInput,
    SwitchInput,
    TextAreaInput,
    TextIconInput,
    TextInput
}