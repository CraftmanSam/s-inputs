# s-inputs

Inputs components with built-in logic for different data type. 

Contains inputs for : 
- [Text](#TextInput)
- [Text with icons](#TextIconInput)
- [Multiline text](#TextAreaInput)
- [Number (with build-in currency)](#NumberInput)
- [Date](#DateInput)
- [Duration (in hour:minutes:seconds)](#DurationInput)
- [Rating](#RatingInput)
- [On/Off Switch](#SwitchInput)


## Installation
```
npm i @solution5520/s-inputs
```


## Importing

### Register all components globaly
In main.js:
```javascript
import Vue from 'vue'
import SInputs from "@solution5520/s-inputs"
import '@solution5520/s-inputs/dist/s-inputs.css'

Vue.use(SInputs)
```

### Register specific components locally
Install only needed components.
```javascript
import {
    DateInput,
    DurationInput,
    IconInput,
    NumberInput,
    RatingInput,
    SwitchInput,
    TextAreaInput,
    TextInput
} from "@solution5520/s-inputs"

export default {
  components: { 
    DateInput,
    DurationInput,
    IconInput,
    NumberInput,
    RatingInput,
    SwitchInput,
    TextAreaInput,
    TextInput 
  },
  // ... rest of component config
}
```


# Docs

## TextInput
Simple text input warper.

### Usage
```html
<template>
  <TextInput 
    v-model="value"
    placeholder="Type something here..."
  />
</template>

<script>
export default {
  data: () => ({
    value: 'Lorem ipsum'
  })
}
</script>
```

### Interface

#### Props
Inherits from [`<input-facade>`](https://ronaldjerez.github.io/vue-input-facade/#component)

Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | String | '' | Value binding.
value | no | String | '' | Part of the `v-model` binding.
emit-input-on-created | no | Boolean | false | Emit an `input` event when created if `true`

#### Events
Name | Params | Description
---- | ------ | -----------
input | value - The input's current value, masked or unmasked. | Fires when the value of the input has been changed. Part of the `v-model` binding.
change | value - The input's current value, masked or unmasked. | Fires when the value has been commited on the input. Usually on blur.

#### Methods
Name | Params | Description
---- | ------ | -----------
focus | [none] | Focus the input.





## TextIconInput
Text input with optional prefix and suffix icons.

### Usage
```html
<template>
  <TextIconInput
    v-model="value"
    placeholder="Type something here..."
    inputClass="form-control"
    prefixIcon="search"
    :suffixIcon="['fas', 'search']"
    iconColor="red"
  />
</template>

<script>
export default {
  data: () => ({
    value: 'Lorem ipsum'
  })
}
</script>
```

### Interface

#### Props
Inherits from [`<input type="text">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/text)

Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | String | '' | Value binding.
value | no | String | '' | Part of the `v-model` binding.
inputClass | no | String, Array, Object | '' | Css class applied to the input.
prefixIcon | no | String, Array | '' | Font-awesome icon put before the input.
suffixIcon | no | String, Array | '' | Font-awesome icon put after the input.
iconColor | no | String | null | Color of the icons. 

#### Events
Name | Params | Description
---- | ------ | -----------
input | value | Fires when the value of the input has been changed. Part of the `v-model` binding.

#### Methods
Name | Params | Description
---- | ------ | -----------
focus | [none] | Focus the input.





## TextAreaInput
Input for multiline text, comes with auto-resize.

### Usag
```html
<template>
  <TextAreaInput 
    v-model="value"
  />
</template>

<script>
export default {
  data: () => ({
    value: 'Lorem ipsum'
  })
}
</script>
```

### Interface

#### Props
Inherits from [`vue-textarea-autosize`](https://devstark-com.github.io/vue-textarea-autosize/guide.html#interface)

Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | String | '' | Value binding.
value | no | String | '' | Part of the `v-model` binding.
autosize | no | Boolean | true | Allows to enable/disable auto resizing.

#### Events
Name | Params | Description
---- | ------ | -----------
input | value | Fires when the value of the textarea has been changed. Part of the `v-model` binding.

#### Methods
Name | Params | Description
---- | ------ | -----------
focus | [none] | Focus the input.
resize | [none] | Force a one shot auto-resize.





## NumberInput
Base for any number related input. Built-in currency system.

### Usage
```html
<template>
  <NumberInput 
    v-model="value"
    currency="EUR"
    locale="de"
  />
</template>

<script>
export default {
  data: () => ({
    value: 1000
  })
}
</script>
```


### Interface

#### Props
inherits from [`vue-currency-input`](https://dm4t2.github.io/vue-currency-input/config/#component)

Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | Number | '' | Value binding.
value | no | Number | '' | Part of the `v-model` binding.
currency | no | String, Object | null | Override default value of `vue-currency-input`.

#### Events
Name | Params | Description
---- | ------ | -----------
input | value | Fires on interaction with the input. Part of the `v-model` binding.
change | value | Fires when the value has been commited on the input. Usually on blur. Only if the value has changed.

#### Methods
Name | Params | Description
---- | ------ | -----------
focus | [none] | Focus the input.





## DateInput
Simple date and datetime-local input warper. Display in the local timezone.

### Usage
```html
<template>
  <DateInput 
    v-model="value"
    :withTime="true"
  />
</template>

<script>
export default {
  data: () => ({
    value: new Date()
  })
}
</script>
```

### Interface

#### Props
Inherits from [`<input type="date">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/date)
or
from [`<input type="datetime-local">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/datetime-local)


Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | Date | '' | Value binding.
value | no | Date | '' | Part of the `v-model` binding.
withTime | no | Boolean | false | Option to show date with time portion or not.

#### Events
Name | Params | Description
---- | ------ | -----------
input | value | Fires when the value of the input has been changed. Part of the `v-model` binding.

#### Methods
Name | Params | Description
---- | ------ | -----------
focus | [none] | Focus the input.





## DurationInput
Component to show a duration of time like 1:23:04.567.

### Usage
```html
<template>
  <DurationInput 
    v-model="value"
    format="h:mm:ss.fff"
  />
</template>

<script>
export default {
  data: () => ({
    value: {
      hours: 1, 
      minutes: 23, 
      seconds: 4.567
    }
  })
}
</script>
```

### Interface

#### Props
Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | Object | '' | Value binding.
value | no | Object | '' | Part of the `v-model` binding. Object like `.{hours:Number, minutes:Number, seconds:Number}`
format | no | String | 'h:mm' | Display format option. Possible value: 'h:mm', 'h:mm:ss', 'h:mm:ss.f', 'h:mm:ss.ff', 'h:mm:ss.fff'.

#### Events
Name | Params | Description
---- | ------ | -----------
input | value | Fires when the value of the input has been changed.
blur | value | Fires when the input lost focus. Part of the `v-model` binding.

#### Methods
Name | Params | Description
---- | ------ | -----------
focus | [none] | Focus the input.





## RatingInput
Simple 5 star rating component.

### Usage
```html
<template>
  <RatingInput 
    v-model="value"
    :increment: "0.5"
  />
</template>

<script>
export default {
  data: () => ({
    value: 4.5
  })
}
</script>
```

### Interface

#### Props
Inherits from [`vue-rate-it`](https://craigh411.github.io/vue-rate-it/#/docs/font-awesome)

Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | Number | 0 | Value binding.
value | no | Number | 0 | Part of the `v-model` binding.
resetable | no | Boolean | true | Allows to reset the value if click on the same value.
glyph | no | String | Star | A svg path to follow. Large library of font-awesome like icons at `vue-rate-it/glyphs`.
activeColor | no | String | #FCB400 | The color of the highlighted portion of a glyph.
inactiveColor | no | String | #C4C4C4 | The color of the non-highlighted portion of a glyph.
itemSize | no | Number | 30 | The size of each glyph. This gets passed to the SVG width attribute, so larger numbers are larger glyphs.
borderWidth | no | Number | 0 | Sets the width of the border for each glyph.
showRating | no | Boolean | false | Whether or not to show the rating next to the glyphs.
readonly | no | Boolean | false | When set to true, the rating cannot be edited.
disabled | no | Boolean | false | When set to true, the rating cannot be edited.

#### Events
Name | Params | Description
---- | ------ | -----------
input | value | Fires when the value of the selected rating has been changed. Returns the rating that the user has selected. Part of the `v-model` binding
current-rating | value | Fires when the mouse is over. Returns the rating the mouse is currently over.




## SwitchInput
Simple on/off switch

### Usage
```html
<template>
  <SwitchInput 
    v-model="value"
    :type-bold="false"
    theme="bootstrap"
    color="warning"
  />
</template>

<script>
export default {
  data: () => ({
    value: true
  })
}
</script>
```

### Interface

#### Props
Inherits from [`vue-switches`](https://github.com/drewjbartlett/vue-switches)

Props | Required | Type | Default | Description
----- | -------- | ---- | ------- | -----------
v-model | no | String | '' | Value binding.
value | no | String | '' | Part of the `v-model` binding.
typeBold | no | Boolean | true | Switch between bold and skiny display.
theme | no | String | 'custom' | Which theme to use. Used with `color` to change the colors.
color | no | String | 'green' | Which color to use. Used with `theme` to change the colors.
emitOnMount | no | Boolean | false | Emit a "changed" event when the component mounts.
readonly | no | Boolean | false | Make component readonly.

#### Events
Name | Params | Description
---- | ------ | -----------
input | value | Fires when the value of the input has been changed. Part of the `v-model` binding.



