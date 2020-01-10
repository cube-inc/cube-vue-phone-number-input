import { shallowMount } from '@vue/test-utils'
import InputPhoneNumber from '@/components/InputPhoneNumber.vue'

describe('InputPhoneNumber', () => {
  it('inits properly', () => {
    const country = 'CA'
    const value = '5062345678'
    const wrapper = shallowMount(InputPhoneNumber, {
      propsData: { country, value }
    })
    expect(wrapper.find('select').element.value).toBe('CA')
    expect(wrapper.find('input').element.value).toBe('(506) 234-5678')

    expect(wrapper.emitted().input).toBeFalsy()

    expect(wrapper.emitted().update).toBeTruthy()
    expect(wrapper.emitted().update.length).toBe(1)
    expect(wrapper.emitted().update[0][0].country).toBe('CA')
    expect(wrapper.emitted().update[0][0].countryCallingCode).toBe('1')
    expect(wrapper.emitted().update[0][0].nationalNumber).toBe('5062345678')
    expect(wrapper.emitted().update[0][0].nationalNumberFormatted).toBe('(506) 234-5678')
    expect(wrapper.emitted().update[0][0].number).toBe('+15062345678')
    expect(wrapper.emitted().update[0][0].numberFormatted).toBe('+1 506 234 5678')
    expect(wrapper.emitted().update[0][0].possible).toBe(true)
    expect(wrapper.emitted().update[0][0].valid).toBe(true)
    expect(wrapper.emitted().update[0][0].type).toBe('FIXED_LINE_OR_MOBILE')
    expect(wrapper.emitted().update[0][0].uri).toBe('tel:+15062345678')

    expect(wrapper.emitted().country).toBeTruthy()
    expect(wrapper.emitted().country.length).toBe(1)
    expect(wrapper.emitted().country[0][0]).toBe('CA')

    expect(wrapper.emitted().valid).toBeTruthy()
    expect(wrapper.emitted().valid.length).toBe(1)
    expect(wrapper.emitted().valid[0][0]).toBe(true)

    expect(wrapper.emitted().error).toBeFalsy()
  })
  it('updates properly', () => {
    const country = 'CA'
    const value = '5062345678'
    const wrapper = shallowMount(InputPhoneNumber, {
      propsData: { country, value }
    })
    expect(wrapper.emitted().input).toBeFalsy()
    expect(wrapper.emitted().update.length).toBe(1)
    expect(wrapper.emitted().country.length).toBe(1)
    expect(wrapper.emitted().valid.length).toBe(1)

    wrapper.find('input').setValue('(506)')
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().update.length).toBe(2)
    expect(wrapper.emitted().country.length).toBe(2)
    expect(wrapper.emitted().valid.length).toBe(2)
    expect(wrapper.emitted().input[0][0]).toBe('506')
    expect(wrapper.emitted().update[1][0].nationalNumber).toBe('506')
    expect(wrapper.emitted().update[1][0].nationalNumberFormatted).toBe('(506)')
    expect(wrapper.emitted().update[1][0].number).toBe('+1506')
    expect(wrapper.emitted().update[1][0].numberFormatted).toBe('+1 506')
    expect(wrapper.emitted().country[1][0]).toBe('CA')
    expect(wrapper.emitted().valid[1][0]).toBe(false)

    // Removes the `)`, expect the last digit is removed as well
    wrapper.find('input').setValue('(506')
    expect(wrapper.emitted().input.length).toBe(2)
    expect(wrapper.emitted().update.length).toBe(3)
    expect(wrapper.emitted().country.length).toBe(3)
    expect(wrapper.emitted().valid.length).toBe(3)
    expect(wrapper.emitted().input[1][0]).toBe('50')
    expect(wrapper.emitted().update[2][0].country).toBe('CA')
    expect(wrapper.emitted().country[2][0]).toBe('CA')
    expect(wrapper.emitted().valid[2][0]).toBe(false)
  })
  it('changes the country based on the user\'s input', () => {
    const country = 'CA'
    const wrapper = shallowMount(InputPhoneNumber, {
      propsData: { country }
    })
    wrapper.find('input').setValue('+3366')
    expect(wrapper.find('select').element.value).toBe('FR')
    expect(wrapper.find('input').element.value).toBe('+33 6 6')
  })
})
