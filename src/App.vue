<template>
  <div id="app">
    <h1>
      Demo
      <small>cube-vue-phone-number-input</small>
    </h1>
    <form @submit.prevent="onSubmit">
      <fieldset class="form-group">
        <label for="phoneNumber" class="form-label">Phone number</label>
        <InputPhoneNumber
          id="phoneNumber"
          class="form-control"
          required
          :country="country"
          v-model="phoneNumber"
          @country="onCountry"
          @update="onUpdate"
          @error="onError"
        />
      </fieldset>
      <fieldset class="form-group">
        <legend>v-model</legend>
        <pre class="scroll">{{ phoneNumber }}</pre>
      </fieldset>
      <fieldset class="form-group">
        <legend>@country</legend>
        <pre class="scroll">{{ country }}</pre>
      </fieldset>
      <fieldset class="form-group">
        <legend>@update</legend>
        <pre class="scroll">{{ phoneNumberDetails }}</pre>
      </fieldset>
      <fieldset class="form-group">
        <legend>@error</legend>
        <pre class="scroll">{{ error }}</pre>
      </fieldset>
      <fieldset class="form-group">
        <div class="button-group">
          <button type="submit" class="button">Submit</button>
          <a v-if="valid" class="button" :href="`tel:${phoneNumber.number}`">Call</a>
          <button v-else class="button" disabled>Call</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import InputPhoneNumber from './components/InputPhoneNumber.vue'
import './scss/index.scss'

export default {
  name: 'app',
  components: {
    InputPhoneNumber
  },
  data () {
    return {
      country: 'CA',
      phoneNumber: '+15062345678',
      phoneNumberDetails: null,
      error: null
    }
  },
  computed: {
    valid () {
      return this.phoneNumberDetails ? this.phoneNumberDetails.valid : false
    }
  },
  methods: {
    onSubmit () {
      alert(`${this.phoneNumber.country} — ${this.phoneNumber.number}`)
    },
    onCountry (country) {
      this.country = country
    },
    onUpdate (data) {
      this.phoneNumberDetails = data
      this.error = null
    },
    onError (error) {
      this.phoneNumber = null
      this.error = error
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Helvetica Neue", "Ubuntu", "Roboto", "Noto", "Segoe UI", "Arial", sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  padding: 0 1em;
  max-width: 375px;
  width: 100%;
  box-sizing: border-box;
}
h1 {
  small {
    display: block;
    font-weight: normal;
    font-size: 50%;
  }
}
.scroll {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
pre {
  background-color: #eeeeee;
  color: #777777;
  margin: 0;
  padding: 1em;
}
.form-group {
  min-width: 0; // override user-agent stylesheet in webkit for fieldset
  border: 0 none;
  margin: 1em 0 0 0;
  padding: 0;
}
.form-label {
  font-weight: bold;
  line-height: 2em;
  cursor: pointer;
}
.form-control {
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 2px;
  padding: 8px 16px;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
}
.button {
  appearance: none;
  outline: none;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  color: inherit;
  background-color: transparent;
  text-transform: uppercase;
  text-decoration: none;
  font-family: inherit;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  padding: .5em 1em;
  margin: 0;
  cursor: pointer;
  transition: background-color 100ms;
  &:hover:not(:disabled) {
    background-color: #eeeeee;
  }
  &:active:not(:disabled) {
    background-color: #dddddd;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}
.button-group {
  display: flex;
  flex-direction: row;
  > .button {
    flex: 0 0 auto;
  }
  > .button + .button {
    margin-left: 8px;
  }
}
.cube-phone-number-input {
  .country-code-selector {
    border-right: 1px solid #cccccc;
    padding-right: 1em;
  }
}
</style>
