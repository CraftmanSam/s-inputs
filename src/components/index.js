import Vue from 'vue'

// Dependencies
import InputFacade from 'vue-input-facade'
import TextareaAutosize from 'vue-textarea-autosize'
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

Vue.use(InputFacade, {
    tokens: {
        '#': { pattern: /\d/ },
        X: { pattern: /[0-9a-z]/i },
        S: { pattern: /[a-z]/i },
        A: { pattern: /[a-z]/i, transform: (v) => v.toLocaleUpperCase() },
        a: { pattern: /[a-z]/i, transform: (v) => v.toLocaleLowerCase() },
        '\\': { escape: true },
        F: { pattern: /[0-9A-F]/i, transform: v => v.toLocaleUpperCase() }
    }
})
Vue.use(TextareaAutosize)
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