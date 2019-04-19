<template>
  <div id="app">
    <h1>cube-vue-phone-number-input</h1>
    <section>
      <h2>Basics</h2>
      <form @submit.prevent="onSubmit">
        <fieldset class="form-group">
          <label for="phoneNumber" class="form-label">Phone number</label>
          <InputPhoneNumber
            id="phoneNumber"
            required
            :country="country"
            v-model="phoneNumber"
            @country="onCountry"
            @update="onUpdate"
            @valid="onValid"
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
          <legend>@valid</legend>
          <pre class="scroll">{{ valid }}</pre>
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
    </section>
    <section>
      <h2>Inline theme</h2>
      <fieldset class="form-group">
        <InputPhoneNumber class="cube-phone-number-input-inline"/>
      </fieldset>
    </section>
    <section>
      <h2>Individual input and select classes</h2>
      <fieldset class="form-group">
        <InputPhoneNumber countryCodeClass="form-control" inputClass="form-control"/>
      </fieldset>
    </section>
  </div>
</template>

<script>
import InputPhoneNumber from './components/InputPhoneNumber.vue'

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
    onValid (validity) {
      this.valid = validity
    },
    onError (error) {
      this.error = error
      this.phoneNumberDetails = null
    }
  }
}
</script>

<style lang="scss">
@import "./scss/cube-phone-number-input-inline.scss";

body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Helvetica Neue", "Ubuntu", "Roboto", "Noto", "Segoe UI", "Arial",
    sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  padding: 0 1em;
  max-width: 512px;
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
section {
  margin: 3em 0;
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
  display: block;
  width: 100%;
  appearance: none;
  outline: none;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 2px;
  padding: 8px 16px;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  background-color: white;
  transition: all 250ms;
  &:focus:not(:disabled):not(:not(select):read-only) {
    box-shadow: 0px 3px 6px -2px rgba(black, 0.2);
  }
  &:invalid:not(:placeholder-shown):not(select) {
    border-color: red;
  }
  + .form-control {
    margin-top: 4px;
  }
}
select.form-control {
  cursor: pointer;
  padding-right: 3rem;
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.3em;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="grey" viewBox="0 0 512 512"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/></svg>');
  &:invalid {
    // Simulate placeholder
    color: #999999;
  }
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
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  padding: 0.5em 1em;
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
    opacity: 0.5;
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
</style>
