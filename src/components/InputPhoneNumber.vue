<template>
  <div class="cube-phone-number-input">
    <select
      class="country-code-selector"
      :class="countryCodeClass"
      :value="selectedCountry"
      @input="onCountry"
      required
    >
      <option class="placeholder" :value="null">{{ countryCodePlaceholder }}</option>
      <option
        v-for="country in countriesSorted"
        :key="country.code"
        :class="country.class"
        :value="country.code"
      >{{ country.name }}</option>
    </select>
    <input
      ref="input"
      type="tel"
      class="phone-number-input"
      :class="inputClass"
      :placeholder="placeholder"
      v-bind="$attrs"
      :value="phoneNumberFormatted"
      @input="onInput"
    >
  </div>
</template>

<script>
import { parsePhoneNumber, parseIncompletePhoneNumber, formatIncompletePhoneNumber, ParseError } from 'libphonenumber-js/max'
import countries from '../assets/countries.json'

export default {
  inheritAttrs: false,
  props: {
    value: { type: String, default: null },
    country: { type: String, default: null },
    countries: { type: Array, default: () => countries },
    countryCodePlaceholder: { type: String, default: 'Country' },
    countryCodeClass: { type: [String, Array, Object], default: null },
    inputClass: { type: [String, Array, Object], default: null },
    placeholder: { type: String, default: 'Phone number' },
    validityErrorMessage: { type: String, default: 'Invalid phone number' }
  },
  data () {
    return {
      selectedCountry: this.country,
      phoneNumber: this.value
    }
  },
  computed: {
    countriesSorted () {
      return Array.from(this.countries)
        .sort((a, b) => a.name.localeCompare(b.name))
    },
    phoneNumberFormatted () {
      return formatIncompletePhoneNumber(this.phoneNumber, this.selectedCountry)
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    onCountry (event) {
      const country = event.target.value
      this.selectedCountry = country
      this.$emit('country', this.selectedCountry)
      this.parsePhoneNumber()
    },
    onInput (event) {
      let value = event.target.value
      if (!this.selectedCountry) {
        if (value.length && value[0] !== '!') {
          value = '+' + value
        }
      }
      const number = parseIncompletePhoneNumber(value)

      // Workaround for the `(xxx)` backspace issue
      this.phoneNumber = (number === this.phoneNumber && formatIncompletePhoneNumber(number, this.selectedCountry).indexOf(value) === 0)
        ? number.slice(0, -1)
        : number

      this.$emit('input', this.phoneNumber)
      this.parsePhoneNumber()
    },
    parsePhoneNumber () {
      try {
        const phoneNumber = parsePhoneNumber(this.phoneNumber, this.selectedCountry)
        const phoneNumberDetails = {
          country: phoneNumber.country,
          countryCallingCode: phoneNumber.countryCallingCode,
          number: phoneNumber.number,
          numberFormatted: phoneNumber.formatInternational(),
          nationalNumber: phoneNumber.nationalNumber,
          nationalNumberFormatted: this.phoneNumberFormatted,
          uri: phoneNumber.getURI(),
          possible: phoneNumber.isPossible(),
          valid: phoneNumber.isValid(),
          type: phoneNumber.getType()
        }
        if (phoneNumber.country) {
          this.selectedCountry = phoneNumber.country
          this.$emit('country', this.selectedCountry)
        }
        const validityMessage = phoneNumberDetails.valid ? '' : this.validityErrorMessage
        this.setValidityErrorMessage(validityMessage)
        this.$emit('update', phoneNumberDetails)
        this.$emit('valid', phoneNumberDetails.valid)
        return phoneNumberDetails
      } catch (error) {
        const message = error instanceof ParseError
          ? this.validityErrorMessage
          : error
        this.setValidityErrorMessage(message)
        this.$emit('update', null)
        this.$emit('valid', false)
        this.$emit('error', message)
      }
    },
    setValidityErrorMessage (message) {
      this.$refs.input.setCustomValidity(message)
    }
  },
  mounted () {
    if (this.value) {
      this.$emit('input', this.phoneNumber)
      this.parsePhoneNumber()
    }
  }
}
</script>
