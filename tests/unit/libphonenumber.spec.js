import { formatIncompletePhoneNumber } from 'libphonenumber-js'

describe('libphonenumber-js', () => {
  it('makes sure the (xxx) issue still occurs', () => {
    expect(formatIncompletePhoneNumber('506', 'CA')).toBe('(506)')
  })
})
