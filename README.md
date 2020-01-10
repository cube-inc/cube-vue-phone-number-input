# cube-vue-phone-number-input

A super simple phone number input component for Vue built on top of the [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) library.

## Key features

- Easy to use
- Country selector and country detection
- Phone number formatting as you type
- Simple HTML structure
- Built on top of the [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) library
- Comes with SCSS themes

## Demo

Let's play with the [demo](https://cube-vue-phone-number-input.netlify.com).

## Install

```sh
yarn add cube-vue-phone-number-input
```

## Exemple

```html
<template>
  <div id="App">
    <fieldset>
      <InputPhoneNumber
        class="cube-phone-number-input-inline"
        :country="country"
        v-model="phoneNumber"
        required
      />
    </fieldset>
  </div>
</template>

<script>
import InputPhoneNumber from 'cube-vue-phone-number-input'

export default {
  components: {
    InputPhoneNumber
  },
  data () {
    return {
      country: 'CA',
      phoneNumber: null
    }
  }
}
</script>

<style lang="scss">
@import "~cube-vue-phone-number-input/src/scss/_inline.scss";
</style>
```

## Props

| Name       | Required | Type    | Default   | Description |
| ---        | ---      | ---     | ---       | ---         |
| value      | false    | String  | `null` | Any `String` value that looks like a phone number. |
| country    | false    | String  | `null` | The [two-letter ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the phone number: `US`, `CA`… |
| countries  | false    | Array   | `src/assets/countries.json` | Your own `Country` list. |
| countryCodePlaceholder | false  | String | `"Country"` | … |
| countryCodeClass | false | String, Array, Object | `null` | … |
| inputClass | false | String, Array, Object | `null` | … |
| placeholder | false | String | `"Phone number"` | … |
| validityErrorMessage | false | String | `"Invalid phone number"` | … |

## Events

| Name    | Description |
| ---     | ---         |
| input   | Sent on `PhoneNumber` update with the `PhoneNumber.number` (international format) value. |
| update  | Sent on `PhoneNumber` update. |
| country | Sent on `PhoneNumber.country` update based on the user input. |
| valid   | Sent on `PhoneNumber` validity change. |
| error   | Sent on `PhoneNumber` error. See the [libphonenumber-js#parsePhoneNumber](https://github.com/catamphetamine/libphonenumber-js#parsephonenumberfromstringstring-defaultcountry) section. |

## Objects

### PhoneNumber
See the [libphonenumber-js#phonenumber](https://github.com/catamphetamine/libphonenumber-js#phonenumber) documentation.

``` json
{
  "country": "CA",
  "countryCallingCode": "1",
  "number": "+15062345678",
  "numberFormatted": "+1 506 234 5678",
  "nationalNumber": "5062345678",
  "nationalNumberFormatted": "+(506) 234-5678",
  "uri": "tel:+15062345678",
  "possible": true,
  "valid": true,
  "type": "FIXED_LINE_OR_MOBILE"
}
```

### Country

If you want to provide your own `countries` prop, make sure to build an `Array` (or a json file) with the following structure:

``` javascript
[
  { "code": "US", "name": "United States" },
  { "code": "CA", "name": "Canada" },
  { "code": "FR", "name": "France" },
  …
]
```

`countries` are automatically sorted by `name` in the country selector.

## HTML 5 Constraint Validation API

This component relies on the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation).
Any HTML validation attribute is accepted for your own HTML validation (`required`, `pattern`…).

Also the custom validity message is set with the `validityErrorMessage` prop value when the phone number is not valid.
