<template>
  <div class="cube-phone-number-input">
    <select
      class="country-code-selector"
      :class="countryCodeClass"
      v-model="selectedCountry"
      @change="onCountry"
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
      v-model="phoneNumberInput"
      @input="onInput"
    >
  </div>
</template>

<script>
import { parsePhoneNumber, AsYouType, ParseError } from 'libphonenumber-js/max'
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
      phoneNumberInput: this.value
    }
  },
  computed: {
    countriesSorted () {
      return Array.from(this.countries)
        .sort((a, b) => a.name.localeCompare(b.name))
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    onCountry (event) {
      try {
        const phoneNumber = this.parsePhoneNumber(this.phoneNumberInput, this.selectedCountry)
        this.updateModel(phoneNumber)
        this.checkValidity(phoneNumber)
      } catch (error) {
        this.ParseError(error)
      }
    },
    onInput (event) {
      try {
        const phoneNumber = this.parsePhoneNumber(this.phoneNumberInput, this.selectedCountry)
        if (event.inputType === 'insertText') {
          this.updateModel(phoneNumber)
        }
        this.checkValidity(phoneNumber)
      } catch (error) {
        this.ParseError(error)
      }
    },
    formatNational (input, country = null) {
      return new AsYouType(country).input(input)
    },
    parsePhoneNumber (input, selectedCountry) {
      const phoneNumber = parsePhoneNumber(input, selectedCountry)
      const { country, countryCallingCode, nationalNumber, number } = phoneNumber
      const possible = phoneNumber.isPossible()
      const valid = phoneNumber.isValid()
      const type = phoneNumber.getType()
      const numberFormatted = phoneNumber.formatInternational()
      const nationalNumberFormatted = valid ? phoneNumber.formatNational() : this.formatNational(input, selectedCountry)
      const uri = phoneNumber.getURI()
      const phoneNumberDetails = {
        country,
        countryCallingCode,
        number,
        numberFormatted,
        nationalNumber,
        nationalNumberFormatted,
        uri,
        possible,
        valid,
        type
      }
      this.$emit('country', country)
      this.$emit('update', phoneNumberDetails)
      this.$emit('input', number)
      return phoneNumberDetails
    },
    ParseError (error) {
      const message = error instanceof ParseError
        ? this.validityErrorMessage
        : error
      this.setValidityErrorMessage(message)
      this.$emit('error', error)
      return message
    },
    updateModel (phoneNumber) {
      if (phoneNumber.country) {
        this.selectedCountry = phoneNumber.country
      }
      this.phoneNumberInput = phoneNumber.nationalNumberFormatted
    },
    setValidityErrorMessage (message) {
      this.$refs.input.setCustomValidity(message)
    },
    checkValidity (phoneNumber) {
      const valid = phoneNumber.valid
      const validityMessage = valid ? '' : this.validityErrorMessage
      this.setValidityErrorMessage(validityMessage)
      this.$emit('valid', valid)
      return valid
    }
  },
  mounted () {
    if (this.value) {
      try {
        const phoneNumber = this.parsePhoneNumber(this.value, this.country)
        this.updateModel(phoneNumber)
        this.checkValidity(phoneNumber)
      } catch (error) {
        this.ParseError(error)
      }
    }
  }
}
</script>
