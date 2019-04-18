<template>
  <div class="cube-phone-number-input" @click="focus">
    <select
      class="country-code-selector"
      v-model="selectedCountry"
      @click.stop
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
      :placeholder="placeholder"
      v-bind="$attrs"
      v-model="phoneNumberInput"
      @input="onInput"
    >
  </div>
</template>

<script>
import { parsePhoneNumber, AsYouType } from 'libphonenumber-js/max'
import countries from '../assets/countries.json'

export default {
  inheritAttrs: false,
  props: {
    value: { type: String, default: null },
    country: { type: String, default: null },
    countries: { type: Array, default: () => countries },
    countryCodePlaceholder: { type: String, default: 'Country' },
    placeholder: { type: String, default: 'Phone number' }
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
        this.$emit('update', phoneNumber)
        this.$emit('country', phoneNumber.country)
        this.$emit('input', phoneNumber.number)
      } catch (error) {
        this.$emit('error', error)
      }
      this.$nextTick(this.focus)
    },
    onInput (event) {
      try {
        const phoneNumber = this.parsePhoneNumber(this.phoneNumberInput, this.selectedCountry)
        if (event.inputType === 'insertText') {
          this.updateModel(phoneNumber)
        }
        this.$emit('update', phoneNumber)
        this.$emit('country', phoneNumber.country)
        this.$emit('input', phoneNumber.number)
      } catch (error) {
        this.$emit('error', error)
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
      return {
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
    },
    updateModel (phoneNumber) {
      if (phoneNumber.country) {
        this.selectedCountry = phoneNumber.country
      }
      this.phoneNumberInput = phoneNumber.nationalNumberFormatted
    }
  },
  created () {
    if (this.value) {
      try {
        const phoneNumber = this.parsePhoneNumber(this.value, this.country)
        this.updateModel(phoneNumber)
        this.$emit('update', phoneNumber)
        this.$emit('country', phoneNumber.country)
        this.$emit('input', phoneNumber.number)
      } catch (error) {
        this.$emit('error', error)
      }
    }
  }
}
</script>
